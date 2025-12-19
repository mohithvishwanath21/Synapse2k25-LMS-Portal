import Quiz from "../../model/quiz.js";
import Course from "../../model/course.js";
import EnrolledCourse from "../../model/enrolledCourses.js";
import ResponseHandler from "../../utils/responseHandler.js";
import HttpStatus from "../../utils/statusCodes.js";
import { STRING_CONSTANTS } from "../../utils/stringConstants.js";

// Get available quizzes for student
export const getStudentQuizzes = async (req, res) => {
    try {
        const userId = req.user.id;
        
        // Get courses student is enrolled in
        const enrolledCourses = await EnrolledCourse.find({ 
            userId: userId
        }).select('courseId');
        
        const courseIds = enrolledCourses.map(ec => ec.courseId);
        
        // If student is not enrolled in any courses, return empty array
        if (courseIds.length === 0) {
            console.log(`No enrolled courses found for user: ${userId}`);
            return ResponseHandler.success(res, STRING_CONSTANTS.DATA_NOT_FOUND, HttpStatus.OK, []);
        }
        
        // Find quizzes for those courses
        const now = new Date();
        const quizQuery = {
            course: { $in: courseIds },
            isPublished: true,
            status: 'approved',
            $and: [
                {
                    $or: [
                        { availableFrom: { $lte: now } },
                        { availableFrom: null }
                    ]
                },
                {
                    $or: [
                        { availableTo: { $gte: now } },
                        { availableTo: null }
                    ]
                }
            ]
        };
        
        console.log(`Fetching quizzes for courses:`, courseIds);
        console.log(`Quiz query:`, JSON.stringify(quizQuery, null, 2));
        
        const quizzes = await Quiz.find(quizQuery)
        .populate('course', 'title')
        .populate('tutor', 'firstName lastName')
        .select('_id title description course timeLimit availableFrom availableTo questions createdAt');
        
        console.log(`Found ${quizzes.length} quizzes matching criteria`);
        
        // Add submission status
        const quizzesWithStatus = await Promise.all(
            quizzes.map(async (quiz) => {
                const submitted = quiz.results?.some(
                    result => result.student.toString() === userId
                );
                
                const quizObj = quiz.toObject();
                
                // Hide correct answers if not submitted
                if (!submitted && quizObj.questions) {
                    quizObj.questions = quizObj.questions.map(q => {
                        const { options, correctTextAnswers, ...rest } = q;
                        return {
                            ...rest,
                            options: options?.map(o => ({ 
                                _id: o._id, 
                                text: o.text 
                            }))
                        };
                    });
                }
                
                return {
                    ...quizObj,
                    submitted,
                    canTake: !submitted && 
                             (!quiz.availableFrom || new Date(quiz.availableFrom) <= new Date()) &&
                             (!quiz.availableTo || new Date(quiz.availableTo) >= new Date())
                };
            })
        );
        
        if (!quizzesWithStatus || quizzesWithStatus.length === 0) {
            return ResponseHandler.success(res, STRING_CONSTANTS.DATA_NOT_FOUND, HttpStatus.OK, []);
        }
        
        return ResponseHandler.success(res, STRING_CONSTANTS.LOADING_SUCCESS, HttpStatus.OK, quizzesWithStatus);
        
    } catch (error) {
        console.error('Error fetching student quizzes:', error);
        console.error('Error stack:', error.stack);
        return ResponseHandler.error(res, STRING_CONSTANTS.SERVER, HttpStatus.INTERNAL_SERVER_ERROR);
    }
};

// Get single quiz for student
export const getQuiz = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        
        const quiz = await Quiz.findById(id)
            .populate('course', 'title')
            .populate('tutor', 'firstName lastName');
        
        if (!quiz) {
            return ResponseHandler.error(res, STRING_CONSTANTS.DATA_NOT_FOUND, HttpStatus.NOT_FOUND);
        }
        
        // Check if student is enrolled in the course
        const isEnrolled = await EnrolledCourse.findOne({
            userId: userId,
            courseId: quiz.course
        });
        
        if (!isEnrolled) {
            return ResponseHandler.error(res, "Not enrolled in this course", HttpStatus.FORBIDDEN);
        }
        
        // Check if quiz is available
        if (!quiz.isPublished || quiz.status !== 'approved') {
            return ResponseHandler.error(res, "Quiz is not available", HttpStatus.FORBIDDEN);
        }
        
        const quizObj = quiz.toObject();
        const hasSubmitted = quiz.results?.some(r => r.student.toString() === userId);
        
        // Hide correct answers if not submitted
        if (!hasSubmitted) {
            quizObj.questions = quizObj.questions?.map(q => {
                const { options, correctTextAnswers, ...rest } = q;
                return {
                    ...rest,
                    options: options?.map(o => ({ 
                        _id: o._id, 
                        text: o.text 
                    }))
                };
            });
        }
        
        return ResponseHandler.success(res, STRING_CONSTANTS.LOADING_SUCCESS, HttpStatus.OK, {
            ...quizObj,
            hasSubmitted
        });
        
    } catch (error) {
        console.log(STRING_CONSTANTS.LOADING_ERROR, error);
        return ResponseHandler.error(res, STRING_CONSTANTS.SERVER, HttpStatus.INTERNAL_SERVER_ERROR);
    }
};

// Submit quiz answers
export const submitQuiz = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const { answers, timeTaken } = req.body;
        
        const quiz = await Quiz.findById(id);
        
        if (!quiz) {
            return ResponseHandler.error(res, STRING_CONSTANTS.DATA_NOT_FOUND, HttpStatus.NOT_FOUND);
        }
        
        // Check if already submitted
        const alreadySubmitted = quiz.results?.some(
            r => r.student.toString() === userId
        );
        
        if (alreadySubmitted) {
            return ResponseHandler.error(res, "You have already submitted this quiz", HttpStatus.BAD_REQUEST);
        }
        
        // Calculate score
        let score = 0;
        let totalPossibleScore = 0;
        const processedAnswers = [];
        
        for (const answer of answers) {
            const question = quiz.questions.id(answer.questionId);
            
            if (!question) continue;
            
            totalPossibleScore += question.points || 1;
            let isCorrect = false;
            
            if (question.type === 'text') {
                // Text answer
                const studentAnswer = answer.textAnswer?.trim().toLowerCase();
                const correctAnswers = question.correctTextAnswers?.map(a => a.trim().toLowerCase());
                
                if (studentAnswer && correctAnswers?.includes(studentAnswer)) {
                    isCorrect = true;
                    score += question.points || 1;
                }
                
                processedAnswers.push({
                    question: answer.questionId,
                    textAnswer: answer.textAnswer,
                    isCorrect
                });
            } else {
                // Multiple choice
                const selectedOptionIds = answer.selectedOptions || [];
                const correctOptionIds = question.options
                    ?.filter(o => o.isCorrect)
                    .map(o => o._id.toString());
                
                if (question.type === 'single') {
                    // Single choice - must match exactly
                    if (selectedOptionIds.length === 1 && 
                        correctOptionIds?.includes(selectedOptionIds[0])) {
                        isCorrect = true;
                        score += question.points || 1;
                    }
                } else {
                    // Multiple choice - must match all correct options
                    const allSelectedAreCorrect = selectedOptionIds.every(id => 
                        correctOptionIds?.includes(id)
                    );
                    const allCorrectAreSelected = correctOptionIds?.every(id => 
                        selectedOptionIds.includes(id)
                    );
                    
                    if (allSelectedAreCorrect && allCorrectAreSelected && 
                        selectedOptionIds.length === correctOptionIds?.length) {
                        isCorrect = true;
                        score += question.points || 1;
                    }
                }
                
                processedAnswers.push({
                    question: answer.questionId,
                    selectedOptions: selectedOptionIds,
                    isCorrect
                });
            }
        }
        
        // Save result
        const result = {
            student: userId,
            answers: processedAnswers,
            score,
            totalPossibleScore,
            timeTaken: timeTaken || null,
            submittedAt: new Date()
        };
        
        quiz.results = quiz.results || [];
        quiz.results.push(result);
        await quiz.save();
        
        return ResponseHandler.success(res, "Quiz submitted successfully", HttpStatus.OK, {
            score,
            totalPossibleScore,
            percentage: Math.round((score / totalPossibleScore) * 100)
        });
        
    } catch (error) {
        console.log("Error submitting quiz:", error);
        return ResponseHandler.error(res, STRING_CONSTANTS.SERVER, HttpStatus.INTERNAL_SERVER_ERROR);
    }
};

// Get quiz result
export const getQuizResult = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        
        const quiz = await Quiz.findById(id)
            .populate('course', 'title')
            .populate('tutor', 'firstName lastName');
        
        if (!quiz) {
            return ResponseHandler.error(res, STRING_CONSTANTS.DATA_NOT_FOUND, HttpStatus.NOT_FOUND);
        }
        
        const result = quiz.results?.find(r => r.student.toString() === userId);
        
        if (!result) {
            return ResponseHandler.error(res, "No submission found", HttpStatus.NOT_FOUND);
        }
        
        // Enhance result with question details
        const enhancedResult = {
            ...result.toObject(),
            quizTitle: quiz.title,
            courseTitle: quiz.course?.title,
            tutorName: quiz.tutor ? `${quiz.tutor.firstName} ${quiz.tutor.lastName}` : '',
            questions: result.answers.map(answer => {
                const question = quiz.questions.id(answer.question);
                const selectedOptionText = question?.options
                    ?.filter(o => answer.selectedOptions?.includes(o._id.toString()))
                    ?.map(o => o.text);
                return {
                    questionText: question?.questionText,
                    type: question?.type,
                    points: question?.points,
                    explanation: question?.explanation,
                    studentAnswer: {
                        ...answer.toObject?.() || answer,
                        selectedOptionText
                    },
                    correctAnswers: question?.type === 'text' 
                        ? question.correctTextAnswers 
                        : question?.options?.filter(o => o.isCorrect).map(o => o.text)
                };
            })
        };
        
        return ResponseHandler.success(res, STRING_CONSTANTS.LOADING_SUCCESS, HttpStatus.OK, enhancedResult);
        
    } catch (error) {
        console.log(STRING_CONSTANTS.LOADING_ERROR, error);
        return ResponseHandler.error(res, STRING_CONSTANTS.SERVER, HttpStatus.INTERNAL_SERVER_ERROR);
    }
};
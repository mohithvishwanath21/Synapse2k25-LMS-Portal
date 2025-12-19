import Quiz from "../../model/quiz.js";
import Course from "../../model/course.js";
import ResponseHandler from "../../utils/responseHandler.js";
import HttpStatus from "../../utils/statusCodes.js";
import { STRING_CONSTANTS } from "../../utils/stringConstants.js";

// Create quiz
export const createQuiz = async (req, res) => {
    try {
        const { title, description, course, timeLimit, availableFrom, 
                availableTo, questions, module } = req.body;

        // Check if course exists and tutor owns it
        const courseDoc = await Course.findOne({ _id: course, tutor: req.tutor.id });
        if (!courseDoc) {
            return ResponseHandler.error(res, "Course not found or unauthorized", HttpStatus.FORBIDDEN);
        }

        // Create quiz with draft status
        const quiz = await Quiz.create({
            title,
            description,
            course,
            tutor: req.tutor.id,
            module: module || null,
            timeLimit,
            availableFrom,
            availableTo,
            questions,
            draft: true,
            status: "draft",
            isPublished: false
        });

        return ResponseHandler.success(res, STRING_CONSTANTS.CREATION_SUCCESS, HttpStatus.CREATED, quiz);

    } catch (error) {
        console.log(STRING_CONSTANTS.CREATION_ERROR, error);
        return ResponseHandler.error(res, STRING_CONSTANTS.SERVER, HttpStatus.INTERNAL_SERVER_ERROR);
    }
};

// Request quiz approval
export const requestQuizApproval = async (req, res) => {
    try {
        const { id } = req.params;

        const quiz = await Quiz.findById(id);
        if (!quiz) {
            return ResponseHandler.error(res, STRING_CONSTANTS.DATA_NOT_FOUND, HttpStatus.NOT_FOUND);
        }

        // Check ownership
        if (quiz.tutor.toString() !== req.tutor.id) {
            return ResponseHandler.error(res, STRING_CONSTANTS.UNAUTHORIZED, HttpStatus.FORBIDDEN);
        }

        // Update status to pending for admin approval
        quiz.draft = false;
        quiz.status = "pending";
        await quiz.save();

        return ResponseHandler.success(res, "Quiz submitted for admin approval", HttpStatus.OK, quiz);

    } catch (error) {
        console.log(STRING_CONSTANTS.UPDATION_ERROR, error);
        return ResponseHandler.error(res, STRING_CONSTANTS.SERVER, HttpStatus.INTERNAL_SERVER_ERROR);
    }
};

// Load tutor's quizzes
export const loadTutorQuizzes = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const { search, filter } = req.query;

        let sort = { createdAt: -1 };
        let filterQuery = { tutor: req.tutor.id };

        if (filter === "oldest") {
            sort = { createdAt: 1 };
        } else if (filter === "published") {
            filterQuery.isPublished = true;
        } else if (filter === "draft") {
            filterQuery.draft = true;
        } else if (filter === "pending") {
            filterQuery.status = "pending";
        }

        if (search) {
            filterQuery.title = { $regex: search, $options: "i" };
        }

        const quizzes = await Quiz.find(filterQuery)
            .populate('course', 'title')
            .skip(skip)
            .limit(limit)
            .sort(sort);

        const totalQuizzes = await Quiz.countDocuments(filterQuery);

        if (!quizzes || quizzes.length === 0) 
            return ResponseHandler.success(res, STRING_CONSTANTS.DATA_NOT_FOUND, HttpStatus.OK, {
                quizzes: [],
                total: 0,
                currentPage: page,
                totalPages: 0,
            });

        return ResponseHandler.success(res, STRING_CONSTANTS.LOADING_SUCCESS, HttpStatus.OK, {
            quizzes,
            total: totalQuizzes,
            currentPage: page,
            totalPages: Math.ceil(totalQuizzes / limit),
        });

    } catch (error) {
        console.log(STRING_CONSTANTS.LOADING_ERROR, error);
        return ResponseHandler.error(res, STRING_CONSTANTS.SERVER, HttpStatus.INTERNAL_SERVER_ERROR);
    }
};

// Update quiz
export const updateQuiz = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const quiz = await Quiz.findById(id);
        if (!quiz) {
            return ResponseHandler.error(res, STRING_CONSTANTS.DATA_NOT_FOUND, HttpStatus.NOT_FOUND);
        }

        // Check ownership
        if (quiz.tutor.toString() !== req.tutor.id) {
            return ResponseHandler.error(res, STRING_CONSTANTS.UNAUTHORIZED, HttpStatus.FORBIDDEN);
        }

        // Don't allow updating if quiz is approved/published
        if (quiz.status === 'approved' && quiz.isPublished) {
            return ResponseHandler.error(res, "Cannot update published quiz", HttpStatus.BAD_REQUEST);
        }

        // If updating questions, reset to draft
        if (updateData.questions) {
            quiz.draft = true;
            quiz.status = "draft";
            quiz.isPublished = false;
        }

        Object.assign(quiz, updateData);
        await quiz.save();

        return ResponseHandler.success(res, STRING_CONSTANTS.UPDATION_SUCCESS, HttpStatus.OK, quiz);

    } catch (error) {
        console.log(STRING_CONSTANTS.UPDATION_ERROR, error);
        return ResponseHandler.error(res, STRING_CONSTANTS.UPDATION_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }
};

// Delete quiz (tutor)
export const deleteQuiz = async (req, res) => {
    try {
        const { id } = req.params;

        const quiz = await Quiz.findById(id);
        if (!quiz) {
            return ResponseHandler.error(res, STRING_CONSTANTS.DATA_NOT_FOUND, HttpStatus.NOT_FOUND);
        }

        // Check ownership
        if (quiz.tutor.toString() !== req.tutor.id) {
            return ResponseHandler.error(res, STRING_CONSTANTS.UNAUTHORIZED, HttpStatus.FORBIDDEN);
        }

        await Quiz.findByIdAndDelete(id);

        return ResponseHandler.success(res, STRING_CONSTANTS.DELETION_SUCCESS, HttpStatus.OK);

    } catch (error) {
        console.log(STRING_CONSTANTS.DELETION_ERROR, error);
        return ResponseHandler.error(res, STRING_CONSTANTS.DELETION_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }
};

// Load quiz details
export const loadQuizDetails = async (req, res) => {
    try {
        const { id } = req.params;

        const quiz = await Quiz.findById(id)
            .populate('course', 'title')
            .populate('tutor', 'firstName lastName');

        if (!quiz) {
            return ResponseHandler.error(res, STRING_CONSTANTS.DATA_NOT_FOUND, HttpStatus.NOT_FOUND);
        }

        // Check ownership
        if (quiz.tutor.toString() !== req.tutor.id) {
            return ResponseHandler.error(res, STRING_CONSTANTS.UNAUTHORIZED, HttpStatus.FORBIDDEN);
        }

        return ResponseHandler.success(res, STRING_CONSTANTS.LOADING_SUCCESS, HttpStatus.OK, quiz);

    } catch (error) {
        console.log(STRING_CONSTANTS.LOADING_ERROR, error);
        return ResponseHandler.error(res, STRING_CONSTANTS.LOADING_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }
};

// Check if quiz title exists
export const quizTitleExist = async (req, res) => {
    try {
        const { title } = req.query;

        if (!title) {
            return ResponseHandler.error(res, STRING_CONSTANTS.INVALID_INPUT, HttpStatus.BAD_REQUEST);
        }

        const existingQuiz = await Quiz.findOne({ 
            title: { $regex: `^${title}$`, $options: 'i' },
            tutor: req.tutor.id 
        });

        return ResponseHandler.success(res, STRING_CONSTANTS.LOADING_SUCCESS, HttpStatus.OK, {
            exists: !!existingQuiz
        });

    } catch (error) {
        console.log(STRING_CONSTANTS.LOADING_ERROR, error);
        return ResponseHandler.error(res, STRING_CONSTANTS.SERVER, HttpStatus.INTERNAL_SERVER_ERROR);
    }
};
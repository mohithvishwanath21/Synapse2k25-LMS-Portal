import Quiz from "../../model/quiz.js";
import Tutor from "../../model/tutor.js";
import ResponseHandler from "../../utils/responseHandler.js";
import HttpStatus from "../../utils/statusCodes.js";
import { STRING_CONSTANTS } from "../../utils/stringConstants.js";
import { saveNotification, sendNotification } from '../../utils/LiveNotification.js';
const toId = (id) => id?.toString();

// View pending quiz requests
export const loadPendingQuizzes = async (req, res) => {
    try {
        const quizzes = await Quiz.find({ status: 'pending' })
            .populate('tutor', '_id firstName lastName email profileImage')
            .populate('course', 'title')
            .select('_id title tutor course description timeLimit questions createdAt availableFrom availableTo');

        if (!quizzes || quizzes.length === 0) 
            return ResponseHandler.success(res, STRING_CONSTANTS.DATA_NOT_FOUND, HttpStatus.OK);

        return ResponseHandler.success(res, STRING_CONSTANTS.LOADING_SUCCESS, HttpStatus.OK, quizzes);

    } catch (error) {
        console.log(STRING_CONSTANTS.LOADING_ERROR, error);
        return ResponseHandler.error(res, STRING_CONSTANTS.LOADING_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }
};

// Load quiz details for admin
export const loadQuizDetails = async (req, res) => {
    try {
        const { id } = req.params;

        const quiz = await Quiz.findById(id)
            .populate('tutor', '_id firstName lastName email profileImage')
            .populate('course', 'title categoryName')
            .select('_id title tutor course description timeLimit questions status reason isPublished availableFrom availableTo createdAt');

        if (!quiz) 
            return ResponseHandler.error(res, STRING_CONSTANTS.DATA_NOT_FOUND, HttpStatus.NOT_FOUND);

        return ResponseHandler.success(res, STRING_CONSTANTS.LOADING_SUCCESS, HttpStatus.OK, quiz);

    } catch (error) {
        console.log(STRING_CONSTANTS.LOADING_ERROR, error);
        return ResponseHandler.error(res, STRING_CONSTANTS.LOADING_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }
};

// Approve or reject quiz
export const approveOrRejectQuiz = async (req, res) => {
    try {
        const { id, input, reason } = req.body;

        // Debug logging
        console.log("Quiz approval request body:", JSON.stringify(req.body, null, 2));

        if (!id || !id.quizId) {
            console.error("Missing required fields:", { id, input, reason });
            return ResponseHandler.error(res, "Missing quizId", HttpStatus.BAD_REQUEST);
        }

        const quizId = id.quizId;
        const tutorId = id.tutorId;

        // Allow fallback to quiz.tutor if tutorId isn't provided or mismatch
        const quiz = tutorId
            ? await Quiz.findOne({ _id: quizId, tutor: tutorId })
            : await Quiz.findById(quizId);

        if (!quiz) {
            console.error("Quiz not found:", { quizId, tutorId });
            return ResponseHandler.error(res, STRING_CONSTANTS.DATA_NOT_FOUND, HttpStatus.NOT_FOUND);
        }

        if (quiz.status === 'approved' || quiz.status === 'rejected') 
            return ResponseHandler.error(res, STRING_CONSTANTS.EXIST, HttpStatus.CONFLICT);

        if (input === 'approve') {
            await Quiz.findByIdAndUpdate(quizId, {
                status: 'approved',
                reason,
                isPublished: true,
                draft: false
            });

            const newNotification = await saveNotification(
                toId(tutorId || quiz.tutor?._id || quiz.tutor),
                'Tutor',
                'quiz_approved',
                `Your quiz "${quiz.title}" has been approved and published. ${reason || ''}`
            );
            

            sendNotification(req, newNotification);

            return ResponseHandler.success(res, `Quiz "${quiz?.title}" approved successfully`, HttpStatus.OK);
        } 
        else if (input === 'reject') {
            await Quiz.findByIdAndUpdate(quizId, {
                status: 'rejected',
                reason,
                isPublished: false
            });

            const newNotification = await saveNotification(
                toId(tutorId || quiz.tutor?._id || quiz.tutor),
                'Tutor',
                'quiz_rejected',
                `Your quiz "${quiz.title}" has been rejected. Reason: ${reason}`
            );
            

            sendNotification(req, newNotification);

            return ResponseHandler.success(res, `Quiz "${quiz?.title}" rejected`, HttpStatus.OK);
        } 
        else {
            return ResponseHandler.error(res, STRING_CONSTANTS.INVALID_INPUT, HttpStatus.BAD_REQUEST);
        }

    } catch (error) {
        console.error("Quiz approval error:", error);
        console.error("Error stack:", error.stack);
        return ResponseHandler.error(res, error.message || STRING_CONSTANTS.UPDATION_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }
};

// Suspend or activate quiz
export const allowOrSuspendQuiz = async (req, res) => {
    try {
        const { quizId, tutorId } = req.body;

        const quiz = await Quiz.findById(quizId);

        if (!quiz)
            return ResponseHandler.error(res, STRING_CONSTANTS.DATA_NOT_FOUND, HttpStatus.NOT_FOUND);

        if (quiz.isPublished) {
            // Suspend quiz
            quiz.isPublished = false;
            quiz.status = 'suspended';

            await quiz.save();

            const newNotification = await saveNotification(
                toId(tutorId),
                'Tutor',
                'quiz_suspended',
                `Your quiz "${quiz.title}" has been suspended.`
            );

            sendNotification(req, newNotification);

            return ResponseHandler.success(res, STRING_CONSTANTS.QUIZ_SUSPENDED, HttpStatus.OK);
        } else {
            // Activate quiz
            quiz.isPublished = true;
            quiz.status = 'approved';

            await quiz.save();

            const newNotification = await saveNotification(
                toId(tutorId),
                'Tutor',
                'quiz_activated',
                `Your quiz "${quiz.title}" has been activated and is now available to students.`
            );

            sendNotification(req, newNotification);

            return ResponseHandler.success(res, STRING_CONSTANTS.QUIZ_ACTIVE, HttpStatus.OK);
        }

    } catch (error) {
        console.log(STRING_CONSTANTS.SERVER, error);
        return ResponseHandler.error(res, STRING_CONSTANTS.SERVER, HttpStatus.INTERNAL_SERVER_ERROR);
    }
};

// Delete quiz
export const deleteQuiz = async (req, res) => {
    try {
        const quizId = req.params.id;

        const quiz = await Quiz.findById(quizId);
        if (!quiz)  
            return ResponseHandler.error(res, STRING_CONSTANTS.DATA_NOT_FOUND, HttpStatus.NOT_FOUND);

        await Quiz.findByIdAndDelete(quizId);

        // Notify tutor
        if (quiz.tutor) {
            const newNotification = await saveNotification(
                toId(quiz.tutor),
                'Tutor',
                'quiz_deleted',
                `Your quiz "${quiz.title}" has been deleted by admin.`
            );
            sendNotification(req, newNotification);
        }

        return ResponseHandler.success(res, STRING_CONSTANTS.DELETION_SUCCESS, HttpStatus.OK);

    } catch (error) {
        console.log(STRING_CONSTANTS.DELETION_ERROR, error);
        return ResponseHandler.error(res, STRING_CONSTANTS.DELETION_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }
};

// View all quizzes for admin
export const loadQuizzes = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const skip = (page - 1) * limit;
        const { search, filter } = req.query;

        let sort = { createdAt: -1 };
        let filterQuery = {};

        if (filter === "oldest") {
            sort = { createdAt: 1 };
        } else if (filter === "active") {
            filterQuery.isPublished = true;
        } else if (filter === "Not-Active") {
            filterQuery.isPublished = false;
        }

        if (search) {
            filterQuery.title = { $regex: search, $options: "i" };
        }

        const quizzes = await Quiz.find(filterQuery)
            .select('_id title tutor course timeLimit isPublished status questions createdAt')
            .populate('tutor', 'firstName email profileImage')
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
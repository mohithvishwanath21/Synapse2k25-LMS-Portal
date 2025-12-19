import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { removeAdminCredentials } from '@/features/auth/admin/adminAuthSlice.js';
import { removeTutorCredentials } from '@/features/auth/tutor/tutorAuthSlice.js';
import { removeUserCredentials } from '@/features/auth/user/userAuthSlice.js';

// Base query configuration
const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    credentials: 'include',
});

// Logout handler
const handleLogout = async (dispatch, state) => {
    if (state.adminAuth?.isAuthenticated) {
        dispatch(removeAdminCredentials());
        await baseQuery({url : "admin/logout", method : 'DELETE'},
                 { dispatch, getState: () => state }, {});
    }
    if (state.tutorAuth?.isAuthenticated) {
        dispatch(removeTutorCredentials());
        await baseQuery({url : "tutor/logout", method : 'DELETE'},
             { dispatch, getState: () => state }, {});
    }
    if (state.userAuth?.isAuthenticated) {
        dispatch(removeUserCredentials());
        await baseQuery({url : "user/logout", method : 'DELETE'}, 
            { dispatch, getState: () => state }, {});
    }
};

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
        const state = api.getState();
        await handleLogout(api.dispatch, state); // Direct logout
    }

    return result;
};

// Create API slice
export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Admin', 'User', 'Tutor', 'Common', 'Coupon', 'Quiz'], // Added 'Quiz' tag
    keepUnusedDataFor: 10,
    refetchOnMountOrArgChange: 0,
    endpoints: (builder) => ({
        // ==================== QUIZ ENDPOINTS ====================
        
        // Tutor Quiz Endpoints
        tutorCreateQuiz: builder.mutation({
            query: (quizData) => ({
                url: 'tutor/create-quiz',
                method: 'POST',
                body: quizData,
            }),
            invalidatesTags: ['Quiz', 'Tutor'],
        }),
        
        tutorGetQuizzes: builder.query({
            query: ({ courseId, page = 1, limit = 10, search = '', filter = '' }) => ({
                url: 'tutor/quizzes',
                params: { courseId, page, limit, search, filter },
            }),
            providesTags: ['Quiz'],
        }),
        
        tutorGetQuizDetails: builder.query({
            query: (quizId) => `tutor/view-quiz/${quizId}`,
            providesTags: ['Quiz'],
        }),
        
        tutorUpdateQuiz: builder.mutation({
            query: ({ quizId, ...data }) => ({
                url: `tutor/update-quiz/${quizId}`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Quiz'],
        }),
        
        tutorDeleteQuiz: builder.mutation({
            query: (quizId) => ({
                url: `tutor/delete-quiz/${quizId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Quiz'],
        }),
        
        tutorPublishQuiz: builder.mutation({
            query: (quizId) => ({
                url: `tutor/publish-quiz/${quizId}`,
                method: 'POST',
            }),
            invalidatesTags: ['Quiz', 'Admin'],
        }),
        
        tutorCheckQuizTitle: builder.query({
            query: (title) => `tutor/check-quiz-title?title=${encodeURIComponent(title)}`,
        }),
        
        // Admin Quiz Endpoints
        adminGetPendingQuizzes: builder.query({
            query: () => 'admin/pending-quizzes',
            providesTags: ['Quiz', 'Admin'],
        }),
        
        adminGetQuizDetails: builder.query({
            query: (quizId) => `admin/quiz-details/${quizId}`,
            providesTags: ['Quiz'],
        }),
        
        adminApproveOrRejectQuiz: builder.mutation({
            query: ({ id, input, reason }) => ({
                url: 'admin/verify-quiz',
                method: 'POST',
                body: { id, input, reason },
            }),
            invalidatesTags: ['Quiz', 'Admin', 'Tutor'],
        }),
        
        adminToggleQuizStatus: builder.mutation({
            query: ({ quizId, tutorId, action }) => ({
                url: 'admin/quiz-status',
                method: 'POST',
                body: { quizId, tutorId, action },
            }),
            invalidatesTags: ['Quiz', 'Admin', 'Tutor'],
        }),
        
        adminDeleteQuiz: builder.mutation({
            query: (quizId) => ({
                url: `admin/delete-quiz/${quizId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Quiz', 'Admin', 'Tutor'],
        }),
        
        adminGetAllQuizzes: builder.query({
            query: ({ page = 1, limit = 10, search = '', filter = '' }) => ({
                url: 'admin/view-quizzes',
                params: { page, limit, search, filter },
            }),
            providesTags: ['Quiz'],
        }),
        
        // User/Student Quiz Endpoints
        userGetQuizzes: builder.query({
            query: () => 'user/quizzes',
            providesTags: ['Quiz', 'User'],
        }),
        
        userGetQuiz: builder.query({
            query: (quizId) => `user/quizzes/${quizId}`,
            providesTags: ['Quiz'],
        }),
        
        userSubmitQuiz: builder.mutation({
            query: ({ quizId, ...data }) => ({
                url: `user/quizzes/${quizId}/submit`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Quiz', 'User'],
        }),
        
        userGetQuizResult: builder.query({
            query: (quizId) => `user/quizzes/${quizId}/result`,
            providesTags: ['Quiz'],
        }),
        
        // ... [Your existing endpoints continue here]
        // Make sure to keep all your existing endpoints after the quiz endpoints
    }),
});

// Export all hooks
export const {
    // Quiz Hooks
    useTutorCreateQuizMutation,
    useTutorGetQuizzesQuery,
    useTutorGetQuizDetailsQuery,
    useTutorUpdateQuizMutation,
    useTutorDeleteQuizMutation,
    useTutorPublishQuizMutation,
    useTutorCheckQuizTitleQuery,
    useAdminGetPendingQuizzesQuery,
    useAdminGetQuizDetailsQuery,
    useAdminApproveOrRejectQuizMutation,
    useAdminToggleQuizStatusMutation,
    useAdminDeleteQuizMutation,
    useAdminGetAllQuizzesQuery,
    useUserGetQuizzesQuery,
    useUserGetQuizQuery,
    useUserSubmitQuizMutation,
    useUserGetQuizResultQuery,
    // ... [Your existing hook exports]
} = apiSlice;

export default apiSlice;
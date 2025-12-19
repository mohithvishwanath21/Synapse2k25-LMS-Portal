import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getAccessToken } from '@/utils/tokenManager'

const baseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/admin`,
  prepareHeaders: (headers) => {
    const token = getAccessToken('admin')
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
    return headers
  }
})

export const adminQuizApi = createApi({
  reducerPath: 'adminQuizApi',
  baseQuery,
  tagTypes: ['QuizApproval'],
  endpoints: (builder) => ({
    // Get pending quizzes
    getPendingQuizzes: builder.query({
      query: () => '/pending-quizzes',
      providesTags: ['QuizApproval']
    }),
    
    // Get quiz details
    getQuizDetails: builder.query({
      query: (quizId) => `/quiz-details/${quizId}`,
      providesTags: ['QuizApproval']
    }),
    
    // Approve/reject quiz
    approveOrRejectQuiz: builder.mutation({
      query: ({ id, input, reason }) => ({
        url: '/verify-quiz',
        method: 'POST',
        body: { id, input, reason }
      }),
      invalidatesTags: ['QuizApproval']
    }),
    
    // Suspend/activate quiz
    toggleQuizStatus: builder.mutation({
      query: ({ quizId, tutorId, action }) => ({
        url: '/quiz-status',
        method: 'POST',
        body: { quizId, tutorId, action }
      }),
      invalidatesTags: ['QuizApproval']
    }),
    
    // Delete quiz (admin)
    deleteQuiz: builder.mutation({
      query: (quizId) => ({
        url: `/delete-quiz/${quizId}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['QuizApproval']
    }),
    
    // View all quizzes
    getAllQuizzes: builder.query({
      query: ({ page = 1, limit = 10, search = '', filter = '' }) => ({
        url: '/view-quizzes',
        params: { page, limit, search, filter }
      }),
      providesTags: ['QuizApproval']
    })
  })
})

export const {
  useGetPendingQuizzesQuery,
  useGetQuizDetailsQuery,
  useApproveOrRejectQuizMutation,
  useToggleQuizStatusMutation,
  useDeleteQuizMutation,
  useGetAllQuizzesQuery
} = adminQuizApi
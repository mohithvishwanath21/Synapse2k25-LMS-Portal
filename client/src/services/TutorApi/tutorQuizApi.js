import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getAccessToken } from '@/utils/tokenManager'

const baseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/tutor`,
  prepareHeaders: (headers) => {
    const token = getAccessToken('tutor')
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
    return headers
  }
})

export const tutorQuizApi = createApi({
  reducerPath: 'tutorQuizApi',
  baseQuery,
  tagTypes: ['Quiz'],
  endpoints: (builder) => ({
    // Create quiz
    createQuiz: builder.mutation({
      query: (quizData) => ({
        url: '/create-quiz',
        method: 'POST',
        body: quizData
      }),
      invalidatesTags: ['Quiz']
    }),
    
    // Get tutor's quizzes
    getTutorQuizzes: builder.query({
      query: ({ courseId, page = 1, limit = 10, search = '', filter = '' }) => ({
        url: '/quizzes',
        params: { courseId, page, limit, search, filter }
      }),
      providesTags: ['Quiz']
    }),
    
    // Get single quiz
    getQuizDetails: builder.query({
      query: (quizId) => `/view-quiz/${quizId}`,
      providesTags: ['Quiz']
    }),
    
    // Update quiz
    updateQuiz: builder.mutation({
      query: ({ quizId, ...data }) => ({
        url: `/update-quiz/${quizId}`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Quiz']
    }),
    
    // Delete quiz
    deleteQuiz: builder.mutation({
      query: (quizId) => ({
        url: `/delete-quiz/${quizId}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Quiz']
    }),
    
    // Submit for approval
    publishQuiz: builder.mutation({
      query: (quizId) => ({
        url: `/publish-quiz/${quizId}`,
        method: 'POST'
      }),
      invalidatesTags: ['Quiz']
    }),
    
    // Check quiz title exists
    checkQuizTitle: builder.query({
      query: (title) => `/check-quiz-title?title=${encodeURIComponent(title)}`
    })
  })
})

export const {
  useCreateQuizMutation,
  useGetTutorQuizzesQuery,
  useGetQuizDetailsQuery,
  useUpdateQuizMutation,
  useDeleteQuizMutation,
  usePublishQuizMutation,
  useCheckQuizTitleQuery
} = tutorQuizApi;
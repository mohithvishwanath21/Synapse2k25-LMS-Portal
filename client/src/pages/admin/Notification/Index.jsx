import React from 'react'
import { NotificationCard } from './components/NotificationCard'
import { useGetPendingQuizzesQuery } from '@/services/AdminApi/adminQuizApi'
import QuizPublishRequests from './components/QuizPublishRequests'

const Index = () => {
  return (
    <div>
      <NotificationCard/>     
    </div>
  )
}

export default Index

import React from 'react'
import { NotificationCard } from './components/NotificationCard'
import { useGetPendingQuizzesQuery } from '@/services/adminApi/adminQuizApi'
import QuizPublishRequests from './components/QuizPublishRequests'

const Index = () => {
  return (
    <div>
      <NotificationCard/>     
    </div>
  )
}

export default Index

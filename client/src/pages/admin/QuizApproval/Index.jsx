import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useGetPendingQuizzesQuery, useGetAllQuizzesQuery } from '@/services/AdminApi/adminQuizApi'
import QuizPublishRequests from '../Notification/components/QuizPublishRequests' // We'll create this
import QuizList from './components/QuizList' // We'll create this
import LoadingSpinner from '@/components/FallbackUI/LoadingSpinner'

const QuizApproval = () => {
  const [activeTab, setActiveTab] = useState("pending")
  
  const { data: pendingQuizzes, isLoading: pendingLoading, refetch: refetchPending } = useGetPendingQuizzesQuery()
  const { data: allQuizzes, isLoading: allLoading, refetch: refetchAll } = useGetAllQuizzesQuery()

  if (pendingLoading || allLoading) return <LoadingSpinner />

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Quiz Management</h1>
        <p className="text-gray-600">Approve and manage quizzes across the platform</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pending">Pending Approval</TabsTrigger>
          <TabsTrigger value="all">All Quizzes</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Quiz Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <QuizPublishRequests 
                quizRequests={pendingQuizzes?.data} 
                refetch={refetchPending}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Quizzes</CardTitle>
            </CardHeader>
            <CardContent>
              <QuizList 
                quizzes={allQuizzes?.data?.quizzes || []} 
                meta={{
                  totalPages: allQuizzes?.data?.totalPages,
                  currentPage: allQuizzes?.data?.currentPage,
                }}
                refetch={refetchAll}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default QuizApproval
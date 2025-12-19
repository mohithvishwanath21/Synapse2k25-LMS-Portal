// import React, { useMemo } from "react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import { useNavigate } from "react-router-dom"
// import { useUserGetQuizzesQuery } from "@/services/apiSlice"
// import LoadingSpinner from "@/components/FallbackUI/LoadingSpinner"
// import { Clock, Calendar, BookOpen, CheckCircle2, XCircle } from "lucide-react"
// import { format } from "date-fns"

// const QuizList = () => {
//   const navigate = useNavigate()
//   const { data, isLoading, refetch, isFetching } = useUserGetQuizzesQuery()
//   const quizzes = useMemo(() => data?.data || [], [data])

//   if (isLoading) return <LoadingSpinner />

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-2xl font-semibold">Course Quizzes</h1>
//           <p className="text-gray-600 text-sm">Attempt quizzes for your enrolled courses.</p>
//         </div>
//         <Button variant="outline" onClick={() => refetch()} disabled={isFetching}>
//           Refresh
//         </Button>
//       </div>

//       {quizzes.length === 0 ? (
//         <Card>
//           <CardContent className="p-6 text-center text-gray-500">
//             No quizzes available yet. Enroll and check back later.
//           </CardContent>
//         </Card>
//       ) : (
//         <div className="grid md:grid-cols-2 gap-4">
//           {quizzes.map((quiz) => (
//             <Card key={quiz._id} className="border hover:shadow-md transition-shadow">
//               <CardHeader className="space-y-1">
//                 <div className="flex items-center gap-2">
//                   <Badge variant="secondary">{quiz.course?.title || "Course"}</Badge>
//                   {quiz.submitted ? (
//                     <Badge className="bg-green-100 text-green-800">Completed</Badge>
//                   ) : (
//                     <Badge className={quiz.canTake ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-600"}>
//                       {quiz.canTake ? "Available" : "Locked"}
//                     </Badge>
//                   )}
//                 </div>
//                 <CardTitle className="text-lg line-clamp-1">{quiz.title}</CardTitle>
//                 <p className="text-sm text-gray-600 line-clamp-2">{quiz.description}</p>
//               </CardHeader>
//               <CardContent className="space-y-3">
//                 <div className="flex flex-wrap gap-3 text-sm text-gray-600">
//                   <span className="flex items-center gap-1">
//                     <BookOpen className="h-4 w-4" /> {quiz.questions?.length || 0} questions
//                   </span>
//                   {quiz.timeLimit && (
//                     <span className="flex items-center gap-1">
//                       <Clock className="h-4 w-4" /> {quiz.timeLimit} min
//                     </span>
//                   )}
//                   {quiz.availableFrom && (
//                     <span className="flex items-center gap-1">
//                       <Calendar className="h-4 w-4" /> Available {format(new Date(quiz.availableFrom), "MMM dd")}
//                     </span>
//                   )}
//                 </div>

//                 <div className="flex items-center justify-between">
//                   {quiz.submitted ? (
//                     <Button variant="secondary" onClick={() => navigate(`/user/profile/quizzes/${quiz._id}/result`)}>
//                       View result
//                     </Button>
//                   ) : (
//                     <Button
//                       onClick={() => navigate(`/user/profile/quizzes/${quiz._id}`)}
//                       disabled={!quiz.canTake}
//                     >
//                       Start quiz
//                     </Button>
//                   )}

//                   {quiz.submitted ? (
//                     <CheckCircle2 className="h-5 w-5 text-green-500" />
//                   ) : quiz.canTake ? (
//                     <CheckCircle2 className="h-5 w-5 text-blue-500" />
//                   ) : (
//                     <XCircle className="h-5 w-5 text-gray-400" />
//                   )}
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       )}
//     </div>
//   )
// }

// export default QuizList
import React, { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { useUserGetQuizzesQuery } from "@/services/apiSlice"
import LoadingSpinner from "@/components/FallbackUI/LoadingSpinner"
import { Clock, Calendar, BookOpen, CheckCircle2, XCircle, RefreshCw, Award } from "lucide-react"
import { format } from "date-fns"

const QuizList = () => {
  const navigate = useNavigate()
  const { data, isLoading, refetch, isFetching } = useUserGetQuizzesQuery()
  const quizzes = useMemo(() => data?.data || [], [data])

  if (isLoading) {
    return (
      <div className="min-h-screen py-8 px-4 bg-gradient-to-br from-rose-200 via-white to-rose-200 flex justify-center items-center">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8 px-4 bg-gradient-to-bl from-rose-200 via-white to-rose-200">
      <div className="container max-w-6xl mx-auto">
        <div className="space-y-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-rose-600 bg-clip-text text-transparent">Course Quizzes</h1>
              <p className="text-gray-600 mt-2">Attempt quizzes for your enrolled courses.</p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => refetch()} 
              disabled={isFetching}
              className="border-gray-300 hover:bg-gray-50 text-gray-700"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isFetching ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>

          {quizzes.length === 0 ? (
            <Card className="bg-white/80 backdrop-blur-sm border border-gray-200 shadow-sm">
              <CardContent className="p-8 text-center">
                <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <BookOpen className="h-8 w-8 text-gray-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No Quizzes Available</h3>
                <p className="text-gray-600 mb-6">No quizzes available yet. Enroll and check back later.</p>
                <Button 
                  onClick={() => navigate('/explore')}
                  className="bg-gray-800 hover:bg-gray-900 text-white"
                >
                  Browse Courses
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {quizzes.map((quiz) => (
                <Card key={quiz._id} className="border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md transition-all duration-300 bg-white">
                  <CardHeader className="space-y-3 pb-3">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-gray-800 text-white border-0">
                        {quiz.course?.title || "Course"}
                      </Badge>
                      {quiz.submitted ? (
                        <Badge className="bg-green-50 text-green-700 border border-green-200">Completed</Badge>
                      ) : (
                        <Badge className={quiz.canTake ? "bg-blue-50 text-blue-700 border border-blue-200" : "bg-gray-100 text-gray-600 border border-gray-300"}>
                          {quiz.canTake ? "Available" : "Locked"}
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-800 line-clamp-1">{quiz.title}</CardTitle>
                    <p className="text-sm text-gray-600 line-clamp-2">{quiz.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                      <span className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 bg-gray-50">
                        <BookOpen className="h-4 w-4" /> {quiz.questions?.length || 0} questions
                      </span>
                      {quiz.timeLimit && (
                        <span className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 bg-gray-50">
                          <Clock className="h-4 w-4" /> {quiz.timeLimit} min
                        </span>
                      )}
                      {quiz.availableFrom && (
                        <span className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 bg-gray-50">
                          <Calendar className="h-4 w-4" /> {format(new Date(quiz.availableFrom), "MMM dd")}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      {quiz.submitted ? (
                        <Button 
                          onClick={() => navigate(`/user/profile/quizzes/${quiz._id}/result`)}
                          className="bg-gray-800 hover:bg-gray-900 text-white flex items-center gap-2"
                        >
                          <Award className="h-4 w-4" />
                          View Score
                        </Button>
                      ) : (
                        <Button
                          onClick={() => navigate(`/user/profile/quizzes/${quiz._id}`)}
                          disabled={!quiz.canTake}
                          className={`${
                            quiz.canTake 
                              ? "bg-gray-800 hover:bg-gray-900 text-white" 
                              : "bg-gray-200 text-gray-500 cursor-not-allowed"
                          }`}
                        >
                          Start Quiz
                        </Button>
                      )}

                      {quiz.submitted ? (
                        <CheckCircle2 className="h-6 w-6 text-green-600" />
                      ) : quiz.canTake ? (
                        <CheckCircle2 className="h-6 w-6 text-blue-600" />
                      ) : (
                        <XCircle className="h-6 w-6 text-gray-400" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default QuizList
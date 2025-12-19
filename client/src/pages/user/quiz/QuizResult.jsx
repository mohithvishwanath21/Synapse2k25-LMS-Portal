// import { useParams, useNavigate } from "react-router-dom"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import { Progress } from "@/components/ui/progress"
// import { Separator } from "@/components/ui/separator"
// import { CheckCircle2, XCircle, ArrowLeft } from "lucide-react"
// import LoadingSpinner from "@/components/FallbackUI/LoadingSpinner"
// import { useUserGetQuizResultQuery } from "@/services/apiSlice"

// const QuizResult = () => {
//   const { quizId } = useParams()
//   const navigate = useNavigate()
//   const { data, isLoading } = useUserGetQuizResultQuery(quizId)
//   const result = data?.data

//   if (isLoading || !result) return <LoadingSpinner />

//   const percentage = result.totalPossibleScore
//     ? Math.round((result.score / result.totalPossibleScore) * 100)
//     : 0

//   return (
//     <div className="space-y-4">
//       <div className="flex items-center justify-between">
//         <Button variant="ghost" onClick={() => navigate('/user/profile/quizzes')} className="flex items-center gap-2">
//           <ArrowLeft className="h-4 w-4" /> Back
//         </Button>
//         <Badge variant={percentage >= 60 ? "secondary" : "destructive"}>
//           Score {percentage}%
//         </Badge>
//       </div>

//       <Card>
//         <CardHeader className="flex items-center justify-between">
//           <div>
//             <CardTitle>{result.quizTitle}</CardTitle>
//             <p className="text-sm text-gray-600">{result.courseTitle}</p>
//           </div>
//           <div className="flex items-center gap-3">
//             <Badge>Score {result.score}/{result.totalPossibleScore}</Badge>
//             {result.timeTaken ? <Badge variant="outline">{Math.round(result.timeTaken / 60)} min</Badge> : null}
//           </div>
//         </CardHeader>
//         <CardContent className="space-y-5">
//           <Progress value={percentage} className="w-full" />
//           <div className="grid md:grid-cols-2 gap-4">
//             {result.questions?.map((question, idx) => (
//               <Card key={idx} className="border border-dashed">
//                 <CardContent className="pt-4 space-y-2">
//                   <div className="flex items-start gap-2">
//                     {question.studentAnswer?.isCorrect ? (
//                       <CheckCircle2 className="h-5 w-5 text-green-500" />
//                     ) : (
//                       <XCircle className="h-5 w-5 text-red-500" />
//                     )}
//                     <div>
//                       <p className="font-medium">Q{idx + 1}. {question.questionText}</p>
//                       <p className="text-xs text-gray-500">{question.points || 1} pts • {question.type}</p>
//                     </div>
//                   </div>
//                   <div className="text-sm space-y-1">
//                     <p className="text-gray-700">
//                       Your answer:{" "}
//                       {question.type === "text"
//                         ? (question.studentAnswer?.textAnswer || "—")
//                         : question.studentAnswer?.selectedOptionText?.length
//                           ? question.studentAnswer.selectedOptionText.join(", ")
//                           : "—"}
//                     </p>
//                     <p className="text-gray-700">
//                       Correct:{" "}
//                       {Array.isArray(question.correctAnswers)
//                         ? question.correctAnswers.join(", ")
//                         : "—"}
//                     </p>
//                     {question.explanation ? (
//                       <p className="text-xs text-gray-500">Why: {question.explanation}</p>
//                     ) : null}
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }

// export default QuizResult

import { useParams, useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { CheckCircle2, XCircle, ArrowLeft, Award, Clock, BarChart3, Trophy, Target } from "lucide-react"
import LoadingSpinner from "@/components/FallbackUI/LoadingSpinner"
import { useUserGetQuizResultQuery } from "@/services/apiSlice"

const QuizResult = () => {
  const { quizId } = useParams()
  const navigate = useNavigate()
  const { data, isLoading } = useUserGetQuizResultQuery(quizId)
  const result = data?.data

  if (isLoading || !result) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-rose-200 via-white to-rose-200">
        <LoadingSpinner />
      </div>
    )
  }

  const percentage = result.totalPossibleScore
    ? Math.round((result.score / result.totalPossibleScore) * 100)
    : 0

  const getScoreColor = (percentage) => {
    if (percentage >= 80) return "text-green-600"
    if (percentage >= 60) return "text-amber-600"
    return "text-rose-600"
  }

  const getPerformanceMessage = (percentage) => {
    if (percentage >= 90) return "Outstanding Performance! 🎉"
    if (percentage >= 80) return "Excellent Work! 👍"
    if (percentage >= 70) return "Good Job! 👏"
    if (percentage >= 60) return "You Passed! ✅"
    if (percentage >= 50) return "Needs Improvement 📚"
    return "Keep Practicing! 💪"
  }

  const correctAnswers = result.questions?.filter(q => q.studentAnswer?.isCorrect).length || 0
  const incorrectAnswers = result.questions?.filter(q => !q.studentAnswer?.isCorrect).length || 0

  return (
    <div className="min-h-screen py-8 px-4 bg-gradient-to-br from-rose-200 via-white to-rose-200">
      <div className="container max-w-6xl mx-auto">
        <div className="space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <Button 
              variant="outline" 
              onClick={() => navigate('/user/profile/quizzes')} 
              className="flex items-center gap-2 border-gray-300 hover:bg-gray-50"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Quizzes
            </Button>
            
            <div className="text-center">
              <div className={`text-5xl font-bold ${getScoreColor(percentage)}`}>
                {percentage}%
              </div>
              <Badge className="mt-2 bg-gray-800 text-white">
                <Trophy className="h-3 w-3 mr-1" />
                Final Score
              </Badge>
            </div>
          </div>

          {/* Main Result Card */}
          <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
            <CardHeader className="pb-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-3">
                  <CardTitle className="text-2xl font-bold text-gray-800">{result.quizTitle}</CardTitle>
                  <p className="text-gray-600">{result.courseTitle}</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="border-gray-300">
                      <Award className="h-3 w-3 mr-1" /> 
                      {result.score}/{result.totalPossibleScore} points
                    </Badge>
                    {result.timeTaken && (
                      <Badge variant="outline" className="border-gray-300">
                        <Clock className="h-3 w-3 mr-1" /> 
                        {Math.round(result.timeTaken / 60)} min
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-gray-700 font-medium">{getPerformanceMessage(percentage)}</p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-8">
              {/* Progress and Stats */}
              <div className="space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">Overall Progress</span>
                    <span className="font-bold text-gray-800">{percentage}%</span>
                  </div>
                  <Progress 
                    value={percentage} 
                    className="h-3 bg-gray-100"
                  />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="border border-gray-200 rounded-lg p-4 text-center bg-white">
                    <div className="text-2xl font-bold text-gray-800">{result.score}</div>
                    <div className="text-sm text-gray-600">Points Earned</div>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4 text-center bg-white">
                    <div className="text-2xl font-bold text-gray-800">{result.totalPossibleScore}</div>
                    <div className="text-sm text-gray-600">Total Points</div>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4 text-center bg-white">
                    <div className="text-2xl font-bold text-gray-800">{correctAnswers}</div>
                    <div className="text-sm text-gray-600">Correct</div>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4 text-center bg-white">
                    <div className="text-2xl font-bold text-gray-800">{incorrectAnswers}</div>
                    <div className="text-sm text-gray-600">Incorrect</div>
                  </div>
                </div>
              </div>

              <Separator className="my-4" />

              {/* Questions Review */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-gray-700" />
                  Question Review
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {result.questions?.map((question, idx) => (
                    <Card 
                      key={idx} 
                      className={`border ${
                        question.studentAnswer?.isCorrect 
                          ? 'border-green-200' 
                          : 'border-rose-200'
                      } bg-white`}
                    >
                      <CardContent className="pt-6 space-y-4">
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-full ${
                            question.studentAnswer?.isCorrect 
                              ? 'bg-green-50 text-green-600' 
                              : 'bg-rose-50 text-rose-600'
                          }`}>
                            {question.studentAnswer?.isCorrect ? (
                              <CheckCircle2 className="h-5 w-5" />
                            ) : (
                              <XCircle className="h-5 w-5" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-2">
                              <Badge variant="outline" className="border-gray-300">Q{idx + 1}</Badge>
                              <Badge variant="outline" className="border-gray-300">
                                {question.points || 1} pts
                              </Badge>
                            </div>
                            <p className="font-medium text-gray-800 mb-2">{question.questionText}</p>
                            <p className="text-xs text-gray-500">{question.type}</p>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="border border-gray-200 rounded-lg p-3 bg-gray-50">
                            <div className="text-sm font-medium text-gray-600 mb-1">Your Answer</div>
                            <div className={`font-medium ${
                              question.studentAnswer?.isCorrect ? 'text-green-700' : 'text-rose-700'
                            }`}>
                              {question.type === "text"
                                ? (question.studentAnswer?.textAnswer || "—")
                                : question.studentAnswer?.selectedOptionText?.length
                                  ? question.studentAnswer.selectedOptionText.join(", ")
                                  : "—"}
                            </div>
                          </div>

                          {!question.studentAnswer?.isCorrect && (
                            <div className="border border-gray-200 rounded-lg p-3 bg-gray-50">
                              <div className="text-sm font-medium text-gray-600 mb-1">Correct Answer</div>
                              <div className="font-medium text-gray-800">
                                {Array.isArray(question.correctAnswers)
                                  ? question.correctAnswers.join(", ")
                                  : "—"}
                              </div>
                            </div>
                          )}

                          {question.explanation && (
                            <div className="border border-gray-200 rounded-lg p-3 bg-gray-50">
                              <div className="text-sm font-medium text-gray-600 mb-1">Explanation</div>
                              <div className="text-sm text-gray-700">{question.explanation}</div>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-100">
                <Button
                  variant="outline"
                  onClick={() => navigate('/user/profile/quizzes')}
                  className="flex-1 border-gray-300 hover:bg-gray-50"
                >
                  Back to Quizzes
                </Button>
                <Button
                  className="flex-1 bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-700 hover:to-rose-700 text-white"
                  onClick={() => navigate('/user/profile/quizzes')}
                >
                  Try Another Quiz
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default QuizResult
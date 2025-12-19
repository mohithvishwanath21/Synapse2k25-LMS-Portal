// import { useEffect, useMemo, useRef, useState } from "react"
// import { useNavigate, useParams } from "react-router-dom"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Progress } from "@/components/ui/progress"
// import { Checkbox } from "@/components/ui/checkbox"
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
// import { Input } from "@/components/ui/input"
// import { Separator } from "@/components/ui/separator"
// import { Clock, ArrowLeft } from "lucide-react"
// import { useUserGetQuizQuery, useUserSubmitQuizMutation } from "@/services/apiSlice"
// import LoadingSpinner from "@/components/FallbackUI/LoadingSpinner"
// import { toast } from "sonner"

// const TakeQuiz = () => {
//   const { quizId } = useParams()
//   const navigate = useNavigate()
//   const { data, isLoading } = useUserGetQuizQuery(quizId)
//   const quiz = data?.data

//   const [answers, setAnswers] = useState({})
//   const [remainingSeconds, setRemainingSeconds] = useState(null)
//   const [submitQuiz, { isLoading: submitting }] = useUserSubmitQuizMutation()
//   const submittedRef = useRef(false)

//   useEffect(() => {
//     if (quiz?.hasSubmitted) {
//       navigate(`/user/profile/quizzes/${quizId}/result`)
//     }
//     if (quiz?.timeLimit) {
//       setRemainingSeconds(quiz.timeLimit * 60)
//     }
//   }, [quiz, quizId, navigate])

//   useEffect(() => {
//     if (!quiz?.timeLimit) return
//     const timer = setInterval(() => {
//       setRemainingSeconds((prev) => {
//         if (prev === null) return prev
//         if (prev <= 1) {
//           clearInterval(timer)
//           handleSubmit(true)
//           return 0
//         }
//         return prev - 1
//       })
//     }, 1000)
//     return () => clearInterval(timer)
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [quiz?.timeLimit])

//   const remainingLabel = useMemo(() => {
//     if (remainingSeconds === null) return null
//     const mins = Math.floor(remainingSeconds / 60)
//     const secs = remainingSeconds % 60
//     return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
//   }, [remainingSeconds])

//   const handleOptionSelect = (questionId, optionId, isMultiple) => {
//     setAnswers((prev) => {
//       const current = prev[questionId]?.selectedOptions || []
//       const updated = isMultiple
//         ? current.includes(optionId)
//           ? current.filter((id) => id !== optionId)
//           : [...current, optionId]
//         : [optionId]
//       return { ...prev, [questionId]: { ...prev[questionId], selectedOptions: updated } }
//     })
//   }

//   const handleTextAnswer = (questionId, value) => {
//     setAnswers((prev) => ({ ...prev, [questionId]: { ...prev[questionId], textAnswer: value } }))
//   }

//   const unanswered = useMemo(() => {
//     if (!quiz?.questions) return 0
//     return quiz.questions.filter((q) => {
//       const current = answers[q._id]
//       if (q.type === "text") {
//         return !current?.textAnswer
//       }
//       return !(current?.selectedOptions?.length > 0)
//     }).length
//   }, [quiz, answers])

//   const handleSubmit = async (auto = false) => {
//     if (submittedRef.current || !quiz) return
//     submittedRef.current = true
//     const payload = {
//       quizId,
//       answers: quiz.questions.map((q) => ({
//         questionId: q._id,
//         selectedOptions: answers[q._id]?.selectedOptions || [],
//         textAnswer: answers[q._id]?.textAnswer || ""
//       })),
//       timeTaken: quiz.timeLimit ? (quiz.timeLimit * 60 - (remainingSeconds || 0)) : null
//     }
//     const toastId = toast.loading(auto ? "Time's up, submitting..." : "Submitting quiz...")
//     try {
//       await submitQuiz(payload).unwrap()
//       toast.success("Quiz submitted", { id: toastId })
//       navigate(`/user/profile/quizzes/${quizId}/result`, { replace: true })
//     } catch (error) {
//       submittedRef.current = false
//       toast.error(error?.data?.message || "Submit failed", { id: toastId })
//     }
//   }

//   if (isLoading || !quiz) return <LoadingSpinner />

//   return (
//     <div className="space-y-4">
//       <div className="flex items-center justify-between">
//         <Button variant="ghost" onClick={() => navigate(-1)} className="flex items-center gap-2">
//           <ArrowLeft className="h-4 w-4" /> Back
//         </Button>
//         {quiz.timeLimit && (
//           <Badge variant={remainingSeconds > 60 ? "secondary" : "destructive"} className="flex items-center gap-2">
//             <Clock className="h-4 w-4" /> {remainingLabel}
//           </Badge>
//         )}
//       </div>

//       <Card>
//         <CardHeader>
//           <div className="flex items-center justify-between">
//             <div>
//               <CardTitle>{quiz.title}</CardTitle>
//               <p className="text-sm text-gray-600">{quiz.description}</p>
//             </div>
//             <Badge variant="outline">{quiz.course?.title || "Course quiz"}</Badge>
//           </div>
//         </CardHeader>
//         <CardContent className="space-y-6">
//           {quiz.questions?.map((question, index) => {
//             const isMultiple = question.type === "multiple"
//             const current = answers[question._id] || { selectedOptions: [], textAnswer: "" }

//             return (
//               <div key={question._id} className="space-y-3">
//                 <div className="flex items-start gap-2">
//                   <Badge variant="secondary">Q{index + 1}</Badge>
//                   <div className="space-y-1">
//                     <p className="font-medium">{question.questionText}</p>
//                     <p className="text-xs text-gray-500">
//                       {question.type === "text" ? "Text answer" : isMultiple ? "Select all correct" : "Single choice"}
//                       {" • "} {question.points || 1} pts
//                     </p>
//                   </div>
//                 </div>

//                 {question.type === "text" ? (
//                   <Input
//                     placeholder="Type your answer"
//                     value={current.textAnswer}
//                     onChange={(e) => handleTextAnswer(question._id, e.target.value)}
//                   />
//                 ) : isMultiple ? (
//                   <div className="space-y-2">
//                     {question.options?.map((opt) => (
//                       <label key={opt._id} className="flex items-center gap-3 p-3 rounded border hover:bg-gray-50 cursor-pointer">
//                         <Checkbox
//                           checked={current.selectedOptions?.includes(opt._id)}
//                           onCheckedChange={() => handleOptionSelect(question._id, opt._id, true)}
//                         />
//                         <span>{opt.text}</span>
//                       </label>
//                     ))}
//                   </div>
//                 ) : (
//                   <RadioGroup
//                     value={current.selectedOptions?.[0]}
//                     onValueChange={(val) => handleOptionSelect(question._id, val, false)}
//                     className="space-y-2"
//                   >
//                     {question.options?.map((opt) => (
//                       <label key={opt._id} className="flex items-center gap-3 p-3 rounded border hover:bg-gray-50 cursor-pointer">
//                         <RadioGroupItem value={opt._id} />
//                         <span>{opt.text}</span>
//                       </label>
//                     ))}
//                   </RadioGroup>
//                 )}

//                 <Separator className="my-2" />
//               </div>
//             )
//           })}

//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3 text-sm text-gray-600">
//               {quiz.questions?.length ? (
//                 <>
//                   <Progress value={((quiz.questions.length - unanswered) / quiz.questions.length) * 100} className="w-48" />
//                   <span>{quiz.questions.length - unanswered}/{quiz.questions.length} answered</span>
//                 </>
//               ) : null}
//             </div>
//             <Button onClick={() => handleSubmit(false)} disabled={submitting || unanswered > 0}>
//               {unanswered > 0 ? `${unanswered} left` : "Submit quiz"}
//             </Button>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }

// export default TakeQuiz

import { useEffect, useMemo, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Clock, ArrowLeft } from "lucide-react"
import { useUserGetQuizQuery, useUserSubmitQuizMutation } from "@/services/apiSlice"
import LoadingSpinner from "@/components/FallbackUI/LoadingSpinner"
import { toast } from "sonner"

const TakeQuiz = () => {
  const { quizId } = useParams()
  const navigate = useNavigate()
  const { data, isLoading } = useUserGetQuizQuery(quizId)
  const quiz = data?.data

  const [answers, setAnswers] = useState({})
  const [remainingSeconds, setRemainingSeconds] = useState(null)
  const [submitQuiz, { isLoading: submitting }] = useUserSubmitQuizMutation()
  const submittedRef = useRef(false)

  useEffect(() => {
    if (quiz?.hasSubmitted) {
      navigate(`/user/profile/quizzes/${quizId}/result`)
    }
    if (quiz?.timeLimit) {
      setRemainingSeconds(quiz.timeLimit * 60)
    }
  }, [quiz, quizId, navigate])

  useEffect(() => {
    if (!quiz?.timeLimit) return
    const timer = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev === null) return prev
        if (prev <= 1) {
          clearInterval(timer)
          handleSubmit(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quiz?.timeLimit])

  const remainingLabel = useMemo(() => {
    if (remainingSeconds === null) return null
    const mins = Math.floor(remainingSeconds / 60)
    const secs = remainingSeconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }, [remainingSeconds])

  const handleOptionSelect = (questionId, optionId, isMultiple) => {
    setAnswers((prev) => {
      const current = prev[questionId]?.selectedOptions || []
      const updated = isMultiple
        ? current.includes(optionId)
          ? current.filter((id) => id !== optionId)
          : [...current, optionId]
        : [optionId]
      return { ...prev, [questionId]: { ...prev[questionId], selectedOptions: updated } }
    })
  }

  const handleTextAnswer = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: { ...prev[questionId], textAnswer: value } }))
  }

  const unanswered = useMemo(() => {
    if (!quiz?.questions) return 0
    return quiz.questions.filter((q) => {
      const current = answers[q._id]
      if (q.type === "text") {
        return !current?.textAnswer
      }
      return !(current?.selectedOptions?.length > 0)
    }).length
  }, [quiz, answers])

  const handleSubmit = async (auto = false) => {
    if (submittedRef.current || !quiz) return
    submittedRef.current = true
    const payload = {
      quizId,
      answers: quiz.questions.map((q) => ({
        questionId: q._id,
        selectedOptions: answers[q._id]?.selectedOptions || [],
        textAnswer: answers[q._id]?.textAnswer || ""
      })),
      timeTaken: quiz.timeLimit ? (quiz.timeLimit * 60 - (remainingSeconds || 0)) : null
    }
    const toastId = toast.loading(auto ? "Time's up, submitting..." : "Submitting quiz...")
    try {
      await submitQuiz(payload).unwrap()
      toast.success("Quiz submitted", { id: toastId })
      navigate(`/user/profile/quizzes/${quizId}/result`, { replace: true })
    } catch (error) {
      submittedRef.current = false
      toast.error(error?.data?.message || "Submit failed", { id: toastId })
    }
  }

  if (isLoading || !quiz) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-rose-200 via-white to-rose-200">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8 px-4 bg-gradient-to-br from-rose-200 via-white to-rose-200">
      <div className="container max-w-4xl mx-auto">
        <div className="space-y-6">
          <div className="flex items-center justify-between mb-6">
            <Button 
              variant="outline" 
              onClick={() => navigate(-1)} 
              className="flex items-center gap-2 border-gray-300 hover:bg-gray-50"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
            {quiz.timeLimit && (
              <Badge variant={remainingSeconds > 60 ? "secondary" : "destructive"} className="flex items-center gap-2 px-4 py-2">
                <Clock className="h-4 w-4" /> {remainingLabel}
              </Badge>
            )}
          </div>

          <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-2">
                  <CardTitle className="text-2xl font-bold text-gray-800">{quiz.title}</CardTitle>
                  <p className="text-gray-600">{quiz.description}</p>
                </div>
                <Badge className="bg-gradient-to-r from-amber-500 to-rose-500 text-white border-0 px-4 py-2">
                  {quiz.course?.title || "Course Quiz"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-8">
              {quiz.questions?.map((question, index) => {
                const isMultiple = question.type === "multiple"
                const current = answers[question._id] || { selectedOptions: [], textAnswer: "" }

                return (
                  <div key={question._id} className="space-y-4 p-4 rounded-lg border border-gray-100 bg-white">
                    <div className="flex items-start gap-3">
                      <Badge className="bg-gray-800 text-white">Q{index + 1}</Badge>
                      <div className="space-y-2 flex-1">
                        <p className="font-medium text-lg text-gray-800">{question.questionText}</p>
                        <div className="flex items-center gap-3 text-sm text-gray-500">
                          <span className="px-3 py-1 bg-gray-100 rounded-full">
                            {question.type === "text" ? "Text Answer" : isMultiple ? "Multiple Choice" : "Single Choice"}
                          </span>
                          <span className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full font-medium">
                            {question.points || 1} points
                          </span>
                        </div>
                      </div>
                    </div>

                    {question.type === "text" ? (
                      <div className="mt-4">
                        <Input
                          placeholder="Type your answer here..."
                          value={current.textAnswer}
                          onChange={(e) => handleTextAnswer(question._id, e.target.value)}
                          className="border-gray-300 focus:border-gray-400 h-12"
                        />
                      </div>
                    ) : isMultiple ? (
                      <div className="mt-4 space-y-2">
                        {question.options?.map((opt) => (
                          <label 
                            key={opt._id} 
                            className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 cursor-pointer transition-all"
                          >
                            <Checkbox
                              checked={current.selectedOptions?.includes(opt._id)}
                              onCheckedChange={() => handleOptionSelect(question._id, opt._id, true)}
                              className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-amber-600 data-[state=checked]:to-rose-600"
                            />
                            <span className="text-gray-700">{opt.text}</span>
                          </label>
                        ))}
                      </div>
                    ) : (
                      <RadioGroup
                        value={current.selectedOptions?.[0]}
                        onValueChange={(val) => handleOptionSelect(question._id, val, false)}
                        className="mt-4 space-y-2"
                      >
                        {question.options?.map((opt) => (
                          <label 
                            key={opt._id} 
                            className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 cursor-pointer transition-all"
                          >
                            <RadioGroupItem 
                              value={opt._id} 
                              className="data-[state=checked]:border-amber-600 data-[state=checked]:text-amber-600"
                            />
                            <span className="text-gray-700">{opt.text}</span>
                          </label>
                        ))}
                      </RadioGroup>
                    )}

                    <Separator className="my-4" />
                  </div>
                )
              })}

              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-gray-100">
                <div className="flex items-center gap-4 text-gray-700">
                  {quiz.questions?.length ? (
                    <>
                      <div className="w-48">
                        <Progress 
                          value={((quiz.questions.length - unanswered) / quiz.questions.length) * 100} 
                          className="h-2 bg-gray-100"
                        />
                      </div>
                      <span className="font-medium">
                        {quiz.questions.length - unanswered} of {quiz.questions.length} answered
                      </span>
                    </>
                  ) : null}
                </div>
                <Button 
                  onClick={() => handleSubmit(false)} 
                  disabled={submitting || unanswered > 0}
                  className={`${
                    unanswered > 0 
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed" 
                      : "bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-700 hover:to-rose-700 text-white"
                  } px-8 py-3 text-base font-medium`}
                >
                  {submitting ? "Submitting..." : unanswered > 0 ? `${unanswered} questions left` : "Submit Quiz"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default TakeQuiz
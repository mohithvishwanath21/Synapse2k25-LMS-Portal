import { useEffect, useMemo, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash, CheckCircle2 } from "lucide-react"

const emptyQuestion = () => ({
  questionText: "",
  type: "single",
  points: 1,
  options: [
    { text: "", isCorrect: true },
    { text: "", isCorrect: false }
  ],
  correctTextAnswers: [""],
  explanation: ""
})

const QuizFormDrawer = ({ open, onClose, onSubmit, initialData, courses }) => {
  const [quizData, setQuizData] = useState({
    title: "",
    description: "",
    course: "",
    timeLimit: "",
    availableFrom: "",
    availableTo: "",
    questions: [emptyQuestion()]
  })

  useEffect(() => {
    if (initialData?._id) {
      const formatted = {
        title: initialData.title || "",
        description: initialData.description || "",
        course: initialData.course?._id || initialData.course || "",
        timeLimit: initialData.timeLimit || "",
        availableFrom: initialData.availableFrom ? new Date(initialData.availableFrom).toISOString().slice(0, 16) : "",
        availableTo: initialData.availableTo ? new Date(initialData.availableTo).toISOString().slice(0, 16) : "",
        questions: initialData.questions?.length ? initialData.questions.map((q) => ({
          ...q,
          correctTextAnswers: q.correctTextAnswers?.length ? q.correctTextAnswers : [""],
          options: q.options?.length ? q.options : [
            { text: "", isCorrect: true },
            { text: "", isCorrect: false }
          ]
        })) : [emptyQuestion()]
      }
      setQuizData(formatted)
    } else {
      setQuizData({
        title: "",
        description: "",
        course: courses?.[0]?._id || "",
        timeLimit: "",
        availableFrom: "",
        availableTo: "",
        questions: [emptyQuestion()]
      })
    }
  }, [initialData, courses])

  const handleQuestionChange = (index, key, value) => {
    setQuizData((prev) => {
      const updated = [...prev.questions]
      updated[index] = { ...updated[index], [key]: value }
      return { ...prev, questions: updated }
    })
  }

  const handleOptionChange = (qIndex, optIndex, key, value) => {
    setQuizData((prev) => {
      const updated = [...prev.questions]
      const options = [...updated[qIndex].options]
      options[optIndex] = { ...options[optIndex], [key]: value }
      // ensure at least one correct for single/multiple
      if (key === "isCorrect" && value && updated[qIndex].type === "single") {
        options.forEach((opt, idx) => {
          if (idx !== optIndex) opt.isCorrect = false
        })
      }
      updated[qIndex].options = options
      return { ...prev, questions: updated }
    })
  }

  const handleTextAnswerChange = (qIndex, idx, value) => {
    setQuizData((prev) => {
      const updated = [...prev.questions]
      const answers = [...updated[qIndex].correctTextAnswers]
      answers[idx] = value
      updated[qIndex].correctTextAnswers = answers
      return { ...prev, questions: updated }
    })
  }

  const addOption = (qIndex) => {
    setQuizData((prev) => {
      const updated = [...prev.questions]
      updated[qIndex].options = [...updated[qIndex].options, { text: "", isCorrect: false }]
      return { ...prev, questions: updated }
    })
  }

  const addTextAnswer = (qIndex) => {
    setQuizData((prev) => {
      const updated = [...prev.questions]
      updated[qIndex].correctTextAnswers = [...updated[qIndex].correctTextAnswers, ""]
      return { ...prev, questions: updated }
    })
  }

  const addQuestion = () => {
    setQuizData((prev) => ({ ...prev, questions: [...prev.questions, emptyQuestion()] }))
  }

  const removeQuestion = (index) => {
    setQuizData((prev) => {
      if (prev.questions.length === 1) return prev
      const updated = [...prev.questions]
      updated.splice(index, 1)
      return { ...prev, questions: updated }
    })
  }

  const isValid = useMemo(() => {
    if (!quizData.title?.trim() || !quizData.description?.trim() || !quizData.course) return false
    return quizData.questions.every((q) => {
      if (!q.questionText?.trim()) return false
      if (q.type === "text") {
        return q.correctTextAnswers.some((a) => a?.trim())
      }
      const hasCorrect = q.options.some((o) => o.isCorrect)
      const hasOptionTexts = q.options.every((o) => o.text?.trim())
      return hasCorrect && hasOptionTexts
    })
  }, [quizData])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!isValid) return
    const payload = {
      ...quizData,
      timeLimit: quizData.timeLimit ? Number(quizData.timeLimit) : null,
      availableFrom: quizData.availableFrom || null,
      availableTo: quizData.availableTo || null,
      questions: quizData.questions.map((q) => ({
        questionText: q.questionText,
        type: q.type,
        points: Number(q.points) || 1,
        explanation: q.explanation,
        options: q.type === "text" ? [] : q.options.map((o) => ({
          text: o.text,
          isCorrect: !!o.isCorrect,
          _id: o._id
        })),
        correctTextAnswers: q.type === "text" ? q.correctTextAnswers.filter((a) => a?.trim()) : [],
      }))
    }
    onSubmit(payload)
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{initialData?._id ? "Update Quiz" : "Create Quiz"}</DialogTitle>
          <DialogDescription>
            Build questions, set timing and availability. You can submit for approval after saving.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                value={quizData.title}
                onChange={(e) => setQuizData((p) => ({ ...p, title: e.target.value }))}
                placeholder="Quiz title"
              />
            </div>
            <div className="space-y-2">
              <Label>Course</Label>
              <Select
                value={quizData.course}
                onValueChange={(val) => setQuizData((p) => ({ ...p, course: val }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select course" />
                </SelectTrigger>
                <SelectContent>
                  {courses?.map((course) => (
                    <SelectItem key={course._id} value={course._id}>
                      {course.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                rows={2}
                value={quizData.description}
                onChange={(e) => setQuizData((p) => ({ ...p, description: e.target.value }))}
                placeholder="Short description for students"
              />
            </div>
            <div className="space-y-2">
              <Label>Time Limit (minutes)</Label>
              <Input
                type="number"
                min={0}
                value={quizData.timeLimit}
                onChange={(e) => setQuizData((p) => ({ ...p, timeLimit: e.target.value }))}
                placeholder="e.g. 30"
              />
            </div>
            <div className="space-y-2">
              <Label>Available From</Label>
              <Input
                type="datetime-local"
                value={quizData.availableFrom}
                onChange={(e) => setQuizData((p) => ({ ...p, availableFrom: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label>Available To</Label>
              <Input
                type="datetime-local"
                value={quizData.availableTo}
                onChange={(e) => setQuizData((p) => ({ ...p, availableTo: e.target.value }))}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg">Questions</h3>
              <Button type="button" variant="outline" size="sm" onClick={addQuestion}>
                <Plus className="h-4 w-4 mr-1" /> Add Question
              </Button>
            </div>

            <div className="space-y-4">
              {quizData.questions.map((question, qIndex) => (
                <Card key={qIndex} className="border border-dashed">
                  <CardContent className="space-y-4 pt-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">Q{qIndex + 1}</Badge>
                        <Input
                          value={question.questionText}
                          onChange={(e) => handleQuestionChange(qIndex, "questionText", e.target.value)}
                          placeholder="Question text"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <Select
                          value={question.type}
                          onValueChange={(val) => handleQuestionChange(qIndex, "type", val)}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="single">Single choice</SelectItem>
                            <SelectItem value="multiple">Multiple choice</SelectItem>
                            <SelectItem value="text">Text</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input
                          type="number"
                          className="w-24"
                          min={1}
                          value={question.points}
                          onChange={(e) => handleQuestionChange(qIndex, "points", e.target.value)}
                          placeholder="Points"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeQuestion(qIndex)}
                          disabled={quizData.questions.length === 1}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {question.type === "text" ? (
                      <div className="space-y-2">
                        <Label>Accepted Answers</Label>
                        {question.correctTextAnswers.map((ans, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <Input
                              value={ans}
                              onChange={(e) => handleTextAnswerChange(qIndex, idx, e.target.value)}
                              placeholder="Answer"
                            />
                            {question.correctTextAnswers.length > 1 && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                  setQuizData((prev) => {
                                    const updated = [...prev.questions]
                                    const answers = [...updated[qIndex].correctTextAnswers]
                                    answers.splice(idx, 1)
                                    updated[qIndex].correctTextAnswers = answers.length ? answers : [""]
                                    return { ...prev, questions: updated }
                                  })
                                }}
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        ))}
                        <Button type="button" variant="outline" size="sm" onClick={() => addTextAnswer(qIndex)}>
                          <Plus className="h-4 w-4 mr-1" /> Add accepted answer
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Label>Options</Label>
                        <div className="space-y-2">
                          {question.options.map((opt, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <Button
                                type="button"
                                variant={opt.isCorrect ? "default" : "outline"}
                                size="icon"
                                onClick={() => handleOptionChange(qIndex, idx, "isCorrect", !opt.isCorrect)}
                                className="shrink-0"
                              >
                                <CheckCircle2 className="h-4 w-4" />
                              </Button>
                              <Input
                                value={opt.text}
                                onChange={(e) => handleOptionChange(qIndex, idx, "text", e.target.value)}
                                placeholder={`Option ${idx + 1}`}
                              />
                              {question.options.length > 2 && (
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  onClick={() =>
                                    setQuizData((prev) => {
                                      const updated = [...prev.questions]
                                      const opts = [...updated[qIndex].options]
                                      opts.splice(idx, 1)
                                      updated[qIndex].options = opts
                                      return { ...prev, questions: updated }
                                    })
                                  }
                                >
                                  <Trash className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          ))}
                        </div>
                        <Button type="button" variant="outline" size="sm" onClick={() => addOption(qIndex)}>
                          <Plus className="h-4 w-4 mr-1" /> Add option
                        </Button>
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label>Explanation (optional)</Label>
                      <Textarea
                        rows={2}
                        value={question.explanation}
                        onChange={(e) => handleQuestionChange(qIndex, "explanation", e.target.value)}
                        placeholder="Explain why the answer is correct (shown in results)"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={!isValid}>
              {initialData?._id ? "Update quiz" : "Create quiz"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default QuizFormDrawer


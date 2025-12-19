import { useState, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, RefreshCw, ShieldOff, ShieldCheck, Trash2 } from "lucide-react"
import { useToggleQuizStatusMutation, useDeleteQuizMutation } from "@/services/adminApi/adminQuizApi"
import Pagination from "@/components/Pagination"
import { toast } from "sonner"

const statusBadge = (status, isPublished) => {
  const configs = {
    draft: { label: "Draft", className: "bg-gray-100 text-gray-800" },
    pending: { label: "Pending", className: "bg-yellow-100 text-yellow-800" },
    approved: { label: isPublished ? "Published" : "Approved", className: "bg-blue-100 text-blue-800" },
    suspended: { label: "Suspended", className: "bg-amber-100 text-amber-800" },
    rejected: { label: "Rejected", className: "bg-red-100 text-red-800" }
  }
  const cfg = configs[status] || configs.draft
  return <Badge className={cfg.className}>{cfg.label}</Badge>
}

const QuizList = ({ quizzes = [], refetch, meta }) => {
  const [search, setSearch] = useState("")
  const [toggleStatus, { isLoading: toggling }] = useToggleQuizStatusMutation()
  const [deleteQuiz, { isLoading: deleting }] = useDeleteQuizMutation()

  const filtered = useMemo(() => {
    if (!search) return quizzes
    return quizzes.filter((q) => q.title?.toLowerCase().includes(search.toLowerCase()))
  }, [quizzes, search])

  const handleToggle = async (quiz) => {
    const toastId = toast.loading("Updating quiz status...")
    try {
      await toggleStatus({ quizId: quiz._id, tutorId: quiz.tutor?._id || quiz.tutor }).unwrap()
      toast.success("Quiz status updated", { id: toastId })
      refetch?.()
    } catch (err) {
      toast.error(err?.data?.message || "Failed to update", { id: toastId })
    }
  }

  const handleDelete = async (quiz) => {
    if (!window.confirm(`Delete quiz "${quiz.title}"? This cannot be undone.`)) return
    const toastId = toast.loading("Deleting quiz...")
    try {
      await deleteQuiz(quiz._id).unwrap()
      toast.success("Quiz deleted", { id: toastId })
      refetch?.()
    } catch (err) {
      toast.error(err?.data?.message || "Failed to delete", { id: toastId })
    }
  }

  return (
    <Card>
      <CardContent className="space-y-4 pt-6">
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search quizzes"
              className="pl-10"
            />
          </div>
          <Button variant="ghost" size="icon" onClick={() => refetch?.()} disabled={toggling || deleting}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>

        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Tutor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Published</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((quiz) => (
                <TableRow key={quiz._id}>
                  <TableCell className="font-medium">{quiz.title}</TableCell>
                  <TableCell>{quiz.course?.title || "—"}</TableCell>
                  <TableCell>{quiz.tutor?.firstName ? `${quiz.tutor.firstName}` : quiz.tutor || "—"}</TableCell>
                  <TableCell>{statusBadge(quiz.status, quiz.isPublished)}</TableCell>
                  <TableCell>
                    <Badge variant={quiz.isPublished ? "secondary" : "outline"}>
                      {quiz.isPublished ? "Yes" : "No"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleToggle(quiz)}
                      disabled={toggling}
                    >
                      {quiz.isPublished ? <ShieldOff className="h-4 w-4" /> : <ShieldCheck className="h-4 w-4" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(quiz)}
                      disabled={deleting}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {!filtered.length && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-gray-500 py-8">
                    No quizzes found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {meta?.totalPages > 1 && (
          <Pagination
            currentPage={meta.currentPage}
            totalPages={meta.totalPages}
            onPageChange={(page) => meta.onPageChange?.(page)}
          />
        )}
      </CardContent>
    </Card>
  )
}

export default QuizList


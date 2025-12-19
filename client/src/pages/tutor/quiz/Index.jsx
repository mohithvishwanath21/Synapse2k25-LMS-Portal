import React, { useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Search, Filter, Trash2, Send, Edit2, RefreshCw } from "lucide-react"
import LoadingSpinner from "@/components/FallbackUI/LoadingSpinner"
import Pagination from "@/components/Pagination"
import { format } from "date-fns"
import QuizFormDrawer from "./QuizFormDrawer"
import { toast } from "sonner"
import { useTutorLoadCoursesQuery } from "@/services/TutorApi/tutorCourseApi"
import {
  useTutorCreateQuizMutation,
  useTutorDeleteQuizMutation,
  useTutorGetQuizDetailsQuery,
  useTutorGetQuizzesQuery,
  useTutorPublishQuizMutation,
  useTutorUpdateQuizMutation
} from "@/services/apiSlice"

const statusBadge = (status, isPublished) => {
  const configs = {
    draft: { label: "Draft", className: "bg-gray-100 text-gray-800" },
    pending: { label: "Pending", className: "bg-yellow-100 text-yellow-800" },
    approved: {
      label: isPublished ? "Published" : "Approved",
      className: isPublished ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
    },
    rejected: { label: "Rejected", className: "bg-red-100 text-red-800" },
    suspended: { label: "Suspended", className: "bg-amber-100 text-amber-800" }
  }
  const config = configs[status] || configs.draft
  return <Badge className={config.className}>{config.label}</Badge>
}

const TutorQuizManagement = () => {
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("all")
  const [page, setPage] = useState(1)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [selectedQuizId, setSelectedQuizId] = useState(null)

  const { data, isLoading, refetch, isFetching } = useTutorGetQuizzesQuery({
    page,
    limit: 8,
    search,
    filter
  })

  const { data: quizDetails } = useTutorGetQuizDetailsQuery(selectedQuizId, { skip: !selectedQuizId })

  const { data: courseResponse } = useTutorLoadCoursesQuery({ page: 1, limit: 50, search: "", filter: "all" })
  const courses = courseResponse?.data?.courses || []

  const [createQuiz, { isLoading: creating }] = useTutorCreateQuizMutation()
  const [updateQuiz, { isLoading: updating }] = useTutorUpdateQuizMutation()
  const [deleteQuiz, { isLoading: deleting }] = useTutorDeleteQuizMutation()
  const [publishQuiz, { isLoading: publishing }] = useTutorPublishQuizMutation()

  const quizzes = data?.data?.quizzes || []
  const pagination = useMemo(() => ({
    totalPages: data?.data?.totalPages || 0,
    currentPage: data?.data?.currentPage || 1
  }), [data])

  const handleCreateOrUpdate = async (payload) => {
    const toastId = toast.loading("Saving quiz...")
    try {
      if (selectedQuizId) {
        await updateQuiz({ quizId: selectedQuizId, ...payload }).unwrap()
        toast.success("Quiz updated", { id: toastId })
      } else {
        await createQuiz(payload).unwrap()
        toast.success("Quiz created", { id: toastId })
      }
      setDrawerOpen(false)
      setSelectedQuizId(null)
      refetch()
    } catch (error) {
      toast.error(error?.data?.message || "Unable to save quiz", { id: toastId })
    }
  }

  const handlePublish = async (quizId) => {
    const toastId = toast.loading("Submitting for approval...")
    try {
      await publishQuiz(quizId).unwrap()
      toast.success("Quiz submitted to admin", { id: toastId })
      refetch()
    } catch (error) {
      toast.error(error?.data?.message || "Publish failed", { id: toastId })
    }
  }

  const handleDelete = async (quizId) => {
    const toastId = toast.loading("Deleting quiz...")
    try {
      await deleteQuiz(quizId).unwrap()
      toast.success("Quiz deleted", { id: toastId })
      refetch()
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete quiz", { id: toastId })
    }
  }

  const filteredQuizzes = useMemo(() => {
    if (!search) return quizzes
    return quizzes.filter((q) => q.title.toLowerCase().includes(search.toLowerCase()))
  }, [quizzes, search])

  if (isLoading) return <LoadingSpinner />

  return (
    <div className="min-h-screen bg-gradient-to-bl from-rose-200 via-white to-rose-200">
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Quiz Management</h1>
          <p className="text-gray-600 text-sm">Create quizzes, request approval and track status.</p>
        </div>
        <Button onClick={() => { setSelectedQuizId(null); setDrawerOpen(true) }}>
          <Plus className="mr-2 h-4 w-4" />
          New Quiz
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search quizzes"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value)
                  setPage(1)
                }}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <Tabs value={filter} onValueChange={(val) => { setFilter(val); setPage(1) }}>
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="draft">Draft</TabsTrigger>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                  <TabsTrigger value="published">Published</TabsTrigger>
                </TabsList>
              </Tabs>
              <Button variant="ghost" size="icon" onClick={() => refetch()} disabled={isFetching}>
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Questions</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Updated</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredQuizzes.map((quiz) => (
                  <TableRow key={quiz._id}>
                    <TableCell className="font-medium">{quiz.title}</TableCell>
                    <TableCell>{quiz.course?.title || "N/A"}</TableCell>
                    <TableCell>{quiz.questions?.length || 0}</TableCell>
                    <TableCell>{statusBadge(quiz.status, quiz.isPublished)}</TableCell>
                    <TableCell>{quiz.updatedAt ? format(new Date(quiz.updatedAt), "MMM dd, yyyy") : "--"}</TableCell>
                    <TableCell className="space-x-2 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedQuizId(quiz._id)
                          setDrawerOpen(true)
                        }}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handlePublish(quiz._id)}
                        disabled={quiz.status === "pending" || quiz.status === "approved" || publishing}
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(quiz._id)}
                        disabled={deleting}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {!filteredQuizzes.length && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-gray-500 py-8">
                      No quizzes found for this filter.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {pagination.totalPages > 1 && (
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              onPageChange={setPage}
            />
          )}
        </CardContent>
      </Card>

      <QuizFormDrawer
        open={drawerOpen}
        onClose={() => { setDrawerOpen(false); setSelectedQuizId(null) }}
        initialData={quizDetails?.data}
        onSubmit={handleCreateOrUpdate}
        courses={courses}
        loading={creating || updating}
      />
    </div>
    </div>
  )
}

export default TutorQuizManagement
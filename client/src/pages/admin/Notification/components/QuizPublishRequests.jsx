import { useState } from "react"
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Eye, User, Calendar, FileQuestion, Clock, Filter, ChevronDown, BookOpen } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { format } from "date-fns"
import ConfirmDialog from "./ConfirmDialog"

const QuizPublishRequests = ({ quizRequests, quizApproveOrReject, refetch }) => {
  const [activeFilter, setActiveFilter] = useState("all")
  
  const filteredRequests =
    activeFilter === "all"
      ? [...quizRequests || []].sort((b, a) => new Date(a.createdAt) - new Date(b.createdAt))
      : activeFilter === 'recent' 
        ? [...quizRequests || []].sort((b, a) => new Date(a.createdAt) - new Date(b.createdAt))
        : [...quizRequests || []].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))

  return (
    <Card className="w-full shadow-md border-0">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-t-lg pb-4">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl md:text-2xl font-bold text-gray-800">Quiz Publish Requests</CardTitle>
            <CardDescription className="mt-1 flex items-center">
              <Badge variant="secondary" className="mr-2 bg-purple-100 text-purple-800 hover:bg-purple-200">
                {quizRequests?.length || 0}
              </Badge>
              pending quiz requests require your review
            </CardDescription>
          </div>

          {quizRequests && quizRequests.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <Filter className="h-3.5 w-3.5" />
                  Filter
                  <ChevronDown className="h-3.5 w-3.5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setActiveFilter("all")}>All Requests</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveFilter("recent")}>Recent First</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveFilter("oldest")}>Oldest First</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-6 px-6">
        {quizRequests && quizRequests.length > 0 ? (
          <Carousel
            className="w-full"
            opts={{
              align: "start",
              loop: false,
            }}
          >
            <CarouselContent className="-ml-4">
              {filteredRequests?.map((quiz, index) => (
                <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <QuizRequestCard
                    quiz={quiz}
                    quizApproveOrReject={quizApproveOrReject}
                    refetch={refetch}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-end gap-2 mt-4">
              <CarouselPrevious />
              <CarouselNext />
            </div>
          </Carousel>
        ) : (
          <div className="py-12 text-center">
            <div className="bg-gray-50 inline-flex rounded-full p-4 mb-4">
              <FileQuestion className="h-8 w-8 text-gray-400" />
            </div>
            <p className="text-gray-500 font-medium mb-1">No pending quiz requests</p>
            <p className="text-sm text-gray-400">All quiz publish requests have been reviewed</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

const QuizRequestCard = ({ quiz, quizApproveOrReject, refetch }) => {
  const {
    _id: quizId,
    title,
    course,
    tutor,
    description,
    createdAt,
    timeLimit,
    questions = [],
    availableFrom,
    availableTo,
  } = quiz

  const formatDate = (date) => {
    if (!date) return "Not set"
    return format(new Date(date), "MMM dd, yyyy")
  }

  const formatTimeLimit = (minutes) => {
    if (!minutes) return "No limit"
    return `${minutes} min`
  }

  return (
    <Card className="overflow-hidden h-full border shadow-sm transition-all hover:shadow-md">
      <div className="relative bg-gradient-to-r from-purple-100 to-indigo-100 p-4">
        <div className="flex items-center justify-between mb-2">
          <Badge className="bg-purple-500 hover:bg-purple-600">Quiz Review</Badge>
          <Badge variant="outline" className="bg-white/90 text-gray-800 font-medium">
            {course?.title || "Unassigned"}
          </Badge>
        </div>
        
        <div className="flex items-center mb-3">
          <Avatar className="h-8 w-8 mr-2">
            <AvatarImage src={tutor?.profileImage} />
            <AvatarFallback className="text-sm bg-primary/10 text-primary">
              {tutor?.firstName?.charAt(0)}
              {tutor?.lastName?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm text-gray-700 font-medium">
            {tutor?.firstName} {tutor?.lastName}
          </span>
        </div>

        <h3 className="font-semibold text-lg line-clamp-2 mb-2" title={title}>
          {title}
        </h3>
      </div>

      <div className="p-4">
        <div className="text-sm text-gray-600 line-clamp-3 h-16 mb-4" title={description}>
          {description || "No description provided"}
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4 text-xs text-gray-600">
          <div className="flex items-center">
            <FileQuestion className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
            {questions.length} questions
          </div>
          <div className="flex items-center">
            <Clock className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
            {formatTimeLimit(timeLimit)}
          </div>
          <div className="flex items-center">
            <Calendar className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
            {formatDate(createdAt)}
          </div>
          <div className="flex items-center">
            <BookOpen className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
            {course?.categoryName || "General"}
          </div>
        </div>

        {availableFrom && (
          <div className="mb-3 p-2 bg-blue-50 rounded text-xs">
            <div className="flex justify-between">
              <span className="text-blue-700 font-medium">Available:</span>
              <span className="text-gray-600">
                {formatDate(availableFrom)} {availableTo && `to ${formatDate(availableTo)}`}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Quick Action Buttons */}
      <div className="px-4 py-3 bg-gray-50 border-t flex gap-2">
        <Button
          variant="outline"
          size="sm"
          className="flex-1 h-8 gap-1.5"
          onClick={() => window.open(`/admin/profile/courses`)}
        >
          <BookOpen className="h-3.5 w-3.5" />
          View Course
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="flex-1 h-8 gap-1.5"
          onClick={() => window.open(`/admin/profile/tutors/${tutor?._id}`)}
        >
          <User className="h-3.5 w-3.5" />
          View Tutor
        </Button>
      </div>

      {/* Approve/Reject Buttons */}
      <div className="p-4 pt-0 grid grid-cols-2 gap-2">
        <ConfirmDialog
          btnName="Approve"
          btnClass="bg-green-500 hover:bg-green-600 text-white h-9 gap-1.5"
          title="Approve Quiz"
          description={`Are you sure you want to approve "${title}"?`}
          action={quizApproveOrReject}
          id={{ 
            quizId: quizId, 
            tutorId: tutor?._id 
          }}
          refetchData={refetch}
        />
        <ConfirmDialog
          btnName="Reject"
          btnClass="bg-red-500 hover:bg-red-600 text-white h-9 gap-1.5"
          title="Reject Quiz"
          description={`Are you sure you want to reject "${title}"?`}
          action={quizApproveOrReject}
          id={{ 
            quizId: quizId, 
            tutorId: tutor?._id 
          }}
          refetchData={refetch}
        />
      </div>
    </Card>
  )
}

export default QuizPublishRequests


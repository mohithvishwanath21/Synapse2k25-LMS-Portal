// import {useAdminVerificationRequestQuery, useAdminApproveOrRequestMutation} from '@/services/adminApi/adminTutorApi'
// import { useAdminLoadPendingRequestQuery, useAdminApproveOrRejectCourseMutation } from '@/services/adminApi/adminCourseApi.js'
// import { useAdminGetPendingQuizzesQuery, useAdminApproveOrRejectQuizMutation } from '@/services/apiSlice'
// import CoursePublishRequests from "./CoursePublishRequests";
// import TutorVerificationRequest from "./TutorVerificationRequest";
// import WithdrawRequests from './WithdrawRequests';
// import QuizPublishRequests from "./QuizPublishRequests";
// import { FileQuestion } from "lucide-react"

// export function NotificationCard() {
//   const {data : tutorVerificationRequests, refetch : refetchVerificationRequest } = useAdminVerificationRequestQuery();
//   const VerificationRequests = tutorVerificationRequests?.data;
//   const [tutorApproveOrRequest] = useAdminApproveOrRequestMutation();

//   const { data : coursePublishRequests, refetch : refetchPublishRequest } = useAdminLoadPendingRequestQuery()
//   const publishRequests = coursePublishRequests?.data;
//   const [courseApproveOrReject] = useAdminApproveOrRejectCourseMutation()

//   // Quiz requests - matching course pattern
//   const { data: quizRequests, refetch: refetchQuizRequests } = useAdminGetPendingQuizzesQuery()
//   const pendingQuizzes = quizRequests?.data
//   const [quizApproveOrReject] = useAdminApproveOrRejectQuizMutation()

//   return (
//     <div className="flex flex-col container mx-auto p-6 gap-6">

//       <TutorVerificationRequest 
//         VerificationRequests={VerificationRequests}
//         refetchVerificationRequest={refetchVerificationRequest} 
//         tutorApproveOrRequest={tutorApproveOrRequest}
//       />

//       <CoursePublishRequests 
//         courseApproveOrReject={courseApproveOrReject} 
//         publishRequests={publishRequests}
//         refetchPublishRequest={refetchPublishRequest}  
//       />

//       {/* Add Quiz Requests Section */}
//       <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-1">
//         <div className="bg-white rounded-lg p-6">
//           <div className="flex items-center mb-4">
//             <FileQuestion className="h-6 w-6 text-purple-600 mr-3" />
//             <h2 className="text-xl font-bold">Quiz Publish Requests</h2>
//             {pendingQuizzes && pendingQuizzes.length > 0 && (
//               <span className="ml-3 bg-purple-100 text-purple-800 text-sm font-semibold px-3 py-1 rounded-full">
//                 {pendingQuizzes.length} pending
//               </span>
//             )}
//           </div>
          
//           <QuizPublishRequests 
//             quizRequests={pendingQuizzes}
//             quizApproveOrReject={quizApproveOrReject}
//             refetch={refetchQuizRequests}
//           />
//         </div>
//       </div>

//       <WithdrawRequests/>

//     </div>
//   );
// }
import {useAdminVerificationRequestQuery, useAdminApproveOrRequestMutation} from '@/services/adminApi/adminTutorApi'
import { useAdminLoadPendingRequestQuery, useAdminApproveOrRejectCourseMutation } from '@/services/adminApi/adminCourseApi.js'
import { useAdminGetPendingQuizzesQuery, useAdminApproveOrRejectQuizMutation } from '@/services/apiSlice'
import CoursePublishRequests from "./CoursePublishRequests";
import TutorVerificationRequest from "./TutorVerificationRequest";
import WithdrawRequests from './WithdrawRequests';
import QuizPublishRequests from "./QuizPublishRequests";
import { FileQuestion } from "lucide-react"

export function NotificationCard() {
  const {data : tutorVerificationRequests, refetch : refetchVerificationRequest } = useAdminVerificationRequestQuery();
  const VerificationRequests = tutorVerificationRequests?.data;
  const [tutorApproveOrRequest] = useAdminApproveOrRequestMutation();

  const { data : coursePublishRequests, refetch : refetchPublishRequest } = useAdminLoadPendingRequestQuery()
  const publishRequests = coursePublishRequests?.data;
  const [courseApproveOrReject] = useAdminApproveOrRejectCourseMutation()

  // Quiz requests - matching course pattern
  const { data: quizRequests, refetch: refetchQuizRequests } = useAdminGetPendingQuizzesQuery()
  const pendingQuizzes = quizRequests?.data
  const [quizApproveOrReject] = useAdminApproveOrRejectQuizMutation()

  return (
    <div className="min-h-screen py-8 px-4 bg-gradient-to-br from-rose-200 via-white to-rose-200">
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Admin Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-300">Manage verification requests, course approvals, and other pending actions</p>
        </div>

        <TutorVerificationRequest 
          VerificationRequests={VerificationRequests}
          refetchVerificationRequest={refetchVerificationRequest} 
          tutorApproveOrRequest={tutorApproveOrRequest}
        />

        <CoursePublishRequests 
          courseApproveOrReject={courseApproveOrReject} 
          publishRequests={publishRequests}
          refetchPublishRequest={refetchPublishRequest}  
        />

        {/* Add Quiz Requests Section */}
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden border-0">
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/30 dark:to-indigo-900/30 p-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <FileQuestion className="h-6 w-6 text-purple-600 dark:text-purple-400 mr-3" />
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">Quiz Publish Requests</h2>
                {pendingQuizzes && pendingQuizzes.length > 0 && (
                  <span className="ml-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white text-sm font-semibold px-3 py-1 rounded-full shadow-sm">
                    {pendingQuizzes.length} pending
                  </span>
                )}
              </div>
              
              <QuizPublishRequests 
                quizRequests={pendingQuizzes}
                quizApproveOrReject={quizApproveOrReject}
                refetch={refetchQuizRequests}
              />
            </div>
          </div>
        </div>

        <WithdrawRequests/>
      </div>
    </div>
  );
}
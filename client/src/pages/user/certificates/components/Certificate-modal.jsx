// /* eslint-disable react/prop-types */
// import { motion } from "framer-motion"
// import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Separator } from "@/components/ui/separator"
// import { format } from "date-fns"
// import { X, Award, Calendar, Clock, BookOpen, User } from "lucide-react"
// import CertificateActions from "./Certificate-actions"
// import { formatMinutesToHours } from '@/utils/formatHourIntoMinutes.js'

// const CertificateModal = ({ certificate, isOpen, onClose }) => {

//   const contentVariants = {
//     hidden: { opacity: 0, scale: 0.95, y: 20 },
//     visible: {
//       opacity: 1,
//       scale: 1,
//       y: 0,
//       transition: {
//         type: "spring",
//         stiffness: 300,
//         damping: 30,
//       },
//     },
//     exit: {
//       opacity: 0,
//       scale: 0.95,
//       y: 20,
//       transition: { duration: 0.2 },
//     },
//   }

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden bg-white/95 dark:bg-gray-950/95 backdrop-blur-md border-0 shadow-2xl">
//          <DialogTitle className="sr-only">Certificate Preview</DialogTitle>
//          <DialogDescription className="sr-only">
//     Preview of the selected certificate for {certificate?.userName}.
//   </DialogDescription>

//         <motion.div className="relative" initial="hidden" animate="visible" exit="exit" variants={contentVariants}>
//           <Button
//             variant="ghost"
//             size="icon"
//             className="absolute right-4 top-4 z-50 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/90"
//             onClick={onClose}
//           >
//             <X className="h-4 w-4" />
//           </Button>

//           <div className="p-6 sm:p-10 flex flex-col items-center">
//             {/* Certificate Display */}
//             <motion.div
//               className="w-full max-w-2xl mx-auto mb-8 relative"
//               initial={{ y: 20, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               transition={{ delay: 0.1 }}
//             >
//               <div className="aspect-[1.4/1] w-full bg-gradient-to-br from-primary/5 via-purple-500/5 to-primary/5 rounded-lg border-2 border-primary/20 p-8 flex flex-col items-center justify-center text-center relative overflow-hidden">
//                 <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl"></div>
//                 <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl"></div>

//                 <div className="absolute top-4 right-4">
//                   <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0">Verified</Badge>
//                 </div>

//                 <div className="mb-4">
//                   <Award className="h-16 w-16 text-primary" />
//                 </div>

//                 <h2 className="text-2xl font-bold mb-1">Certificate of Completion</h2>
//                 <p className="text-muted-foreground mb-6">This certifies that</p>

//                 <h3 className="text-3xl font-bold mb-6 text-primary">{certificate?.userName}</h3>

//                 <p className="text-muted-foreground mb-2">has successfully completed the course</p>
//                 <h4 className="text-xl font-bold mb-6">{certificate?.title}</h4>

//                 <div className="flex items-center gap-2 mb-6">
//                   <span className="text-muted-foreground">Issued on</span>
//                   <span className="font-medium">{format(new Date(certificate?.completionDate), "MMMM dd, yyyy")}</span>
//                 </div>

//                 <div className="flex items-center gap-4">
//                   <div className="text-center">
//                     <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Certificate ID</div>
//                     <div className="font-mono text-sm">{certificate?.id}</div>
//                   </div>

//                   <Separator orientation="vertical" className="h-8" />

//                   <div className="text-center">
//                     <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Instructor</div>
//                     <div className="font-medium text-sm">{certificate?.tutorName}</div>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>

//             {/* Certificate Details */}
//             <motion.div
//               className="w-full grid grid-cols-1 md:grid-cols-2 gap-6"
//               initial={{ y: 20, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               transition={{ delay: 0.2 }}
//             >
//               <div className="space-y-4">
//                 <h3 className="text-lg font-semibold flex items-center gap-2">
//                   <BookOpen className="h-5 w-5 text-primary" />
//                   <span>Course Details</span>
//                 </h3>

//                 <div className="space-y-2">
//                   <div className="flex justify-between items-center">
//                     <span className="text-muted-foreground">Course Name</span>
//                     <span className="font-medium">{certificate?.courseName}</span>
//                   </div>

//                   <div className="flex justify-between items-center">
//                     <span className="text-muted-foreground">Difficulty</span>
//                     <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
//                       {certificate?.difficulty}
//                     </Badge>
//                   </div>

//                   <div className="flex justify-between items-center">
//                     <span className="text-muted-foreground">Duration</span>
//                     <div className="flex items-center">
//                       <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
//                       <span>{formatMinutesToHours(certificate?.duration)}</span>
//                     </div>
//                   </div>

//                   <div className="flex justify-between items-center">
//                     <span className="text-muted-foreground">Completion Date</span>
//                     <div className="flex items-center">
//                       <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
//                       <span>{format(new Date(certificate.completionDate), "MMM dd, yyyy")}</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="space-y-4">
//                 <h3 className="text-lg font-semibold flex items-center gap-2">
//                   <User className="h-5 w-5 text-primary" />
//                   <span>Instructor Details</span>
//                 </h3>

//                 <div className="space-y-4">
//                   <div className="flex items-center gap-3">
//                     <Avatar className="h-10 w-10 border-2 border-primary/20">
//                       <AvatarImage src={`/placeholder.svg?text=${certificate?.tutorName.charAt(0)}`} />
//                       <AvatarFallback>{certificate?.tutorName.charAt(0)}</AvatarFallback>
//                     </Avatar>

//                     <div>
//                       <div className="font-medium">{certificate?.tutorName}</div>
//                       <div className="text-sm text-muted-foreground">Course Instructor</div>
//                     </div>
//                   </div>

//                   <div className="flex justify-between items-center">
//                     <span className="text-muted-foreground">Expertise</span>
//                     <span>Web Development</span>
//                   </div>

//                   <div className="flex justify-between items-center">
//                     <span className="text-muted-foreground">Rating</span>
//                     <div className="flex items-center">
//                       <div className="flex">
//                         {[1, 2, 3, 4, 5].map((star) => (
//                           <svg key={star} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
//                             <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
//                           </svg>
//                         ))}
//                       </div>
//                       <span className="ml-1">4.9</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>

//             {/* Actions */}
//             <motion.div
//               className="w-full mt-8 flex justify-end"
//               initial={{ y: 20, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               transition={{ delay: 0.4 }}
//             >
//               <CertificateActions certificate={certificate} onView={() => {}} />
//             </motion.div>
//           </div>
//         </motion.div>
//       </DialogContent>
//     </Dialog>
//   )
// }

// export default CertificateModal
/* eslint-disable react/prop-types */
import { motion } from "framer-motion"
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { format } from "date-fns"
import { X, Award, Calendar, Clock, BookOpen, User, Star } from "lucide-react"
import CertificateActions from "./Certificate-actions"
import { formatMinutesToHours } from '@/utils/formatHourIntoMinutes.js'

const CertificateModal = ({ certificate, isOpen, onClose }) => {

  const contentVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: 20,
      transition: { duration: 0.2 },
    },
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden bg-white/95 backdrop-blur-md border border-gray-200 shadow-2xl">
         <DialogTitle className="sr-only">Certificate Preview</DialogTitle>
         <DialogDescription className="sr-only">
    Preview of the selected certificate for {certificate?.userName}.
  </DialogDescription>

        <motion.div className="relative" initial="hidden" animate="visible" exit="exit" variants={contentVariants}>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 z-50 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
            onClick={onClose}
          >
            <X className="h-4 w-4 text-gray-700 dark:text-gray-300" />
          </Button>

          <div className="p-6 sm:p-8 flex flex-col items-center">
            {/* Certificate Display */}
            <motion.div
              className="w-full max-w-2xl mx-auto mb-8 relative"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div className="aspect-[1.4/1] w-full bg-gradient-to-br from-rose-100 via-rose-50/50 to-rose-100 rounded-lg border-2 border-black p-8 flex flex-col items-center justify-center text-center relative overflow-hidden">
                <div className="absolute -top-24 -left-24 w-48 h-48 bg-amber-200/30 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-rose-200/30 rounded-full blur-3xl"></div>

                <div className="absolute top-4 right-4">
                  <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0 shadow-sm">Verified</Badge>
                </div>

                <div className="mb-4">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-r from-amber-500 to-rose-500 flex items-center justify-center">
                    <Award className="h-10 w-10 text-white" />
                  </div>
                </div>

                <h2 className="text-2xl font-bold mb-1 text-gray-800">Certificate of Completion</h2>
                <p className="text-gray-600 mb-6">This certifies that</p>

                <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-amber-600 to-rose-600 bg-clip-text text-transparent">
                  {certificate?.userName}
                </h3>

                <p className="text-gray-600 mb-2">has successfully completed the course</p>
                <h4 className="text-xl font-bold mb-6 text-gray-800">{certificate?.title}</h4>

                <div className="flex items-center gap-2 mb-6 text-gray-600">
                  <span>Issued on</span>
                  <span className="font-medium">{format(new Date(certificate?.completionDate), "MMMM dd, yyyy")}</span>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Certificate ID</div>
                    <div className="font-mono text-sm text-gray-800">{certificate?.id}</div>
                  </div>

                  <Separator orientation="vertical" className="h-8" />

                  <div className="text-center">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Instructor</div>
                    <div className="font-medium text-sm text-gray-800">{certificate?.tutorName}</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Certificate Details */}
            <motion.div
              className="w-full grid grid-cols-1 md:grid-cols-2 gap-8"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {/* Course Details */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-800">
                  <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
                    <BookOpen className="h-4 w-4 text-amber-600" />
                  </div>
                  <span>Course Details</span>
                </h3>

                <div className="space-y-4 bg-gray-50 rounded-lg p-5 border border-gray-100">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Course Name</span>
                    <span className="font-medium text-gray-800">{certificate?.courseName}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Difficulty</span>
                    <Badge className="bg-gradient-to-r from-gray-800 to-gray-800 text-white border-0 shadow-sm">
                      {certificate?.difficulty}
                    </Badge>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Duration</span>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1.5 text-gray-500" />
                      <span className="font-medium text-gray-800">{formatMinutesToHours(certificate?.duration)}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Completion Date</span>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1.5 text-gray-500" />
                      <span className="font-medium text-gray-800">{format(new Date(certificate.completionDate), "MMM dd, yyyy")}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Instructor Details */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-800">
                  <div className="h-8 w-8 rounded-full bg-rose-100 flex items-center justify-center">
                    <User className="h-4 w-4 text-rose-600" />
                  </div>
                  <span>Instructor Details</span>
                </h3>

                <div className="space-y-5 bg-gray-50 rounded-lg p-5 border border-gray-100">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12 border-2 border-amber-200">
                      <AvatarImage src={`/placeholder.svg?text=${certificate?.tutorName.charAt(0)}`} />
                      <AvatarFallback className="bg-gradient-to-r from-amber-200 to-rose-200 text-black">
                        {certificate?.tutorName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <div className="font-medium text-gray-800">{certificate?.tutorName}</div>
                      <div className="text-sm text-gray-600">Course Instructor</div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Expertise</span>
                    <span className="font-medium text-gray-800">Web Development</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Rating</span>
                    <div className="flex items-center">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <span className="ml-2 font-medium text-gray-800">4.9</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Actions */}
            <motion.div
              className="w-full mt-8 pt-6 border-t border-gray-100"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <CertificateActions certificate={certificate} onView={() => {}} />
            </motion.div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}

export default CertificateModal
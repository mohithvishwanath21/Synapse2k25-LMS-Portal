// // import { Search } from "lucide-react"
// // import { motion } from "framer-motion"

// // const HeroBanner = () => {
// //   return (
// //     <div className="relative bg-gradient-to-b from-[#F8F9FF] to-white min-h-[650px] flex items-center px-4 md:px-8 lg:px-12 overflow-hidden">
// //       {/* Background decorative elements */}
// //       <div className="absolute top-0 right-0 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
// //       <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>

// //       <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
// //         <motion.div
// //           className="space-y-8 max-w-2xl"
// //           initial={{ opacity: 0, y: 50 }}
// //           animate={{ opacity: 1, y: 0 }}
// //           transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
// //         >
// //           <motion.h1
// //             className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
// //             initial={{ opacity: 0, y: 20 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ duration: 0.5, delay: 0.2 }}
// //           >
// //             Find Your Preferred{" "}
// //             <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
// //               Courses
// //             </span>{" "}
// //             & Improve Your Skills
// //           </motion.h1>

// //           <motion.p
// //             className="text-gray-600 text-lg leading-relaxed"
// //             initial={{ opacity: 0, y: 20 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ duration: 0.5, delay: 0.4 }}
// //           >
// //             Build skills with courses, certificates, and degrees online from world-class universities and companies.
// //           </motion.p>

// //           <motion.div
// //             className="relative max-w-xl"
// //             initial={{ opacity: 0, y: 20 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ duration: 0.5, delay: 0.6 }}
// //           >
// //           </motion.div>

// //         </motion.div>

// //         <motion.div
// //           className="relative hidden lg:block"
// //           initial={{ opacity: 0, x: 50 }}
// //           animate={{ opacity: 1, x: 0 }}
// //           transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
// //         >
// //           <div className="absolute -right-12 -top-12 w-64 h-64 bg-indigo-100 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
// //           <div className="absolute -left-12 -bottom-12 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>

// //           <motion.img
// //             src="/Hero_image.png"
// //             alt="Learning platform hero"
// //             className="w-full rounded-2xl relative z-10"
// //             whileHover={{ scale: 1.03 }}
// //             transition={{ duration: 0.5 }}
// //           />

// //           {/* Floating badges */}
// //           <motion.div
// //             className="absolute top-10 -right-8 bg-white p-3 rounded-xl shadow-lg"
// //             initial={{ opacity: 0, x: 20 }}
// //             animate={{ opacity: 1, x: 0 }}
// //             transition={{ duration: 0.5, delay: 1 }}
// //             style={{ zIndex: 20 }}
// //           >
// //             <div className="flex items-center gap-2">
// //               <div className="bg-blue-100 p-2 rounded-full">
// //                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
// //                   <path
// //                     d="M12 15C15.866 15 19 11.866 19 8C19 4.13401 15.866 1 12 1C8.13401 1 5 4.13401 5 8C5 11.866 8.13401 15 12 15Z"
// //                     stroke="#3B82F6"
// //                     strokeWidth="2"
// //                     strokeLinecap="round"
// //                     strokeLinejoin="round"
// //                   />
// //                   <path
// //                     d="M8.21 13.89L7 23L12 20L17 23L15.79 13.88"
// //                     stroke="#3B82F6"
// //                     strokeWidth="2"
// //                     strokeLinecap="round"
// //                     strokeLinejoin="round"
// //                   />
// //                 </svg>
// //               </div>
// //               <span className="text-sm font-medium">Expert Instructors</span>
// //             </div>
// //           </motion.div>
// //         </motion.div>
// //       </div>
// //     </div>
// //   )
// // }

// // export default HeroBanner
// import { motion } from "framer-motion"
// import { Search, Sparkles, Users, BookOpen, Zap, ChevronRight } from "lucide-react"

// const HeroBanner = () => {
//   return (
//     <div className="relative min-h-[700px] flex items-center justify-center px-4 overflow-hidden bg-gradient-to-b from-white via-blue-50/20 to-white">
//       {/* Subtle gradient mesh background */}
//       <div className="absolute inset-0 overflow-hidden opacity-50">
//         <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-blue-100/40 to-transparent rounded-full blur-3xl" />
//         <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-tl from-purple-100/40 to-transparent rounded-full blur-3xl" />
//       </div>

//       <div className="container mx-auto text-center relative z-10">
//         <motion.div
//           className="max-w-5xl mx-auto"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//         >
//           {/* Animated highlight badge */}
//           <motion.div
//             className="inline-flex items-center gap-2 mb-10 px-5 py-3 bg-white rounded-full shadow-sm border border-gray-100"
//             initial={{ opacity: 0, scale: 0.9, y: -10 }}
//             animate={{ opacity: 1, scale: 1, y: 0 }}
//             transition={{ duration: 0.5, type: "spring" }}
//             whileHover={{ scale: 1.05 }}
//           >
//             <Sparkles className="w-4 h-4 text-blue-500" />
//             <span className="text-sm font-semibold text-gray-700">Trusted by 50,000+ learners worldwide</span>
//             <div className="h-4 w-px bg-gray-200 mx-2" />
//             <div className="flex">
//               {[1, 2, 3, 4, 5].map((i) => (
//                 <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
//                   <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                 </svg>
//               ))}
//             </div>
//           </motion.div>

//           {/* Main headline */}
//           <motion.h1
//             className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-6 leading-[0.9]"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 1, delay: 0.2 }}
//           >
//             <span className="text-gray-800">LEARN</span>
//             <br />
//             <motion.span
//               className="relative inline-block"
//               initial={{ opacity: 0, x: -30 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.8, delay: 0.4, type: "spring" }}
//             >
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-gradient">
//                 WITHOUT
//               </span>
//               <motion.div
//                 className="absolute -bottom-3 left-0 h-[3px] bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
//                 initial={{ width: 0 }}
//                 animate={{ width: "100%" }}
//                 transition={{ duration: 1.2, delay: 1, ease: "easeOut" }}
//               />
//             </motion.span>
//             <br />
//             <motion.span
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.8, delay: 0.6 }}
//             >
//               <span className="text-gray-800">BOUNDARIES</span>
//             </motion.span>
//           </motion.h1>

//           {/* Enhanced subtitle */}
//           <motion.div
//             className="max-w-2xl mx-auto mb-12"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.8, delay: 0.8 }}
//           >
//             <p className="text-2xl text-gray-600 mb-6">
//               Where <span className="font-semibold text-gray-800">ambition</span> meets <span className="font-semibold text-gray-800">opportunity</span>
//             </p>
//             <p className="text-lg text-gray-500">
//               AI-curated learning paths • Industry recognized certifications • Live mentorship
//             </p>
//           </motion.div>

//           {/* Enhanced search with stable icon */}
//           <motion.div
//             className="max-w-xl mx-auto mb-16"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 1 }}
//           >
//             <div className="relative">
//               <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-500"></div>
//               <div className="relative flex items-center bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
//                 <Search className="w-5 h-5 text-gray-400 ml-6" />
//                 <input
//                   type="text"
//                   placeholder="What skill would you like to master today?"
//                   className="w-full px-4 py-5 text-lg bg-transparent focus:outline-none"
//                 />
//                 <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-5 font-semibold hover:opacity-90 transition-opacity">
//                   Explore
//                 </button>
//               </div>
//             </div>
//             <div className="flex flex-wrap justify-center gap-3 mt-4">
//               {['AI/ML', 'Web Dev', 'Data Science', 'Design', 'Business', 'Marketing'].map((tag) => (
//                 <span
//                   key={tag}
//                   className="text-sm text-gray-500 hover:text-blue-600 hover:font-medium cursor-pointer transition-all duration-200"
//                 >
//                   #{tag}
//                 </span>
//               ))}
//             </div>
//           </motion.div>

//           {/* Mini stats - clean and elegant */}
//           <motion.div
//             className="flex flex-wrap justify-center gap-10 md:gap-16"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.8, delay: 1.2 }}
//           >
//             {[
//               { icon: Users, value: "500+", label: "Expert Mentors", color: "blue" },
//               { icon: BookOpen, value: "10K+", label: "Courses", color: "purple" },
//               { icon: Zap, value: "98%", label: "Success Rate", color: "pink" },
//             ].map((stat, index) => (
//               <motion.div
//                 key={stat.label}
//                 className="text-center group"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
//                 whileHover={{ y: -5 }}
//               >
//                 <div className={`
//                   w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4
//                   ${stat.color === 'blue' ? 'bg-blue-50 group-hover:bg-blue-100' : ''}
//                   ${stat.color === 'purple' ? 'bg-purple-50 group-hover:bg-purple-100' : ''}
//                   ${stat.color === 'pink' ? 'bg-pink-50 group-hover:bg-pink-100' : ''}
//                   transition-all duration-300
//                 `}>
//                   <stat.icon className={`
//                     w-8 h-8
//                     ${stat.color === 'blue' ? 'text-blue-600' : ''}
//                     ${stat.color === 'purple' ? 'text-purple-600' : ''}
//                     ${stat.color === 'pink' ? 'text-pink-600' : ''}
//                   `} />
//                 </div>
//                 <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
//                 <div className="text-gray-600">{stat.label}</div>
//               </motion.div>
//             ))}
//           </motion.div>
//         </motion.div>
//       </div>
//     </div>
//   )
// }

// export default HeroBanner
import { motion } from "framer-motion"
import { Search, TrendingUp, Users, Award, Clock } from "lucide-react"

const HeroBanner = () => {
  return (
    <div className="relative min-h-screen flex items-center px-4 bg-gradient-to-br from-rose-200 via-white to-rose-200">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm">
              <TrendingUp className="w-4 h-4 text-amber-600" />
              <span className="text-sm font-medium text-gray-700">Fastest growing LMS platform</span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Learn Skills That
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-rose-600">
                Actually Matter
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl text-gray-600 mb-8">
              Industry-relevant courses designed by professionals actually working in the field.
            </p>

            {/* Search */}
            <div className="mb-10">
              <div className="relative bg-white rounded-xl shadow-md p-2">
                <div className="flex items-center">
                  <Search className="w-5 h-5 text-gray-400 ml-4" />
                  <input
                    type="text"
                    placeholder="Find courses, skills, mentors..."
                    className="flex-1 px-4 py-3 bg-transparent focus:outline-none"
                  />
                  <button className="bg-gradient-to-r from-amber-500 to-rose-500 text-white px-6 py-3 rounded-lg font-semibold">
                    Explore
                  </button>
                </div>
              </div>
            </div>

            {/* Stats
            <div className="flex gap-8">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Users className="w-5 h-5 text-amber-600" />
                  <div className="text-2xl font-bold text-gray-900">50K+</div>
                </div>
                <div className="text-gray-600">Learners</div>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Award className="w-5 h-5 text-rose-600" />
                  <div className="text-2xl font-bold text-gray-900">4.9</div>
                </div>
                <div className="text-gray-600">Rating</div>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="w-5 h-5 text-amber-600" />
                  <div className="text-2xl font-bold text-gray-900">6 mo</div>
                </div>
                <div className="text-gray-600">Avg. duration</div>
              </div>
            </div> */}
          </motion.div>

          {/* Right side - simple card */}
          <motion.div
            className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="mb-6">
              <div className="text-lg font-semibold text-gray-900 mb-2">Most Popular Course</div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-amber-500 to-rose-500 w-3/4" />
              </div>
              <div className="text-sm text-gray-500 mt-2">2,450 students enrolled</div>
            </div>

            <div className="space-y-4">
              {[
                "Live coding sessions",
                "Project portfolio building",
                "Career coaching",
                "Industry certifications"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default HeroBanner


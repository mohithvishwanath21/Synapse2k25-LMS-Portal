// import { useState, useEffect } from "react"
// import { Link, useLocation, useNavigate } from "react-router-dom"
// import { UserCircle, ShoppingCart, LogOut, Menu, X, CircleChevronRight } from "lucide-react"
// import { useSelect } from "@/hooks/useSelect"
// import { useUserAuthActions, useTutorAuthActions, useAdminAuthActions } from "@/hooks/useDispatch"
// import { useTutorLogoutMutation } from "@/services/TutorApi/tutorAuthApi"
// import { useAdminLogoutMutation } from "@/services/adminApi/adminAuthApi"
// import { useUserLogoutMutation } from "@/services/userApi/userAuthApi"
// import { useUserLoadCartQuery } from "@/services/userApi/userCourseApi.js"
// import Notification from "./Notification"
// import { toast } from "sonner"
// import { motion } from "framer-motion"
// import { GlobalSearch } from "./Search"
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

// const Navbar = ({ setSidebarCollapsed, isSidebarCollapsed }) => {
//   const navigate = useNavigate()
//   const location = useLocation()
//   const [menuOpen, setMenuOpen] = useState(false)
//   const [searchTerm, setSearchTerm] = useState(null)
//   const { user, tutor, admin } = useSelect()

//   const role = user.isAuthenticated ? "user" : tutor.isAuthenticated ? "tutor" : admin.isAuthenticated ? "admin" : null
//   const roleData = user.isAuthenticated
//     ? user.userData
//     : tutor.isAuthenticated
//       ? tutor.tutorData
//       : admin.isAuthenticated
//         ? admin.adminData
//         : null

//   const isProfileRoute = location.pathname.startsWith(`/${role}/profile`)

//   const { data: cartDetails } = useUserLoadCartQuery(undefined, {
//     refetchOnMountOrArgChange: true,
//     skip: tutor.isAuthenticated || admin.isAuthenticated,
//   })

//   const courseName = cartDetails?.data?.course?._id || "courseId"

//   const { logout: userLogout } = useUserAuthActions()
//   const { logout: tutorLogout } = useTutorAuthActions()
//   const { logout: adminLogout } = useAdminAuthActions()

//   const [userLogoutMutation] = useUserLogoutMutation()
//   const [tutorLogoutMutation] = useTutorLogoutMutation()
//   const [adminLogoutMutation] = useAdminLogoutMutation()

//   const logout = role === "user" ? userLogoutMutation : role === "tutor" ? tutorLogoutMutation : adminLogoutMutation

//   const stateLogout = role === "user" ? userLogout : role === "tutor" ? tutorLogout : adminLogout

//   useEffect(() => {
//     setSearchTerm("") // Reset search on page change
//     setMenuOpen(false) // Close menu on navigation
//   }, [location.pathname])

//   const handleLogout = async () => {
//     const toastId = toast.loading("Please wait . . .")
//     try {
//       await logout().unwrap()
//       stateLogout()
//       toast.success("Logout successful", { id: toastId })
//       setMenuOpen(false)
//     } catch (error) {
//       toast.error(error?.data?.message || "Error logout", { id: toastId })
//     }
//   }

//   const handleSearch = (course) => {
//     navigate(`/explore/courses/${course._id}`)
//     setSearchTerm("")
//     setMenuOpen(false)
//   }

//   return (
//     <motion.nav
//       initial={{ y: -20, opacity: 0 }}
//       animate={{ y: 0, opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className="border-b bg-white/90 backdrop-blur-sm sticky top-0 z-50 shadow-sm"
//     >
//       <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
//         {/* Left Side */}
//         <div className="flex items-center gap-8">
//           {isProfileRoute && (
//             <motion.button
//               whileHover={{ scale: 1.05, rotate: isSidebarCollapsed ? 0 : 180 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => setSidebarCollapsed(!isSidebarCollapsed)}
//               className="p-2 rounded-full hover:bg-gray-100 transition-all duration-300"
//             >
//               <CircleChevronRight className="h-6 w-6 text-primary" />
//             </motion.button>
//           )}

//           <Link to="/" className="flex items-center gap-2 group">
//             <motion.img
//               src="/logo.svg"
//               alt="EduLMS Logo"
//               className="h-9 w-9"
//               whileHover={{ rotate: 10, scale: 1.1 }}
//               transition={{ type: "spring", stiffness: 400, damping: 10 }}
//             />
//             <motion.span
//               className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent"
//               whileHover={{ scale: 1.05 }}
//               transition={{ type: "spring", stiffness: 400, damping: 10 }}
//             >
//               EduLMS
//             </motion.span>
//           </Link>

//           {!isProfileRoute && (
//             <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//               <Link
//                 to="/explore"
//                 className="hidden text-gray-600 hover:text-primary transition-colors relative md:block font-medium"
//               >
//                 Explore
//                 <motion.span
//                   className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary"
//                   whileHover={{ width: "100%" }}
//                   transition={{ duration: 0.3 }}
//                 />
//               </Link>
//             </motion.div>
//           )}
//         </div>

//         {/* Search Bar (Desktop) */}
//         <div className="hidden w-full max-w-xl md:flex justify-center px-8">
//           <div className="relative w-full">
//             <GlobalSearch onSearch={handleSearch} />
//           </div>
//         </div>

//         {/* Right Side */}
//         <div className="flex items-center gap-5">
//           {user.isAuthenticated || tutor.isAuthenticated || admin.isAuthenticated ? (
//             <>
//               {/* Cart */}
//               {user.isAuthenticated && (
//                 <motion.div whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }} className="relative">
//                   <Link
//                     to={`/explore/courses/${courseName}/checkout`}
//                     className="hidden text-gray-600 hover:text-primary transition-colors md:block"
//                   >
//                     <ShoppingCart className="h-6 w-6" />
//                     {cartDetails?.data?.course && (
//                       <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
//                         1
//                       </span>
//                     )}
//                   </Link>
//                 </motion.div>
//               )}

//               {/* Profile */}
//               <motion.div whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }} className="relative">
//                 <Link
//                   to={`/${role}/profile`}
//                   className="hidden text-gray-600 hover:text-primary transition-colors md:block"
//                 >
//                   <UserCircle className="h-6 w-6" />
//                   <motion.span
//                     className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-primary"
//                     whileHover={{ width: "80%" }}
//                     transition={{ duration: 0.2 }}
//                   />
//                 </Link>
//               </motion.div>

//               {/* Notification (Desktop Only) */}
//               <div className="hidden md:block">
//                 <Notification role={role} userId={roleData} />
//               </div>

//               {/* Logout */}
//               <motion.div whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }}>
//                 <button
//                   onClick={handleLogout}
//                   className="hidden text-gray-600 hover:text-red-600 transition-colors md:block"
//                 >
//                   <LogOut className="h-6 w-6" />
//                 </button>
//               </motion.div>
//             </>
//           ) : (
//             <div className="hidden gap-4 md:flex">
//               <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//                 <Link
//                   to="/user/login"
//                   className="rounded-full px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors border border-gray-200"
//                 >
//                   Log in
//                 </Link>
//               </motion.div>

//               <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//                 <Link
//                   to="/user/sign-up"
//                   className="rounded-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 px-5 py-2 text-sm font-medium text-white shadow-sm transition-all duration-300"
//                 >
//                   Sign Up
//                 </Link>
//               </motion.div>

//                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//     <Link
//       to="/admin/login"
//       className="rounded-full bg-gray-900 hover:bg-black px-5 py-2 text-sm font-medium text-white shadow-sm transition-all duration-300"
//     >
//       Admin Login
//     </Link>
//   </motion.div>
//             </div>
//           )}

//           {/* Notification (Mobile Only) */}
//           {user.isAuthenticated || tutor.isAuthenticated || admin.isAuthenticated ? (
//             <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="md:hidden">
//               <Notification role={role} userId={roleData} />
//             </motion.div>
//           ) : null}

//           {/* Mobile Menu Button with Sheet */}
//           <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
//             <SheetTrigger asChild>
//               <motion.button
//                 className="block md:hidden p-1 rounded-full hover:bg-gray-100 transition-colors"
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//               </motion.button>
//             </SheetTrigger>
//             <SheetContent side="top" className="w-full">
//               <div className="flex flex-col gap-5 p-5">
//                 {/* Mobile Search Bar */}
//                 <div className="relative w-full">
//                   <GlobalSearch
//                     onSearch={(course) => {
//                       handleSearch(course)
//                       setMenuOpen(false)
//                     }}
//                   />
//                 </div>

//                 <Link
//                 to={'/'}
//                 className="block text-gray-600 hover:text-primary transition-colors py-2 px-3 rounded-lg hover:bg-gray-50 font-medium"
//                 onClick={() => setMenuOpen(false)}
//                 >
//                   Home
//                 </Link>
                    
//                 <Link
//                   to="/explore"
//                   className="block text-gray-600 hover:text-primary transition-colors py-2 px-3 rounded-lg hover:bg-gray-50 font-medium"
//                   onClick={() => setMenuOpen(false)}
//                 >
//                   Explore
//                 </Link>

//                 {user.isAuthenticated || tutor.isAuthenticated || admin.isAuthenticated ? (
//                   <>
//                     <Link
//                       to={`/${role}/profile`}
//                       className="block text-gray-600 hover:text-primary transition-colors py-2 px-3 rounded-lg hover:bg-gray-50 font-medium"
//                       onClick={() => setMenuOpen(false)}
//                     >
//                       Profile
//                     </Link>

//                     <button
//                       onClick={() => {
//                         handleLogout()
//                         setMenuOpen(false)
//                       }}
//                       className="w-full text-left text-red-600 hover:text-red-700 transition-colors py-2 px-3 rounded-lg hover:bg-red-50 font-medium"
//                     >
//                       Logout
//                     </button>
//                   </>
//                 ) : (
//                   <>
//                     <Link
//                       to="/user/login"
//                       className="block text-gray-600 hover:text-primary transition-colors py-2 px-3 rounded-lg hover:bg-gray-50 font-medium"
//                       onClick={() => setMenuOpen(false)}
//                     >
//                       Log in
//                     </Link>

//                     <Link
//                       to="/user/sign-up"
//                       className="block text-white bg-gradient-to-r from-primary to-purple-600 py-2 px-4 rounded-lg font-medium text-center shadow-sm"
//                       onClick={() => setMenuOpen(false)}
//                     >
//                       Sign Up
//                     </Link>

//                     <Link
//   to="/admin/login"
//   className="block text-gray-600 hover:text-primary transition-colors py-2 px-3 rounded-lg hover:bg-gray-50 font-medium"
//   onClick={() => setMenuOpen(false)}
// >
//   Admin Login
// </Link>

//                   </>
//                 )}
//               </div>
//             </SheetContent>
//           </Sheet>
//         </div>
//       </div>
//     </motion.nav>
//   )
// }

// export default Navbar
import { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { UserCircle, ShoppingCart, LogOut, Menu, X, CircleChevronRight, Home, Compass } from "lucide-react"
import { useSelect } from "@/hooks/useSelect"
import { useUserAuthActions, useTutorAuthActions, useAdminAuthActions } from "@/hooks/useDispatch"
import { useTutorLogoutMutation } from "@/services/TutorApi/tutorAuthApi"
import { useAdminLogoutMutation } from "@/services/adminApi/adminAuthApi"
import { useUserLogoutMutation } from "@/services/userApi/userAuthApi"
import { useUserLoadCartQuery } from "@/services/userApi/userCourseApi.js"
import Notification from "./Notification"
import { toast } from "sonner"
import { motion } from "framer-motion"
import { GlobalSearch } from "./Search"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const Navbar = ({ setSidebarCollapsed, isSidebarCollapsed }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState(null)
  const { user, tutor, admin } = useSelect()

  const role = user.isAuthenticated ? "user" : tutor.isAuthenticated ? "tutor" : admin.isAuthenticated ? "admin" : null
  const roleData = user.isAuthenticated
    ? user.userData
    : tutor.isAuthenticated
      ? tutor.tutorData
      : admin.isAuthenticated
        ? admin.adminData
        : null

  const isProfileRoute = location.pathname.startsWith(`/${role}/profile`)

  const { data: cartDetails } = useUserLoadCartQuery(undefined, {
    refetchOnMountOrArgChange: true,
    skip: tutor.isAuthenticated || admin.isAuthenticated,
  })

  const courseName = cartDetails?.data?.course?._id || "courseId"

  const { logout: userLogout } = useUserAuthActions()
  const { logout: tutorLogout } = useTutorAuthActions()
  const { logout: adminLogout } = useAdminAuthActions()

  const [userLogoutMutation] = useUserLogoutMutation()
  const [tutorLogoutMutation] = useTutorLogoutMutation()
  const [adminLogoutMutation] = useAdminLogoutMutation()

  const logout = role === "user" ? userLogoutMutation : role === "tutor" ? tutorLogoutMutation : adminLogoutMutation

  const stateLogout = role === "user" ? userLogout : role === "tutor" ? tutorLogout : adminLogout

  useEffect(() => {
    setSearchTerm("") // Reset search on page change
    setMenuOpen(false) // Close menu on navigation
  }, [location.pathname])

  const handleLogout = async () => {
    const toastId = toast.loading("Please wait . . .")
    try {
      await logout().unwrap()
      stateLogout()
      toast.success("Logout successful", { id: toastId })
      setMenuOpen(false)
    } catch (error) {
      toast.error(error?.data?.message || "Error logout", { id: toastId })
    }
  }

  const handleSearch = (course) => {
    navigate(`/explore/courses/${course._id}`)
    setSearchTerm("")
    setMenuOpen(false)
  }

  // Check if we're on the home page
  const isHomePage = location.pathname === '/'
  const isExplorePage = location.pathname.startsWith('/explore')

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-md"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* Left Side */}
        <div className="flex items-center gap-6">
          {isProfileRoute && (
            <motion.button
              whileHover={{ scale: 1.05, rotate: isSidebarCollapsed ? 0 : 180 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSidebarCollapsed(!isSidebarCollapsed)}
              className="p-2 rounded-lg hover:bg-gray-100 hover:shadow-sm transition-all duration-300"
            >
              <CircleChevronRight className="h-6 w-6 text-gray-800" />
            </motion.button>
          )}

          <Link to="/" className="flex items-center gap-2 group">
            <motion.img
              src="/logo.svg"
              alt="EduLMS Logo"
              className="h-9 w-9"
              whileHover={{ rotate: 10, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            />
            <motion.span
              className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              EduLMS
            </motion.span>
          </Link>

          {!isProfileRoute && (
            <div className="hidden md:flex items-center gap-1">
              <Link
                to="/"
                className={`flex items-center gap-2 px-4 py-2.5 rounded-t-lg transition-all relative ${
                  isHomePage 
                    ? 'text-gray-900 font-semibold bg-gray-100 shadow-sm border border-gray-200 border-b-0' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 hover:shadow-sm'
                }`}
              >
                <Home className="h-4 w-4" />
                <span>Home</span>
                {isHomePage && (
                  <>
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-black rounded-b-md"></div>
                    <div className="absolute -bottom-3 left-0 right-0 h-3 bg-white"></div>
                  </>
                )}
              </Link>
              
              <Link
                to="/explore"
                className={`flex items-center gap-2 px-4 py-2.5 rounded-t-lg transition-all relative ${
                  isExplorePage 
                    ? 'text-gray-900 font-semibold bg-gray-100 shadow-sm border border-gray-200 border-b-0' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 hover:shadow-sm'
                }`}
              >
                <Compass className="h-4 w-4" />
                <span>Explore</span>
                {isExplorePage && (
                  <>
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-black rounded-b-md"></div>
                    <div className="absolute -bottom-3 left-0 right-0 h-3 bg-white"></div>
                  </>
                )}
              </Link>
            </div>
          )}
        </div>

        {/* Search Bar (Desktop) */}
        <div className="hidden w-full max-w-xl md:flex justify-center px-8">
          <div className="relative w-full">
            <GlobalSearch onSearch={handleSearch} />
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {user.isAuthenticated || tutor.isAuthenticated || admin.isAuthenticated ? (
            <>
              {/* Cart */}
              {user.isAuthenticated && (
                <motion.div whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }} className="relative">
                  <Link
                    to={`/explore/courses/${courseName}/checkout`}
                    className="hidden text-gray-600 hover:text-gray-900 hover:bg-gray-50 hover:shadow-sm p-2 rounded-lg transition-all md:block"
                  >
                    <ShoppingCart className="h-6 w-6" />
                    {cartDetails?.data?.course && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center shadow-sm">
                        1
                      </span>
                    )}
                  </Link>
                </motion.div>
              )}

              {/* Profile */}
              <motion.div whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }} className="relative">
                <Link
                  to={`/${role}/profile`}
                  className="hidden text-gray-600 hover:text-gray-900 hover:bg-gray-50 hover:shadow-sm p-2 rounded-lg transition-all md:block"
                >
                  <UserCircle className="h-6 w-6" />
                  {isProfileRoute && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-black rounded-full"></div>
                  )}
                </Link>
              </motion.div>

              {/* Notification (Desktop Only) */}
              <div className="hidden md:block">
                <Notification role={role} userId={roleData} />
              </div>

              {/* Log Out Button (Updated) */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <button
                  onClick={handleLogout}
                  className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black hover:shadow-md rounded-lg shadow-sm transition-all duration-300"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Log Out</span>
                </button>
              </motion.div>
            </>
          ) : (
            <div className="hidden gap-3 md:flex">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/user/login"
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 hover:shadow-sm rounded-lg transition-all"
                >
                  Log in
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/user/sign-up"
                  className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black hover:shadow-md rounded-lg shadow-sm transition-all duration-300"
                >
                  Sign Up
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/admin/login"
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 hover:shadow-sm rounded-lg transition-all"
                >
                  Admin Login
                </Link>
              </motion.div>
            </div>
          )}

          {/* Notification (Mobile Only) */}
          {user.isAuthenticated || tutor.isAuthenticated || admin.isAuthenticated ? (
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="md:hidden">
              <Notification role={role} userId={roleData} />
            </motion.div>
          ) : null}

          {/* Mobile Menu Button with Sheet */}
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <motion.button
                className="block md:hidden p-2 rounded-lg hover:bg-gray-100 hover:shadow-sm transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </motion.button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 p-0">
              <div className="h-full flex flex-col">
                {/* Mobile Search Bar */}
                <div className="p-6 border-b border-gray-100">
                  <div className="relative w-full">
                    <GlobalSearch
                      onSearch={(course) => {
                        handleSearch(course)
                        setMenuOpen(false)
                      }}
                    />
                  </div>
                </div>

                <div className="flex-1 p-4 space-y-1">
                  <Link
                    to="/"
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      isHomePage 
                        ? 'text-gray-900 font-semibold bg-gray-100 shadow-sm' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 hover:shadow-sm'
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    <Home className="h-4 w-4" />
                    <span>Home</span>
                  </Link>
                    
                  <Link
                    to="/explore"
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      isExplorePage 
                        ? 'text-gray-900 font-semibold bg-gray-100 shadow-sm' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 hover:shadow-sm'
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    <Compass className="h-4 w-4" />
                    <span>Explore</span>
                  </Link>

                  {user.isAuthenticated || tutor.isAuthenticated || admin.isAuthenticated ? (
                    <>
                      <Link
                        to={`/${role}/profile`}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                          isProfileRoute 
                            ? 'text-gray-900 font-semibold bg-gray-100 shadow-sm' 
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 hover:shadow-sm'
                        }`}
                        onClick={() => setMenuOpen(false)}
                      >
                        <UserCircle className="h-4 w-4" />
                        <span>Profile</span>
                      </Link>

                      <div className="pt-4 border-t border-gray-100">
                        <button
                          onClick={() => {
                            handleLogout()
                            setMenuOpen(false)
                          }}
                          className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-white bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black hover:shadow-md transition-all"
                        >
                          <LogOut className="h-4 w-4" />
                          <span>Log Out</span>
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/user/login"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50 hover:shadow-sm transition-all"
                        onClick={() => setMenuOpen(false)}
                      >
                        <span>Log in</span>
                      </Link>

                      <Link
                        to="/user/sign-up"
                        className="flex items-center justify-center gap-3 px-4 py-3 rounded-lg text-white bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black hover:shadow-md transition-all mt-2"
                        onClick={() => setMenuOpen(false)}
                      >
                        <span>Sign Up</span>
                      </Link>

                      <Link
                        to="/admin/login"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50 hover:shadow-sm transition-all mt-2"
                        onClick={() => setMenuOpen(false)}
                      >
                        <span>Admin Login</span>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.nav>
  )
}

export default Navbar
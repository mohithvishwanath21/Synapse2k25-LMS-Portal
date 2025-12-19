// import { Eye, EyeOff } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Link, useNavigate } from "react-router-dom";
// import useForm from "@/hooks/useForm";
// import { toast } from "sonner";
// import {useSendOtpMutation} from '@/services/commonApi'
// import React, { useEffect } from "react"

// const SignUp = ({role}) => {
 
//   const navigate = useNavigate();
//   const [sendOtp,{isLoading}] = useSendOtpMutation();
//   const {
//     formData, errors, showPassword, showConfirmPassword, handleChange, 
//     toggleConfirmPasswordVisibility, togglePasswordVisibility

//   } = useForm()


//   const isFormValid = Object.values(errors).some((err) => err) || 
//     !formData.password || 
//     !formData.confirmPassword || 
//     !formData.email ||
//     !formData.firstName

//   const handleGoogleAuth =()=>{
//     window.location.href = role === 'user' 
//     ? import.meta.env.VITE_GOOGLE_USER_AUTH_REQ 
//     : import.meta.env.VITE_GOOGLE_TUTOR_AUTH_REQ
//   }


//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (Object.values(errors).some((err) => err)) return;

//     const toastId = toast.loading("Signing up...");


//     const credentials = {
//       role,
//       firstName : formData.firstName,
//       email : formData.email,
//       otpType : 'signIn'
//     }


//    try {
//   await sendOtp(credentials).unwrap();
//   toast.success(
//     role === "admin"
//       ? "Signup successful"
//       : "An OTP has been sent to your registered email address",
//     { id: toastId }
//   );

//   if(role === 'admin') {
//     navigate("/admin/login"); // Admin: go directly to login
//   } else {
//     navigate(`/${role}/verify-otp`, { state: formData }); // User/Tutor: OTP page
//   }

// } catch (error) {
//   if(error?.status === 409){
//     toast.error('Account already exists, Try login ',{id :toastId})
//   }
//   toast.error(error?.data?.message || "Signup failed. Try again.", { id: toastId });
// }

//   };

//   return (
//     <div className="flex h-screen w-screen items-center justify-center bg-gray-100">
//       <div className="grid h-full w-full md:grid-cols-2 bg-white shadow-lg">
//         {/* Left Side */}
//         <div className="hidden md:flex items-center justify-center bg-[#1D1042] p-8 text-white w-full h-full">
//           <div className="max-w-md space-y-4 text-center">
//             <p className="text-2xl font-light">
//               In learning you will <span className="text-purple-400">teach</span>, and in teaching you will {" "}
//               <span className="text-purple-400">learn</span>.
//             </p>
//             <p className="text-sm">- Eleanor Roosevelt</p>
//             <img src="/signup.svg" alt="" className="w-[710px] h-[595px]" />
//           </div>
//         </div>

//         {/* Right Side - Form */}
//         <div className="flex items-center justify-center p-8 overflow-auto">
//           <div className="w-full max-w-sm space-y-5">
//             <div className="text-center">
//               <h1 className="text-3xl font-bold">{role === "user" ? "Student" : role === "tutor" ? "Tutor" : "Admin"}  Sign Up</h1>
//               {role!=='admin' && <p className="text-center text-sm text-gray-600">
//               {`Are you a ${role === 'user' ? 'tutor' : 'student'}? Switch to ${role === 'user' ? 'tutor' : 'student'}`} {" "}
//               <Link to={`/${role === 'user' ? 'tutor' : 'user'}/sign-up`} className="text-purple-600 hover:underline">
//               Signup here!
//               </Link>
//             </p>}
//             </div>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               {/* Username Field */}
//               <div className="space-y-2">
//                 <label htmlFor="username" className="text-sm font-medium block">
//                 Username
//                 </label>
//                 <input
//                   id="firstName"
//                   type="text"
//                   name="firstName"
//                   value={formData.firstName}
//                   onChange={handleChange}
//                   className={`w-full rounded-lg border p-2 focus:ring-2 ${
//                     errors.firstName ? "border-red-500" : "border-gray-300 focus:border-purple-500/20"
//                   }`}
//                   placeholder="Enter your username"
//                   required
//                 />
//                 {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName}</p>}
//               </div>

//               {/* Email Field */}
//               <div className="space-y-2">
//                 <label htmlFor="email" className="text-sm font-medium block">
//                   Your Email
//                 </label>
//                 <input
//                   id="email"
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className={`w-full rounded-lg border p-2 focus:ring-2 ${
//                     errors.email ? "border-red-500" : "border-gray-300 focus:border-purple-500/20"
//                   }`}
//                   placeholder="name@example.com"
//                   required
//                 />
//                 {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
//               </div>

//               {/* Password Field with Eye Icon */}
//               <div className="space-y-2 relative">
//                 <label htmlFor="password" className="text-sm font-medium block">
//                   Password
//                 </label>
//                 <div className="relative">
//                   <input
//                     id="password"
//                     type={showPassword ? "text" : "password"}
//                     name="password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     className={`w-full rounded-lg border p-2 focus:ring-2 ${
//                       errors.password ? "border-red-500" : "border-gray-300 focus:border-purple-500/20"
//                     }`}
//                     required
//                     placeholder="Password"
//                   />
//                   <button type="button" onClick={togglePasswordVisibility} className="absolute right-2 top-2">
//                     {showPassword ? <EyeOff className="h-5 w-5 text-gray-500" /> : <Eye className="h-5 w-5 text-gray-500" />}
//                   </button>
//                 </div>
//                 {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
//               </div>

//               {/* Confirm Password Field with Eye Icon */}
//               <div className="space-y-2 relative">
//                 <label htmlFor="confirmPassword" className="text-sm font-medium block">
//                   Confirm Password
//                 </label>
//                 <div className="relative">
//                   <input
//                     id="confirmPassword"
//                     type={showConfirmPassword ? "text" : "password"}
//                     name="confirmPassword"
//                     value={formData.confirmPassword}
//                     onChange={handleChange}
//                     className={`w-full rounded-lg border p-2 focus:ring-2 ${
//                       errors.confirmPassword ? "border-red-500" : "border-gray-300 focus:border-purple-500/20"
//                     }`}
//                     required
//                     placeholder="Confirm Password"
//                   />
//                   <button type="button" onClick={toggleConfirmPasswordVisibility} className="absolute right-2 top-2">
//                     {showConfirmPassword ? <EyeOff className="h-5 w-5 text-gray-500" /> : <Eye className="h-5 w-5 text-gray-500" />}
//                   </button>
//                 </div>
//                 {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword}</p>}
//               </div>

//               {/* Submit Button */}
//               <Button 
//               disabled={isLoading || isFormValid}
//               type="submit"
//               className={`w-full rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 
//                 ${isLoading || isFormValid ? "bg-gray-400 cursor-not-allowed" : "bg-primary hover:bg-secondary"}
//               `}
//               >
//                 Sign Up
//               </Button>
//             </form>
//             <div className="relative">
//               <div className="absolute inset-0 flex items-center">
//                 <div className="w-full border-t border-gray-300"></div>
//               </div>
//               <div className="relative flex justify-center text-sm">
//                 <span className="bg-white px-2 text-gray-500">or</span>
//               </div>
//             </div>
//             {role!=='admin' && <div className="grid gap-2">
//               <button 
//                 onClick={handleGoogleAuth}
//                 className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white p-2 text-sm font-medium hover:bg-gray-50"
//               >
//                 <img src="https://www.google.com/favicon.ico" alt="Google" className="h-5 w-5" />
//                 Continue with Google
//               </button>
//             </div>}
//             <p className="text-center text-sm text-gray-500">
//               Already have an account?{" "}
//               <Link to={`/${role}/login`} className="text-purple-600 hover:underline">
//                 Log in
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SignUp;

import { Eye, EyeOff, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import useForm from "@/hooks/useForm";
import { toast } from "sonner";
import {useSendOtpMutation} from '@/services/commonApi'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const SignUp = ({role}) => {
  const navigate = useNavigate();
  const [sendOtp,{isLoading}] = useSendOtpMutation();
  const {
    formData, errors, showPassword, showConfirmPassword, handleChange, 
    toggleConfirmPasswordVisibility, togglePasswordVisibility
  } = useForm()

  const isFormValid = Object.values(errors).some((err) => err) || 
    !formData.password || 
    !formData.confirmPassword || 
    !formData.email ||
    !formData.firstName

  const handleGoogleAuth =()=>{
    window.location.href = role === 'user' 
    ? import.meta.env.VITE_GOOGLE_USER_AUTH_REQ 
    : import.meta.env.VITE_GOOGLE_TUTOR_AUTH_REQ
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(errors).some((err) => err)) return;

    const toastId = toast.loading("Signing up...");

    const credentials = {
      role,
      firstName : formData.firstName,
      email : formData.email,
      otpType : 'signIn'
    }

   try {
    await sendOtp(credentials).unwrap();
    toast.success(
      role === "admin"
        ? "Signup successful"
        : "An OTP has been sent to your registered email address",
      { id: toastId }
    );

    if(role === 'admin') {
      navigate("/admin/login"); // Admin: go directly to login
    } else {
      navigate(`/${role}/verify-otp`, { state: formData }); // User/Tutor: OTP page
    }
  } catch (error) {
    if(error?.status === 409){
      toast.error('Account already exists, Try login ',{id :toastId})
    }
    toast.error(error?.data?.message || "Signup failed. Try again.", { id: toastId });
  }
  };

  return (
    <div className="min-h-screen flex items-center bg-gradient-to-br from-rose-200 via-white to-rose-200">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left side - Simple inspirational content */}
          <div className="space-y-6 px-4">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 bg-white/80 backdrop-blur-sm rounded-full shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span className="text-xs font-medium text-gray-700">Join our learning community</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Start Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-rose-600">
                Learning Journey
              </span>
            </h1>

            {/* Simple description */}
            <p className="text-lg text-gray-600">
              Create your account and unlock access to expert-led courses and personalized learning experiences.
            </p>

            {/* Simple quote */}
            <div className="mt-8">
              <div className="text-lg text-gray-800 italic mb-2">
                "Education is the passport to the future, for tomorrow belongs to those who prepare for it today."
              </div>
              <div className="text-gray-600 text-sm">— Malcolm X</div>
            </div>
          </div>

          {/* Right side - Sign Up Form (Smaller Card) */}
          <div className="px-4">
            <Card className="w-full max-w-md mx-auto bg-white shadow-lg rounded-xl overflow-hidden border-0">
              <CardHeader className="bg-gradient-to-r from-rose-50 to-rose-50 dark:from-gray-800 dark:to-gray-900 py-6 px-6">
                <CardTitle className="text-xl font-bold text-gray-800 dark:text-white text-center">
                  {role === "user" ? "Student" : role === "tutor" ? "Tutor" : "Admin"} Sign Up
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300 text-center text-sm">
                  Create your account and start your learning journey today
                </CardDescription>
              </CardHeader>
              
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* First Name Field */}
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Username
                    </Label>
                    <Input
                      id="firstName"
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`w-full border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-md focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all text-sm py-2 ${
                        errors.firstName ? "border-red-500" : ""
                      }`}
                      placeholder="Enter your username"
                      required
                    />
                    {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Your Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-md focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all text-sm py-2 ${
                        errors.email ? "border-red-500" : ""
                      }`}
                      placeholder="name@example.com"
                      required
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={`w-full border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-md focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all text-sm py-2 pr-10 ${
                          errors.password ? "border-red-500" : ""
                        }`}
                        placeholder="Password"
                        required
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                  </div>

                  {/* Confirm Password Field */}
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Confirm Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={`w-full border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-md focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all text-sm py-2 pr-10 ${
                          errors.confirmPassword ? "border-red-500" : ""
                        }`}
                        placeholder="Confirm Password"
                        required
                      />
                      <button
                        type="button"
                        onClick={toggleConfirmPasswordVisibility}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                  </div>

                  {/* Submit Button */}
                  <Button 
                    disabled={isLoading || isFormValid}
                    type="submit"
                    className={`w-full rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all text-sm ${
                      isLoading || isFormValid
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow hover:shadow-md"
                    }`}
                  >
                    {isLoading ? "Creating Account..." : "Sign Up"}
                  </Button>

                  {/* Divider */}
                  {role !== 'admin' && (
                    <>
                      <div className="relative mt-4">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="bg-white dark:bg-gray-800 px-2 text-gray-500 dark:text-gray-400 text-xs">or continue with</span>
                        </div>
                      </div>

                      {/* Google Button */}
                      <Button
                        type="button"
                        onClick={handleGoogleAuth}
                        variant="outline"
                        className="w-full flex items-center justify-center gap-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 py-2 px-4 transition-colors text-sm"
                      >
                        <img
                          src="https://www.google.com/favicon.ico"
                          alt="Google"
                          className="h-4 w-4"
                        />
                        <span>Continue with Google</span>
                      </Button>
                    </>
                  )}

                  {/* Login Link */}
                  <p className="text-center text-xs text-gray-500 dark:text-gray-400 pt-3">
                    Already have an account?{" "}
                    <Link 
                      to={`/${role}/login`} 
                      className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:underline font-medium"
                    >
                      Log in
                    </Link>
                  </p>

                  {/* Role Switch Link */}
                  {role !== 'admin' && (
                    <p className="text-center text-xs text-gray-500 dark:text-gray-400">
                      {`Are you a ${role === 'user' ? 'tutor' : 'student'}? Switch to ${role === 'user' ? 'tutor' : 'student'}`} {" "}
                      <Link 
                        to={`/${role === 'user' ? 'tutor' : 'user'}/sign-up`} 
                        className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:underline font-medium"
                      >
                        Signup here!
                      </Link>
                    </p>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
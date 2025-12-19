// import useForm from "@/hooks/useForm";
// import { Eye, EyeOff } from "lucide-react";
// import { toast } from "sonner";
// import { Link, useNavigate } from "react-router-dom";


// function Login({ role, useLogin, useAuthActions }) {
//   const { login } = useAuthActions();
//   const navigate = useNavigate();
//   const [loginAuth, { isLoading }] = useLogin();
//   const { formData, handleChange, errors, togglePasswordVisibility, showPassword } = useForm();

//   const isFormValid =
//     Object.values(errors).some((err) => err) ||
//     !formData.password ||
//     !formData.email;

//   const handleGoogleAuth = () => {
//     window.location.href =
//       role === "user"
//         ? import.meta.env.VITE_GOOGLE_USER_AUTH_REQ
//         : import.meta.env.VITE_GOOGLE_TUTOR_AUTH_REQ;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (isFormValid) return;

//     const loginPromise = new Promise(async (resolve, reject) => {
//       try {
//         const response = await loginAuth(formData).unwrap();
//         login(response?.data?._id);
//         resolve("Login successful!");
//         navigate("/");
//       } catch (error) {
//         reject(error?.data?.message || "Login failed. Please try again.");
//       }
//     });

//     toast.promise(loginPromise, {
//       loading: "Logging in...",
//       success: (msg) => msg,
//       error: (err) => err,
//     });
//   };

//   return (
//     <div className="flex h-screen w-screen items-center justify-center bg-gray-100">
//       <div className="grid h-full w-full md:grid-cols-2 bg-white shadow-lg">
//         <div className="flex items-center justify-center p-8 overflow-auto">
//           <div className="w-full max-w-sm space-y-6">
//              <div className="space-y-2 text-center">
//               <h1 className="text-3xl font-bold">
//               {role === "user" ? "Student" : role === "tutor" ? "Tutor" : "Admin"} Log In
//               </h1>
//               {role!=='admin' && <p className="text-center text-sm text-gray-600">
//                 {`Are you a ${
//                   role === "user" ? "tutor" : "student"
//                 }? Switch to ${
//                   role === "user" ? "tutor" : "student"
//                 }`}{" "}
//                 <Link
//                   to={`/${role === "user" ? "tutor" : "user"}/login`}
//                   className="text-purple-600 hover:underline"
//                 >
//                   Login here!
//                 </Link>
//               </p>}
//             </div>
//             <form onSubmit={handleSubmit} className="space-y-4">
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
//                     errors.email
//                       ? "border-red-500"
//                       : "border-gray-300 focus:border-purple-500/20"
//                   }`}
//                   placeholder="name@example.com"
//                   required
//                 />
//                 {errors.email && (
//                   <p className="text-red-500 text-xs">{errors.email}</p>
//                 )}
//               </div>
//               <div className="space-y-2 relative">
//                 <label htmlFor="password" className="text-sm font-medium block">
//                   Password
//                 </label>
//                 <div className="relative">
//                   <input
//                     id="password"
//                     type={showPassword ? "text" : "password"}
//                     name="password"
//                     placeholder="Password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     className={`w-full rounded-lg border p-2 focus:ring-2 ${
//                       errors.password
//                         ? "border-red-500"
//                         : "border-gray-300 focus:border-purple-500/20"
//                     }`}
//                     required
//                   />
//                   <button
//                     type="button"
//                     onClick={togglePasswordVisibility}
//                     className="absolute right-2 top-2"
//                   >
//                     {showPassword ? (
//                       <EyeOff className="h-5 w-5 text-gray-500" />
//                     ) : (
//                       <Eye className="h-5 w-5 text-gray-500" />
//                     )}
//                   </button>
//                 </div>
//                 {errors.password && (
//                   <p className="text-red-500 text-xs">{errors.password}</p>
//                 )}
//               </div>
//               {role !== 'admin' && <a
//                 href={`/${role}/forgot-password`}
//                 className="block text-right text-sm text-primary hover:underline"
//               >
//                 Forgot password?
//               </a>}
//               <button
//                 type="submit"
//                 disabled={isLoading || isFormValid}
//                 className={`w-full rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 
//                   ${
//                     isLoading || isFormValid
//                       ? "bg-gray-400 cursor-not-allowed"
//                       : "bg-primary hover:bg-secondary"
//                   }
//                 `}
//               >
//                 Log in
//               </button>
//             </form>
//             <div className="relative">
//               <div className="absolute inset-0 flex items-center">
//                 <div className="w-full border-t border-gray-300"></div>
//               </div>
//               <div className="relative flex justify-center text-sm">
//                 <span className="bg-white px-2 text-gray-500">or</span>
//               </div>
//             </div>
//             {role !== 'admin' && <div className="grid gap-2">
//               <button
//                 onClick={handleGoogleAuth}
//                 className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white p-2 text-sm font-medium hover:bg-gray-50"
//               >
//                 <img
//                   src="https://www.google.com/favicon.ico"
//                   alt="Google"
//                   className="h-5 w-5"
//                 />
//                 Continue with Google
//               </button>
//             </div>}
//             <p className="text-center text-sm text-gray-500">
//               Don't have an account?{" "}
//               <a href={`/${role}/sign-up`} className="text-primary hover:underline">
//                 Sign up
//               </a>
//             </p>
//           </div>
//         </div>
//         <div className="hidden md:flex items-center justify-center bg-[#1D1042] p-8 text-white w-full h-full">
//           <div className="max-w-md space-y-4 text-center">
//             <p className="text-2xl font-light">
//             The only way to do <span className="text-purple-400">great work</span>, is to{" "}
//               <span className="text-purple-400">love</span> what you do.
//             </p>
//             <p className="text-sm">- Steve Jobs</p>
//             <img src="/Login.svg" alt="" className="w-[710px] h-[595px]" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;
import useForm from "@/hooks/useForm";
import { Eye, EyeOff, TrendingUp, BookOpen, Users } from "lucide-react";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function Login({ role, useLogin, useAuthActions }) {
  const { login } = useAuthActions();
  const navigate = useNavigate();
  const [loginAuth, { isLoading }] = useLogin();
  const { formData, handleChange, errors, togglePasswordVisibility, showPassword } = useForm();

  const isFormValid =
    Object.values(errors).some((err) => err) ||
    !formData.password ||
    !formData.email;

  const handleGoogleAuth = () => {
    window.location.href =
      role === "user"
        ? import.meta.env.VITE_GOOGLE_USER_AUTH_REQ
        : import.meta.env.VITE_GOOGLE_TUTOR_AUTH_REQ;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid) return;

    const loginPromise = new Promise(async (resolve, reject) => {
      try {
        const response = await loginAuth(formData).unwrap();
        login(response?.data?._id);
        resolve("Login successful!");
        navigate("/");
      } catch (error) {
        reject(error?.data?.message || "Login failed. Please try again.");
      }
    });

    toast.promise(loginPromise, {
      loading: "Logging in...",
      success: (msg) => msg,
      error: (err) => err,
    });
  };

  return (
    <div className="min-h-screen flex items-center bg-gradient-to-br from-rose-200 via-white to-rose-200">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Simple inspirational content */}
          <div className="space-y-8 px-4">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm">
              <TrendingUp className="w-4 h-4 text-amber-600" />
              <span className="text-sm font-medium text-gray-700">Welcome to EduConnect</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Your Learning
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-rose-600">
                Journey Starts Here
              </span>
            </h1>

            {/* Simple description */}
            <p className="text-xl text-gray-600">
              Access personalized courses, connect with expert tutors, and advance your career with our comprehensive learning platform.
            </p>

            {/* Simple icons */}
            <div className="flex items-center gap-6 mt-8">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-gradient-to-br from-amber-50 to-amber-100">
                  <BookOpen className="w-6 h-6 text-amber-600" />
                </div>
                <span className="text-gray-700 font-medium">Quality Courses</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-gradient-to-br from-rose-50 to-rose-100">
                  <Users className="w-6 h-6 text-rose-600" />
                </div>
                <span className="text-gray-700 font-medium">Expert Tutors</span>
              </div>
            </div>

            {/* Simple quote */}
            <div className="mt-10">
              <div className="text-2xl text-gray-800 italic mb-3">
                "The only way to do great work is to love what you do."
              </div>
              <div className="text-gray-600">— Steve Jobs</div>
            </div>
          </div>

          {/* Right side - Login Form */}
          <div className="px-4">
            <Card className="w-full bg-white shadow-2xl rounded-2xl overflow-hidden border-0">
              <CardHeader className="bg-gradient-to-r from-rose-50 to-rose-50 dark:from-gray-800 dark:to-gray-900 pb-8">
                <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white text-center">
                  {role === "user" ? "Student" : role === "tutor" ? "Tutor" : "Admin"} Log In
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300 text-center">
                  Welcome back! Please enter your credentials to access your account.
                </CardDescription>
              </CardHeader>
              
              <CardContent className="p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
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
                      className={`w-full border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-md focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all ${
                        errors.email ? "border-red-500" : ""
                      }`}
                      placeholder="name@example.com"
                      required
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
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
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className={`w-full border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-md focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all pr-10 ${
                          errors.password ? "border-red-500" : ""
                        }`}
                        required
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                    )}
                  </div>

                  {/* Forgot Password Link */}
                  {role !== 'admin' && (
                    <div className="text-right">
                      <a
                        href={`/${role}/forgot-password`}
                        className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:underline"
                      >
                        Forgot password?
                      </a>
                    </div>
                  )}

                  {/* Login Button */}
                  <Button
                    type="submit"
                    disabled={isLoading || isFormValid}
                    className={`w-full rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all ${
                      isLoading || isFormValid
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl"
                    }`}
                  >
                    {isLoading ? "Logging in..." : "Log in"}
                  </Button>

                  {/* Divider */}
                  {role !== 'admin' && (
                    <>
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="bg-white dark:bg-gray-800 px-4 text-gray-500 dark:text-gray-400">or continue with</span>
                        </div>
                      </div>

                      {/* Google Button */}
                      <Button
                        type="button"
                        onClick={handleGoogleAuth}
                        variant="outline"
                        className="w-full flex items-center justify-center gap-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 py-2 px-4 transition-colors"
                      >
                        <img
                          src="https://www.google.com/favicon.ico"
                          alt="Google"
                          className="h-5 w-5"
                        />
                        <span>Continue with Google</span>
                      </Button>
                    </>
                  )}

                  {/* Sign Up Link */}
                  <p className="text-center text-sm text-gray-500 dark:text-gray-400 pt-4">
                    Don't have an account?{" "}
                    <a
                      href={`/${role}/sign-up`}
                      className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:underline font-medium"
                    >
                      Sign up
                    </a>
                  </p>

                  {/* Role Switch Link */}
                  {role !== 'admin' && (
                    <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                      {`Are you a ${
                        role === "user" ? "tutor" : "student"
                      }? Switch to ${
                        role === "user" ? "tutor" : "student"
                      }`}{" "}
                      <Link
                        to={`/${role === "user" ? "tutor" : "user"}/login`}
                        className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:underline font-medium"
                      >
                        Login here!
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

export default Login;
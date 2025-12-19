// import { Link } from "react-router-dom";
// import { Facebook, Github, Twitter, Mail, Globe } from "lucide-react"; 

// const Footer = () => {
//   return (
//     <footer className="bg-[#1D1042] text-white">
//       <div className="mx-auto max-w-7xl px-4 py-12">
//         <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
//           <div>
//             <Link to="/" className="flex items-center gap-2">
//               <img src="/logo.svg" alt="EduLMS Logo" className="h-8 w-8" />
//               <span className="text-xl font-bold">EduLMS</span>
//             </Link>
//             <p className="mt-4 text-sm text-gray-300">
//               Empowering learners through accessible and engaging online education.
//             </p>
//           </div>

//           <div>
//             <h3 className="font-semibold">Get Help</h3>
//             <ul className="mt-4 space-y-2 text-sm text-gray-300">
//               <li>
//                 <Link to="/contact">Contact Us</Link>
//               </li>
//               <li>
//                 <Link to="/articles">Latest Articles</Link>
//               </li>
//               <li>
//                 <Link to="/faq">FAQ</Link>
//               </li>
//             </ul>
//           </div>

//           <div>
//             <h3 className="font-semibold">Programs</h3>
//             <ul className="mt-4 space-y-2 text-sm text-gray-300">
//               <li>
//                 <Link to="/courses/art-design">Art & Design</Link>
//               </li>
//               <li>
//                 <Link to="/courses/business">Business</Link>
//               </li>
//               <li>
//                 <Link to="/courses/it-software">IT & Software</Link>
//               </li>
//               <li>
//                 <Link to="/courses/languages">Languages</Link>
//               </li>
//               <li>
//                 <Link to="/courses/programming">Programming</Link>
//               </li>
//             </ul>
//           </div>

//           <div>
//             <h3 className="font-semibold">Contact Us</h3>
//             <ul className="mt-4 space-y-2 text-sm text-gray-300">
//               <li>Email: EduLMSlms@gmail.com</li>
//             </ul>
//           </div>
//         </div>

//         <div className="mt-8 flex flex-col items-center justify-between border-t border-gray-700 pt-8 sm:flex-row">
//           <p className="text-sm text-gray-300">© 2025 EduLMS. All rights reserved.</p>
//           <div className="mt-4 flex gap-4 sm:mt-0">
//             <Link to="https://facebook.com" target="_blank" className="hover:text-blue-500">
//               <Facebook className="h-5 w-5" />
//             </Link>
//             <Link to="https://github.com" target="_blank" className="hover:text-gray-400">
//               <Github className="h-5 w-5" />
//             </Link>
//             <Link to="https://twitter.com" target="_blank" className="hover:text-blue-400">
//               <Twitter className="h-5 w-5" />
//             </Link>
//             <Link to="https://mail.google.com" target="_blank" className="hover:text-red-500">
//               <Mail className="h-5 w-5" />
//             </Link>
//             <Link to="https://www.google.com" target="_blank" className="hover:text-green-500">
//               <Globe className="h-5 w-5" />
//             </Link>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
import { Link } from "react-router-dom";
import { Send } from "lucide-react";
import { useSelect } from "@/hooks/useSelect";

const Footer = () => {
  const { user, tutor } = useSelect();
  const isStudent = user.isAuthenticated;
  const isTutor = tutor.isAuthenticated;

  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="mx-auto max-w-7xl px-4 py-5">
        {/* Compact Grid */}
        <div className="grid md:grid-cols-5 gap-5 mb-4">
          
          {/* Brand Section - 2 columns */}
          <div className="md:col-span-2">
            <Link to="/" className="block mb-2 group">
              <span className="text-xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors">
                EduLMS
              </span>
            </Link>
            <p className="text-gray-800 font-medium text-sm mb-1">
              Learn skills that actually matter
            </p>
            <p className="text-gray-600 text-sm">
              Industry-relevant courses designed by professionals.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-2 text-sm">Explore</h3>
            <ul className="space-y-1.5">
              <li>
                <Link 
                  to="/explore" 
                  className="text-gray-700 hover:text-gray-900 hover:underline text-sm transition-all duration-200 inline-block"
                >
                  Courses
                </Link>
              </li>
              <li>
                <Link 
                  to="/instructors" 
                  className="text-gray-700 hover:text-gray-900 hover:underline text-sm transition-all duration-200 inline-block"
                >
                  Instructors
                </Link>
              </li>
              <li>
                <Link 
                  to="/pricing" 
                  className="text-gray-700 hover:text-gray-900 hover:underline text-sm transition-all duration-200 inline-block"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="text-gray-700 hover:text-gray-900 hover:underline text-sm transition-all duration-200 inline-block"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Join */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-2 text-sm">Join</h3>
            <ul className="space-y-1.5">
              <li>
                <Link 
                  to="/help" 
                  className="text-gray-700 hover:text-gray-900 hover:underline text-sm transition-all duration-200 inline-block"
                >
                  Help & Support
                </Link>
              </li>
              {!isStudent && !isTutor ? (
                <>
                  <li>
                    <Link 
                      to="/tutor/sign-up" 
                      className="text-gray-700 hover:text-gray-900 hover:underline text-sm transition-all duration-200 inline-block"
                    >
                      Start Teaching
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/user/sign-up" 
                      className="text-gray-700 hover:text-gray-900 hover:underline text-sm transition-all duration-200 inline-block"
                    >
                      Start Learning
                    </Link>
                  </li>
                </>
              ) : isStudent ? (
                <li>
                  <Link 
                    to="/tutor/sign-up" 
                    className="text-gray-700 hover:text-gray-900 hover:underline text-sm transition-all duration-200 inline-block"
                  >
                    Start Teaching
                  </Link>
                </li>
              ) : (
                <li>
                  <Link 
                    to="/user/sign-up" 
                    className="text-gray-700 hover:text-gray-900 hover:underline text-sm transition-all duration-200 inline-block"
                  >
                    Start Learning
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* Subscribe - Fixed colors */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-2 text-sm">Stay Updated</h3>
            <div className="space-y-2">
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email"
                  className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded-l focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 transition-all"
                />
                <button className="bg-gray-800 hover:bg-gray-900 text-white px-3 py-1.5 rounded-r transition-all duration-200 flex items-center gap-1">
                  <Send className="h-3.5 w-3.5" />
                </button>
              </div>
              <p className="text-gray-500 text-xs">
                Get course updates and learning tips.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-4 border-t border-gray-300">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-gray-700 text-sm font-medium">
              © 2025 EduLMS. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              <Link 
                to="/privacy" 
                className="text-gray-600 hover:text-gray-900 hover:underline font-medium transition-all duration-200"
              >
                Privacy Policy
              </Link>
              <Link 
                to="/terms" 
                className="text-gray-600 hover:text-gray-900 hover:underline font-medium transition-all duration-200"
              >
                Terms
              </Link>
              <Link 
                to="/cookies" 
                className="text-gray-600 hover:text-gray-900 hover:underline font-medium transition-all duration-200"
              >
                Cookies
              </Link>
              <Link 
                to="/contact" 
                className="text-gray-600 hover:text-gray-900 hover:underline font-medium transition-all duration-200"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
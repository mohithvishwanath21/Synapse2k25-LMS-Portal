// import { motion } from "framer-motion"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { User, SettingsIcon } from "lucide-react"

// import UpdateEmailForm from '@/components/settings/UpdateEmailForm'
// import UpdatePasswordForm from "@/components/settings/UpdatePasswordForm"
// import DeleteAccount from "@/components/settings/DeleteAccount"
// import ThemeToggle from "@/components/settings/ThemeToggle"

// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.1,
//     },
//   },
// }

// const itemVariants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       type: "spring",
//       stiffness: 300,
//       damping: 24,
//     },
//   },
// }

// export default function Index() {
//   return (
//     <div className="container max-w-4xl py-10 mx-auto">
//       <motion.div initial="hidden" animate="visible" variants={containerVariants} className="space-y-6">
//         <motion.div variants={itemVariants}>
//           <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
//           <p className="text-muted-foreground">Manage your account settings and preferences.</p>
//         </motion.div>

//         <motion.div variants={itemVariants}>
//           <Tabs defaultValue="account" className="w-full">
//             <TabsList className="grid w-full grid-cols-2 mb-8">
//               <TabsTrigger value="account" className="flex items-center gap-2">
//                 <User className="h-4 w-4" />
//                 <span>Account</span>
//               </TabsTrigger>
//               <TabsTrigger value="preferences" className="flex items-center gap-2">
//                 <SettingsIcon className="h-4 w-4" />
//                 <span>Preferences</span>
//               </TabsTrigger>
//             </TabsList>

//             <TabsContent value="account" className="space-y-6">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Email</CardTitle>
//                   <CardDescription>Update your email address associated with your account.</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <UpdateEmailForm />
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardHeader>
//                   <CardTitle>Password</CardTitle>
//                   <CardDescription>Change your password to keep your account secure.</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <UpdatePasswordForm />
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardHeader>
//                   <CardTitle>Delete Account</CardTitle>
//                   <CardDescription>Permanently delete your account and all associated data.</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <DeleteAccount />
//                 </CardContent>
//               </Card>
//             </TabsContent>

//             <TabsContent value="preferences" className="space-y-6">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Appearance</CardTitle>
//                   <CardDescription>Customize the appearance of the application.</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <ThemeToggle />
//                 </CardContent>
//               </Card>
//             </TabsContent>
//           </Tabs>
//         </motion.div>
//       </motion.div>
//     </div>
//   )
// }


import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { User } from "lucide-react"

import UpdateEmailForm from '@/components/settings/UpdateEmailForm'
import UpdatePasswordForm from "@/components/settings/UpdatePasswordForm"
import DeleteAccount from "@/components/settings/DeleteAccount"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
    },
  },
}

export default function Index() {
  return (
    <div className="min-h-screen py-8 px-4 bg-gradient-to-br from-rose-200 via-white to-rose-200">
      <div className="container max-w-4xl mx-auto">
        <motion.div initial="hidden" animate="visible" variants={containerVariants} className="space-y-8">
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Admin Settings</h1>
                <p className="text-gray-600 mt-1">Manage your account security and preferences</p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="space-y-6">
              <Card className="border border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-800">Email Settings</CardTitle>
                  <CardDescription className="text-gray-600">
                    Update your email address associated with your account.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <UpdateEmailForm />
                </CardContent>
              </Card>

              <Card className="border border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-800">Password Security</CardTitle>
                  <CardDescription className="text-gray-600">
                    Change your password to keep your account secure.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <UpdatePasswordForm />
                </CardContent>
              </Card>

              <Card className="border border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-800">Account Management</CardTitle>
                  <CardDescription className="text-gray-600">
                    Deactivate your account and all associated data.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <DeleteAccount />
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
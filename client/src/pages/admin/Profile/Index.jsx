// import { useState ,useEffect} from "react";
// import { RefreshCw, Trash2 } from "lucide-react";
// import { Input } from "@/components/ui/input";;
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { ProfileDialog } from "./ProfileDialog";
// import useForm from "@/hooks/useForm";
// import { imageUpload } from "@/services/Cloudinary/imageUpload";
// import {useAdminLoadProfileQuery, useAdminUpdateProfileMutation} from '@/services/adminApi/adminProfileApi'
// import { toast } from "sonner";
// import { Card } from "@/components/ui/card";
// import LoadingSpinner from "@/components/FallbackUI/LoadingSpinner";

// const Index = () => {
//   const {data : admin, error, isLoading} = useAdminLoadProfileQuery()
//   const adminDetails = admin?.data
//   const loadProfile = useAdminLoadProfileQuery()
//   const [updateProfile] = useAdminUpdateProfileMutation()

//   const [avatarPreview, setAvatarPreview] = useState(null);  
//   const { formData, errors, handleChange ,setFormData} = useForm();


//   useEffect(() => {
//     if (adminDetails) {
//       setFormData({
//         firstName: adminDetails?.firstName || "",
//         lastName: adminDetails?.lastName || "",
//         profileImage: adminDetails?.profileImage || null, 
//         email : adminDetails?.email || ""
//       });
//     }
//   }, [adminDetails , loadProfile]);



//   const notValid = 
//   Object.values(errors).some((err) => err) || 
//   !formData.firstName || 
//   !formData.lastName 
 

  
//   const handleAvatarChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setAvatarPreview(reader.result);
//         handleChange({ target: { name: "profileImage", value: file } }); // formData updates
//       };
//       reader.readAsDataURL(file);
//     }
//   };



//   const isFormChanged =
//   adminDetails &&
//   Object.keys(formData).some((key) => formData[key] !== adminDetails[key]);



//   const handleSubmit = async(e, closeDialog) => {
//     e.preventDefault();
  
//     const toastId = toast.loading(' updating data ...')

//     if(formData.profileImage !== null){
//       const {uploadedImageUrl} = await imageUpload(formData.profileImage);
//       formData.profileImage = uploadedImageUrl
//     }

   
//     try {
//       const response = await updateProfile(formData).unwrap()
//       toast.success('Profile updated successfully',{ id: toastId })
//     } catch (error) {
//       console.log(error)
//       toast.error('Updation Failed please try again later ...')
//     }
//     finally{
//       if (closeDialog) closeDialog(); 
//     }
    
//   };

//   if(isLoading) return(<LoadingSpinner/>)

//   return (
//      <div className="flex justify-center p-4">
//       <Card className="w-full max-w-6xl p-8 bg-white shadow-lg rounded-lg">
//       <div className="space-y-6">
//         <form onSubmit={handleSubmit} className="space-y-6" id="profile-form">
//           {/* Avatar Section */}
//           <div className="mb-8">
//             <Label className="block text-sm font-medium text-gray-700 mb-2">Your avatar</Label>
//             <p className="text-sm text-gray-500 mb-4">PNG or JPG no bigger than 800px wide and tall.</p>
//             <div className="flex items-center gap-4">
//               <div className="relative">
//               <img
//                   src={
//                     avatarPreview
//                     || formData.profileImage 
//                     || "/userProfileIcon.svg" // Default
//                   }
//                   alt="Avatar preview"
//                   className="w-20 h-20 rounded-full object-cover"
//                 />
//                 <Input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" id="profileImage" />
//               </div>
//               <div className="flex flex-wrap gap-3 mt-3">
//                 <Label
//                   htmlFor="profileImage"
//                   className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-200 cursor-pointer"
//                 >
//                   <RefreshCw className="w-4 h-4" />
//                   Change
//                 </Label>
//                 <Button
//                   type="button"
//                   onClick={() => {
//                     setAvatarPreview(null);
//                     setFormData({...formData , profileImage : null})
//                     handleChange({ target: { name: "profileImage", value: null } });
//                   }}
//                   className="flex items-center gap-2 px-3 py-2 border bg-gray-50 border-gray-300 rounded-md text-sm text-gray-700 hover:bg-red-600 hover:text-white"
//                 >
//                   <Trash2 className="w-4 h-4" />
//                   Remove
//                 </Button>
//               </div>
//             </div>
//           </div>

//           {/* Form Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* First Name & Last Name */}
//             <div>
//               <Label className="block text-sm font-medium text-gray-700 mb-2">First Name</Label>
//               <Input
//                 type="text"
//                 name="firstName"
//                 value={formData.firstName}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#7454FD] focus:border-transparent"
//                 placeholder="First Name"
//               />
//               {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
//             </div>
//             <div>
//               <Label className="block text-sm font-medium text-gray-700 mb-2">Last Name</Label>
//               <Input
//                 type="text"
//                 name="lastName"
//                 value={formData.lastName}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#7454FD] focus:border-transparent"
//                 placeholder="Last Name"
//               />
//               {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
//             </div>
//             <div>
//               <Label className="block text-sm font-medium text-gray-700 mb-2">Email</Label>
//               <Input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#7454FD] focus:border-transparent"
//                 placeholder="Email"
//               />
//               {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
//             </div>
             
//           </div>
//           {/* Submit Button */}
//           <div>
//           <ProfileDialog  notValid={notValid || !isFormChanged}
//             btnName={"Save changes"}
//             title={"Update profile details"}
//             desc={`Make changes to your profile here. Click save when you're done.`}
//             onSave={(closeDialog) => handleSubmit(event, closeDialog)} // Pass closeDialog
//           />
//           </div>
//         </form>
//       </div>
//       </Card>
//     </div>
//   );
// };

// export default Index
import { useState ,useEffect} from "react";
import { RefreshCw, Trash2, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ProfileDialog } from "./ProfileDialog";
import useForm from "@/hooks/useForm";
import { imageUpload } from "@/services/Cloudinary/imageUpload";
import {useAdminLoadProfileQuery, useAdminUpdateProfileMutation} from '@/services/adminApi/adminProfileApi'
import { toast } from "sonner";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import LoadingSpinner from "@/components/FallbackUI/LoadingSpinner";

const Index = () => {
  const {data : admin, error, isLoading} = useAdminLoadProfileQuery()
  const adminDetails = admin?.data
  const loadProfile = useAdminLoadProfileQuery()
  const [updateProfile] = useAdminUpdateProfileMutation()

  const [avatarPreview, setAvatarPreview] = useState(null);  
  const { formData, errors, handleChange ,setFormData} = useForm();


  useEffect(() => {
    if (adminDetails) {
      setFormData({
        firstName: adminDetails?.firstName || "",
        lastName: adminDetails?.lastName || "",
        profileImage: adminDetails?.profileImage || null, 
        email : adminDetails?.email || ""
      });
    }
  }, [adminDetails , loadProfile]);



  const notValid = 
  Object.values(errors).some((err) => err) || 
  !formData.firstName || 
  !formData.lastName 
 

  
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
        handleChange({ target: { name: "profileImage", value: file } }); // formData updates
      };
      reader.readAsDataURL(file);
    }
  };



  const isFormChanged =
  adminDetails &&
  Object.keys(formData).some((key) => formData[key] !== adminDetails[key]);



  const handleSubmit = async(e, closeDialog) => {
    e.preventDefault();
  
    const toastId = toast.loading(' updating data ...')

    if(formData.profileImage !== null){
      const {uploadedImageUrl} = await imageUpload(formData.profileImage);
      formData.profileImage = uploadedImageUrl
    }

   
    try {
      const response = await updateProfile(formData).unwrap()
      toast.success('Profile updated successfully',{ id: toastId })
    } catch (error) {
      console.log(error)
      toast.error('Updation Failed please try again later ...')
    }
    finally{
      if (closeDialog) closeDialog(); 
    }
    
  };

  if(isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] bg-gradient-to-br from-rose-200 via-white to-rose-200">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8 px-4 bg-gradient-to-br from-rose-200 via-white to-rose-200">
      <div className="max-w-4xl mx-auto">
        <Card className="w-full bg-white shadow-xl rounded-xl overflow-hidden border-0">
          <CardHeader className="bg-gradient-to-r from-rose-50 to-rose-50 dark:from-gray-800 dark:to-gray-900 pb-8">
            <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white">Admin Profile</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-300">
              Update your personal details and profile information
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-8" id="profile-form">
              {/* Avatar Section */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-6 p-6 bg-gradient-to-br from-rose-100 to-rose-100 dark:from-gray-800/50 dark:to-gray-900/50 rounded-lg border border-blue-100 dark:border-gray-700">
                <div className="relative flex-shrink-0">
                  <div className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-700 shadow-lg overflow-hidden">
                    {(avatarPreview || formData.profileImage) ? (
                      <img
                        src={avatarPreview || formData.profileImage}
                        alt="Avatar preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 dark:from-gray-700 dark:to-gray-800">
                        <User className="w-12 h-12 text-blue-500 dark:text-gray-400" />
                      </div>
                    )}
                  </div>
                  <Input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" id="profileImage" />
                </div>
                
                <div className="flex-grow space-y-3">
                  <h3 className="text-lg font-medium text-gray-800 dark:text-white">Profile Photo</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">PNG or JPG no bigger than 800px wide and tall.</p>
                  <div className="flex flex-wrap gap-3 mt-3">
                    <Label
                      htmlFor="profileImage"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 transition-colors cursor-pointer shadow-sm"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Change
                    </Label>
                    <Button
                      type="button"
                      onClick={() => {
                        setAvatarPreview(null);
                        setFormData({...formData , profileImage : null})
                        handleChange({ target: { name: "profileImage", value: null } });
                      }}
                      variant="outline"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-red-50 dark:bg-gray-800 dark:hover:bg-red-900/20 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-400 transition-colors shadow-sm"
                    >
                      <Trash2 className="w-4 h-4" />
                      Remove
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-6">Basic Information</h3>
                  
                  {/* Form Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
                    {/* First Name & Last Name */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">First Name</Label>
                      <Input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-md focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all"
                        placeholder="First Name"
                      />
                      {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Last Name</Label>
                      <Input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-md focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all"
                        placeholder="Last Name"
                      />
                      {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</Label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-md focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all"
                        placeholder="Email"
                      />
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end pt-6 border-t border-gray-200 dark:border-gray-700">
                  <ProfileDialog  
                    notValid={notValid || !isFormChanged}
                    btnName={"Save changes"}
                    title={"Update profile details"}
                    desc={`Make changes to your profile here. Click save when you're done.`}
                    onSave={(closeDialog) => handleSubmit(event, closeDialog)}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all"
                  />
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index
// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";

// export function ProfileDialog({ onSave, title, btnName, desc ,notValid}) {
//   const [open, setOpen] = useState(false); // State for opening/closing the dialog

//   const handleSave = () => {
//     if (onSave) {
//       onSave(() => setOpen(false)); // Pass setOpen function so it can be used in ProfileDetails
//     }
//   };

//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogTrigger asChild>
//         <Button  disabled={notValid} 
//         onClick={() => setOpen(true)}>Update Profile</Button>
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-[425px]">
//         <DialogHeader>
//           <DialogTitle>{title}</DialogTitle>
//           <DialogDescription>{desc}</DialogDescription>
//         </DialogHeader>
//         <DialogFooter>
//           <Button onClick={handleSave}>{btnName}</Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// }

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function ProfileDialog({ onSave, title, btnName, desc, notValid, className = "" }) {
  const [open, setOpen] = useState(false); // State for opening/closing the dialog

  const handleSave = () => {
    if (onSave) {
      onSave(() => setOpen(false)); // Pass setOpen function so it can be used in ProfileDetails
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          disabled={notValid} 
          onClick={() => setOpen(true)}
          className={`bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all ${className}`}
        >
          {btnName}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] border-0 shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-800 dark:text-white">{title}</DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-300">{desc}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button 
            onClick={handleSave}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all"
          >
            {btnName}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
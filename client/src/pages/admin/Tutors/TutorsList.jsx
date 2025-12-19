// import { useState } from "react";
// import { Search, ChevronLeft, ChevronRight } from "lucide-react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { FilterBox } from "@/components/FilterBox";
// import {useAdminLoadTutorsDetailsQuery, useAdminToggleTutorBlockMutation} from '@/services/adminApi/adminTutorApi'
// import { useNavigate } from "react-router-dom";
// import { Input } from "@/components/ui/input";
// import { AlertDialogDelete } from "@/components/AlertDialog";
// import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";

// const TutorsList = () => {
//     const [searchQuery, setSearchQuery] = useState("");
//     const [currentPage, setCurrentPage] = useState(1);
//     const [filteredQuery,setFilteredQuery] = useState('latest')
//     const limit = 7;
//     const navigate = useNavigate()
//     const {data : tutors, isLoading , error ,refetch} = useAdminLoadTutorsDetailsQuery({
//         page : currentPage,
//         search : searchQuery,
//         limit,
//         filter : filteredQuery
//       })
  
//       const data = tutors?.data;
  
//     return (
//     <Card className="container mx-auto p-6">
//       <CardTitle>
//       <h1 className="mb-8 text-2xl font-bold">Tutors List</h1>
//       </CardTitle>
  
//         {/* Search and Filter */}
//         <div className="mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
//           <div className="relative w-full md:w-96">
//             <Input
//               type="text"
//               placeholder="Search by name and email"
//               className="w-full rounded-lg border border-gray-300 px-4 py-2 pl-10"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//             <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
//           </div >
//           <div className="flex flex-wrap justify-end gap-2 w-full md:w-auto">
//             <FilterBox onSelect={setFilteredQuery}
//           options={[
//             { value: "latest", label: "Latest" },
//             { value: "oldest", label: "Oldest" },
//             { value: "Not-Active", label: "Not-Active" },
//         ]}            
//             />
//           </div>
//         </div>
      
//         {/* Table */}
     
//           { error || isLoading ? <p className="text-center">No users found</p> : 
//           <CardContent className="overflow-x-auto">
//             <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>SI</TableHead>
//                 <TableHead>Name</TableHead>
//                 <TableHead>Email</TableHead>
//                 <TableHead>Phone</TableHead>
//                 <TableHead>Status</TableHead>
//                 <TableHead>Action</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {data?.tutors.map((tutors, index) => (
//                 <TableRow key={tutors.email} >
//                   <TableCell>{(currentPage - 1) * limit + index + 1}</TableCell>
//                   <TableCell 
//                   onClick ={()=>navigate(`/admin/profile/tutors/${tutors._id}`)}
//                   className="flex items-center gap-3 cursor-pointer">
//                     <img
//                       src={tutors?.profileImage || "/userIcon.png"}
//                       alt=""
//                       className="h-8 w-8 rounded-full"
//                     />
//                     {tutors?.firstName}
//                   </TableCell>
//                   <TableCell>{tutors?.email}</TableCell>
//                   <TableCell>{tutors?.phone}</TableCell>
//                   <TableCell>{tutors?.isActive ? 'Active' : 'Not Active'}</TableCell>
//                   <TableCell>       
//                     <AlertDialogDelete
//                      btnName={tutors.isBlocked ? "blocked" : "Block"} 
//                      btnClass={`w-24 h-10 flex items-center justify-center text-sm hover:bg-${!tutors.isBlocked ? "white" : "red-700"} bg-${!tutors.isBlocked ? "white text-black" : "red-700"}`}
//                      deleteApi={useAdminToggleTutorBlockMutation}
//                      id={tutors?._id}
//                      onSuccess={refetch}
//                      />
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//           </CardContent>}
          
  
//         {/* Pagination */}

//        { data?.tutors.length > 0 &&
//         <CardFooter className="mt-6 flex items-center justify-center gap-2 flex-wrap">
//           <button
//             className="rounded-lg p-2 hover:bg-gray-100 disabled:opacity-50"
//             onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//             disabled={currentPage === 1}
//           >
//             <ChevronLeft className="h-5 w-5 text-gray-600" />
//           </button>
//           {Array.from({ length: data?.totalPages || 1 }, (_, i) => i + 1).map((page) => (
//             <button
//               key={page}
//               className={`rounded-lg px-4 py-2 ${
//                 currentPage === page ? "bg-primary text-white" : "text-gray-600 hover:bg-gray-100"
//               }`}
//               onClick={() => setCurrentPage(page)}
//             >
//               {page.toString().padStart(2, "0")}
//             </button>
//           ))}
//           <button
//             className="rounded-lg p-2 hover:bg-gray-100 disabled:opacity-50"
//             onClick={() => setCurrentPage((prev) => prev + 1)}
//             disabled={currentPage >= (data?.totalPages || 1)}
//           >
//             <ChevronRight className="h-5 w-5 text-gray-600" />
//           </button>
//         </CardFooter>}
//       </Card>
//     );
//   };

// export default TutorsList


import { useState } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FilterBox } from "@/components/FilterBox";
import { useAdminLoadTutorsDetailsQuery, useAdminToggleTutorBlockMutation } from '@/services/adminApi/adminTutorApi';
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { AlertDialogDelete } from "@/components/AlertDialog";
import { Card, CardContent, CardFooter, CardTitle, CardHeader, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const TutorsList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredQuery, setFilteredQuery] = useState('latest');
  const limit = 7;
  const navigate = useNavigate();
  
  const { data: tutors, isLoading, error, refetch } = useAdminLoadTutorsDetailsQuery({
    page: currentPage,
    search: searchQuery,
    limit,
    filter: filteredQuery
  });

  const data = tutors?.data;

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-200 via-white to-rose-200 p-4 md:p-6">
      <Card className="container mx-auto p-6 shadow-md border-0">
        <CardHeader className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-t-lg -m-6 mb-6 p-6">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl font-bold text-gray-800 mb-2">Tutors List</CardTitle>
              <CardDescription className="flex items-center">
                <Badge variant="secondary" className="mr-2 bg-rose-100 text-rose-800 hover:bg-rose-200">
                  {data?.tutors?.length || 0}
                </Badge>
                total tutors registered
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <div className="mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-96">
            <Input
              type="text"
              placeholder="Search by name and email"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 pl-10 focus:border-rose-300 focus:ring-rose-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-rose-400" />
          </div>
          <div className="flex flex-wrap justify-end gap-2 w-full md:w-auto">
            <FilterBox 
              onSelect={setFilteredQuery}
              options={[
                { value: "latest", label: "Latest" },
                { value: "oldest", label: "Oldest" },
                { value: "Not-Active", label: "Not Active" },
              ]}
            />
          </div>
        </div>

        {error || isLoading ? (
          <div className="py-12 text-center">
            <div className="bg-rose-50 inline-flex rounded-full p-4 mb-4">
              <Search className="h-8 w-8 text-rose-400" />
            </div>
            <p className="text-gray-500 font-medium mb-1">No users found</p>
            <p className="text-sm text-gray-400">Try changing your search or filter</p>
          </div>
        ) : (
          <CardContent className="overflow-x-auto px-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-rose-50">
                  <TableHead className="font-semibold">SI</TableHead>
                  <TableHead className="font-semibold">Name</TableHead>
                  <TableHead className="font-semibold">Email</TableHead>
                  <TableHead className="font-semibold">Phone</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.tutors.map((tutors, index) => (
                  <TableRow key={tutors.email} className="hover:bg-rose-50/50">
                    <TableCell>{(currentPage - 1) * limit + index + 1}</TableCell>
                    <TableCell 
                      onClick={() => navigate(`/admin/profile/tutors/${tutors._id}`)}
                      className="flex items-center gap-3 cursor-pointer hover:text-rose-600"
                    >
                      <img
                        src={tutors?.profileImage || "/userIcon.png"}
                        alt=""
                        className="h-8 w-8 rounded-full border border-rose-100"
                      />
                      {tutors?.firstName} {tutors?.lastName}
                    </TableCell>
                    <TableCell>{tutors?.email}</TableCell>
                    <TableCell>{tutors?.phone || "N/A"}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        tutors?.isActive 
                          ? "bg-green-100 text-green-800" 
                          : "bg-red-100 text-red-800"
                      }`}>
                        {tutors?.isActive ? 'Active' : 'Not Active'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <AlertDialogDelete
                        btnName={tutors.isBlocked ? "Unblock" : "Block"}
                        btnClass={`w-24 h-9 ${
                          tutors.isBlocked 
                            ? "bg-rose-500 hover:bg-rose-600 text-white"
                            : "bg-rose-500 hover:bg-rose-600 text-white"
                        }`}
                        deleteApi={useAdminToggleTutorBlockMutation}
                        id={tutors?._id}
                        onSuccess={refetch}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        )}

        {data?.tutors.length > 0 && (
          <CardFooter className="mt-6 flex items-center justify-center gap-2 flex-wrap">
            <button
              className="rounded-lg p-2 hover:bg-rose-100 disabled:opacity-50"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-5 w-5 text-rose-600" />
            </button>
            {Array.from({ length: data?.totalPages || 1 }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`rounded-lg px-4 py-2 ${
                  currentPage === page 
                    ? "bg-rose-500 text-white" 
                    : "text-rose-600 hover:bg-rose-100"
                }`}
                onClick={() => setCurrentPage(page)}
              >
                {page.toString().padStart(2, "0")}
              </button>
            ))}
            <button
              className="rounded-lg p-2 hover:bg-rose-100 disabled:opacity-50"
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={currentPage >= (data?.totalPages || 1)}
            >
              <ChevronRight className="h-5 w-5 text-rose-600" />
            </button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default TutorsList;
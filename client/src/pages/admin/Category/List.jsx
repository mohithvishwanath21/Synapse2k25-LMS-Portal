// import {  useState } from "react"
// import { Search, ChevronLeft, ChevronRight ,Trash2, Edit, PlusCircle } from "lucide-react"
// import { useNavigate } from "react-router-dom"
// import {
//   Table, TableBody,TableCaption,TableCell, TableHead,TableHeader,TableRow,
// } from "@/components/ui/table"
// import FormModal from "./components/FormModal"
// import {useAdminLoadCategoriesQuery, useAdminAddCategoryMutation, 
//   useAdminDeleteCategoryMutation, useAdminUpdateCategoryMutation} from '@/services/adminApi/adminCategoryApi'
// import { AlertDialogDelete } from "@/components/AlertDialog"
// import { Badge } from "@/components/ui/badge"
// import { FilterBox } from "@/components/FilterBox"
// import { Input } from "@/components/ui/input"
// import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card"

// const List = () => {
  
//   const [searchQuery, setSearchQuery] = useState("")
//   const [currentPage, setCurrentPage] = useState(1)
//   const [filteredQuery,setFilteredQuery] = useState('latest')
//   const limit = 7
//   const navigate = useNavigate()
//   const {data : category, isLoading , error ,refetch} = useAdminLoadCategoriesQuery({
//     page : currentPage,
//     search : searchQuery,
//     limit,
//     filter : filteredQuery
//   })
//   const data = category?.data;
 
//   return (
//     <Card className="container mx-auto px-4 py-8">
//       <CardTitle>
//       <h1 className="mb-8 text-2xl font-bold text-center md:text-left">Category Management</h1>
//       </CardTitle>
//       {/* Search and Filter */}
//       <div className="mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
//         <div className="relative w-full md:w-96">
//           <Input
//             type="text"
//             placeholder="Search by name and description"
//             className="w-full rounded-lg border border-gray-300 px-4 py-2 pl-10"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//           <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
//         </div >
//         <div className="flex flex-wrap justify-end gap-2 w-full md:w-auto">
//           <FormModal title={'Add Category'} useCategory={useAdminAddCategoryMutation} 
//           style={"bg-blue-600 hover:bg-blue-700 rounded-lg border border-gray-300 px-4 py-2"} type={'add'}/>
//           <FilterBox onSelect={setFilteredQuery} 
//           options={[
//             { value: "latest", label: "Latest" },
//             { value: "oldest", label: "Oldest" },
//             { value: "Not-Active", label: "Not-Active" },
//         ]}
//           />
//         </div>
//       </div>

//      { error || isLoading ? <p className="text-center">No category found</p> : 
//      <CardContent className="overflow-x-auto">
//      <Table>
//         <TableCaption>List of available categories</TableCaption>
//         <TableHeader>
//           <TableRow>
//             <TableHead className="w-12">SI</TableHead>
//             <TableHead>Category Name</TableHead>
//             <TableHead>Description</TableHead>
//             <TableHead className="text-right">Action</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {data?.categories?.map((category, index) => (
//             <TableRow key={index} className="hover:bg-gray-50">
//               <TableCell>{(currentPage - 1) * limit + index + 1}</TableCell>
//               <TableCell 
//               className="font-semibold">
//                 {category.name} </TableCell>
//               <TableCell>{category.description}</TableCell>
//               <TableCell className="flex flex-col md:flex-row items-center justify-end gap-12">
//                 <Badge 
//                   className={`${category?.isActive ? 'bg-green-500' : 'bg-red-500'} text-white px-3 py-1 rounded text-sm ${category?.isActive ? 'hover:bg-green-500' : 'hover:bg-red-500'}`}
//                 >
//                  {category?.isActive ? 'Active' : 'Not Active'}
//                 </Badge>
//                 <div className="flex flex-wrap justify-end gap-2">
//                 <FormModal title={<Edit/>} 
//                 useCategory={useAdminUpdateCategoryMutation}
//                 name={category.name}
//                 type={'edit'} 
//                 style={"bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"}/>
//                 <AlertDialogDelete 
//                 onSuccess={refetch}
//                 id={category._id}
//                 btnName={  <Trash2 />} 
//                 btnClass={"bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"}
//                 deleteApi={useAdminDeleteCategoryMutation}
//                 />
//                 </div>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//       </CardContent>
//       }

//       {/* Pagination */}
//       { data?.categories?.length > 0 
//       && <CardFooter className="mt-6 flex items-center justify-center gap-2 flex-wrap">
//         <button
//           className="rounded-lg p-2 hover:bg-gray-100 disabled:opacity-50"
//           onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//           disabled={currentPage === 1}
//         >
//           <ChevronLeft className="h-5 w-5 text-gray-600" />
//         </button>
//         {Array.from({ length: data?.totalPages || 1 }, (_, i) => i + 1).map((page) => (
//           <button
//             key={page}
//             className={`rounded-lg px-4 py-2 ${
//               currentPage === page ? "bg-primary text-white" : "text-gray-600 hover:bg-gray-100"
//             }`}
//             onClick={() => setCurrentPage(page)}
//           >
//             {page.toString().padStart(2, "0")}
//           </button>
//         ))}
//         <button
//           className="rounded-lg p-2 hover:bg-gray-100 disabled:opacity-50"
//           onClick={() => setCurrentPage((prev) => prev + 1)}
//           disabled={currentPage >= (data?.totalPages || 1)}
//         >
//           <ChevronRight className="h-5 w-5 text-gray-600" />
//         </button>
//       </CardFooter>}
//     </Card>
//   )
// }

// export default List

import {  useState } from "react"
import { Search, ChevronLeft, ChevronRight ,Trash2, Edit, PlusCircle } from "lucide-react"
import { useNavigate } from "react-router-dom"
import {
  Table, TableBody,TableCaption,TableCell, TableHead,TableHeader,TableRow,
} from "@/components/ui/table"
import FormModal from "./components/FormModal"
import {useAdminLoadCategoriesQuery, useAdminAddCategoryMutation, 
  useAdminDeleteCategoryMutation, useAdminUpdateCategoryMutation} from '@/services/adminApi/adminCategoryApi'
import { AlertDialogDelete } from "@/components/AlertDialog"
import { Badge } from "@/components/ui/badge"
import { FilterBox } from "@/components/FilterBox"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const List = () => {
  
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [filteredQuery,setFilteredQuery] = useState('latest')
  const limit = 7
  const navigate = useNavigate()
  const {data : category, isLoading , error ,refetch} = useAdminLoadCategoriesQuery({
    page : currentPage,
    search : searchQuery,
    limit,
    filter : filteredQuery
  })
  const data = category?.data;
 
  return (
    <div className="min-h-screen py-8 px-4 bg-gradient-to-br from-rose-200 via-white to-rose-200">
      <div className="max-w-6xl mx-auto">
        <Card className="bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden border-0">
          <CardHeader className="bg-gradient-to-r from-rose-50 to-rose-50 dark:from-gray-800 dark:to-gray-900 pb-8">
            <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white">Category Management</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-300">
              Manage course categories and their status
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-6">
            {/* Search and Filter */}
            <div className="mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="relative w-full md:w-96">
                <Input
                  type="text"
                  placeholder="Search by name and description"
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2 pl-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
              </div >
              <div className="flex flex-wrap justify-end gap-2 w-full md:w-auto">
                <FormModal 
                  title={'Add Category'} 
                  useCategory={useAdminAddCategoryMutation} 
                  style={"bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all rounded-lg px-4 py-2"} 
                  type={'add'}
                />
                <FilterBox 
                  onSelect={setFilteredQuery} 
                  options={[
                    { value: "latest", label: "Latest" },
                    { value: "oldest", label: "Oldest" },
                    { value: "Not-Active", label: "Not-Active" },
                  ]}
                />
              </div>
            </div>

            { error || isLoading ? (
              <p className="text-center text-gray-600 dark:text-gray-300 py-8">No category found</p>
            ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableCaption className="text-gray-600 dark:text-gray-400">List of available categories</TableCaption>
                <TableHeader>
                  <TableRow className="border-gray-200 dark:border-gray-700">
                    <TableHead className="w-12 text-gray-700 dark:text-gray-300 font-semibold">SI</TableHead>
                    <TableHead className="text-gray-700 dark:text-gray-300 font-semibold">Category Name</TableHead>
                    <TableHead className="text-gray-700 dark:text-gray-300 font-semibold">Description</TableHead>
                    <TableHead className="text-right text-gray-700 dark:text-gray-300 font-semibold">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.categories?.map((category, index) => (
                    <TableRow key={index} className="border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                      <TableCell className="text-gray-600 dark:text-gray-400">{(currentPage - 1) * limit + index + 1}</TableCell>
                      <TableCell className="font-semibold text-gray-800 dark:text-white">
                        {category.name} 
                      </TableCell>
                      <TableCell className="text-gray-600 dark:text-gray-400">{category.description}</TableCell>
                      <TableCell className="flex flex-col md:flex-row items-center justify-end gap-4">
                        <Badge 
                          className={`${
                            category?.isActive 
                              ? 'bg-gradient-to-r from-green-500 to-green-600 text-white' 
                              : 'bg-gradient-to-r from-red-500 to-red-600 text-white'
                          } px-3 py-1 rounded-full text-sm shadow-sm`}
                        >
                          {category?.isActive ? 'Active' : 'Not Active'}
                        </Badge>
                        <div className="flex gap-2">
                          <FormModal 
                            title={<Edit className="h-4 w-4"/>} 
                            useCategory={useAdminUpdateCategoryMutation}
                            name={category.name}
                            type={'edit'} 
                            style={"bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-sm hover:shadow-md px-3 py-1.5 rounded-md"}
                          />
                          <AlertDialogDelete 
                            onSuccess={refetch}
                            id={category._id}
                            btnName={<Trash2 className="h-4 w-4"/>} 
                            btnClass={"bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-sm hover:shadow-md px-3 py-1.5 rounded-md"}
                            deleteApi={useAdminDeleteCategoryMutation}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            )}
          </CardContent>

          {/* Pagination */}
          { data?.categories?.length > 0 && (
            <CardFooter className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-center gap-2 flex-wrap w-full">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 border border-gray-300 dark:border-gray-600"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                </Button>
                {Array.from({ length: data?.totalPages || 1 }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    className={`rounded-lg px-4 py-2 ${
                      currentPage === page 
                        ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md" 
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-300 dark:border-gray-600"
                    }`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page.toString().padStart(2, "0")}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 border border-gray-300 dark:border-gray-600"
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  disabled={currentPage >= (data?.totalPages || 1)}
                >
                  <ChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                </Button>
              </div>
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  )
}

export default List
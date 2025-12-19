// import { ChevronLeft, ChevronRight, Delete, Edit, Search, Trash, Trash2 } from 'lucide-react'
// import React, { useState } from 'react'
// import { FilterBox } from './components/FilterBox'
// import { Input } from '@/components/ui/input'
// import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
// import { useAdminLoadOrdersQuery } from '@/services/adminApi/adminOrderApi.js'
// import { format } from 'date-fns'
// import LoadingSpinner from '@/components/FallbackUI/LoadingSpinner'
// import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card'

// const Index = () => {
//     const [searchQuery, setSearchQuery] = useState("")
//     const [currentPage, setCurrentPage] = useState(1)
//     const [filteredQuery,setFilteredQuery] = useState('All')
//     const [sortedQuery,setSortedQuery] = useState('Latest')
//     const limit = 7;
//     const {data : orders, isLoading , error ,refetch} = useAdminLoadOrdersQuery({
//     page : currentPage,
//     search : searchQuery,
//     limit,
//     filter : filteredQuery,
//     sort : sortedQuery
//   })

//   const filterValues = ['All','Pending','Success','Failed']
//   const sortValues = ['Latest','Oldest','Price-low-to-high','Price-high-to-low']
  
//   const data = orders?.data
//   console.log(data)

//   if(isLoading) return(<LoadingSpinner/>)
 
//   return (
//     <Card className="container mx-auto px-4 py-8">
//       <CardTitle>
//       <h1 className="mb-8 text-2xl font-bold text-center md:text-left">Orders List</h1>
//       </CardTitle>

//     <div className="mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
//     <div className="relative w-full md:w-96">
//           <Input
//             type="text"
//             placeholder="Search by student name and email, course name"
//             className="w-full rounded-lg border border-gray-300 px-4 py-2 pl-10"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//           <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
//         </div >
//         <div className="flex flex-wrap justify-end gap-2 w-full md:w-auto">
//           <FilterBox onSelect={setFilteredQuery} filterValues={filterValues} title={'Filter'}/>
//           <FilterBox onSelect={setSortedQuery} filterValues={sortValues} title={'Sort'}/>
//         </div>
//     </div>

//     <CardContent className="overflow-x-auto">
//     { error ? <p className="text-center">No Order found</p> :
//         <Table>
//             <TableCaption>List of available Orders</TableCaption>
//             <TableHeader>
//                 <TableRow>
//                 <TableHead className="w-12">SI</TableHead>
//                 <TableHead >Order ID</TableHead>
//                 <TableHead >Student Name</TableHead>
//                 <TableHead >Student Email</TableHead>
//                 <TableHead >Course Purchased</TableHead>
//                 <TableHead >Amount Paid</TableHead>
//                 <TableHead >Transaction ID</TableHead>
//                 <TableHead >Payment Status</TableHead>
//                 <TableHead >Coupon Used</TableHead>
//                 <TableHead >Order Date</TableHead>
//                 </TableRow>
//             </TableHeader>
//             <TableBody>
//                {data?.orders?.map((order,index)=>(
//                 <TableRow key={index} className="hover:bg-gray-100">

//                 <TableCell>{(currentPage - 1) * limit + index + 1}</TableCell>
//                 <TableCell>{order?.paymentDetails.orderId}</TableCell>
//                 <TableCell>{order?.userData.name}</TableCell>
//                 <TableCell>{order?.userData.email}</TableCell>
//                 <TableCell>{order?.courseName}</TableCell>
//                 <TableCell>{order?.price.finalPrice}</TableCell>
//                 <TableCell>{order?.paymentDetails.transactionId ? order?.paymentDetails.transactionId : 'N/A'}</TableCell>
//                 <TableCell
//                 className = {`${order?.paymentStatus === 'pending' 
//                   ? 'text-yellow-500' 
//                   : order?.paymentStatus === 'success' 
//                   ? 'text-green-500' 
//                   : 'text-red-500'}`}
//                 >{order?.paymentStatus}</TableCell>
//                 <TableCell>{order?.price.couponCode ? order?.price.couponCode : 'N/A'}</TableCell>
//                 <TableCell>{format(new Date(order?.createdAt),'PPP')}</TableCell>
//                 </TableRow>
//                ))}
//             </TableBody>
//         </Table> }
//     </CardContent>

//     {/* Pagination */}
//    { data?.orders?.length > 0 &&
//     <CardFooter className="mt-6 flex items-center justify-center gap-2 flex-wrap">
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

// export default Index

import { ChevronLeft, ChevronRight, Search } from 'lucide-react'
import React, { useState } from 'react'
import { FilterBox } from './components/FilterBox'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useAdminLoadOrdersQuery } from '@/services/adminApi/adminOrderApi.js'
import { format } from 'date-fns'
import LoadingSpinner from '@/components/FallbackUI/LoadingSpinner'
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const Index = () => {
    const [searchQuery, setSearchQuery] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [filteredQuery,setFilteredQuery] = useState('All')
    const [sortedQuery,setSortedQuery] = useState('Latest')
    const limit = 7;
    const {data : orders, isLoading , error ,refetch} = useAdminLoadOrdersQuery({
    page : currentPage,
    search : searchQuery,
    limit,
    filter : filteredQuery,
    sort : sortedQuery
  })

  const filterValues = ['All','Pending','Success','Failed']
  const sortValues = ['Latest','Oldest','Price-low-to-high','Price-high-to-low']
  
  const data = orders?.data

  if(isLoading) return (
    <div className="flex justify-center items-center min-h-[60vh] bg-gradient-to-br from-rose-200 via-white to-rose-200">
      <LoadingSpinner />
    </div>
  )
 
  return (
    <div className="min-h-screen py-8 px-4 bg-gradient-to-br from-rose-200 via-white to-rose-200">
      <div className="max-w-7xl mx-auto">
        <Card className="bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden border-0">
          <CardHeader className="bg-gradient-to-r from-rose-50 to-rose-50 dark:from-gray-800 dark:to-gray-900 pb-8">
            <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white">Orders List</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-300">
              View and manage all course purchase orders
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6">
            <div className="mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="relative w-full md:w-96">
                <Input
                  type="text"
                  placeholder="Search by student name and email, course name"
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2 pl-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
              </div>
              <div className="flex flex-wrap justify-end gap-2 w-full md:w-auto">
                <FilterBox onSelect={setFilteredQuery} filterValues={filterValues} title={'Filter'}/>
                <FilterBox onSelect={setSortedQuery} filterValues={sortValues} title={'Sort'}/>
              </div>
            </div>

            { error ? (
              <p className="text-center text-gray-600 dark:text-gray-300 py-8">No Order found</p>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableCaption className="text-gray-600 dark:text-gray-400">List of available Orders</TableCaption>
                  <TableHeader>
                    <TableRow className="border-gray-200 dark:border-gray-700">
                      <TableHead className="w-12 text-gray-700 dark:text-gray-300 font-semibold">SI</TableHead>
                      <TableHead className="text-gray-700 dark:text-gray-300 font-semibold">Order ID</TableHead>
                      <TableHead className="text-gray-700 dark:text-gray-300 font-semibold">Student Name</TableHead>
                      <TableHead className="text-gray-700 dark:text-gray-300 font-semibold">Student Email</TableHead>
                      <TableHead className="text-gray-700 dark:text-gray-300 font-semibold">Course Purchased</TableHead>
                      <TableHead className="text-gray-700 dark:text-gray-300 font-semibold">Amount Paid</TableHead>
                      <TableHead className="text-gray-700 dark:text-gray-300 font-semibold">Transaction ID</TableHead>
                      <TableHead className="text-gray-700 dark:text-gray-300 font-semibold">Payment Status</TableHead>
                      <TableHead className="text-gray-700 dark:text-gray-300 font-semibold">Coupon Used</TableHead>
                      <TableHead className="text-gray-700 dark:text-gray-300 font-semibold">Order Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data?.orders?.map((order, index) => (
                      <TableRow key={index} className="border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                        <TableCell className="text-gray-600 dark:text-gray-400">{(currentPage - 1) * limit + index + 1}</TableCell>
                        <TableCell className="font-medium text-gray-800 dark:text-white">{order?.paymentDetails.orderId}</TableCell>
                        <TableCell className="text-gray-600 dark:text-gray-400">{order?.userData.name}</TableCell>
                        <TableCell className="text-gray-600 dark:text-gray-400">{order?.userData.email}</TableCell>
                        <TableCell className="font-medium text-gray-800 dark:text-white">{order?.courseName}</TableCell>
                        <TableCell className="font-medium text-gray-800 dark:text-white">₹{order?.price.finalPrice}</TableCell>
                        <TableCell className="text-gray-600 dark:text-gray-400">
                          {order?.paymentDetails.transactionId ? order?.paymentDetails.transactionId : 'N/A'}
                        </TableCell>
                        <TableCell>
                          <Badge 
                            className={`${
                              order?.paymentStatus === 'success' 
                                ? 'bg-gradient-to-r from-green-500 to-green-600 text-white' 
                                : order?.paymentStatus === 'pending'
                                ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white'
                                : 'bg-gradient-to-r from-red-500 to-red-600 text-white'
                            } px-3 py-1 rounded-full text-xs shadow-sm`}
                          >
                            {order?.paymentStatus}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-600 dark:text-gray-400">
                          {order?.price.couponCode ? order?.price.couponCode : 'N/A'}
                        </TableCell>
                        <TableCell className="text-gray-600 dark:text-gray-400">
                          {format(new Date(order?.createdAt),'PPP')}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>

          {/* Pagination */}
          { data?.orders?.length > 0 && (
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

export default Index
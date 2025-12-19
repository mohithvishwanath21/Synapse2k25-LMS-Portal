// import { ChevronLeft, ChevronRight, Delete, Edit, Search, Trash, Trash2 } from 'lucide-react'
// import React, { use, useState } from 'react'
// import FormModal from './components/FormModal'
// import { FilterBox } from '@/components/FilterBox'
// import { Input } from '@/components/ui/input'
// import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
// import { useAdminCreateCouponMutation, useAdminLoadCouponsQuery,
//      useAdminDeleteCouponMutation, useAdminUpdateCouponMutation} from '@/services/adminApi/adminCouponApi.js'  
// import { useNavigate } from 'react-router-dom'
// import { format } from 'date-fns'
// import LoadingSpinner from '@/components/FallbackUI/LoadingSpinner'
// import { Button } from '@/components/ui/button'
// import { AlertDialogDelete } from '@/components/AlertDialog'
// import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card'

// const Index = () => {
//     const [searchQuery, setSearchQuery] = useState("")
//     const [currentPage, setCurrentPage] = useState(1)
//     const [filteredQuery,setFilteredQuery] = useState('latest')
//     const limit = 7;
//     const navigate = useNavigate()
//     const {data : coupon, isLoading , error ,refetch} = useAdminLoadCouponsQuery({
//     page : currentPage,
//     search : searchQuery,
//     limit,
//     filter : filteredQuery
//   })

//   const data = coupon?.data

//   if(isLoading) return(<LoadingSpinner/>)
 
//   return (
//     <Card className="container mx-auto px-4 py-8">
//       <CardTitle>
//       <h1 className="mb-8 text-2xl font-bold text-center md:text-left">Coupon Management</h1>
//       </CardTitle>

//     <div className="mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
//     <div className="relative w-full md:w-96">
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
//             <FormModal useAction={useAdminCreateCouponMutation} refetch={refetch}/> 
//           <FilterBox onSelect={setFilteredQuery} 
//           options={[
//             { value: "latest", label: "Latest" },
//             { value: "oldest", label: "Oldest" },
//             { value: "Not-Active", label: "Not-Active" },
//         ]}          
//           />
//         </div>
//     </div>

//     <CardContent className="overflow-x-auto">
//     { error ? <p className="text-center">No coupon found</p> :
//         <Table>
//             <TableCaption>List of available coupons</TableCaption>
//             <TableHeader>
//                 <TableRow>
//                 <TableHead className="w-12">SI</TableHead>
//                 <TableHead >Coupon Code</TableHead>
//                 <TableHead >Discount Type</TableHead>
//                 <TableHead >Discount Value</TableHead>
//                 <TableHead >Min Purchase</TableHead>
//                 <TableHead >Max Discount</TableHead>
//                 <TableHead >Usage Limit</TableHead>
//                 <TableHead >Expiry</TableHead>
//                 <TableHead >Status</TableHead>
//                 <TableHead colSpan={2} className='text-center' >Actions</TableHead>

//                 </TableRow>
//             </TableHeader>
//             <TableBody>
//                {data?.coupons?.map((coupon,index)=>(
//                 <TableRow key={index} className="hover:bg-gray-100">

//                 <TableCell>{(currentPage - 1) * limit + index + 1}</TableCell>
//                 <TableCell>{coupon.code}</TableCell>
//                 <TableCell>{coupon.discountType}</TableCell>
//                 <TableCell>{`${coupon.discountValue}${coupon.discountType === 'percentage' ? '%' : ''}`}</TableCell>
//                 <TableCell>{coupon.minPurchaseAmount}</TableCell>
//                 <TableCell>{coupon.maxDiscount}</TableCell>
//                 <TableCell>{coupon.usageLimit}</TableCell>
//                 <TableCell>{format(new Date(coupon.expiryDate),'PPP')}</TableCell>
//                 <TableCell>{coupon.isActive ? 'Active' : 'InActive'}</TableCell>
//                 <TableCell>   
//                     <FormModal useAction={useAdminUpdateCouponMutation} existValues={data?.coupons[index]} refetch={refetch}/> 
//                 </TableCell>
//                 <TableCell>
//                 <AlertDialogDelete
//                 onSuccess={refetch}
//                 id={coupon._id}
//                 btnName={  <Trash2 />} 
//                 btnClass={"bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"}
//                 deleteApi={useAdminDeleteCouponMutation}
//                 />  
//                 </TableCell>
//                 </TableRow>
//                ))}
//             </TableBody>
//         </Table> }
//     </CardContent>

//     {/* Pagination */}
//    { data?.coupons?.length > 0 && <CardFooter className="mt-6 flex items-center justify-center gap-2 flex-wrap">
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
import { ChevronLeft, ChevronRight, Search, Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import FormModal from './components/FormModal'
import { FilterBox } from '@/components/FilterBox'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useAdminCreateCouponMutation, useAdminLoadCouponsQuery,
     useAdminDeleteCouponMutation, useAdminUpdateCouponMutation} from '@/services/adminApi/adminCouponApi.js'  
import { format } from 'date-fns'
import LoadingSpinner from '@/components/FallbackUI/LoadingSpinner'
import { AlertDialogDelete } from '@/components/AlertDialog'
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const Index = () => {
    const [searchQuery, setSearchQuery] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [filteredQuery,setFilteredQuery] = useState('latest')
    const limit = 7;
    const {data : coupon, isLoading , error ,refetch} = useAdminLoadCouponsQuery({
    page : currentPage,
    search : searchQuery,
    limit,
    filter : filteredQuery
  })

  const data = coupon?.data

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
            <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white">Coupon Management</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-300">
              Create and manage discount coupons for courses
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6">
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
              </div>
              <div className="flex flex-wrap justify-end gap-2 w-full md:w-auto">
                <FormModal useAction={useAdminCreateCouponMutation} refetch={refetch}/> 
                <FilterBox onSelect={setFilteredQuery} 
                  options={[
                    { value: "latest", label: "Latest" },
                    { value: "oldest", label: "Oldest" },
                    { value: "Not-Active", label: "Not-Active" },
                  ]}          
                />
              </div>
            </div>

            { error ? (
              <p className="text-center text-gray-600 dark:text-gray-300 py-8">No coupon found</p>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableCaption className="text-gray-600 dark:text-gray-400">List of available coupons</TableCaption>
                  <TableHeader>
                    <TableRow className="border-gray-200 dark:border-gray-700">
                      <TableHead className="w-12 text-gray-700 dark:text-gray-300 font-semibold">SI</TableHead>
                      <TableHead className="text-gray-700 dark:text-gray-300 font-semibold">Coupon Code</TableHead>
                      <TableHead className="text-gray-700 dark:text-gray-300 font-semibold">Discount Type</TableHead>
                      <TableHead className="text-gray-700 dark:text-gray-300 font-semibold">Discount Value</TableHead>
                      <TableHead className="text-gray-700 dark:text-gray-300 font-semibold">Min Purchase</TableHead>
                      <TableHead className="text-gray-700 dark:text-gray-300 font-semibold">Max Discount</TableHead>
                      <TableHead className="text-gray-700 dark:text-gray-300 font-semibold">Usage Limit</TableHead>
                      <TableHead className="text-gray-700 dark:text-gray-300 font-semibold">Expiry</TableHead>
                      <TableHead className="text-gray-700 dark:text-gray-300 font-semibold">Status</TableHead>
                      <TableHead className="text-center text-gray-700 dark:text-gray-300 font-semibold">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data?.coupons?.map((coupon, index) => (
                      <TableRow key={index} className="border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                        <TableCell className="text-gray-600 dark:text-gray-400">{(currentPage - 1) * limit + index + 1}</TableCell>
                        <TableCell className="font-medium text-gray-800 dark:text-white">{coupon.code}</TableCell>
                        <TableCell className="text-gray-600 dark:text-gray-400">{coupon.discountType}</TableCell>
                        <TableCell className="font-medium text-gray-800 dark:text-white">
                          {`${coupon.discountValue}${coupon.discountType === 'percentage' ? '%' : ''}`}
                        </TableCell>
                        <TableCell className="text-gray-600 dark:text-gray-400">₹{coupon.minPurchaseAmount}</TableCell>
                        <TableCell className="text-gray-600 dark:text-gray-400">₹{coupon.maxDiscount}</TableCell>
                        <TableCell className="text-gray-600 dark:text-gray-400">{coupon.usageLimit}</TableCell>
                        <TableCell className="text-gray-600 dark:text-gray-400">{format(new Date(coupon.expiryDate),'PPP')}</TableCell>
                        <TableCell>
                          <Badge 
                            className={`${
                              coupon.isActive 
                                ? 'bg-gradient-to-r from-green-500 to-green-600 text-white' 
                                : 'bg-gradient-to-r from-red-500 to-red-600 text-white'
                            } px-3 py-1 rounded-full text-xs shadow-sm`}
                          >
                            {coupon.isActive ? 'Active' : 'Inactive'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2 justify-center">
                            <FormModal 
                              useAction={useAdminUpdateCouponMutation} 
                              existValues={data?.coupons[index]} 
                              refetch={refetch}
                            /> 
                            <AlertDialogDelete
                              onSuccess={refetch}
                              id={coupon._id}
                              btnName={<Trash2 className="h-4 w-4"/>} 
                              btnClass={"bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-sm hover:shadow-md px-3 py-1.5 rounded-md"}
                              deleteApi={useAdminDeleteCouponMutation}
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
          { data?.coupons?.length > 0 && (
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
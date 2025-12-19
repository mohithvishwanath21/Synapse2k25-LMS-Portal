// import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
// import { TabsContent } from '@radix-ui/react-tabs'
// import React from 'react'
// import Enrolled from './tabs/Enrolled'
// import Bookmark from './tabs/Bookmark'
// import { useSearchParams } from 'react-router-dom'

// const CourseDashboard = () => {
//   const [searchParams] = useSearchParams();
//   const defaultTab = searchParams.get('tab') || 'enrolled'
//   return (
//     <div className="container max-w-7xl py-10 mx-auto">

//       <Tabs defaultValue={defaultTab}  >
//         <TabsList className='grid  grid-cols-2'>
//           <TabsTrigger value='enrolled' >Enrolled</TabsTrigger>
//           <TabsTrigger value='bookmark' >Bookmark</TabsTrigger>
//         </TabsList>

//         <TabsContent value='enrolled' >
//         <Enrolled/> 
//         </TabsContent>

//         <TabsContent value='bookmark' >
//           <Bookmark/>
//         </TabsContent>

//       </Tabs>
//     </div>
//   )
// }

// export default CourseDashboard
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import React from 'react'
import Enrolled from './tabs/Enrolled'
import Bookmark from './tabs/Bookmark'
import { useSearchParams } from 'react-router-dom'

const CourseDashboard = () => {
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get('tab') || 'enrolled'
  return (
    <div className="min-h-screen py-8 px-4 bg-gradient-to-bl from-rose-200 via-white to-rose-200">
      <div className="container max-w-7xl mx-auto">
        <Tabs defaultValue={defaultTab}>
          <TabsList className='grid grid-cols-2 bg-white/80 backdrop-blur-sm p-1 rounded-lg border border-white/30 shadow-sm'>
            <TabsTrigger 
              value='enrolled' 
              className='data-[state=active]:bg-gradient-to-r data-[state=active]:from-slate-100 data-[state=active]:to-slate-300 data-[state=active]:text-black'
            >
              Enrolled
            </TabsTrigger>
            <TabsTrigger 
              value='bookmark'
              className='data-[state=active]:bg-gradient-to-r data-[state=active]:from-slate-300 data-[state=active]:to-slate-100 data-[state=active]:text-black'
            >
              Bookmark
            </TabsTrigger>
          </TabsList>

          <TabsContent value='enrolled'>
            <Enrolled/> 
          </TabsContent>

          <TabsContent value='bookmark'>
            <Bookmark/>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default CourseDashboard
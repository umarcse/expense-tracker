"use client"
import React, { useEffect } from 'react'
import SideNav from './_components/SideNav';
import DashboardHeader from './_components/DashboardHeader';
import { db } from '@/utils/dbConfig';
import { Budgets } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

const DhashboardLayout = ({children}) => {
  const user = useUser();
  const router = useRouter();

  useEffect(()=>{
    user&&checkUserBudget();
  },[user]);
  const checkUserBudget = async () =>{
     const result = await db.select()
     .from(Budgets)
     .where(eq(Budgets.createBy, user?.user?.primaryEmailAddress?.emailAddress))

    //console.log(result);

    if(result?.length==0){
      //router.replace('/dashboard/budget')
    }
    
  }
  return (
   <>
   <div className='fixed hidden md:w-64 md:block '>
    <SideNav/>
   </div>
    
    <div className='md:ml-64'> 
      <DashboardHeader/>
      {children} 
    </div>
   </>
  )
}

export default DhashboardLayout;
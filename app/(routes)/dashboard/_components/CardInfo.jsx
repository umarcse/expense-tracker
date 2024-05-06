"use client"
import { db } from '@/utils/dbConfig';
import { Budgets, Expenses } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { desc, eq, getTableColumns, sql } from 'drizzle-orm';
import { PiggyBank, ReceiptIcon, Wallet } from 'lucide-react';
import React, { useEffect, useState } from 'react'

const CardInfo = ({budgetList}) => { 

    const [totalBudget, setTotalBudget] = useState(0);
    const [totalSpend, setTotalSpend] = useState(0);
    useEffect(()=>{

        calculateCardInfo();

    },[budgetList]);

   const calculateCardInfo = () =>{

    let totalBudget_ = 0;
    let totalSpend_ = 0;

    budgetList.forEach(element => {
        
        totalBudget_ = totalBudget_+Number(element.amount);
        totalSpend_ = totalSpend_+Number(element.totalSpend);
    });

    setTotalSpend(totalSpend_);
    setTotalBudget(totalBudget_);
    //console.log(totalBudget_, totalSpend_);

        
   }
   
  return (
    <div>
        {budgetList?.length>0? 
    
    <div className='mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2'>
        <div className='p-4 border rounded-lg flex justify-between'>
            <div>
                <h2 className='text-sm'> Total Budget </h2>
                <h2 className='fon-bold text-2xl'> ${totalBudget} </h2>
            </div>
            <PiggyBank className='bg-blue-600 p-2 text-lg text-white h-12 w-12 rounded-full '/>
        </div>
        <div className='p-4 border rounded-lg flex justify-between'>
            <div>
                <h2 className='text-sm'> Total Spend </h2>
                <h2 className='fon-bold text-2xl'> $ {totalSpend} </h2>
            </div>
            <ReceiptIcon className='bg-blue-600 p-2 text-lg text-white h-12 w-12 rounded-full '/>
        </div>
        <div className='p-4 border rounded-lg flex justify-between'>
            <div>
                <h2 className='text-sm'> No of Budget </h2>
                <h2 className='fon-bold text-2xl'> ${budgetList.length}  </h2>
            </div>
            <Wallet className='bg-blue-600 p-2 text-lg text-white h-12 w-12 rounded-full '/>
        </div>
    </div>: 
    <div className='mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2'>
        {
            [1,2,3].map((item,index)=> (
                <div className='h-[110px] w-full bg-slate-200 animate-pulse rounded-lg'>

                </div>
            ))
        }
    </div>
    }
    </div>
  )
}

export default CardInfo
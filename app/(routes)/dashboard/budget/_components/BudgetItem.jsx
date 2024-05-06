"use client"
import { int } from 'drizzle-orm/mysql-core';
import React, { useEffect, useState } from 'react'

const BudgetItem = ({budget}) => {

   

   const calculatePercentage = () =>{

        const per = (budget.totalSpend/budget.amount)*100;
        return per.toFixed(2);
   }

  

    
  return (
    <>
        <div className='p-5 border rounded-lg
         hover:shadow-md cursor-pointer h-[170px]
        '>
            
            <div className='flex items-center justify-between'>
                <div className='flex gap-2 items-center'>
                    <h2 className='text-2xl p-3 rounded-full bg-slate-100'> {budget?.icon} </h2>
                    <div>
                        <h2> {budget.name} </h2>
                        <h2> {budget.totalItem} item </h2> 
                    </div>
                </div>
                <h2 className='font-bold text-blue-500'> ${budget.amount} </h2>
            </div>
            <div className='mt-5'>
                <div className='flex justify-between items-center mb-2'>
                    <h2 className='text-xs text-slate-400'> ${budget.totalSpend?? 0} Spend </h2>
                    <h2 className='text-xs text-slate-300'> ${budget.amount-budget.totalSpend} Remaining </h2>
                </div>
                <div className=' bg-slate-200 w-full h-2 rounded-full'>
                    <div className={`bg-blue-500 h-2 rounded-full `} style={{width: `${calculatePercentage()}%` }} ></div>
                </div>
                
                
            </div>
        </div>
    </>
  )
}

export default BudgetItem
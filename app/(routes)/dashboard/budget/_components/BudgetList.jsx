"use client"
import React, { useEffect, useState } from 'react'
import CreateBudget from './CreateBudget'
import { db } from '@/utils/dbConfig'
import { eq, getTableColumns, sql } from 'drizzle-orm'
import { Budgets, Exp, Expenses } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import BudgetItem from './BudgetItem'
import Link from 'next/link'

const BudgetList = () => {
  const user = useUser();
  const [budgetList,setBudgetList] = useState([]);

  //console.log(user.user.primaryEmailAddress.emailAddress);
  useEffect(()=>{
    getBudgetList();
  },[user])

  const getBudgetList = async () => {
    const result = await db.select({
      ...getTableColumns(Budgets),
      totalSpend:sql `sum(${Expenses.amount})`.mapWith(Number),
      totalItem:sql `count(${Expenses.id})`.mapWith(Number)
    }).from(Budgets)
    .leftJoin(Expenses,eq(Budgets.id, Expenses.budgetId))
    .where(eq(Budgets.createBy,user?.user?.primaryEmailAddress?.emailAddress))
    .groupBy(Budgets.id)

    //console.log(result);
    setBudgetList(result);
  }

  return (
    <div className='mt-5 pb-3'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2'>
            <CreateBudget/>
            {
              budgetList?.length>0? budgetList.map((budget,index)=>(

                <Link href={`/dashboard/expense/${budget.id}`}>
                <BudgetItem budget={budget}/>
                </Link>
                


              )): [1,2,3,4,5].map((item,index)=>(
                <div key={index} className=' w-full bg-slate-200 rounded-lg h-[120px] animate-pulse'>  </div>
              ))
            }
        </div>
    </div>
  )
}

export default BudgetList
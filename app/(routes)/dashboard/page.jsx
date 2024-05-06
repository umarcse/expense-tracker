"use client"
import CardInfo from './_components/CardInfo';
import { db } from '@/utils/dbConfig';
import { Budgets, Expenses } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { desc, eq, getTableColumns, sql } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import BarchartDashboard from './_components/BarchartDashboard';
import BudgetItem from './budget/_components/BudgetItem';
const Dashboard = () => {

 
  const [budgetList,setBudgetList] = useState([]);

  const {user} = useUser();


  const getBudgetList = async () => {
    const result = await db.select({
      ...getTableColumns(Budgets),
      totalSpend:sql `sum(${Expenses.amount})`.mapWith(Number),
      totalItem:sql `count(${Expenses.id})`.mapWith(Number)
    }).from(Budgets)
    .leftJoin(Expenses,eq(Budgets.id, Expenses.budgetId))
    .where(eq(Budgets.createBy,user?.primaryEmailAddress?.emailAddress))
    .orderBy(desc(Budgets.id))
    .groupBy(Budgets.id)

   // console.log(result);
    setBudgetList(result);
  }
  useEffect(()=>{
    user&&getBudgetList();
  },[user])
  //console.log(budgetList);
  return (
    <>
      <div className='p-5'>
        <h2 className='text-3xl font-bold'> Hello, {user?.fullName} ✌️  </h2>
        <p className='text-gray-500'> Here's what happening with your money, let's manage your expense. </p>
        <CardInfo budgetList={budgetList}/> 

        <div className='grid grid-cols-1 md:grid-cols-3 mt-5'>
            <div className='md:col-span-2'>
              <h2 className='font-bold text-lg'> Activity </h2>
              <BarchartDashboard budgetList= {budgetList}/>
            </div>
            <div>
              <h2 className='font-bold text-lg pb-4'>Latest Budget</h2> 

                  <div>
                    {budgetList.map((budget,index)=> (
                      <div key={index} className='mb-2'>
                        <BudgetItem  budget={budget} />
                      </div>
                    ))}
                  </div>

            </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
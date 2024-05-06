"use client"
import { db } from '@/utils/dbConfig';
import { Budgets, Expenses } from '@/utils/schema';
import { useUser } from '@clerk/nextjs'
import { desc, eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import { name } from 'tar/lib/types';
import ExpenseLits from './_components/ExpenseLits';

const ExpensesScreen = () => {
    const [expensesList , setExpensesList]= useState([]);
    const {user} = useUser();
    useEffect(()=>{
        user && getExpenses();
    },[user])
  const  getExpenses = async ()=>{

    const result = await db.select({
        id:Expenses.id,
        name:Expenses.name,
        amount: Expenses.amount,
        createdAt:Expenses.createdAt
    }).from(Budgets).rightJoin(Expenses,eq(Budgets.id,Expenses.budgetId))
    .where(eq(Budgets.createBy, user?.primaryEmailAddress?.emailAddress))
    .orderBy(desc(Expenses.id))
    setExpensesList(result);
   // console.log(result);
  }

  return (
    <div>
        <div className='p-7'>
            
            <div>
            <ExpenseLits
          expenselist={expensesList}
          refreshData={() => getExpenses()}
        />
            </div>
        </div>
    </div>
  )
}

export default ExpensesScreen
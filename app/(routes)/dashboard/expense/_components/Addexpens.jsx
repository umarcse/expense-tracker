"use client"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import { db } from '@/utils/dbConfig';
import { Budgets, Expenses } from '@/utils/schema';
import moment from 'moment/moment';
import React, { useState } from 'react'
import { toast } from 'sonner';

const Addexpens = ({budgetId,user,refreshData}) => {

    const [name, setName] = useState();
    const [amount, setAmount] = useState();


    const addNewExpense = async ()=>{
        const result = await db.insert(Expenses).values({
            name:name,
            amount:amount,
            budgetId:budgetId,
            createdAt: moment().format("DD/MM/yyy"),
        }).returning({insertedId:Budgets.id})

        console.log(result);

        if(result){

            refreshData()
            toast('Expenses Added Successfully');
        }
    }
  return (
    <div className='border p-3 rounded-lg shadow-sm'>
        <h2 className='text-lg font-bold'> Add Expense </h2>
        <div className='mt-2'>
            <h2 className=' font-medium text-black my-1'> Expense Name:  </h2>
            <Input placeholder="e.g. Home Decor" onChange={(e)=>setName(e.target.value)}/>
        </div>
        <div className='mt-2'>
            <h2 className=' font-medium text-black my-1'> Expense Amount:  </h2>
            <Input type="number" placeholder="e.g. 500" onChange={(e)=>setAmount(e.target.value)}/>
        </div>
        <Button disabled={!(name&&amount)}
            onClick={()=> addNewExpense() }
        className="mt-2 w-full bg-green-300 text-gray-700 hover:bg-green-500">
            
             Add New Expense
        </Button>
    </div>
  )
}

export default Addexpens
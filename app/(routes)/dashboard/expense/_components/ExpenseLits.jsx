import { Button } from '@/components/ui/button'
import { db } from '@/utils/dbConfig'
import { Expenses } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { Trash } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'

const ExpenseLits = ({expenselist,refreshData}) => {
    //console.log(expenseData);

    const deleteExpense = async(id)=>{
        const result = await db.delete(Expenses).where(eq(Expenses.id, id)).returning()
        if(result){
            toast('Expesnse Delete Successfully');

            refreshData();
        }
    }
  return (
    <div>
        <h2 className='text-lg font-bold inline-block border-b-2 border-b-slate-500  '> Latest Expenses </h2>
        <div className='pt-5 flex justify-center'>
            <table>
                <thead className=' shadow-sm  bg-green-300 text-white' >
                    <tr>
                        <th className=' p-2 px-20 font-semibold text-center border border-blue-200'> Name </th>
                        <th className=' p-2 px-20 font-semibold text-center border border-blue-200'> Amount </th>
                        <th className=' p-2 px-20 font-semibold text-center border border-blue-200'> Date </th>
                        <th className=' p-2 px-20 font-semibold text-center border border-blue-200'> Action </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        expenselist.map((exp, index)=> (
                            <tr className='odd:bg-slate-100 even:bg-slate-50 text-center'>
                                <td className='text-center'> {exp.name} </td>
                                <td className='text-center'> {exp.amount} </td>
                                <td className='text-center'> {exp.createdAt} </td>
                                <td className='text-center'> <button onClick={()=> deleteExpense(exp.id)}> <Trash className='text-red-500'/> </button> </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default ExpenseLits
"use client"
import { Button } from '@/components/ui/button'
import { PenBox } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { useUser } from '@clerk/nextjs'
import EmojiPicker from 'emoji-picker-react'
import { Input } from '@/components/ui/input'
import { db } from '@/utils/dbConfig'
import { Budgets } from '@/utils/schema'
import { eq, getTableColumns } from 'drizzle-orm'
import { toast } from 'sonner'

const EditBudget = ({budgetInfo,refreshData}) => {
   // console.log(budgetInfo.name);
    const [emojiIcon, setEmojiIcon] = useState(budgetInfo?.icon);
    const [operEmojiPicker, setOpenEmojiPicker] = useState(false);

    const [name, setName]= useState();
    const [budget, setBudget]=useState();
    const {user} = useUser();

    useEffect(()=>{
        setEmojiIcon(budgetInfo.icon)
    },[budgetInfo]);

    const onUpdateBudget =  async()=>{

        const result  = await db.update(Budgets).set({
            name:name,
            amount:budget,
            icon:emojiIcon
        }).where(eq(Budgets.id, budgetInfo.id)).returning()

        if(result){
            toast('Budget Updated Successfully !');
            refreshData();

        }
    }
  return (
    <div>
       
        <Dialog>
                <DialogTrigger asChild>
                <Button className="flex gap-2 bg-green-400"> <PenBox/> Edit</Button>
                </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Create New Budget</DialogTitle>
                            <DialogDescription>
                                <div className='mt-5'>
                                    <Button variant="outline" size="lg" onClick={()=>setOpenEmojiPicker(!operEmojiPicker) } > {emojiIcon} </Button>

                                    <div className=' absolute z-20'>
                                        <EmojiPicker open={operEmojiPicker} onEmojiClick={(e)=> {setEmojiIcon(e.emoji), setOpenEmojiPicker(false) } }/>

                                    </div>

                                    <div className='mt-2'>
                                        <h2 className=' font-medium text-black my-1'> Budget Name:  </h2>
                                        <Input placeholder="e.g. Home Decor" defaultValue={budgetInfo.name} onChange={(e)=>setName(e.target.value)}/>
                                    </div>
                                    <div className='mt-2'>
                                        <h2 className=' font-medium text-black my-1'> Budget Amount:  </h2>
                                        <Input type="number" placeholder="e.g. 500" defaultValue={budgetInfo.amount}  onChange={(e)=>setBudget(e.target.value)}/>
                                    </div>
                                    
                                </div>
                                
                            </DialogDescription>
                            </DialogHeader>
                            <DialogFooter className="sm:justify-start">
                                <DialogClose asChild>
                                <Button  onClick={()=> onUpdateBudget()} className="mt-3 w-full"> Update Budget </Button>
                                </DialogClose>
                            </DialogFooter>
                    </DialogContent>
        </Dialog>
    </div>
  )
}

export default EditBudget
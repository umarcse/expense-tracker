"use client"
import React, { useState } from 'react'
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
import EmojiPicker from 'emoji-picker-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { db } from '@/utils/dbConfig'
import { Budgets } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { toast } from 'sonner'

  
const CreateBudget = () => {

    const [emojiIcon, setEmojiIcon] = useState('😮');
    const [operEmojiPicker, setOpenEmojiPicker] = useState(false);

    const [name, setName]= useState();
    const [budget, setBudget]=useState();

    const {user} = useUser();

    const onCreateBudget = async () =>{
        const result = await db.insert(Budgets)
        .values({
            name:name,
            amount:budget,
            createBy: user?.primaryEmailAddress?.emailAddress,
            icon:emojiIcon
            
        }).returning({insertedId:Budgets.id})

        if(result){
            toast("New Budget Created");
        }
    }
  return (
    <>
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <div className='bg-slate-100 rounded-md flex flex-col items-center p-5 px-10 border cursor-pointer hover:shadow-sm '>
                        <h2 className='text-3xl'>+</h2>
                        <h2> Create New Budget </h2>
                    </div>
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
                                        <Input placeholder="e.g. Home Decor" onChange={(e)=>setName(e.target.value)}/>
                                    </div>
                                    <div className='mt-2'>
                                        <h2 className=' font-medium text-black my-1'> Budget Amount:  </h2>
                                        <Input type="number" placeholder="e.g. 500" onChange={(e)=>setBudget(e.target.value)}/>
                                    </div>
                                    
                                </div>
                                
                            </DialogDescription>
                            </DialogHeader>
                            <DialogFooter className="sm:justify-start">
                                <DialogClose asChild>
                                <Button disabled={!(name&&budget)} onClick={()=> onCreateBudget()} className="mt-3 w-full"> Create Budget </Button>
                                </DialogClose>
                            </DialogFooter>
                    </DialogContent>
            </Dialog>
        </div>

    </>
  )
}

export default CreateBudget
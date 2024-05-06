"use client";
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'


const Header = () => {

  
  return (
    <>
        <div className='p-3 border-b shadow-sm'>
            <div className="flex justify-between items-center">
                <Image src={'./logo.svg'} alt='logo' width={160} height={100}/>
                   <Button size="sm">Get Started</Button>
                
            </div>
        </div>
    </>
  )
}

export default Header
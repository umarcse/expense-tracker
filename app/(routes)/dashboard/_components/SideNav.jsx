'use client'
import Image from 'next/image'
import { LayoutGrid,PiggyBank,ReceiptText, ShieldCheck} from 'lucide-react'
import { UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import Link from 'next/link'



const SideNav = () => {

  const path = usePathname();

  

    const menuList = [

        {id: 1, name: 'Dahashboard', icon:LayoutGrid, path: '/dashboard'},
        {id: 2, name: 'Budget', icon:PiggyBank, path:'/dashboard/budget'},
        {id: 3, name: 'Expenses', icon:ReceiptText, path:'/dashboard/expense'},
        {id: 4, name: 'Upgrade', icon:ShieldCheck,  path:'/dashboard/upgrade'},
        
    ];
  return (
    <>
    <div className=' h-screen p-3 border-r shadow-sm'>
        <Image src={'/logo.svg'} alt='logo' width={160} height={100}/>

        <div className='mt-5'>
          {menuList.map((menu,index)=> (  
            <Link href={menu.path} key={index}> 
            <h2 className= {`flex gap-2 items-center mb-2
             text-gray-600 font-medium p-4 
             cursor-pointer rounded-md hover:text-blue-600
            hover:bg-blue-300 ${path == menu.path && 'text-blue-600 bg-blue-300'}`} > 
              <menu.icon/> {menu.name}  
            </h2>   
            </Link>
          
          ))}
        </div>

        <div className='fixed bottom-5 flex gap-2'>
          <UserButton/> <h2> Profile </h2>
        </div>
    </div>
    </>
  )
}

export default SideNav
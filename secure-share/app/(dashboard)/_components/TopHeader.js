import { UserButton } from '@clerk/nextjs'
import { AlignJustify } from 'lucide-react'
import React from 'react'
import Image from 'next/image'

function TopHeader({toggleSideNav}) {
  return (
    <div className='flex p-5 border-b items-center justify-between md:justify-end'>
        <AlignJustify className='md:hidden cursor-pointer' onClick={toggleSideNav}/>
        <Image src='/logo.svg' width={100} height={100}
        className='md:hidden' alt='site logo'/>
        <UserButton/>
    </div>
  )
  
}


export default TopHeader
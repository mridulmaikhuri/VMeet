import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import MobileNav from './MobileNav'

const Navbar = () => {
  return (
    <nav className='flex-between fixed z-50 w-full bg-gray-800 px-6 py-4 lg:px-10'>
      <Link
       href="/"
       className='flex items-center gap-1'
      >
        <Image 
          src="/icons/logo.svg"
          alt="Zoom Logo"
          width={36}
          height={36}
          className='max-sm:size-10'
        />
        <p className='text-[26px] font-extrabold text-white max-sm:hidden'>Zoom</p>
      </Link>
      <div className='flex-between gap-5 sm:hidden'>
        <MobileNav />
      </div>
    </nav>
  )
}

export default Navbar
import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import Image from 'next/image'
import Link from 'next/link'


const MobileNav = () => {
    return (
        <section className='w-full max-w-[264px]'>
            <Sheet>
                <SheetTrigger>
                    <Image
                        src="/icons/hamburger.svg"
                        width={36}
                        height={36}
                        alt="Hamburger Icon"
                        className='cursor-pointer sm:hidden'
                    />
                </SheetTrigger>
                <SheetContent side="left" className='bg-gray-800 border-none'>
                    <SheetTitle></SheetTitle>
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
                        <p className='text-[26px] font-extrabold text-white'>Zoom</p>
                    </Link>
                </SheetContent>
            </Sheet>
        </section>
    )
}

export default MobileNav
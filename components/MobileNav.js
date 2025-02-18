"use client"
import React from 'react'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import Image from 'next/image'
import Link from 'next/link'
import { sideBarLinks } from '@/constants'
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation'

const MobileNav = () => {
    const pathname = usePathname();
    return (
        <section>
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
                <SheetContent side="left" className='bg-gray-800 border-none w-1/2 text-white'>
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
                        <p className='text-[26px] font-extrabold text-white'>VMeet</p>
                    </Link>
                    <div className='flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto'>
                        <SheetClose asChild>
                            <section className='flex h-full flex-col gap-6 pt-16 text-white'>
                                {sideBarLinks.map((link) => {
                                    const isActive = pathname === link.route || (link.route !== '/' && pathname.startsWith(link.route));
                                    return (
                                        <SheetClose asChild key={link.label}>
                                            <Link
                                                href={link.route}
                                                key={link.label}
                                                className={cn('flex gap-4 items-center p-4 rounded-lg w-full max-w-60', {
                                                    'bg-blue-600': isActive,
                                                })}
                                            >
                                                {link.imgUrl && <img src={link.imgUrl} alt={link.label} className='w-4 h-4' />}
                                                <p className='font-semibold'>
                                                    {link.label}
                                                </p>
                                            </Link>
                                        </SheetClose>
                                    )
                                })}
                            </section>
                        </SheetClose>
                    </div>
                </SheetContent>
            </Sheet>
        </section>
    )
}

export default MobileNav
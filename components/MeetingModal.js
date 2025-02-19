import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from '@/lib/utils'
import { Button } from './ui/button'
import Image from 'next/image'


const MeetingModal = ({ isOpen, onClose, title, className, buttonText, handleClick, children, image, buttonIcon }) => {
    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="flex w-full max-w-[520px] flex-col gap-6 border-none bg-gray-900 px-6 py-9 text-white">
                <DialogTitle className='hidden'></DialogTitle>
                <div className='flex flex-col gap-6'>
                    {image && (
                        <div className='flex justify-center'>
                            <Image src={image} alt='image' width={72} height={72} />
                        </div>
                    )}
                    <h1 className={cn('text-3xl font-bold leading-[42px]', className)}>{title}</h1>
                    {children}
                    <Button className='bg-blue-600 focus-visible:ring-0 focus-visible:ring-offset-0 hover:bg-blue-500' onClick={handleClick}>
                        {buttonIcon && (
                            <Image src={buttonIcon} alt='button icon' width={13} height={13} />
                        )} &nbsp;
                        {buttonText || 'Schedule Meeting'}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>

    )
}

export default MeetingModal
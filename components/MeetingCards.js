"use client"
import { cn } from '@/lib/utils'
import Image from 'next/image'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

const Card = (image, heading, text, className, handleClick) => {
  return (  
    <div className={cn('px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-[14px] cursor-pointer hover:scale-105', className)} onClick={() => {handleClick()}}>
        <div className='flex-center bg-gray-400 w-fit p-2 opacity-80 rounded-[10px]'>
          <Image src={`/icons/${image}.svg`} alt='add meeting' width = {27} height = {27}/>
        </div>
        <div className='flex flex-col gap-2'>
          <h1 className='text-2xl font-bold'>{heading}</h1>
          <p className='text-lg font-normal'>{text}</p>
        </div>
      </div>
  )
}

const MeetingCards = () => {
  const [meetingState, setMeetingState] = useState('');
  const router = useRouter();
  const CardArray = [
    ['add-meeting', 'New Meeting', 'Start a new meeting in an instant', 'bg-orange-500', () => {setMeetingState('isInstantMeeting')}],
    ['schedule', 'Schedule Meeting', 'Plan your meeting', 'bg-blue-500', () => {setMeetingState('isScheduleMeeting')}],
    ['recordings', 'View Recordings', 'Check out your recordings', 'bg-purple-500', () => {router.push('/recordings')}],
    ['join-meeting', 'Join Meeting', 'via an invitation link', 'bg-yellow-500', () => {setMeetingState('isJoiningMeeting')}],
  ];
  return (
    <section className=' grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-4'>
      {CardArray.map((card, index) => (
        <div key={index}>
          {Card(card[0], card[1], card[2], card[3], card[4])}
        </div>
      ))}
    </section>
  )
}

export default MeetingCards
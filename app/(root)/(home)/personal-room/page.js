"use client"

import { Button } from '@/components/ui/button'
import { toast } from '@/hooks/use-toast'
import { useGetCallById } from '@/hooks/useGetCallById'
import { useUser } from '@clerk/nextjs'
import { useStreamVideoClient } from '@stream-io/video-react-sdk'
import React from 'react'
import { useRouter } from 'next/navigation'

const Table = ({ title, description, flag }) => (
  <div className='flex flex-col items-start gap-2 xl:flex-row'>
    <h1 className='font-medium text-base text-blue-100 lg:text-xl xl:min-w-32'>{title}:</h1>
    <h1 className={`truncate text-sm font-bold max-sm:max-w-[320px] lg:text-xl ${flag && 'text-blue-500'} ${flag && 'underline'}`}>{description}</h1>
  </div>
)

const PersonalRoom = () => {
  const { user } = useUser();
  const meetingId = user?.id;
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingId}?personal=true`

  console.log(user);

  const { call } = useGetCallById(meetingId);
  const client = useStreamVideoClient();
  const router = useRouter();

  const startRoom = async () => {
    if (!client || !user) return;

    if (!call) {
      const newCall = client.call('default', meetingId)
      await newCall.getOrCreate({
        data: {
          start_at: new Date().toISOString()
        }
      })
    }

    router.push(`/meeting/${meetingId}?personal=true`);
  }

  return (
    <section className='flex size-full flex-col gap-10 text-white'>
      <h1 className='text-3xl font-bold'>
        Personal Room
      </h1>
      <div className='flex w-full flex-col gap-8 xl:max-w-[900px]'>
        <Table title="Topic" description={`${user?.firstName}'s Meeting Room`} />
        <Table title="Meeting ID" description={meetingId} />
        <Table title="Invite Link" description={meetingLink} flag={true} />
      </div>
      <div className='flex gap-5'>
        <Button className='bg-blue-600 focus-visible:ring-0 focus-visible:ring-offset-0 hover:bg-blue-500' onClick={startRoom}>
          StartMeeting
        </Button>
        <Button className='bg-gray-700' onClick={() => {
          navigator.clipboard.writeText(meetingLink);
          toast({
            title: 'Copied to clipboard'
          })
        }}>
          Copy Link
        </Button>
      </div>
    </section>
  )
}

export default PersonalRoom
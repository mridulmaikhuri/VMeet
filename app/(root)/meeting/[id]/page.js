"use client"
import React, { useState, use } from 'react'
import { useUser } from '@clerk/nextjs'
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import MeetingSetup from '@/components/MeetingSetup';
import MeetingRoom from '@/components/MeetingRoom';
import { useGetCallById } from '@/hooks/useGetCallById';
import Loader from '@/components/Loader';

const Meeting = ({params}) => {
  const unwrappedParams = use(params); 
  const { id } = unwrappedParams;
  const { user, isLoaded } = useUser();
  const [ isSetUpCompleted, setIsSetUpCompleted ] = useState(false);
  const { call, isCallLoading } = useGetCallById(id);
  
  if (!isLoaded || isCallLoading) return <Loader />

  if (!call) return <p className="text-center text-white">Call not found</p>;

  return (
    <main className='h-screen w-full'>
      <StreamCall call={call}>
        <StreamTheme>
          {
            !isSetUpCompleted ? (
              <MeetingSetup setIsSetUpCompleted={setIsSetUpCompleted} />
            ) : (
              <MeetingRoom />
            )
          }
        </StreamTheme>
      </StreamCall>
    </main>
  )
}

export default Meeting
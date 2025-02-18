"use client"

import { CallControls, CallingState, CallParticipantsList, CallStatsButton, PaginatedGridLayout, SpeakerLayout, StreamCall, useCall, useCallStateHooks } from '@stream-io/video-react-sdk';
import React from 'react'
import cn from 'classnames'
import { useUser } from '@clerk/nextjs'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LayoutList, Users } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import EndCallButton from './EndCallButton';
import Loader from './Loader';
import { useRouter } from 'next/navigation';


const MeetingRoom = () => {
  const searchParams = useSearchParams();
  const isPersonalRoom = !!searchParams.get('personal')
  const { user } = useUser();
  const call = useCall();
  const router = useRouter();

  React.useEffect(() => {
    if (call && user) {
      call.updateCallMembers({
        update_members: [
          {
            user_id: user.id,
            custom: {
              name: user.fullName || user.firstName || "Guest",
              image: user.imageUrl,
            },
          },
        ],
      }).catch(err => console.error("Failed to update call members:", err));
    }
  }, [call, user]);

  const [layout, setLayout] = React.useState('speaker-right');
  const CallLayout = () => {
    return (
      <div className="relative flex h-[80vh] w-[70vw] items-center justify-center rounded-lg bg-gray-900 shadow-xl p-4">
        {layout === "grid" && <PaginatedGridLayout />}
        {layout === "speaker-right" && <SpeakerLayout participantsBarPosition="left" />}
        {layout === "speaker-left" && <SpeakerLayout participantsBarPosition="right" />}
      </div>
    );
  };

  const [showParticipants, setShowParticipants] = React.useState(false);
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  if (callingState !== CallingState.JOINED) return <Loader />

  return (
    <StreamCall call={call} user={user}>
      <section className='relative h-screen w-full overflow-hidden pt-4 text-white'>
        <div className='relative flex justify-between m-3'>
          <div className='flex items-center'>
            <CallLayout />
          </div>
          <div className={cn('h-[calc(100vh-80px)] w-[27vw] ml-2 bg-gray-800 p-3', { 'hidden': !showParticipants })}>
            <CallParticipantsList renderParticipant={(participant) => (
              <div className="flex items-center gap-3 p-2 rounded-md bg-gray-800 text-white">
                <img src={participant.custom?.image} alt="avatar" className="w-8 h-8 rounded-full" />
                <span>{participant.custom?.name || "Guest"}</span>  {/* Use custom name */}
              </div>
            )} onClose={() => setShowParticipants(false)} />
          </div>
        </div>

        <div className='fixed bottom-0 flex w-full items-center justify-center gap-5 flex-wrap'>
          <CallControls onLeave={() => router.push('/')}/>
          <DropdownMenu>
            <div className='flex items-center'>
              <DropdownMenuTrigger
                className='cursor-pointer rounded-2xl bg-gray-800 px-4 py-2 hover:bg-gray-700'>
                <LayoutList size={20} className='text-white' />
              </DropdownMenuTrigger>
            </div>
            <DropdownMenuContent className='border-gray-800 bg-gray-800 text-white'>
              {['grid', 'speaker-left', 'speaker-right'].map((item, index) => (
                <div key={index}>
                  <DropdownMenuItem className="cursor-pointer" onClick={() => setLayout(item)}>
                    {item}
                  </DropdownMenuItem>
                </div>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <CallStatsButton />
          <button onClick={() => setShowParticipants((prev) => !prev)}>
            <div className='cursor-pointer rounded-2xl bg-gray-800 px-4 py-2 hover:bg-gray-700'>
              <Users size={20} className='text-white' />
            </div>
          </button>
          {!isPersonalRoom && <EndCallButton />}
        </div>
      </section>
    </StreamCall>
  )
}

export default MeetingRoom
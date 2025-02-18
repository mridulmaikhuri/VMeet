"use client"
import { cn } from '@/lib/utils'
import Image from 'next/image'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import MeetingModal from './MeetingModal'
import { useStreamVideoClient } from '@stream-io/video-react-sdk'
import { useUser } from '@clerk/nextjs'
import { useToast } from "@/hooks/use-toast"
import { Textarea } from './ui/textarea'
import ReactDatePicker from "react-datepicker";
import { Input } from './ui/input';


const Card = (image, heading, text, className, handleClick) => {
  return (
    <div className={cn('px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-[14px] cursor-pointer hover:scale-105', className)} onClick={() => { handleClick() }}>
      <div className='flex-center bg-gray-400 w-fit p-2 opacity-80 rounded-[10px]'>
        <Image src={`/icons/${image}.svg`} alt='add meeting' width={27} height={27} />
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
    ['add-meeting', 'New Meeting', 'Start a new meeting in an instant', 'bg-orange-500', () => { setMeetingState('isInstantMeeting') }],
    ['schedule', 'Schedule Meeting', 'Plan your meeting', 'bg-blue-500', () => { setMeetingState('isScheduleMeeting') }],
    ['recordings', 'View Recordings', 'Check out your recordings', 'bg-purple-500', () => { router.push('/recordings') }],
    ['join-meeting', 'Join Meeting', 'via an invitation link', 'bg-yellow-500', () => { setMeetingState('isJoiningMeeting') }],
  ];
  const { user } = useUser();
  const client = useStreamVideoClient();
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: '',
    link: ''
  })
  const [callDetails, setCallDetails] = useState();
  const { toast } = useToast()

  const createMeeting = async () => {
    if (!client || !user) return;
    try {
      if (!values.dateTime) {
        toast({ title: 'Please select a date and time' });
        return;
      }
      const id = crypto.randomUUID();
      const call = client.call('default', id);
      if (!call) throw new Error('Failed to create meeting');
      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || 'Instant Meeting';
      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });
      setCallDetails(call);
      if (!values.description) {
        router.push(`/meeting/${call.id}`);
      }
      toast({
        title: 'Meeting Created',
      });
    } catch (error) {
      console.error(error);
      toast({ title: 'Failed to create Meeting' });
    }
  };

  if (!client || !user) return <Loader />;

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`;

  return (
    <section className=' grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-4'>
      {CardArray.map((card, index) => (
        <div key={index}>
          {Card(card[0], card[1], card[2], card[3], card[4])}
        </div>
      ))}
      {!callDetails ? (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setMeetingState('')}
          title="Create Meeting"
          handleClick={createMeeting}
        >
          <div className='flex flex-col gap-2.5'>
            <label className='text-normal leading-[22px] text-blue-200'>Add a description</label>
            <Textarea className="border-none bg-gray-700 focus-visible:ring-0 focus-visible-ring-offset-0"
              onChange={(e) => {
                setValues({ ...values, description: e.target.value })
              }} />
          </div>
          <div className='flex w-full flex-col gap-2.5'>
            <label className='text-normal leading-[22px] text-blue-200'>Select Date and Time</label>
            <ReactDatePicker
              selected={values.dateTime}
              onChange={(date) => setValues({ ...values, dateTime: date || new Date() })}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full rounded bg-gray-700 p-2 focus:outline-none"
            />
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setMeetingState('')}
          title="Meeting Created"
          className="text-center"
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({
              title: "Meeting link copied to clipboard",
            })
          }}
          image="/icons/checked.svg"
          buttonIcon="/icons/copy.svg"
          buttonText="Copy Meeting Link"
        />
      )}
      <MeetingModal
        isOpen={meetingState === 'isJoiningMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Type the link here"
        className="text-center"
        buttonText="Join Meeting"
        handleClick={() => router.push(values.link)}
      >
        <Input
          placeholder="Meeting link"
          onChange={(e) => setValues({ ...values, link: e.target.value })}
          className="border-none bg-gray-700 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </MeetingModal>
    </section>
  )
}

export default MeetingCards
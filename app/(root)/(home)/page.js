import MeetingCards from '@/components/MeetingCards';
import React from 'react'

const Home = () => {
  const now = new Date();
  const dateAndTime = now.toString().split(' ');
  return (
    <section className='flex size-full flex-col gap-10 text-white'>
      <div className='h-[300px] w-full rounded-[20px] bg-[url(/images/hero-background.png)] bg-cover'>
        <div className='flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11'>
          <h2 className='bg-gray-500 px-3 py-1 w-fit rounded font-normal'>Upcoming Meeting at: 12:30 PM</h2>
          <div className='flex flex-col gap-2'>
            <h1 className='text-4xl font-extrabold lg:text-7xl'>{dateAndTime[4].split(':')[0]}:{dateAndTime[4].split(':')[1]}</h1>
            <p className='text-lg font-bold lg:text-2xl'>{dateAndTime[0]}, {dateAndTime[1]} {dateAndTime[2]} {dateAndTime[3]}</p>
          </div>
        </div>
      </div>
      <MeetingCards />
    </section>
  )
}

export default Home
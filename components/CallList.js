"use client"

import { useGetCalls } from '@/hooks/useGetCalls'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import MeetingCard from './MeetingCard';
import Loader from './Loader';

const CallList = ({ type }) => {
    const { endedCalls, upcomingCalls, callRecordings, isLoading } = useGetCalls();
    const router = useRouter();
    const [recordings, setRecordings] = useState([]);

    console.log("endedCalls ", endedCalls);
    console.log("upcomingCalls ", upcomingCalls);
    console.log("callRecordings ", callRecordings);

    const getCalls = () => {
        switch (type) {
            case 'ended':
                return endedCalls;
            case 'recordings':
                return recordings;
            case 'upcoming':
                return upcomingCalls;
            default:
                return [];
        }
    }

    const getNoCallsMessage = () => {
        switch (type) {
            case 'ended':
                return 'No Previous Calls';
            case 'recordings':
                return 'No recordings';
            case 'upcoming':
                return 'No upcoming Calls';
            default:
                return '';
        }
    }

    useEffect(() => {
        const fetchRecordings = async () => {
            const callData = await Promise.all(
                (callRecordings ?? []).map((meeting) => meeting.queryRecordings())
            );

            const recordings = callData
                .filter((call) => call?.recordings?.length > 0)
                .flatMap((call) => call.recordings ?? []);

            setRecordings(recordings);
        }

        if (type === 'recordings') fetchRecordings();
    }, [type, callRecordings]);

    const calls = getCalls();
    const noCallsMessage = getNoCallsMessage();

    if (isLoading) return <Loader />

    return (
        <div className='grid grid-cols-1 gap-5 xl:grid-cols-2'>
            {calls && calls.length > 0 ? calls.map((meeting) => (
                <MeetingCard
                    key={meeting?.id}
                    icon={type === 'ended' ?
                        '/icons/previous.svg'
                        : type === 'upcoming' ?
                            '/icons/upcoming.svg' :
                            '/icons/recordings.svg'}
                    title={meeting?.state?.custom?.description?.substring(0, 20) || meeting?.fileName?.substring(0, 20) || 'No Description'}
                    date={meeting.state?.startsAt?.toLocaleString() || meeting.start_time?.toLocaleString()}
                    isPreviousMeeting={type === 'ended'}
                    buttonIcon1={type === 'recordings' ? '/icons/play.svg' : undefined}
                    buttonText={type === 'recordings' ? 'Play' : 'Start'}
                    link={type === 'recordings' ? meeting.url : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meeting.id}`}
                    handleClick={type === 'recordings' ? () =>
                        router.push(`${meeting.url}`) : () => router.push(`/meeting/${meeting.id}`)
                    }
                />
            )) : <h1 className="text-2xl font-bold text-white">{noCallsMessage}</h1>}
        </div>
    )
}

export default CallList
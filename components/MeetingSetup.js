"use client"

import { DeviceSettings, useCall, VideoPreview } from '@stream-io/video-react-sdk'
import React, { useEffect } from 'react'
import { Button } from './ui/button';
import { useUser } from '@clerk/nextjs';

const MeetingSetup = ({ setIsSetUpCompleted }) => {
    const { user } = useUser();
    const [isMicCamToggledOn, setIsMicCamToggledOn] = React.useState(false);
    const call = useCall();

    if (!call) {
        throw new Error('No Call Found')
    }

    useEffect(() => {
        if (isMicCamToggledOn) {
            call?.camera.disable();
            call?.microphone.disable();
        } else {
            call?.camera.enable();
            call?.microphone.enable();
        }
    }, [isMicCamToggledOn, call?.camera, call?.microphone]);
    return (
        <div className='flex h-screen w-full flex-col items-center justify-center gap-3 text-white'>
            <h1 className='text-3xl font-bold m-10'>Meeting Setup</h1>
            <div className={`w-1/2 h-1/2 flex justify-center items-center`}>
                <VideoPreview />
            </div>
            <div className='flex h-16 items-center justify-center gap-3'>
                <label className='flex items-center justify-center gap-2 font-medium'>
                    <input
                        type="checkbox"
                        checked={isMicCamToggledOn}
                        onChange={(e) => setIsMicCamToggledOn(e.target.checked)}
                    />
                    Join with mic and camera off
                </label>
                <DeviceSettings />
            </div>
            <Button
                className="rounded-md bg-green-500 px-4 py-2.5"
                onClick={() => {
                    console.log("Joining call with:", {
                        id: user.id,
                        name: user.fullName || user.firstName || "Guest",
                        image: user.imageUrl,
                    });
                    call?.join({
                        create: true,
                        id: user.id,
                        custom: {
                            name: user.fullName || user.firstName || "Guest", // Ensure name is set
                            image: user.imageUrl,
                        },
                    }).catch(err => console.error("Failed to join call:", err));                    
                    setIsSetUpCompleted(true);
                }}
            >
                Join Meeting
            </Button>
        </div>
    )
}

export default MeetingSetup
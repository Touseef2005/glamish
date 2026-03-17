'use client'

import { ButtonOutlined } from '@/components/Buttons/index'
import { localStorageHandler } from '@/utils';
import { useRouter } from 'next/navigation';
import React from 'react'

export default function UserProfile() {
    const router = useRouter()

    const handleSubmit = () => {

        if (typeof window === "undefined") {
            console.error("Server side par localStorage access ho raha hai!");
            return;
        }

        const data = localStorageHandler.remove("user");

        if (!localStorageHandler.get("user")) {
            router.push("/Login")
        } else {
            console.error("User data remove nahi hua!");
        }

    }

    return (
        <div className='min-h-screen flex items-center justify-center '>
            <ButtonOutlined title="LogOut" onButtonClick={handleSubmit} />
        </div>
    )
}



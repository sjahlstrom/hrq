'use client'

import React, { useState } from 'react'
import Hero from '@/components/Hero/hero'
import CTA from '@/components/CTA/cta'
import ScrollUp from '@/components/common/scroll-up'
import { ExtendedUser } from '@/types/ExtenderUser'

export default function Home() {
    const [selectedUser, setSelectedUser] = useState<ExtendedUser | null>(null)

    const handleCloseUserCard = () => {
        setSelectedUser(null)
    }

    return (
        <>
            <Hero />

            <CTA />

            <ScrollUp />
        </>
    )
}

'use client'
import { SessionProvider } from 'next-auth/react'
import React from 'react'

function AuthSessionProvider({ children }) {
    return <SessionProvider>{children}</SessionProvider>
}

export default AuthSessionProvider

import LoginComponent from '@/components/login'
import RegisterComponent from '@/components/register'
import React from 'react'

export default function EntryPage() {
    return <main className="w-screen h-screen flex items-center justify-center">
        <div className="flex items-center justify-center gap-4 grid-cols-2 p-4 h-screen  mx-auto">
            <div className='h-1/2 w-[30vw] '>
                <LoginComponent />
            </div>
            <div className='h-1/2 w-[30vw] '>
                <RegisterComponent />
            </div>
        </div>
    </main>
}

import { Loader } from 'lucide-react'
import React from 'react'

export default function Loading() {
    return (<>
        <div className="min-h-screen flex flex-col justify-center items-center">
            <h1>Loading...... </h1>
            <span><Loader className="w-10 h-10 animate-spin"/></span>

        </div>
    </>
    )
}

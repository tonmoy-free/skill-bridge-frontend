"use client"

import { useEffect } from "react"

export default function AboutError({ error, reset }: {
    error: Error & { digest?: string };
    reset: () => void;
}) {

    useEffect(() => {
        //we can pass the error to a logger
        console.error(error);
    })

    return (
        <div>
            <h1>This is AboutError component.</h1>
            <button onClick={() => reset}>Retry</button>
        </div>
    )
}
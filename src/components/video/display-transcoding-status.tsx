'use client'

import React, { useEffect, useState } from 'react';

export default function DisplayTranscodingStatus({jobId}: {jobId: string}) {
 
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState('');


useEffect(() => {
    pollTranscodingStatus(jobId)
}, [])



const fetchTranscodingStatus = async (jobId: string) => {
    const response = await fetch(`/api/transcoding-status?jobId=${jobId}`);
    if (!response.ok) {
        throw new Error("Failed to fetch status");
    }
    return await response.json();
};

const pollTranscodingStatus = async (jobId: string) => {
 

    setLoading(true);
    setStatus('');

    try {
        
        let statusResponse;

        // Polling for status
        const intervalId = setInterval(async () => {
            statusResponse = await fetchTranscodingStatus(jobId);
            setStatus(`Transcoding Status: ${statusResponse.status}`);

          
            if (statusResponse.status === "Transcoding Completed" || statusResponse.status.startsWith("Error")) {
                clearInterval(intervalId); 
                setLoading(false); 
            }
        }, 5000); 

    } catch (error) {
        console.error("Error:", error);
        setStatus("Error occurred during transcoding.");
        setLoading(false); 
    }
};

return (
    <div>
     
        {loading && <div>Transcoding in progress...</div>}
        {status && <div>{status}</div>}
    </div>
);
};

"use client"

import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';
import { getAwsUrl } from '@/utils/get-aws-url';

export default function RenderVideo({ videoKey }: { videoKey: string }) {
    const videoRef = useRef(null);
    const qualitySelectorRef = useRef(null);


    useEffect(() => {
        const fetchAndRenderVideo = async () => {
            const video: any = videoRef.current;
            console.log("video", video)
            if (!video) return
            const qualitySelector: any = qualitySelectorRef.current;
            if (!qualitySelector) return
            const manifestKey = `master-${videoKey}.m3u8`
            const videoSrc = await getAwsUrl(manifestKey);
            if (video.canPlayType('application/vnd.apple.mpegurl')) {
                // If HLS is natively supported (Safari, iOS)
                video.src = videoSrc.src;
            }
            else if (Hls.isSupported()) {
                // If HLS is not natively supported, use hls.js
                const hls = new Hls();
                hls.loadSource(videoSrc.src);
                hls.attachMedia(video);
                hls.on(Hls.Events.MANIFEST_PARSED, () => {

                });

                // Listen for changes in the quality selector
                qualitySelector.addEventListener('change', (event: any) => {
                    const selectedQuality = parseInt(event.target.value, 10);
                    hls.currentLevel = selectedQuality;
                });

                // Log the resolution of each segment as it is loaded
                hls.on(Hls.Events.FRAG_CHANGED, (event, data) => {
                    const level = hls.levels[data.frag.level];
                    console.log(`Loaded segment at resolution: ${level.width}x${level.height}`);
                });

                return () => {
                    hls.destroy();
                };
            }
            else {
                console.error('HLS is not supported in this browser.');
            }
        };

        fetchAndRenderVideo();
    }, [])

    return (
        <div>
            {/* Video element for the HLS stream */}
            <video ref={videoRef} controls autoPlay width="600"></video>

            {/* Dropdown for selecting video quality */}
            <select ref={qualitySelectorRef} style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', fontSize: '16px', cursor: 'pointer', color: 'black' }}>
                <option value="0">360p</option>
                <option value="1">480p</option>
                <option value="2">720p</option>
                {/* Add more options if there are more quality levels */}
            </select>

            {/* Include HLS.js library */}
            <script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>
        </div>
    );
};

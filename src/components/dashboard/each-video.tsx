import { getAwsUrl, getThumbnailAwsUrl } from '@/utils/get-aws-url';
import React from 'react'
import DisplayEachVideo from './display-each-video';
import { VideoType } from '@/lib/types/video-type';
import { clerkClient } from "@clerk/nextjs/server"
export default async function EachVideo({ video }: { video: VideoType }) {
    console.log("video", video)
    const manifestFileKey = `master-${video.videoKey}.m3u8`
    const {src: manifestUrl} = await getAwsUrl(manifestFileKey);
    const {src: thumbnailUrl} = await getThumbnailAwsUrl(video.thumbnailKey);
    const creatorId = video.userId;
    const myClerkClient = await clerkClient();
    const creatorData = await myClerkClient.users.getUser(creatorId); 
    const simplifiedCreatorData = {
        id: creatorData.id,
        fullName: creatorData.fullName || "",
        imageUrl: creatorData.imageUrl || "",
    };
    console.log("creatorData", simplifiedCreatorData)
    return (
       <DisplayEachVideo video={video} thumbnailUrl={thumbnailUrl} creatorData={simplifiedCreatorData}/>
    )
}

import React from 'react'

export default async function page({params} : {params: {userId: string}}) {
    const {userId} = await params;
  return (
    <div>
        <h1>Profile</h1>
        <p>{userId}</p>
    </div>
  )
}

import Link from 'next/link'
import React from 'react'

export default function DashboardContent() {
    const tabs = [
        {
            name: "All Videos",
            href: "/dashboard/all-videos",
        },
        {
            name: "Subscribed Channels",
            href: "/dashboard/subscribed-channels",
        },

    ]
    return (
        <div>
           {tabs.map((tab) => (
            <Link key={tab.name} href={tab.href}>
                {tab.name}
            </Link>
           ))}
        </div>
    )
}

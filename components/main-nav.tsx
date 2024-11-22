import * as React from "react"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { Icons } from "@/components/icons"

export function MainNav() {
    return (
        <div className="flex gap-6 md:gap-10">
            <Link href="/" className="flex items-center space-x-2">
                <Icons.Logo className="size-6 mb-1" />
                <span className="inline-block font-bold font-mono underline">
                    {siteConfig.name}
                </span>
            </Link>
        </div>
    )
}

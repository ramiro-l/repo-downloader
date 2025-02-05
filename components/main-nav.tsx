import * as React from "react"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { Icons } from "@/components/icons"

export function MainNav() {
    return (
        <div className="flex gap-6 md:gap-10">
            <Link href="/" className="flex items-center space-x-2">
                <Icons.Logo className="size-6" />

                <h1 className="mt-1 inline-block font-mono font-bold leading-none">
                    {siteConfig.name}
                </h1>
            </Link>
        </div>
    )
}

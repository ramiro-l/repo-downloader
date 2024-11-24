"use client"

import { useRepository } from "@/context/RepositoryContext"
import { DownloadIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function CardDownload() {
    const {} = useRepository()
    return (
        <div className=" border flex flex-col justify-center rounded-xl p-10 dark:bg-background bg-slate-100 w-1/3">
            <p className=" text-lg font-semibold text-center mb-2">
                Download Selected Content
            </p>
            <Button className="">
                <DownloadIcon size={24} />
            </Button>
        </div>
    )
}

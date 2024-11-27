"use client"

import { useState } from "react"
import { useRepository } from "@/context/RepositoryContext"
import { DownloadIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import DotsLoading from "@/components/tool/dots-loading"
import { infoSelectedFiles } from "@/components/tool/downloader/info-selected-files"

export default function SelectedItemsDownloader() {
    const { cantFilesSelected, cantFoldersSelected, downloadSelectedFiles } =
        useRepository()
    const [loading, setLoading] = useState<boolean>(false)

    const handleDownload = async () => {
        if (cantFilesSelected > 0) {
            setLoading(true)
            await downloadSelectedFiles()
            setLoading(false)
        }
    }

    return (
        <div className="border border-input flex flex-col justify-center rounded-xl p-10 dark:bg-background bg-slate-100 w-1/3">
            <p className=" text-lg font-semibold text-center ">
                Download Content
            </p>
            <Button
                className="mt-2 flex items-center gap-2 z-40"
                onClick={handleDownload}
            >
                <DownloadIcon size={24} />
                {loading && <DotsLoading fill="white" />}
            </Button>
            <p className="text-center text-sm py-1 rounded-md text-secondary-foreground/75">
                {infoSelectedFiles(cantFilesSelected, cantFoldersSelected)}
            </p>
        </div>
    )
}

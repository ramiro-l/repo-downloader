"use client"

import { useRepository } from "@/context/RepositoryContext"
import { DownloadIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { infoSelectedFiles } from "@/components/tool/download/info-selected-files"

export default function CardDownload() {
    const { cantFilesSelected, cantFoldersSelected } = useRepository()
    return (
        <div className="border border-input flex flex-col justify-center rounded-xl p-10 dark:bg-background bg-slate-100 w-1/3">
            <p className=" text-lg font-semibold text-center ">
                Download Content
            </p>
            <Button className="mt-2">
                <DownloadIcon size={24} />
            </Button>
            <p className="text-center text-sm py-1 rounded-md text-secondary-foreground/75">
                {infoSelectedFiles(cantFilesSelected, cantFoldersSelected)}
            </p>
        </div>
    )
}

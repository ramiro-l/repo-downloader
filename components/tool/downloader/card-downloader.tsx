"use client"

import { useState } from "react"
import { useRepository } from "@/context/RepositoryContext"
import { DownloadIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { infoSelectedFiles } from "@/components/tool/downloader/info-selected-files"

export default function SelectedItemsDownloader() {
    const { cantFilesSelected, cantFoldersSelected, downloadSelectedFiles } =
        useRepository()
    const [loading, setLoading] = useState<boolean>(false)
    const [notSelectedItemsTrigger, setNotSelectedItemsTrigger] =
        useState<boolean>(false)

    const handleDownload = async () => {
        if (cantFilesSelected > 0) {
            setLoading(true)
            await downloadSelectedFiles()
            setLoading(false)
        } else {
            handleNotSelectedItems()
        }
    }

    const handleNotSelectedItems = () => {
        setNotSelectedItemsTrigger(true)
        setTimeout(() => {
            setNotSelectedItemsTrigger(false)
        }, 500)
    }

    return (
        <div className="border border-input flex flex-col justify-center rounded-xl p-10 dark:bg-background bg-slate-100 w-1/3 max-md:w-full max-md:px-4 max-md:py-2">
            <p className=" text-lg font-semibold text-center max-md:hidden">
                Export Selected
            </p>
            <Button
                className="mt-2 flex items-center gap-2 z-40"
                onClick={handleDownload}
            >
                {!loading ? (
                    <>
                        <DownloadIcon size={24} />
                        <span>Download</span>
                    </>
                ) : (
                    <>
                        <Spinner size="small" />
                        <span>Downloading</span>
                    </>
                )}{" "}
            </Button>
            <p
                className={` transition-all duration-75 text-center text-sm py-1 rounded-md text-secondary-foreground/75 ${
                    notSelectedItemsTrigger &&
                    "font-medium !text-secondary-foreground"
                }`}
            >
                {infoSelectedFiles(cantFilesSelected, cantFoldersSelected)}
            </p>
        </div>
    )
}

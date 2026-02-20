"use client"

import { useState } from "react"
import { useRepository } from "@/context/RepositoryContext"
import { incrementDownloadCount } from "@/lib/donations"
import { DownloadIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"

import { DonationMessage } from "@/components/tool/downloader/donation-message"

import { infoSelectedFiles } from "@/components/tool/downloader/info-selected-files"

export default function SelectedItemsDownloader() {
    const { cantFilesSelected, cantFoldersSelected, downloadSelectedFiles } =
        useRepository()
    const [loading, setLoading] = useState<boolean>(false)
    const [notSelectedItemsTrigger, setNotSelectedItemsTrigger] =
        useState<boolean>(false)
    const [showDonationMessage, setShowDonationMessage] = useState<boolean>(false)

    const handleDownload = async () => {
        if (cantFilesSelected > 0) {
            setLoading(true)
            incrementDownloadCount()
            await downloadSelectedFiles()
            setShowDonationMessage(true)
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
        <div className="flex w-1/3 flex-col justify-center rounded-xl border border-input bg-slate-100 p-10 dark:bg-background max-md:w-full max-md:px-4 max-md:py-2">
            <p className=" text-center text-lg font-semibold max-md:hidden">
                Export Selected
            </p>
            <Button
                className="z-40 mt-2 flex items-center gap-2"
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
                className={` rounded-md py-1 text-center text-sm text-secondary-foreground/75 transition-all duration-75 ${notSelectedItemsTrigger &&
                    "font-medium !text-secondary-foreground"
                    }`}
            >
                {infoSelectedFiles(cantFilesSelected, cantFoldersSelected)}
            </p>
            <div className={`${showDonationMessage ? "opacity-100 mt-2" : "opacity-0 -mb-32"} transition-all duration-150`}>
                <DonationMessage onClose={() => setShowDonationMessage(false)} />
            </div>
        </div>
    )
}

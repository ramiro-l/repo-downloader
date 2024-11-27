"use client"

import { useRepository } from "@/context/RepositoryContext"
import { DownloadIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function CardDownload() {
    const { cantFilesSelected, cantFoldersSelected } = useRepository()
    return (
        <div className="border flex flex-col justify-center rounded-xl p-10 dark:bg-background bg-slate-100 w-1/3">
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

function infoSelectedFiles(
    cantFilesSelected: number,
    cantFoldersSelected: number
): string {
    if (cantFilesSelected === 0 && cantFoldersSelected === 0) {
        return "No files or folders selected"
    }
    if (cantFilesSelected > 0 && cantFoldersSelected === 0) {
        return `${formatFiles(
            cantFilesSelected
        )} selected, and no folders selected`
    }
    if (cantFilesSelected === 0 && cantFoldersSelected > 0) {
        return `No files selected, and ${formatFolders(
            cantFoldersSelected
        )} selected`
    }

    return `${formatFiles(cantFilesSelected)} and ${formatFolders(
        cantFoldersSelected
    )} selected`
}

function formatFiles(count: number): string {
    if (count === 0) return "no files"
    return `${count} ${count === 1 ? "file" : "files"}`
}

function formatFolders(count: number): string {
    if (count === 0) return "no folders"
    return `${count} ${count === 1 ? "folder" : "folders"}`
}

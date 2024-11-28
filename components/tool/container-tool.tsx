"use client"

import { RepositoryProvider, useRepository } from "@/context/RepositoryContext"

import CardContainer from "@/components/tool/container/card-container"
import SelectedItemsDownloader from "@/components/tool/downloader/card-downloader"
import CardInfoRepo from "@/components/tool/info-repo/card-info-repo"
import InputRepo from "@/components/tool/input-repo"

function Tool() {
    const { loading, container } = useRepository()
    const isLoadingOrEmpty = loading || container.length === 0

    return (
        <>
            <div
                className={`z-50 transition-all duration-200 ${
                    isLoadingOrEmpty ? "translate-y-20" : "-translate-y-0"
                }`}
            >
                <InputRepo />
            </div>
            <div
                className={`relative flex flex-col gap-2 transition-all duration-300 ${
                    isLoadingOrEmpty
                        ? "h-0 -translate-y-5 scale-90 opacity-0"
                        : "translate-y-0 scale-100 opacity-100"
                }`}
            >
                <CardInfoRepo />
                <div className="flex !max-h-[85vh] gap-2 max-md:flex-col">
                    <CardContainer />
                    <SelectedItemsDownloader />
                </div>
            </div>
        </>
    )
}

export default function ContainerTool() {
    return (
        <RepositoryProvider>
            <Tool />
        </RepositoryProvider>
    )
}

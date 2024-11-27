"use client"

import { RepositoryProvider, useRepository } from "@/context/RepositoryContext"

import CardContainer from "@/components/tool/container/card-container"
import CardDownload from "@/components/tool/download/card-download"
import CardInfoRepo from "@/components/tool/info-repo/card-info-repo"
import InputRepo from "@/components/tool/input-repo"

function Tool() {
    const { loading, container } = useRepository()
    const isLoadingOrEmpty = loading || container.length === 0

    return (
        <>
            <div
                className={`transition-all duration-200 transform z-50 ${
                    isLoadingOrEmpty ? "translate-y-20" : "-translate-y-0"
                }`}
            >
                <InputRepo />
            </div>
            <div
                className={`flex flex-col relative gap-2 transition-all duration-300 transform 
                    ${
                        isLoadingOrEmpty
                            ? "opacity-0 -translate-y-5 scale-90 h-0"
                            : "opacity-100 translate-y-0 scale-100"
                    }`}
            >
                <CardInfoRepo />
                <div className="flex gap-2 !max-h-[85vh]">
                    <CardContainer />
                    <CardDownload />
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

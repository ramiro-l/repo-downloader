"use client"

import { useEffect, useRef, useState } from "react"
import { RepositoryProvider, useRepository } from "@/context/RepositoryContext"

import { cn } from "@/lib/utils"
import CardContainer from "@/components/tool/container/card-container"
import SelectedItemsDownloader from "@/components/tool/downloader/card-downloader"
import CardInfoRepo from "@/components/tool/info-repo/card-info-repo"
import InputRepo from "@/components/tool/input-repo"

const TIME_TO_ANIMATE: 0 | 75 | 100 | 150 | 200 | 300 | 500 | 700 | 1000 = 500

function Tool() {
    const { loading, container } = useRepository()
    const [height, setHeight] = useState(0)
    const toolRef = useRef<HTMLDivElement>(null)
    const isLoadingOrEmpty = loading || container.length === 0

    useEffect(() => {
        if (toolRef.current) {
            if (isLoadingOrEmpty) {
                setHeight(0)
            } else {
                setHeight(toolRef.current.scrollHeight)
                setTimeout(() => {
                    if (toolRef.current) {
                        toolRef.current.style.height = "auto"
                    }
                }, TIME_TO_ANIMATE)
            }
        }
    }, [isLoadingOrEmpty, container])

    return (
        <>
            <div className="z-50">
                <InputRepo />
            </div>
            <div
                id="tool"
                ref={toolRef}
                style={{ height: `${height}px` }}
                className={cn(
                    `duration-${TIME_TO_ANIMATE}`,
                    "relative flex flex-col gap-2 overflow-hidden transition-all ease-in-out"
                )}
            >
                <div
                    className={cn(
                        `delay-${TIME_TO_ANIMATE} ${
                            !isLoadingOrEmpty ? "opacity-0" : "opacity-100"
                        }`,
                        "pointer-events-none absolute inset-x-0 bottom-0 z-50 h-16 bg-gradient-to-t from-background to-transparent transition-all duration-200"
                    )}
                ></div>
                <CardInfoRepo />
                <div className="flex gap-2 max-md:flex-col md:max-h-[85vh]">
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

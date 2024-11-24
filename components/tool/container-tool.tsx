"use client"

import { RepositoryProvider, useRepository } from "@/context/RepositoryContext"

import CardContents from "@/components/tool/card-contents"
import CardInfoSelected from "@/components/tool/card-download"
import CardInfoRepo from "@/components/tool/card-info-repo"
import InputRepo from "@/components/tool/input-repo"

function Tool() {
    const { loading } = useRepository()
    return (
        <>
            <InputRepo />
            <div
                className={`flex flex-col gap-2 transition-all duration-300 transform ${
                    loading
                        ? "opacity-100 translate-y-0 scale-100"
                        : "opacity-0 -translate-y-5 scale-90"
                }`}
            >
                <CardInfoRepo />
                <div className="flex gap-2">
                    <CardContents />
                    <CardInfoSelected />
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

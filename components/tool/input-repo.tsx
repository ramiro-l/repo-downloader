"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useRepository } from "@/context/RepositoryContext"
import { SearchCode } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import scrollToBottom from "@/components/scrollBottom"

import DotsLoading from "./dots-loading"

export default function InputRepo() {
    const { initRepository, loading } = useRepository()
    const router = useRouter()
    const searchParams = useSearchParams()
    const [url, setUrl] = useState("")
    const [errorMessages, setErrorMessages] = useState<string>("")

    useEffect(() => {
        const repositoryUrl = searchParams.get("repository")
        if (repositoryUrl) {
            setUrl(decodeURIComponent(repositoryUrl))
        }
    }, [searchParams])

    async function handleSubmit() {
        setErrorMessages("")
        try {
            if (!url || url === "")
                throw new Error("The repository URL is required")
            router.push(`?repository=${encodeURIComponent(url)}`)
            await initRepository(url)
            scrollToBottom()
        } catch (error) {
            if (error instanceof Error) {
                router.push("/")
                setErrorMessages(error.message)
            } else {
                setErrorMessages("An unknown error occurred")
            }
        }
    }

    return (
        <div className="flex gap-2 mb-4 max-lg:flex-col z-50">
            <div className="flex-col w-full ">
                <Input
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Paste the git repository URL"
                />
                {errorMessages && (
                    <span className="text-red-500 text-sm ml-1 duration-200 transition-all">
                        {errorMessages}
                    </span>
                )}
            </div>
            <Button onClick={handleSubmit} className="w-1/6 max-lg:w-auto">
                <SearchCode size={24} />

                <span
                    className={`scale-75 ml-2 ${
                        !loading
                            ? "opacity-0 scale-0 w-0"
                            : "opacity-100 scale-100 w-auto"
                    } transition-all duration-150`}
                >
                    <DotsLoading />
                </span>
            </Button>
        </div>
    )
}

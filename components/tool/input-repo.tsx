"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useRepository } from "@/context/RepositoryContext"
import { CircleX, SearchCode } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { scrollToBottom } from "@/components/scroll"

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
    const handleClearInput = () => {
        router.push("/")
        setUrl("")
    }

    return (
        <div className="z-50 mb-4 flex gap-2 max-lg:flex-col">
            <div className="w-full flex-col ">
                <div className="relative">
                    <Input
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="Paste the git repository URL"
                        className="pr-8 border-input"
                    />
                    {url && (
                        <button
                            className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                            aria-label="Clear input"
                            onClick={handleClearInput}
                        >
                            <CircleX
                                size={16}
                                strokeWidth={2}
                                aria-hidden="true"
                            />
                        </button>
                    )}
                </div>
                {errorMessages && (
                    <span className="ml-1 text-sm text-red-500 transition-all duration-200">
                        {errorMessages}
                    </span>
                )}
            </div>
            <Button
                onClick={handleSubmit}
                className="flex w-1/6 items-center gap-2 max-lg:w-auto"
            >
                {!loading ? <SearchCode size={24} /> : <Spinner size="small" />}
                <span>{!loading ? "Search" : "Loading"}</span>
            </Button>
        </div>
    )
}

"use client"

import { useEffect, useState } from "react"
import { useRepository } from "@/context/RepositoryContext"
import { QUERY_PARAMS } from "@/services/query-params.ts/const"
import {
    clearQueryParams,
    deleteQueryParam,
    getQueryParam,
    setQueryParam,
} from "@/services/query-params.ts/query-params"
import { CircleX, SearchCode } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import SwitchIncludeSubmodules from "@/components/tool/input-repo/switch-include-submodules"

export default function InputRepo() {
    const { initRepository, loading, fetchSubmodules, container } =
        useRepository()
    const [url, setUrl] = useState("")
    const [errorMessages, setErrorMessages] = useState<string>("")
    const [getSubmodules, setGetSubmodules] = useState(fetchSubmodules)

    useEffect(() => {
        const repositoryUrl = getQueryParam(QUERY_PARAMS.REPOSITORY)
        if (repositoryUrl) {
            setUrl(decodeURIComponent(repositoryUrl))
        }
    }, [])

    useEffect(() => {
        if (container.length > 0) {
            if (getSubmodules && !fetchSubmodules) {
                setErrorMessages("To include submodules, search again.")
            } else if (!getSubmodules && fetchSubmodules) {
                setErrorMessages("To exclude submodules, search again.")
            } else {
                setErrorMessages("")
            }
        }
    }, [getSubmodules, fetchSubmodules, container.length])

    const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (errorMessages) setErrorMessages("")
        setUrl(e.target.value)
    }

    async function handleSubmit() {
        setErrorMessages("")
        try {
            if (!url || url === "") {
                throw new Error("The repository URL is required.")
            }
            setQueryParam(QUERY_PARAMS.REPOSITORY, encodeURIComponent(url))
            await initRepository(url, getSubmodules)
        } catch (error) {
            if (error instanceof Error) {
                setErrorMessages(error.message)
                if (error.message.includes("rate limit exceeded")) return
                clearQueryParams()
            } else {
                setErrorMessages("An unknown error occurred.")
            }
        }
    }

    const handleClearInput = () => {
        deleteQueryParam(QUERY_PARAMS.REPOSITORY)
        setErrorMessages("")
        setUrl("")
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSubmit()
        }
    }

    return (
        <div className="z-50 mb-4 flex gap-2 max-lg:flex-col">
            <div className="w-full flex-col ">
                <div className="relative">
                    <Input
                        value={url}
                        onChange={handleTyping}
                        onKeyDown={handleKeyDown}
                        placeholder="Paste the git repository URL"
                        className="border-input pr-8"
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
                <div className="flex w-full items-center justify-between p-1 max-md:flex-col max-md:items-start">
                    <SwitchIncludeSubmodules
                        checked={getSubmodules}
                        setGetSubmodules={setGetSubmodules}
                    />
                    {errorMessages && (
                        <span className="ml-1 text-sm text-red-500 transition-all duration-200">
                            {errorMessages}
                        </span>
                    )}
                </div>
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

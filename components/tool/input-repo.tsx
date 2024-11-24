"use client"

import { useState } from "react"
import { useRepository } from "@/context/RepositoryContext"
import { SearchCode } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function InputRepo() {
    const { initRepository } = useRepository()
    const [url, setUrl] = useState(
        "https://github.com/DeMarc-Team/ElSwitcher-Frontend"
    )
    const [errorMessages, setErrorMessages] = useState<string>("")

    async function handleSubmit() {
        setErrorMessages("")
        try {
            await initRepository(url)
            setUrl("")
        } catch (error) {
            if (error instanceof Error) {
                setErrorMessages(error.message)
            } else {
                setErrorMessages("An unknown error occurred")
            }
        }
    }

    return (
        <div className="flex gap-2 mb-4 max-lg:flex-col">
            <div className="flex-col w-full ">
                <Input
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Paste the github repository URL"
                />
                {errorMessages && (
                    <span className="text-red-500 text-sm ml-1 duration-200 transition-all">
                        {errorMessages}
                    </span>
                )}
            </div>
            <Button onClick={handleSubmit} className="w-1/6 max-lg:w-auto">
                <SearchCode size={24} />
            </Button>
        </div>
    )
}

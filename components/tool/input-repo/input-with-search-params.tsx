import { useEffect } from "react"
import { useSearchParams } from "next/navigation"

import { Input } from "@/components/ui/input"

export default function InputWithSearchParams({
    value,
    setValue,
    onChange,
    onKeyDown,
    placeholder,
    className,
}: Readonly<{
    value: string
    setValue: (value: string) => void
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
    placeholder: string
    className: string
}>) {
    const searchParams = useSearchParams()

    useEffect(() => {
        const repositoryUrl = searchParams.get("repository")
        if (repositoryUrl) {
            setValue(decodeURIComponent(repositoryUrl))
        }
    }, [searchParams, setValue])

    return (
        <Input
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            className={className}
        />
    )
}

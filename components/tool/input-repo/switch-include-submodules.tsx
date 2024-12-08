import { useEffect } from "react"
import { QUERY_PARAMS } from "@/services/query-params.ts/const"
import {
    getQueryParam,
    setQueryParam,
} from "@/services/query-params.ts/query-params"

import { Switch } from "@/components/ui/switch"

export default function SwitchIncludeSubmodules({
    checked,
    setGetSubmodules,
}: Readonly<{
    checked: boolean
    setGetSubmodules: (value: boolean) => void
}>) {
    useEffect(() => {
        const includeSubmodules = getQueryParam(QUERY_PARAMS.SUBMODULES)
        if (includeSubmodules) {
            setGetSubmodules(includeSubmodules === "true")
        }
    }, [setGetSubmodules])

    const handleSwitch = (value: boolean) => {
        setQueryParam(QUERY_PARAMS.SUBMODULES, value)
        setGetSubmodules(value)
    }

    return (
        <div className="flex items-center justify-center gap-1">
            <Switch
                size="small"
                checked={checked}
                onCheckedChange={handleSwitch}
                aria-label="Include submodules"
            />
            <p className="text-sm">
                <span className="text-muted-foreground/80">
                    Include submodules
                </span>
                <span className="text-muted-foreground/60 max-[355px]:hidden">
                    {" "}
                    (experimental)
                </span>
            </p>
        </div>
    )
}

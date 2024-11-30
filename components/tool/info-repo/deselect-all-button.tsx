import { useRepository } from "@/context/RepositoryContext"
import { X } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

export default function DeselectAllButton() {
    const { deselectAll } = useRepository()
    return (
        <TooltipProvider delayDuration={0}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        onClick={deselectAll}
                        variant="outline"
                        size="icon"
                        aria-label="Deselect all files"
                        className="aspect-square hover:border-red-500 hover:bg-red-500 hover:text-white"
                    >
                        <X className="size-4" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent className="border border-input bg-popover px-2 py-1 text-xs">
                    Deselect all files
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

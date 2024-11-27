import { useRepository } from "@/context/RepositoryContext"
import { Download } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

export default function DownloadRepositoryButton() {
    const { downloadRepoUrl } = useRepository()
    return (
        <TooltipProvider delayDuration={0}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <a href={downloadRepoUrl}>
                        <Button
                            variant="outline"
                            size="icon"
                            aria-label="Download all repository"
                            className="aspect-square hover:bg-primary hover:text-white"
                        >
                            <Download className="h-4 w-4 " />
                        </Button>
                    </a>
                </TooltipTrigger>
                <TooltipContent className="border border-input bg-popover px-2 py-1 text-xs">
                    Download all files
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

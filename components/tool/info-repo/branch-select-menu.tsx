import { useRepository } from "@/context/RepositoryContext"
import { GitBranch } from "lucide-react"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function BranchSelectMenu() {
    const { branchSelected, branches, toggleBranch } = useRepository()
    return (
        <Select
            value={branchSelected}
            onValueChange={(value) => {
                toggleBranch(value)
            }}
        >
            <SelectTrigger id="select-15" className="truncate">
                <div className="flex w-[90%] min-w-4 items-center gap-2 truncate max-[330px]:justify-center">
                    <GitBranch className="size-4" />
                    <div className="w-[90%] truncate text-left max-[330px]:hidden">
                        <SelectValue placeholder="Select branch" />
                    </div>
                </div>
            </SelectTrigger>
            <SelectContent align="end" className="max-w-[75vw]">
                {branches.map((branch) => (
                    <SelectItem key={branch} value={branch}>
                        {branch}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}

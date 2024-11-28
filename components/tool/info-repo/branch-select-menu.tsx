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
                <div className="flex items-center gap-2 truncate">
                    <GitBranch className="size-4" />
                    <div className="w-[90%] truncate text-left">
                        <SelectValue placeholder="Select branch" />
                    </div>
                </div>
            </SelectTrigger>
            <SelectContent align="end">
                {branches.map((branch) => (
                    <SelectItem key={branch} value={branch}>
                        {branch}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}

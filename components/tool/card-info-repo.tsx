import { useRepository } from "@/context/RepositoryContext"
import { GitBranch } from "lucide-react"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function CardInfoRepo() {
    const { owner, repo, repoWebUrl, branchSelected, branches, toggleBranch } =
        useRepository()

    return (
        <div className=" flex items-center justify-between border rounded-lg p-2 bg-background w-full z-10">
            <div className="w-full">
                <a
                    className="text-sm font-bold hover:underline "
                    href={repoWebUrl}
                    target="_blank"
                >
                    {owner}/{repo}
                </a>
            </div>
            <div className="w-1/4">
                <Select
                    value={branchSelected}
                    onValueChange={(value) => {
                        toggleBranch(value)
                    }}
                >
                    <SelectTrigger id="select-15">
                        <div className="flex items-center gap-2 truncate w-[95%] ">
                            <GitBranch className="h-4 w-4" />
                            <div className="w-[90%] truncate text-left">
                                <SelectValue placeholder="Select branch" />
                            </div>
                        </div>
                    </SelectTrigger>
                    <SelectContent align="end" avoidCollisions={false}>
                        {branches.map((branch) => (
                            <SelectItem key={branch} value={branch}>
                                {branch}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}

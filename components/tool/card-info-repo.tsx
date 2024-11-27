import { useRepository } from "@/context/RepositoryContext"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function CardInfoRepo() {
    const { owner, repo, repoWebUrl, branchSelected, branches } =
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
                {/* <Select defaultValue={branch_selected}>
                    <SelectTrigger>
                        <SelectValue>{branch_selected}</SelectValue>
                    </SelectTrigger>
                    <SelectContent className="w-fit" avoidCollisions={false}>
                        {branches.map((branch) => (
                            <SelectItem key={branch} value={branch}>
                                {branch}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select> */}
            </div>
        </div>
    )
}

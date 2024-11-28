import { useRepository } from "@/context/RepositoryContext"
import { Globe } from "lucide-react"

import BranchSelectMenu from "@/components/tool/info-repo/branch-select-menu"
import DeselectAllButton from "@/components/tool/info-repo/deselect-all-button"
import DownloadRepositoryButton from "@/components/tool/info-repo/download-repository-button"

export default function CardInfoRepo() {
    const { owner, repo, repoWebUrl } = useRepository()

    return (
        <div className=" z-10 flex w-full items-center justify-between rounded-lg border border-input bg-background p-2 gap-2">
            <div className="ml-2 w-2/3  max-md:w-auto max-sm:ml-0  ">
                <a
                    className="text-sm font-bold hover:underline flex items-center gap-2"
                    href={repoWebUrl}
                    target="_blank"
                    rel="noreferrer"
                >
                    <div className="flex items-center justify-center max-sm:border-input max-sm:border max-sm:h-10 max-sm:w-10 max-sm:rounded-sm  max-sm:hover:bg-accent max-sm:aspect-square">
                        <Globe className="size-4" />
                    </div>
                    <span className="max-md:hidden">
                        {owner && owner.length > 22
                            ? `${owner.slice(0, 10)}...${owner.slice(-10)}`
                            : `${owner}`}
                        /
                        {repo && repo.length > 22
                            ? `${repo.slice(0, 10)}...${repo.slice(-10)}`
                            : `${repo}`}
                    </span>
                    <span className="max-sm:hidden md:hidden">
                        {repo && repo.length > 10
                            ? repo?.slice(0, 10) + "..."
                            : repo}
                    </span>
                </a>
            </div>
            <div className=" flex w-1/3 gap-2 max-md:w-1/2 max-sm:w-full">
                <DeselectAllButton />
                <DownloadRepositoryButton />
                <BranchSelectMenu />
            </div>
        </div>
    )
}

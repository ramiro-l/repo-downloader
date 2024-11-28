import { useRepository } from "@/context/RepositoryContext"

import BranchSelectMenu from "@/components/tool/info-repo/branch-select-menu"
import DeselectAllButton from "@/components/tool/info-repo/deselect-all-button"
import DownloadRepositoryButton from "@/components/tool/info-repo/download-repository-button"

export default function CardInfoRepo() {
    const { owner, repo, repoWebUrl } = useRepository()

    return (
        <div className=" z-10 flex w-full items-center justify-between rounded-lg border border-input bg-background p-2">
            <div className="ml-2 w-2/3">
                <a
                    className="text-sm font-bold hover:underline "
                    href={repoWebUrl}
                    target="_blank"
                    rel="noreferrer"
                >
                    {owner}/{repo}
                </a>
            </div>
            <div className="ml-3 flex  w-1/3 gap-2">
                <DeselectAllButton />
                <DownloadRepositoryButton />
                <BranchSelectMenu />
            </div>
        </div>
    )
}

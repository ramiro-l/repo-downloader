import { useRepository } from "@/context/RepositoryContext"

import BranchSelectMenu from "@/components/tool/info-repo/branch-select-menu"
import DeselectAllButton from "@/components/tool/info-repo/deselect-all-button"
import DownloadRepositoryButton from "@/components/tool/info-repo/download-repository-button"

export default function CardInfoRepo() {
    const { owner, repo, repoWebUrl } = useRepository()

    return (
        <div className=" flex items-center justify-between border border-input rounded-lg p-2 bg-background w-full z-10">
            <div className="w-2/3 ml-2">
                <a
                    className="text-sm font-bold hover:underline "
                    href={repoWebUrl}
                    target="_blank"
                >
                    {owner}/{repo}
                </a>
            </div>
            <div className="w-1/3 ml-3  flex gap-2">
                <DeselectAllButton />
                <DownloadRepositoryButton />
                <BranchSelectMenu />
            </div>
        </div>
    )
}

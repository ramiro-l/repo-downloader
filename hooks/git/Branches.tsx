import { useState } from "react"
import { getGithubBranches } from "@/services/github/get-branches"

export function useBranches(loadContainer: (branch: string) => Promise<void>) {
    const [branchSelected, setBranchSelected] = useState<string>()
    const [branches, setBranches] = useState<string[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    const toggleBranch = async (newBranch: string) => {
        if (!branches.includes(newBranch)) throw new Error("Branch not found")
        setBranchSelected(newBranch)
        await loadContainer(newBranch)
    }

    const initBranches = async (
        owner: string,
        repo: string
    ): Promise<string> => {
        setLoading(true)
        const branches = await getGithubBranches(owner, repo)
        setBranches(branches)
        const firtBranch = initBranchSelected(branches)
        setLoading(false)
        return firtBranch
    }

    const initBranchSelected = (banches: string[]): string => {
        const branch = banches[banches.length - 1]
        setBranchSelected(branch)
        return branch
    }

    return {
        loading,
        branches,
        branchSelected,
        initBranches,
        toggleBranch,
    }
}

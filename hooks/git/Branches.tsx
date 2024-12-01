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
        repo: string,
        initBranch?: string
    ): Promise<string> => {
        setLoading(true)
        try {
            const branches = await getGithubBranches(owner, repo)
            if (initBranch && !branches.includes(initBranch)) {
                branches.push(initBranch)
            }
            setBranches(branches)
            const firstBranch = initBranch ?? initBranchSelected(branches)
            setBranchSelected(firstBranch)
            setLoading(false)
            return firstBranch
        } catch (error: Error | any) {
            setLoading(false)
            if (error?.message === "Failed to get branches") {
                throw new Error("Repository not found.")
            }
            throw error
        }
    }

    const initBranchSelected = (banches: string[]): string => {
        const branch = banches[banches.length - 1]
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

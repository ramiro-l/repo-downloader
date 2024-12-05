import { GITHUB_API_URL } from "@/services/github/const"
import { handleGithubApiRateLimitError } from "@/services/github/get-rate-limit"

const BRANCHES_PER_PAGE = 100

export const getGithubBranches = async (
    owner: string,
    repo: string
): Promise<string[]> => {
    let page = 1
    const allBranches: string[] = []

    while (true) {
        const response = await fetch(
            `${GITHUB_API_URL}/repos/${owner}/${repo}/branches?per_page=${BRANCHES_PER_PAGE}&page=${page}`
        )
        const branches = await response.json()

        if (!response.ok) {
            await handleGithubApiRateLimitError(branches.message)
            throw new Error("Failed to get branches")
        }

        if (
            !Array.isArray(branches) ||
            !branches.every((branch) => typeof branch.name === "string")
        ) {
            throw new Error("Invalid response from GitHub API")
        }

        allBranches.push(...branches.map((branch) => branch.name as string))

        if (branches.length < BRANCHES_PER_PAGE) {
            break
        }

        page++
    }

    return allBranches
}

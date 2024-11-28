import { GITHUB_API_URL } from "@/services/github/const"

export const getGithubBranches = async (
    owner: string,
    repo: string
): Promise<string[]> => {
    const response = await fetch(
        `${GITHUB_API_URL}/repos/${owner}/${repo}/branches`
    )

    if (!response.ok) {
        throw new Error("Failed to get branches")
    }

    const branches = await response.json()
    if (
        !Array.isArray(branches) ||
        !branches.every((branch: any) => typeof branch.name === "string")
    ) {
        throw new Error("Invalid response from GitHub API")
    }

    return branches.map((branch: any) => branch.name as string)
}

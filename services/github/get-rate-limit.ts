import { GITHUB_API_URL } from "@/services/github/const"
import { formatTimeUntil } from "@/services/time"

interface RateLimit {
    limit: number
    remaining: number
    reset: number
    used: number
    resource: string
}

export async function handleGithubApiRateLimitError(errorMessage: string) {
    if (errorMessage.includes("API rate limit exceeded")) {
        const rateLimit = await getRateLimit()
        throw new Error(
            `GitHub API rate limit exceeded. Reset in ${formatTimeUntil(
                rateLimit.reset
            )}.`
        )
    }
}

async function getRateLimit(): Promise<RateLimit> {
    try {
        const response = await fetch(`${GITHUB_API_URL}/rate_limit`)
        const data = await response.json()
        return data.resources.core
    } catch (error) {
        throw new Error("Failed to get rate limit")
    }
}

import { GITHUB_URL } from "./const"

export const getGithubRepoOwnerAndName = (url: string): { owner: string, repo: string } => {
    const match = /github\.com\/([^/]+)\/([^/]+)/.exec(url)
    if (match) {
        return { owner: match[1], repo: match[2] }
    } else {
        throw new Error("Invalid URL, expected github.com/<owner>/<repo>")
    }
}

export function isGithubUrl(url: string) {
    return url.startsWith("https://github.com/");
}

export function getGithubRepoWebUrl(owner: string, repo: string, branch?: string) {
    if (!branch) {
        return `${GITHUB_URL}/${owner}/${repo}`;
    } else {
        return `${GITHUB_URL}/${owner}/${repo}/tree/${branch}`;
    }
}
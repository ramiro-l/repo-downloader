import { File } from "@/services/file"
import { GITHUB_API_URL, type GitHubSubmodule } from "@/services/github/const"
import { getGithubTree, githubTreeToFiles } from "@/services/github/get-tree"
import { getGithubUrlInfo } from "@/services/github/parsers"
import { parse } from "ini"

export async function addGithubSubmoduleFiles<TMetaData>(
    files: File<TMetaData>[],
    initMetaData: TMetaData,
    submodules: GitHubSubmodule[]
) {
    for (const item of files) {
        if (item.isSubmodule) {
            const itemPath =
                item.path.length === 0
                    ? item.name
                    : `${item.path.join("/")}/${item.name}`
            const submodule = submodules.find((sub) => sub.path === itemPath)

            if (!submodule)
                throw new Error("Submodule not matched with .gitmodules")
            if (!item.isDirectory())
                throw new Error("Submodule is not a directory")

            const subTree = await getGithubTree(
                submodule.owner,
                submodule.repo,
                item.id
            )
            const repoFiles = await githubTreeToFiles(
                subTree.githubTree,
                initMetaData,
                submodule.owner,
                submodule.repo,
                item.id
            )

            addParentPathToFiles(
                repoFiles,
                item.path,
                item.name,
                item.pathIndex
            )

            item._content = repoFiles
            submodules = submodules.filter((sub) => sub.path !== item.id)
        } else if (item.isDirectory()) {
            await addGithubSubmoduleFiles(
                item.content,
                initMetaData,
                submodules
            )
        }
    }
}

function addParentPathToFiles<TMetaData>(
    files: File<TMetaData>[],
    parentPath: string[],
    parentName: string,
    parentPathIndex: number[]
) {
    for (const file of files) {
        file.path.unshift(...parentPath, parentName)
        file.pathIndex.unshift(...parentPathIndex)
        if (file.isDirectory()) {
            addParentPathToFiles(
                file.content,
                parentPath,
                parentName,
                parentPathIndex
            )
        }
    }
}

export async function getGithubSubmodules(
    fileUrl: string
): Promise<GitHubSubmodule[]> {
    validateGithubFileUrl(fileUrl)

    const data = await fetchGitmodulesData(fileUrl)
    validateGitmodulesData(data)

    const submodules = parseGitmodulesContent(data.content)

    return mapSubmodules(submodules)
}

async function fetchGitmodulesData(fileUrl: string): Promise<any> {
    const response = await fetch(fileUrl)
    return response.json()
}

function parseGitmodulesContent(content: string): any {
    const decodedContent = Buffer.from(content, "base64").toString("utf-8")
    return parse(decodedContent)
}

function mapSubmodules(submodules: any): GitHubSubmodule[] {
    return Object.keys(submodules).map((key) => {
        const submodule = submodules[key]
        const { owner, repo } = getGithubUrlInfo(submodule.url)
        return {
            path: submodule.path,
            url: submodule.url,
            owner,
            repo,
        }
    })
}

function validateGithubFileUrl(fileUrl: string) {
    if (
        !fileUrl.startsWith(GITHUB_API_URL) ||
        !fileUrl.includes("/git/blobs/")
    ) {
        throw new Error("Invalid .gitmodules file")
    }
}

function validateGitmodulesData(data: any) {
    if (!data.content || !data.encoding) {
        throw new Error("Invalid .gitmodules file")
    }
    if (data.encoding !== "base64") {
        throw new Error("Unsupported encoding for .gitmodules file")
    }
}

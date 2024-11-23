"use client"

import React, { ReactNode, createContext, useRef, useState } from "react"

import { GithubElement, isGithubElement } from "@/types/github"

interface RepoElement extends GithubElement {
    selected: boolean
    dirContent: RepoElement[]
    fatherSha?: string
}

interface RepositoryContextProps {
    url: string
    branch_selected: string
    branches: string[]
    contents: RepoElement[]
    loading: boolean
    initRepository: (url: string) => Promise<void>
    changeCurrentBranch: (branch: string) => Promise<void>
    toggleSelectElement: (sha: string, value_selected: boolean) => Promise<void>
    loadDirectory: (sha: string) => Promise<void>
}

const RepositoryContext = createContext<RepositoryContextProps | undefined>(
    undefined
)

export const RepositoryProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [url, setUrl] = useState<string>("")
    let owner = useRef<string>("")
    let repo = useRef<string>("")
    const [branch_selected, setBranchSelected] = useState<string>("main")
    const [branches, setBranches] = useState<string[]>([])
    const [contents, setContents] = useState<RepoElement[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    const initRepository = async (url: string) => {
        if (!url.startsWith("https://github.com/")) {
            throw new Error("This is not a GitHub URL")
        }
        if (url.endsWith(".git")) {
            throw new Error(
                "Invalid GitHub URL, do not use a git repository URL"
            )
        }

        setLoading(true)
        setUrl(url)
        parsePath(url)
        // await setBranchesData()
        // ensureBranchIsValid()
        await setContentsData()
        setLoading(false)
    }

    // Parse the URL to get owner and repo
    const parsePath = (path: string) => {
        const match = /github\.com\/([^/]+)\/([^/]+)/.exec(path)
        if (match) {
            owner.current = match[1]
            repo.current = match[2]
        } else {
            throw new Error("Invalid URL, expected github.com/<owner>/<repo>")
        }
    }

    const ensureBranchIsValid = () => {
        if (!branches.includes(branch_selected)) {
            setBranchSelected(branches[branches.length - 1])
        }
    }

    const changeCurrentBranch = async (branch: string) => {
        if (!branches.includes(branch)) {
            throw new Error("Invalid branch")
        }
        setBranchSelected(branch)
        await setContentsData()
    }

    const setBranchesData = async () => {
        setBranches(await fetchBranches())
    }

    const fetchBranches = async (): Promise<string[]> => {
        const response = await fetch(
            `https://api.github.com/repos/${owner}/${repo}/branches`
        )

        if (!response.ok) {
            throw new Error("Failed to get branches")
        }

        const data = await response.json()
        if (
            !Array.isArray(data) ||
            !data.every((branch: any) => typeof branch.name === "string")
        ) {
            throw new Error("Invalid response")
        }

        return data.map((branch: any) => branch.name)
    }

    const fetchContents = async (url: string): Promise<RepoElement[]> => {
        const data_response = await fetch(url)

        if (!data_response.ok) throw new Error("Failed to get contents")

        let data = (await data_response.json()) as GithubElement[]

        if (!Array.isArray(data) || !data.every(isGithubElement)) {
            throw new Error("Invalid response")
        }

        data = data.sort((a, b) => {
            if (a.type === "dir" && b.type === "file") return -1
            if (a.type === "file" && b.type === "dir") return 1
            if (a.name < b.name) return -1
            return 0
        })

        const response: RepoElement[] = data.map((content) => ({
            ...content,
            selected: false,
            dirContent: [],
        }))

        return response
    }

    const setContentsData = async () => {
        setContents(
            await fetchContents(
                `https://api.github.com/repos/${owner.current}/${repo.current}/contents?ref=${branch_selected}`
            )
        )
    }

    const toggleSelectElement = async (
        sha: string,
        value_selected: boolean
    ) => {
        const updateAll = async (el: RepoElement, selected: boolean) => {
            const updatedDirContent: RepoElement[] = await Promise.all(
                el.dirContent.map(async (dirEl) => {
                    if (dirEl.type === "dir") {
                        return await updateAll(dirEl, selected)
                    } else {
                        return await updateFile(dirEl, selected)
                    }
                })
            )
            return {
                ...el,
                selected: selected,
                dirContent: updatedDirContent,
            }
        }

        const updateFile = async (el: RepoElement, selected: boolean) => {
            return { ...el, selected: selected }
        }

        const updateToggleSelect = (el: RepoElement) => {
            if (!el) throw new Error("Element not found")
            return updateAll(el, value_selected)
        }

        await updateElement(sha, updateToggleSelect, (el) => {
            return {
                ...el,
                selected: el.dirContent.every((content) => content.selected),
            }
        })
    }

    const loadDirectory = async (sha: string) => {
        await updateElement(sha, async (el) => {
            if (el.type === "file") {
                throw new Error("Cannot load directory of a file")
            }

            if (el.dirContent.length > 0) return el

            let newContents = await fetchContents(el.url)
            newContents = newContents.map((content) => ({
                ...content,
                selected: el.selected,
                fatherSha: el.sha,
            }))
            return { ...el, dirContent: newContents }
        })
    }

    const updateElement = async (
        sha: string,
        newElement: (
            element: RepoElement
        ) => Promise<RepoElement> | RepoElement,
        newFather?: (element: RepoElement) => Promise<RepoElement> | RepoElement
    ) => {
        const update = async (
            elements: RepoElement[],
            sha_path: string[] = []
        ): Promise<{
            updatedElements: RepoElement[]
            sha_path_found: string[]
        }> => {
            let sha_path_found: string[] = []
            const updatedElements = await Promise.all(
                elements.map(async (el) => {
                    if (el.sha === sha) {
                        sha_path_found = [...sha_path, el.sha]
                        return await newElement(el)
                    }
                    if (el.dirContent) {
                        const {
                            updatedElements: updatedDirContent,
                            sha_path_found: sha_path_updated,
                        } = await update(el.dirContent, [...sha_path, el.sha])
                        if (sha_path_updated.length > 0) {
                            sha_path_found = sha_path_updated
                        }
                        return { ...el, dirContent: updatedDirContent }
                    }
                    return el
                })
            )

            return {
                updatedElements,
                sha_path_found,
            }
        }

        let { updatedElements, sha_path_found } = await update(contents)

        if (sha_path_found.length === 0) {
            throw new Error("Element not found")
        }

        if (sha_path_found.length > 1 && newFather != undefined) {
            updatedElements = await updateFathers(
                updatedElements,
                sha_path_found.slice(0, -1),
                newFather
            )
        }
        setContents(updatedElements)
    }

    // First update the father of the element, then the father of the father with the new father ...
    const updateFathers = async (
        contents_to_update: RepoElement[],
        sha_path: string[],
        updateFather: (
            element: RepoElement
        ) => Promise<RepoElement> | RepoElement
    ) => {
        const update = async (
            elements: RepoElement[],
            sha_path: string[] = []
        ): Promise<RepoElement[]> => {
            const updatedElements = await Promise.all(
                elements.map(async (el) => {
                    if (el.sha === sha_path[0]) {
                        if (sha_path.length === 1) {
                            return await updateFather(el)
                        }
                        const new_dirContent = await update(
                            el.dirContent,
                            sha_path.slice(1)
                        )
                        return await updateFather({
                            ...el,
                            dirContent: new_dirContent,
                        })
                    }
                    return el
                })
            )

            return updatedElements
        }

        return await update(contents_to_update, sha_path)
    }

    return (
        <RepositoryContext.Provider
            value={{
                url,
                branch_selected,
                branches,
                contents,
                loading,
                initRepository,
                changeCurrentBranch,
                toggleSelectElement,
                loadDirectory,
            }}
        >
            {children}
        </RepositoryContext.Provider>
    )
}

export const useRepository = (): RepositoryContextProps => {
    const context = React.useContext(RepositoryContext)
    if (!context) {
        throw new Error(
            "useRepository must be used within a RepositoryProvider"
        )
    }
    return context
}

import { useEffect, useState } from "react"
import { File } from "@/services/file"
import {
    getGithubDownloadUrl,
    getGithubRepoWebUrl,
    getGithubUrlInfo,
    isGithubUrl,
} from "@/services/github/parsers"

import { useBranches } from "./Branches"
import { useContainer } from "./Container"

export interface MetaData {
    selected: boolean
}

const initMetaData: MetaData = { selected: false }

export interface RepositoryController {
    owner: string | undefined
    repo: string | undefined
    repoWebUrl: string
    loading: boolean
    branches: string[]
    branchSelected: string | undefined
    container: File<MetaData>[]
    cantFilesSelected: number
    cantFoldersSelected: number
    downloadRepoUrl: string
    initRepository: (url: string) => Promise<void>
    toggleSelectItem: (pathIndex: number[]) => void
    selectFolder: (pathIndex: number[], selected: boolean) => void
    toggleBranch: (newBranch: string) => Promise<void>
    deselectAll: () => void
}

export function useRepositoryController(): RepositoryController {
    const [repoWebUrl, setRepoWebUrl] = useState<string>("")
    const [owner, setOwner] = useState<string>()
    const [repo, setRepo] = useState<string>()
    const [loading, setLoading] = useState<boolean>(false)
    const [loadingRepository, setLoadingRepository] = useState<boolean>(false)
    const [cantFilesSelected, setCantFilesSelected] = useState<number>(0)
    const [cantFoldersSelected, setCantFoldersSelected] = useState<number>(0)
    const [downloadRepoUrl, setDownloadRepoUrl] = useState<string>("")

    const fetchContainerForBranch = async (branch: string) => {
        if (!owner) throw new Error("Owner not set")
        if (!repo) throw new Error("Repo not set")
        await loadContainer(owner, repo, branch)
        setRepoWebUrl(getGithubRepoWebUrl(owner, repo, branch))
        setDownloadRepoUrl(getGithubDownloadUrl(owner, repo, branch))
    }

    const {
        loading: loadingBranches,
        branches,
        branchSelected,
        initBranches,
        toggleBranch,
    } = useBranches(fetchContainerForBranch)

    const {
        loading: loadingContainer,
        container,
        loadContainer,
        updateMetaData,
        updateAllMetaData,
    } = useContainer<MetaData>(initMetaData)

    const initRepository = async (url: string) => {
        setLoadingRepository(true)
        if (isGithubUrl(url)) {
            const urlInfo = getGithubUrlInfo(url)
            const { owner, repo } = urlInfo
            setOwner(owner)
            setRepo(repo)
            setCantFilesSelected(0)
            setCantFoldersSelected(0)
            const branch = await initBranches(owner, repo, urlInfo.branch)
            setRepoWebUrl(getGithubRepoWebUrl(owner, repo, branch))
            setDownloadRepoUrl(getGithubDownloadUrl(owner, repo, branch))
            await loadContainer(owner, repo, branch)
            setLoadingRepository(false)
        } else {
            setLoadingRepository(false)
            throw new Error("Invalid repository URL.")
        }
        setLoadingRepository(false)
    }

    const toggleSelectItem = (pathIndex: number[]) => {
        updateMetaData(
            pathIndex,
            (file) => {
                if (!file.isFile()) throw new Error("File is not a file")
                const newSelected = !file.metaData?.selected
                setCantFilesSelected((prev) =>
                    newSelected ? prev + 1 : prev - 1
                )
                return {
                    ...file.metaData,
                    selected: newSelected,
                }
            },
            updateParents,
            "bottom-up"
        )
    }

    const selectFolder = (pathIndex: number[], selected: boolean) => {
        const selectAll = (file: File<MetaData>) => {
            if (file.isDirectory()) {
                file.content.forEach((child) => {
                    child.metaData = selectAll(child)
                })
            }

            if (selected !== file.metaData?.selected) {
                if (file.isDirectory()) {
                    setCantFoldersSelected((prev) =>
                        selected ? prev + 1 : prev - 1
                    )
                } else {
                    setCantFilesSelected((prev) =>
                        selected ? prev + 1 : prev - 1
                    )
                }
            }
            return { ...file.metaData, selected }
        }
        updateMetaData(pathIndex, selectAll, updateParents, "bottom-up")
    }

    const updateParents = (file: File<MetaData>) => {
        const selected = file.content?.some((child) => child.metaData?.selected)
        if (selected !== file.metaData?.selected) {
            setCantFoldersSelected((prev) => (selected ? prev + 1 : prev - 1))
        }
        return { ...file.metaData, selected }
    }

    const deselectAll = () => {
        updateAllMetaData((file) => ({ ...file.metaData, selected: false }))
        setCantFilesSelected(0)
        setCantFoldersSelected(0)
    }

    useEffect(() => {
        setLoading(loadingBranches || loadingContainer || loadingRepository)
    }, [loadingContainer, loadingBranches, loadingRepository])

    return {
        loading,
        owner,
        repo,
        repoWebUrl,
        branches,
        branchSelected,
        container,
        cantFilesSelected,
        cantFoldersSelected,
        downloadRepoUrl,
        initRepository,
        toggleSelectItem,
        selectFolder,
        toggleBranch,
        deselectAll,
    }
}

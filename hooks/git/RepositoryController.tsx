import { useEffect, useState } from "react"
import { createAndDownloadZip } from "@/services/downloader"
import { File } from "@/services/file"
import {
    getGithubDownloadRepoUrl,
    getGithubRepoWebUrl,
    getGithubUrlInfo,
    isGithubUrl,
} from "@/services/github/parsers"

import { siteConfig } from "@/config/site"

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
    fetchSubmodules: boolean
    initRepository: (url: string, fetchSubmodules: boolean) => Promise<void>
    toggleSelectItem: (pathIndex: number[]) => void
    selectFolder: (pathIndex: number[], selected: boolean) => void
    toggleBranch: (newBranch: string) => Promise<void>
    deselectAll: () => void
    downloadSelectedFiles: () => Promise<void>
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
    const [fetchSubmodules, setFetchSubmodules] = useState<boolean>(false)

    const fetchContainerForBranch = async (branch: string) => {
        if (!owner) throw new Error("Owner not set")
        if (!repo) throw new Error("Repo not set")
        setCantFilesSelected(0)
        setCantFoldersSelected(0)
        await loadContainer(owner, repo, branch, fetchSubmodules)
        setRepoWebUrl(getGithubRepoWebUrl(owner, repo, branch))
        setDownloadRepoUrl(getGithubDownloadRepoUrl(owner, repo, branch))
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
        collectFilteredFiles,
    } = useContainer<MetaData>(initMetaData)

    const initRepository = async (url: string, fetchSubmodules: boolean) => {
        setLoadingRepository(true)
        try {
            setCantFilesSelected(0)
            setCantFoldersSelected(0)
            if (isGithubUrl(url)) {
                const urlInfo = getGithubUrlInfo(url)
                const { owner, repo } = urlInfo
                setOwner(owner)
                setRepo(repo)
                setCantFilesSelected(0)
                setCantFoldersSelected(0)
                const branch = await initBranches(owner, repo, urlInfo.branch)
                setRepoWebUrl(getGithubRepoWebUrl(owner, repo, branch))
                setDownloadRepoUrl(
                    getGithubDownloadRepoUrl(owner, repo, branch)
                )
                await loadContainer(owner, repo, branch, fetchSubmodules)
                setFetchSubmodules(fetchSubmodules)
                setLoadingRepository(false)
            } else {
                throw new Error("Invalid repository URL.")
            }
        } catch (error) {
            setLoadingRepository(false)
            throw error
        }
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

    const downloadSelectedFiles = async () => {
        const selectedFiles = collectFilteredFiles(
            (file) => file.metaData.selected && file.isFile()
        )
        await createAndDownloadZip(
            selectedFiles,
            `${siteConfig.name}-${owner}-${repo}-${branchSelected}.zip`
        )
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
        fetchSubmodules,
        initRepository,
        toggleSelectItem,
        selectFolder,
        toggleBranch,
        deselectAll,
        downloadSelectedFiles,
    }
}

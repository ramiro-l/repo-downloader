import { useState } from "react"
import {
    File,
    collectFilteredFiles as searchAllFile,
    searchFile,
} from "@/services/file"
import { getGithubFiles } from "@/services/github/get-tree"

type TypeUpdateParent = "top-down" | "bottom-up"

export function useContainer<TMetaData>(initMetadata: TMetaData) {
    const [loading, setLoading] = useState<boolean>(false)
    const [container, setContainer] = useState<File<TMetaData>[]>([])
    const [rootId, setRootId] = useState<string>("")

    const loadContainer = async (
        owner: string,
        repo: string,
        branch: string
    ) => {
        setLoading(true)
        const data = await getGithubFiles<TMetaData>(
            owner,
            repo,
            initMetadata,
            branch
        )
        setContainer(data.files)
        setRootId(data.rootId)
        setLoading(false)
    }

    const updateMetaData = (
        pathIndex: number[],
        updateItemFn: (file: File<TMetaData>) => TMetaData,
        updateParentFn?: (file: File<TMetaData>) => TMetaData,
        typeUpdateParent: TypeUpdateParent = "top-down"
    ) => {
        let search = searchFile<TMetaData>(pathIndex, container)
        search.file.metaData = updateItemFn(search.file)
        if (updateParentFn && search.parents) {
            updateParentMetaData(
                search.parents,
                typeUpdateParent,
                updateParentFn
            )
        }
        setContainer([...container])
    }

    const collectFilteredFiles = (
        condFn: (file: File<TMetaData>) => boolean
    ) => {
        return searchAllFile<TMetaData>(condFn, container)
    }

    function updateParentMetaData(
        parents: File<TMetaData>[],
        typeUpdateParent: TypeUpdateParent,
        updateParentFn: (file: File<TMetaData>) => TMetaData
    ) {
        if (typeUpdateParent === "top-down") {
            parents.forEach((parent) => {
                parent.metaData = updateParentFn(parent)
            })
        } else {
            parents.reverse().forEach((parent) => {
                parent.metaData = updateParentFn(parent)
            })
        }
    }

    function updateAllMetaData(updateFn: (file: File<TMetaData>) => TMetaData) {
        const update = (files: File<TMetaData>[]) => {
            files.forEach((file) => {
                file.metaData = updateFn(file)
                if (file.isDirectory()) {
                    update(file.content)
                }
            })
        }
        update(container)
    }

    return {
        container,
        loading,
        rootId,
        loadContainer,
        updateMetaData,
        collectFilteredFiles,
        updateAllMetaData,
    }
}

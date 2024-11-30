"use client"

import { useRepository } from "@/context/RepositoryContext"

import { Tree } from "@/components/ui/file-tree"
import { Spinner } from "@/components/ui/spinner"
import ElementsTree from "@/components/tool/container/elements-tree"

export default function CardContainer() {
    const {
        container,
        toggleSelectItem,
        selectFolder,
        loading,
        fetchSubmodules,
    } = useRepository()
    return (
        <div className="flex w-2/3 items-center rounded-xl border border-input bg-slate-100 px-1 py-2 dark:bg-background max-md:w-full">
            {container.length === 0 || loading ? (
                <div className="flex w-full justify-center">
                    <Spinner size="small" />
                </div>
            ) : (
                <Tree>
                    <ElementsTree
                        container={container}
                        areSubmodulesFetched={fetchSubmodules}
                        toggleSelectItem={toggleSelectItem}
                        selectFolder={selectFolder}
                    />
                </Tree>
            )}
        </div>
    )
}

"use client"

import { useRepository } from "@/context/RepositoryContext"

import { Tree } from "@/components/ui/file-tree"
import { Spinner } from "@/components/ui/spinner"
import ElementsTree from "@/components/tool/container/elements-tree"

export default function CardContainer() {
    const { container, toggleSelectItem, selectFolder, loading } =
        useRepository()
    return (
        <div className="flex items-center border border-input rounded-xl px-1 py-2 dark:bg-background bg-slate-100 w-2/3 max-md:w-full">
            {container.length === 0 || loading ? (
                <div className="w-full flex justify-center">
                    <Spinner size="small" />
                </div>
            ) : (
                <Tree>
                    <ElementsTree
                        container={container}
                        toggleSelectItem={toggleSelectItem}
                        selectFolder={selectFolder}
                    />
                </Tree>
            )}
        </div>
    )
}

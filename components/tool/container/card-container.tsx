"use client"

import { useRepository } from "@/context/RepositoryContext"

import { Tree } from "@/components/ui/file-tree"
import ElementsTree from "@/components/tool/container/elements-tree"
import DotsLoading from "@/components/tool/dots-loading"

export default function CardContainer() {
    const { container, toggleSelectItem, selectFolder, loading } =
        useRepository()
    return (
        <div className="flex items-center border border-input rounded-xl px-1 py-2 dark:bg-background bg-slate-100 w-2/3">
            {container.length === 0 || loading ? (
                <div className="w-full flex justify-center">
                    <DotsLoading />
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

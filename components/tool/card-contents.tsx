"use client"

import { useRepository } from "@/context/RepositoryContext"

import { Tree } from "@/components/ui/file-tree"
import DotsLoading from "@/components/tool/dots-loading"
import ElementsTree from "@/components/tool/elements-tree"

export default function CardContents() {
    const { container, toggleSelectItem, selectFolder, loading } =
        useRepository()
    return (
        <div className="flex items-center border rounded-xl px-1 py-2 dark:bg-background bg-slate-100 w-2/3">
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

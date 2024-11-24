"use client"

import { useRepository } from "@/context/RepositoryContext"

import { Tree } from "@/components/ui/file-tree"
import ElementsTree from "@/components/tool/elements-tree"

export default function CardContents() {
    const { contents, toggleSelectElement, loadDirectory } = useRepository()
    return (
        <div className=" border rounded-xl px-1 py-2 dark:bg-background bg-slate-100 w-2/3">
            {contents.length === 0 ? (
                <p className="text-center  text-secondary-foreground/60">
                    Search for a repository
                </p>
            ) : (
                <Tree>
                    <ElementsTree
                        contents={contents}
                        toggleSelectElement={toggleSelectElement}
                        loadDirectory={loadDirectory}
                    />
                </Tree>
            )}
        </div>
    )
}

"use client"

import React, {
    createContext,
    forwardRef,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import {
    FileCheck,
    FileIcon,
    FolderDot,
    FolderIcon,
    FolderOpenDot,
    FolderOpenIcon,
    X,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { scrollToBottom } from "@/components/scroll"

type TreeViewElement = {
    id: string
    name: string
    isSelectable?: boolean
    children?: TreeViewElement[]
}

type TreeContextProps = {
    selectedId: string | undefined
    expandedItems: string[] | undefined
    indicator: boolean
    handleExpand: (id: string) => void
    selectItem: (id: string) => void
    setExpandedItems?: React.Dispatch<
        React.SetStateAction<string[] | undefined>
    >
    openIcon?: React.ReactNode
    closeIcon?: React.ReactNode
    direction: "rtl" | "ltr"
}

const TreeContext = createContext<TreeContextProps | null>(null)

const useTree = () => {
    const context = useContext(TreeContext)
    if (!context) {
        throw new Error("useTree must be used within a TreeProvider")
    }
    return context
}

interface TreeViewComponentProps extends React.HTMLAttributes<HTMLDivElement> {}

type Direction = "rtl" | "ltr" | undefined

type TreeViewProps = {
    initialSelectedId?: string
    indicator?: boolean
    elements?: TreeViewElement[]
    initialExpandedItems?: string[]
    openIcon?: React.ReactNode
    closeIcon?: React.ReactNode
} & TreeViewComponentProps

const Tree = forwardRef<HTMLDivElement, TreeViewProps>(
    (
        {
            className,
            elements,
            initialSelectedId,
            initialExpandedItems,
            children,
            indicator = true,
            openIcon,
            closeIcon,
            dir,
            ...props
        },
        ref
    ) => {
        const [selectedId, setSelectedId] = useState<string | undefined>(
            initialSelectedId
        )
        const [expandedItems, setExpandedItems] = useState<
            string[] | undefined
        >(initialExpandedItems)

        const selectItem = useCallback((id: string) => {
            setSelectedId(id)
        }, [])

        const handleExpand = useCallback((id: string) => {
            scrollToBottom()
            setExpandedItems((prev) => {
                if (prev?.includes(id)) {
                    return prev.filter((item) => item !== id)
                }
                return [...(prev ?? []), id]
            })
        }, [])

        const expandSpecificTargetedElements = useCallback(
            (elements?: TreeViewElement[], selectId?: string) => {
                if (!elements || !selectId) return
                const findParent = (
                    currentElement: TreeViewElement,
                    currentPath: string[] = []
                ) => {
                    const isSelectable = currentElement.isSelectable ?? true
                    const newPath = [...currentPath, currentElement.id]
                    if (currentElement.id === selectId) {
                        if (isSelectable) {
                            setExpandedItems((prev) => [
                                ...(prev ?? []),
                                ...newPath,
                            ])
                        } else if (newPath.includes(currentElement.id)) {
                            newPath.pop()
                            setExpandedItems((prev) => [
                                ...(prev ?? []),
                                ...newPath,
                            ])
                        }
                        return
                    }
                    if (
                        isSelectable &&
                        currentElement.children &&
                        currentElement.children.length > 0
                    ) {
                        currentElement.children.forEach((child) => {
                            findParent(child, newPath)
                        })
                    }
                }
                elements.forEach((element) => {
                    findParent(element)
                })
            },
            []
        )

        useEffect(() => {
            if (initialSelectedId) {
                expandSpecificTargetedElements(elements, initialSelectedId)
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [initialSelectedId, elements])

        const direction = dir === "rtl" ? "rtl" : "ltr"

        return (
            <TreeContext.Provider
                value={{
                    selectedId,
                    expandedItems,
                    handleExpand,
                    selectItem,
                    setExpandedItems,
                    indicator,
                    openIcon,
                    closeIcon,
                    direction,
                }}
            >
                <div className={cn("size-full", className)}>
                    <ScrollArea
                        ref={ref}
                        className="relative h-full px-2"
                        dir={dir as Direction}
                    >
                        <ScrollBar orientation="horizontal" />
                        <AccordionPrimitive.Root
                            {...props}
                            type="multiple"
                            defaultValue={expandedItems}
                            value={expandedItems}
                            className="flex flex-col gap-1"
                            onValueChange={(value) =>
                                setExpandedItems((prev) => [
                                    ...(prev ?? []),
                                    value[0],
                                ])
                            }
                            dir={dir as Direction}
                        >
                            {children}
                        </AccordionPrimitive.Root>
                    </ScrollArea>
                </div>
            </TreeContext.Provider>
        )
    }
)

Tree.displayName = "Tree"

const TreeIndicator = forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
    const { direction } = useTree()

    return (
        <div
            dir={direction}
            ref={ref}
            className={cn(
                "absolute left-1.5 h-full w-px rounded-md bg-muted py-3 duration-300 ease-in-out hover:bg-slate-300 rtl:right-1.5",
                className
            )}
            {...props}
        />
    )
})

TreeIndicator.displayName = "TreeIndicator"

interface FolderComponentProps
    extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item> {}

type FolderProps = {
    expandedItems?: string[]
    element: string
    isSelectable?: boolean
    isSelect?: boolean
    folderIconCloseNotSelected?: React.ReactNode
    handelButtonSelectAll?: (sha: string) => void
    handleButtonDeslectAll?: (sha: string) => void
} & FolderComponentProps

const Folder = forwardRef<
    HTMLDivElement,
    FolderProps & React.HTMLAttributes<HTMLDivElement>
>(
    (
        {
            className,
            element,
            value,
            isSelectable = true,
            isSelect,
            children,
            folderIconCloseNotSelected,
            handelButtonSelectAll,
            handleButtonDeslectAll,
            ...props
        },
        ref
    ) => {
        const {
            direction,
            handleExpand,
            expandedItems,
            indicator,
            setExpandedItems,
            openIcon,
            closeIcon,
        } = useTree()

        return (
            <AccordionPrimitive.Item
                {...props}
                value={value}
                className="relative h-full overflow-hidden "
            >
                <AccordionPrimitive.Trigger
                    className={cn(
                        `flex items-center gap-1 rounded-md text-sm `,
                        className,
                        {
                            "cursor-pointer": isSelectable,
                            "cursor-not-allowed opacity-50": !isSelectable,
                        }
                    )}
                    disabled={!isSelectable}
                    onClick={() => handleExpand(value)}
                >
                    <div
                        className={cn(
                            "flex items-center justify-center gap-1 px-1",
                            {
                                "bg-primary rounded-md text-white":
                                    isSelect && isSelectable,
                            }
                        )}
                    >
                        {expandedItems?.includes(value)
                            ? openIcon ??
                              (isSelect ? (
                                  <FolderOpenDot className="size-4" />
                              ) : (
                                  <FolderOpenIcon className="size-4" />
                              ))
                            : closeIcon ??
                              (isSelect ? (
                                  <FolderDot className="size-4" />
                              ) : folderIconCloseNotSelected ? (
                                  folderIconCloseNotSelected
                              ) : (
                                  <FolderIcon className="size-4" />
                              ))}
                        <span>{element}</span>
                    </div>
                    {expandedItems?.includes(value) && (
                        <div className="flex select-none gap-1">
                            <Button
                                asChild
                                variant="outline"
                                className="h-2 px-1 text-xs uppercase hover:border-black hover:bg-black hover:text-white dark:border-white dark:hover:border-secondary-foreground dark:hover:bg-secondary-foreground dark:hover:text-secondary "
                                onClick={(e) => {
                                    e.stopPropagation()
                                    handelButtonSelectAll?.(value)
                                }}
                            >
                                <span>select all</span>
                            </Button>
                            <Button
                                asChild
                                variant="outline"
                                className="h-2 px-0 text-xs uppercase hover:!border-red-600 hover:bg-red-600 hover:text-white dark:border-white"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    handleButtonDeslectAll?.(value)
                                }}
                            >
                                <span>
                                    <X className="size-4" />
                                </span>
                            </Button>
                        </div>
                    )}
                </AccordionPrimitive.Trigger>
                <AccordionPrimitive.Content className="relative h-full overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                    {element && indicator && (
                        <TreeIndicator aria-hidden="true" />
                    )}
                    <AccordionPrimitive.Root
                        dir={direction}
                        type="multiple"
                        className="ml-5 flex flex-col gap-1 py-1 rtl:mr-5 "
                        defaultValue={expandedItems}
                        value={expandedItems}
                        onValueChange={(value) => {
                            setExpandedItems?.((prev) => [
                                ...(prev ?? []),
                                value[0],
                            ])
                        }}
                    >
                        {children}
                    </AccordionPrimitive.Root>
                </AccordionPrimitive.Content>
            </AccordionPrimitive.Item>
        )
    }
)

Folder.displayName = "Folder"

const File = forwardRef<
    HTMLButtonElement,
    {
        value: string
        handleSelect?: (id: string) => void
        isSelectable?: boolean
        isSelect?: boolean
        fileIcon?: React.ReactNode
    } & React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(
    (
        {
            value,
            className,
            handleSelect,
            isSelectable = true,
            isSelect,
            fileIcon,
            children,
            ...props
        },
        ref
    ) => {
        const { direction, selectedId, selectItem } = useTree()
        const isSelected = isSelect ?? selectedId === value
        return (
            <AccordionPrimitive.Item value={value} className="relative">
                <AccordionPrimitive.Trigger
                    ref={ref}
                    {...props}
                    dir={direction}
                    disabled={!isSelectable}
                    aria-label="File"
                    className={cn(
                        "flex cursor-pointer items-center gap-1 rounded-md px-1 text-sm duration-200 ease-in-out  rtl:pl-1 rtl:pr-0",
                        {
                            "bg-primary !text-white":
                                isSelected && isSelectable,
                        },
                        isSelectable
                            ? "cursor-pointer"
                            : "cursor-not-allowed opacity-50",
                        className
                    )}
                    onClick={() => {
                        handleSelect?.(value)
                        selectItem(value)
                    }}
                >
                    {isSelected ? (
                        <FileCheck className="size-4" />
                    ) : (
                        fileIcon ?? <FileIcon className="size-4" />
                    )}
                    {children}
                </AccordionPrimitive.Trigger>
            </AccordionPrimitive.Item>
        )
    }
)

File.displayName = "File"

const CollapseButton = forwardRef<
    HTMLButtonElement,
    {
        elements: TreeViewElement[]
        expandAll?: boolean
    } & React.HTMLAttributes<HTMLButtonElement>
>(({ className, elements, expandAll = false, children, ...props }, ref) => {
    const { expandedItems, setExpandedItems } = useTree()

    const expendAllTree = useCallback((elements: TreeViewElement[]) => {
        const expandTree = (element: TreeViewElement) => {
            const isSelectable = element.isSelectable ?? true
            if (
                isSelectable &&
                element.children &&
                element.children.length > 0
            ) {
                setExpandedItems?.((prev) => [...(prev ?? []), element.id])
                element.children.forEach(expandTree)
            }
        }

        elements.forEach(expandTree)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const closeAll = useCallback(() => {
        setExpandedItems?.([])
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (expandAll) {
            expendAllTree(elements)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [expandAll])

    return (
        <Button
            variant={"ghost"}
            className="absolute bottom-1 right-2 h-8 w-fit p-1"
            onClick={
                expandedItems && expandedItems.length > 0
                    ? closeAll
                    : () => expendAllTree(elements)
            }
            ref={ref}
            {...props}
        >
            {children}
            <span className="sr-only">Toggle</span>
        </Button>
    )
})

CollapseButton.displayName = "CollapseButton"

export { CollapseButton, File, Folder, Tree, type TreeViewElement }

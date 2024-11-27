"use client"

import React, { ReactNode, createContext } from "react"

import {
    useRepositoryController,
    type RepositoryController,
} from "@/hooks/git/RepositoryController"

interface RepositoryContextProps extends RepositoryController {}

const RepositoryContext = createContext<RepositoryContextProps | undefined>(
    undefined
)

export const RepositoryProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const repository = useRepositoryController()

    return (
        <RepositoryContext.Provider value={repository}>
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

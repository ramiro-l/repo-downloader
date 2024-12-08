import { QUERY_PARAMS } from "@/services/query-params.ts/const"

export const getQueryParam = (key: QUERY_PARAMS): string | null => {
    const params = new URLSearchParams(window.location.search)
    return params.get(key)
}

export const setQueryParam = (
    key: QUERY_PARAMS,
    value: string | boolean
): void => {
    const params = new URLSearchParams(window.location.search)
    params.set(key, value.toString())
    const newUrl = `${window.location.pathname}?${params.toString()}`
    window.history.pushState({}, "", newUrl)
}

export const deleteQueryParam = (key: QUERY_PARAMS): void => {
    const params = new URLSearchParams(window.location.search)
    params.delete(key)
    const newUrl = `${window.location.pathname}?${params.toString()}`
    window.history.pushState({}, "", newUrl)
}

export const clearQueryParams = (): void => {
    const newUrl = `${window.location.pathname}`
    window.history.pushState({}, "", newUrl)
}

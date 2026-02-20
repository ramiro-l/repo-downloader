import { siteConfig } from "@/config/site"

const SEARCH_COUNT_KEY = "search_count"
const DOWNLOAD_COUNT_KEY = "download_count"
const GO_TO_DONATION_PAGE_KEY = "go_to_donation_page"

export function incrementSearchCount() {
    const current = Number(localStorage.getItem(SEARCH_COUNT_KEY) || 0)
    localStorage.setItem(SEARCH_COUNT_KEY, String(current + 1))
}

export function incrementDownloadCount() {
    const current = Number(localStorage.getItem(DOWNLOAD_COUNT_KEY) || 0)
    localStorage.setItem(DOWNLOAD_COUNT_KEY, String(current + 1))
}

export function getSearchCount() {
    return Number(localStorage.getItem(SEARCH_COUNT_KEY) || 0)
}

export function getDownloadCount() {
    return Number(localStorage.getItem(DOWNLOAD_COUNT_KEY) || 0)
}

export function shouldShowDonationModal() {
    const searchThreshold = siteConfig.donations.search_threshold
    const downloadThreshold = siteConfig.donations.download_threshold
    return (
        getSearchCount() >= searchThreshold ||
        getDownloadCount() >= downloadThreshold
    )
}

export function setDonationModalShown() {
    localStorage.setItem(SEARCH_COUNT_KEY, String(0))
    localStorage.setItem(DOWNLOAD_COUNT_KEY, String(0))
}

export function setGoToDonationPage() {
    localStorage.setItem(GO_TO_DONATION_PAGE_KEY, "true")
}

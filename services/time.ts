export function formatTimeUntil(dateInSec: number): string {
    const now = Math.floor(Date.now() / 1000)
    const seconds = dateInSec - now

    return formatTimeRemaining(seconds)
}

export function formatTimeRemaining(seconds: number): string {
    if (seconds < 60) {
        return `${seconds} second${seconds !== 1 ? "s" : ""}`
    }

    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) {
        return `${minutes} minute${minutes !== 1 ? "s" : ""}`
    }

    const hours = Math.floor(minutes / 60)
    if (hours < 24) {
        return `${hours} hour${hours !== 1 ? "s" : ""}`
    }

    const days = Math.floor(hours / 24)
    return `${days} day${days !== 1 ? "s" : ""}`
}

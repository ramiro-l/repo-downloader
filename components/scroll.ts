const scrollToBottom = () => {
    if (window.innerWidth >= 768) {
        setTimeout(() => {
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: "smooth",
            })
        }, 100)
    }
}

export { scrollToBottom }

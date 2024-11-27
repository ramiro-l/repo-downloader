const scrollToBottom = () => {
    setTimeout(() => {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth",
        })
    }, 100)
}

export default scrollToBottom
"use client"

import { Variants, motion } from "framer-motion"

import { cn } from "@/lib/utils"

interface WordFadeInProps {
    words: string
    className?: string
    delay?: number
    variants?: Variants
}

export default function WordFadeIn({
    words,
    delay = 0.06,
    variants = {
        hidden: { opacity: 0 },
        visible: (i: number) => ({
            y: 0,
            opacity: 1,
            transition: { delay: i * delay },
        }),
    },
    className,
}: WordFadeInProps) {
    const _words = words.split(" ")

    return (
        <motion.span
            variants={variants}
            initial="hidden"
            animate="visible"
            className={cn(className)}
        >
            {_words.map((word, i) => (
                <motion.span key={word} variants={variants} custom={i}>
                    {word}{" "}
                </motion.span>
            ))}
        </motion.span>
    )
}

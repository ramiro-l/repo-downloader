export function TailwindIndicator() {
    if (process.env.NODE_ENV === "production") return null

    return (
        <div className="fixed bottom-14 left-4 z-50 flex size-8 items-center justify-center rounded-full border border-neutral-700 bg-neutral-900 p-3 font-mono text-xs font-bold text-white">
            <div className="block sm:hidden">xs</div>
            <div className="hidden sm:block md:hidden">sm</div>
            <div className="hidden md:block lg:hidden">md</div>
            <div className="hidden lg:block xl:hidden">lg</div>
            <div className="hidden xl:block 2xl:hidden">xl</div>
            <div className="hidden 2xl:block">2xl</div>
        </div>
    )
}

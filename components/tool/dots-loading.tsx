import { cn } from "@/lib/utils"

export default function DotsLoading({ fill }: Readonly<{ fill?: "white" | "black" | "theme" }>) {
    let fillClass;
    switch (fill) {
        case "white":
            fillClass = "fill-white";
            break;
        case "black":
            fillClass = "fill-black";
            break;
        default:
            fillClass = "fill-secondary-foreground";
            break;
    }

    return (
        <svg
            className="w-10 h-3"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g transform="translate(-70, 18) scale(12)">
                <path
                    className={cn(fillClass)}
                    d="M1.99995389,4 C1.18943703,3.99996826 0.459080007,3.51075355 0.150588108,2.76124016 C-0.157903792,2.01172677 0.0164743319,1.15013249 0.592137819,0.579563372 C1.16780131,0.00899425181 2.03091154,-0.157718518 2.77765322,0.157423404 C3.52439491,0.472565326 4.00709836,1.20724199 3.99992565,2.01772711 C3.99021168,3.11536294 3.09763271,4.00004298 1.99995389,4 L1.99995389,4 Z"
                >
                    <animate
                        id="first"
                        attributeName="opacity"
                        from="1"
                        to="0.1"
                        begin="0.2s;first.end+0.6s"
                        dur="0.2s"
                        fill="freeze"
                    />
                </path>
                <path
                    className={cn(fillClass)}
                    d="M9.99995389,4 C9.18943703,3.99996826 8.45908001,3.51075355 8.15058811,2.76124016 C7.84209621,2.01172677 8.01647433,1.15013249 8.59213782,0.579563372 C9.16780131,0.00899425181 10.0309115,-0.157718518 10.7776532,0.157423404 C11.5243949,0.472565326 12.0070984,1.20724199 11.9999256,2.01772711 C11.9902117,3.11536294 11.0976327,4.00004298 9.99995389,4 L9.99995389,4 Z"
                >
                    <animate
                        id="second"
                        attributeName="opacity"
                        from="1"
                        to="0.1"
                        begin="0.4s;second.end+0.6s"
                        dur="0.2s"
                        fill="freeze"
                    />
                </path>
                <path
                    className={cn(fillClass)}
                    d="M17.9999539,4 C17.189437,3.99996826 16.45908,3.51075355 16.1505881,2.76124016 C15.8420962,2.01172677 16.0164743,1.15013249 16.5921378,0.579563372 C17.1678013,0.00899425181 18.0309115,-0.157718518 18.7776532,0.157423404 C19.5243949,0.472565326 20.0070984,1.20724199 19.9999256,2.01772711 C19.9902117,3.11536294 19.0976327,4.00004298 17.9999539,4 L17.9999539,4 Z"
                >
                    <animate
                        id="third"
                        attributeName="opacity"
                        from="1"
                        to="0.1"
                        begin="0.6s;third.end+0.6s"
                        dur="0.2s"
                        fill="freeze"
                    />
                </path>
            </g>
        </svg>
    )
}

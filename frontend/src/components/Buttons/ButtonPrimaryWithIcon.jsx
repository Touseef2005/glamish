import React from "react";
import { Button } from "@components/shadcn-ui/button";
import { useRouter } from "next/navigation";

export default function ButtonPrimaryWithIcon({
    title = "",
    href,
    onButtonClick,
    icon,
    alignIcon = "left",
    className,
    ...props
}) {
    const router = useRouter()

    if (href && href !== "#") {
        onButtonClick = () => router.push(href)
    }

    return (
        <Button
            {...props}
            variant="default"
            onClick={onButtonClick ? onButtonClick : null}
            className={`${className} ${alignIcon === "left" ? "flex-row-reverse" : "flex-row"} bg-black text-white hover:bg-white hover:border hover:border-black hover:text-black flex items-center gap-2`}
        >
            {icon}
            <span>
                {title}
            </span>
        </Button>
    );
}
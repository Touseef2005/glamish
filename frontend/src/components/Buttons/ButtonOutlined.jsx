import React from "react";
import { Button } from "@/components/shadcn-ui/button";
import { useRouter } from "next/navigation";

export default function ButtonOutlined({ title = "Button", href, onButtonClick, ...props }) {
  const router = useRouter()

  if (href && href !== "#") {
    onButtonClick = () => router.push(href)
  }

  return (
    <Button
      {...props}
      variant="outline"
      onClick={onButtonClick ? onButtonClick : null}
      className="border border-black text-black hover:bg-black hover:text-white"
    >
      {title}

    </Button>

  )
}
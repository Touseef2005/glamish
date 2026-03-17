"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/shadcn-ui/dialog";
import { Input } from "@/components/shadcn-ui/input";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function SearchDialogBox({
    isOpen,
    setIsOpen,
    title,
    placeholder,
    filteredData,
    onSearchQueryChange,
    searchQuery,
    loading,
}) {
    const router = useRouter()
    const [inputValue, setInputValue] = useState(searchQuery || "");
    const inputRef = useRef(null);

    useEffect(() => {
        const handler = setTimeout(() => {
            onSearchQueryChange(inputValue);
        }, 400);

        return () => {
            clearTimeout(handler);
        };
    }, [inputValue, onSearchQueryChange]);


    useEffect(() => {
        const input = inputRef.current;
        if (input) {
            const handleFocus = () => {
                setTimeout(() => {
                    input.scrollIntoView({ behavior: "smooth", block: "center" });
                }, 300);
            };
            input.addEventListener("focus", handleFocus);

            return () => {
                input.removeEventListener("focus", handleFocus);
            };
        }
    }, []);

    const handleNavigateToProduct = (id) => {
        router.push(`/product/${id}`)
        setIsOpen(false)
    }

    return (
        <div >
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-[500px] max-h-[80vh] p-0 overflow-hidden flex flex-col overscroll-contain">
                    <DialogHeader className="px-4 pt-4 pb-2">
                        <DialogTitle>{title}</DialogTitle>
                    </DialogHeader>

                    <div className="sticky top-0 z-10 bg-white px-4 pb-2 pt-1 border-b border-gray-200">
                        <Input
                            ref={inputRef}
                            placeholder={placeholder}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            className="w-full"
                            autoFocus
                        />
                    </div>

                    <div className="overflow-y-auto flex-grow px-4 pt-2">
                        {loading ? (
                            <p className="text-center text-gray-500 py-4">Loading...</p>
                        ) : (
                            inputValue?.length > 0 && (
                                <div className="space-y-4 pb-4">
                                    {filteredData?.length > 0 ? (
                                        filteredData.map((item) => (
                                            <div
                                                key={item._id}
                                                className="border cursor-pointer rounded-lg p-4 hover:bg-gray-50 transition-colors"
                                                onClick={() => handleNavigateToProduct(item._id)}
                                            >
                                                <h3 className="font-medium text-lg">{item.name}</h3>
                                                <p className="text-gray-600 mt-1">
                                                    {item.description.split(" ").slice(0, 10).join(" ")}
                                                </p>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-center text-gray-500 py-4">No results found</p>
                                    )}
                                </div>
                            )
                        )}
                    </div>
                </DialogContent>

            </Dialog>
        </div>
    );
}

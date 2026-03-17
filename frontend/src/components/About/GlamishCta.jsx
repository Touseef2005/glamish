import { Button } from "@components/shadcn-ui/button";
import { ButtonPrimary, ButtonPrimaryWithIcon } from "../Buttons";

export default function GlamishCTA() {
    return (
        <div className="bg-gradient-to-r from-pink-100 to-peach-100 dark:from-slate-900 dark:to-slate-800 rounded-3xl p-8 md:p-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                Experience the Difference
            </h2>
            <p className="text-slate-700 dark:text-slate-300 max-w-2xl mx-auto mb-8">
                Join thousands of satisfied customers who have discovered the power of natural beauty. Your skin deserves the
                best, and we're here to provide it.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <ButtonPrimary
                    title="Shop Our Products"
                    className="bg-gradient-to-r from-pink-400 to-peach-500 hover:from-!pink-500 hover:to-!peach-600 !text-white !border-none"
                    href="/categories"
                />
            </div>
        </div>
    )
}
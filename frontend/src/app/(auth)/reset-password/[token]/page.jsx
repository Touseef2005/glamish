import { NewPasswordForm } from "@/components/Forms/NewPasswordForm";

export default function page() {
    return (
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
            <div className="w-full max-w-md">
                <NewPasswordForm />
            </div>
        </main>
    )
}
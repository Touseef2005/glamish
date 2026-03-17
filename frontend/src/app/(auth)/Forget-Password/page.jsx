import PasswordResetForm from "@/components/Forms/PasswordResetForm";


export default function Page() {
    return (
        <main className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
            <div className="w-full max-w-md">
                <PasswordResetForm />
            </div>
        </main>
    )
}

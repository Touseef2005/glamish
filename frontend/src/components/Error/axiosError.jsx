import { AlertCircle } from "lucide-react"

import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/shadcn-ui/alert"

export default function AxiosError({ error }) {
    return (
        <Alert variant="destructive" className="w-2/5">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
                {error ? error.message : "An error occurred"}
            </AlertDescription>
        </Alert>
    )
}

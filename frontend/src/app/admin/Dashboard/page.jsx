
import dynamic from "next/dynamic";

const AdminHome = dynamic(() => import("@/pages/AdminHomePage"));

export const metadata = {
    title: "Admin Dashboard",
    layout: "admin",
};


export default function page() {

    return (
        <div>
            <AdminHome />
        </div>
    )
}



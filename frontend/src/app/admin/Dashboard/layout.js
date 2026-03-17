import AdminMenu from "@components/menubar/adminMenu";


export default function Layout({ children }) {
    return (
        <>
            <AdminMenu />
            <main>{children}</main>
        </>
    )
}
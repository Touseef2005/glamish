import { parse } from "cookie";


export async function getServerSideProps({ req }) {
    const cookies = parse(req.headers.cookie || "");
    console.log("Token from Cookies:", cookies.authToken);

    return { props: { token: cookies.authToken || null } };
}
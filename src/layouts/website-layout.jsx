import Footer from "@/components/footer-layout";
import { Outlet } from "react-router-dom";

export default function WebsiteLayout() {
    return (
        <>
            <Outlet />
            <Footer />
        </>
    )
}
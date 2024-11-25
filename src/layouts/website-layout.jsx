import Footer from "@/components/footer-layout";
import { WindowLoading } from "@/components/loading-spinner";
import PagesHeader from "@/components/page-header";
import { useTheme } from "@/hooks/use-theme";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

export default function WebsiteLayout() {
    const [loading, setLoading] = useState(true);
    const { setTheme, setColor } = useTheme();

    useEffect(() => {
        setTheme("light");
        setColor("aqua-night");
        setLoading(false);
    }, [])

    if (loading) {
        return <WindowLoading />;
    }

    return (
        <main>
            <PagesHeader />
            <Outlet />
            <Footer />
        </main>
    )
}
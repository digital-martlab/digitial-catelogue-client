import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link, useLocation } from "react-router-dom";

export default function PagesHeader() {
    const location = useLocation();
    const [isMobileNavOpen, setMobileNavOpen] = useState(false);

    const toggleMobileNav = () => {
        setMobileNavOpen(prev => !prev);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    return (
        <header
            id="header"
            className="md:container flex justify-between shadow-md md:shadow-none h-20 px-4 items-center sticky top-0 bg-background z-50 animate-in fade-in" aria-label="Main navigation header"
        >
            <Link to={"/#header"} className="text-3xl md:text-4xl font-bold h-full py-4" aria-label="Go to homepage">
                <LazyLoadImage src="./images/logo.webp" alt="CatalogueWala" width={100} height={54} />
            </Link>
            <div className="hidden md:flex gap-4 items-center" role="navigation" aria-label="Primary navigation">
                <a href={"/#header"} className="nav-item">Home</a>
                <a href={"/#features"} className="nav-item">Features</a>
                <a href={"/#benefits"} className="nav-item">Benefits</a>
                {/* Uncomment these links if needed
        <a href={"#price"} className="nav-item">Price</a>
        <a href={"#testimonial"} className="nav-item">Testimonials</a>
        */}
                <a href="/#contact-us" className="home-button hidden md:block" aria-label="Contact us">Contact Us</a>
            </div>
            {/* Mobile Menu Button */}
            <button onClick={toggleMobileNav} className="md:hidden" aria-label={isMobileNavOpen ? "Close mobile navigation" : "Open mobile navigation"}>
                {isMobileNavOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            {
                isMobileNavOpen && (
                    <nav className="md:hidden bg-white shadow-md p-4 absolute w-full left-0 top-24 z-50 animate-in fade-in" aria-label="Mobile navigation">
                        <Link to={"/#header"} className="block py-2">Home</Link>
                        <Link to={"/#features"} className="block py-2">Features</Link>
                        <Link to={"/#benefits"} className="block py-2">Benefits</Link>
                        <Link to={"/#contact-us"} className="block py-2" aria-label="Contact us">Contact Us</Link>
                        {/* Uncomment these links if needed
            <Link to={"#price"} className="block py-2">Price</Link>
            <Link to={"#testimonial"} className="block py-2">Testimonials</Link>
            */}
                    </nav>)
            }
        </header >
    )
}
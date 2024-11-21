export default function Footer() {
    return (
        <footer className="mt-24 pt-12 pb-8 bg-gray-900 text-gray-300" aria-label="Footer">
            <div className="container mx-auto px-6 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 text-center sm:text-left">
                {/* Brand Section */}
                <div className="flex flex-col items-center sm:items-start lg:col-span-2">
                    <a href="#header" className="text-3xl font-bold mb-4" aria-label="Go to homepage">
                        Catalogue<span className="text-home">Wala</span>
                    </a>
                    <p className="text-sm leading-relaxed">
                        CatalogueWala is designed to help small businesses set up an online store quickly and manage orders directly via WhatsApp. With customizable themes and seamless product management, you can provide your customers a professional shopping experience, effortlessly.
                    </p>
                </div>

                {/* Resources Section */}
                <div>
                    <p className="font-semibold text-lg mb-4">Resources</p>
                    <a className="block mb-2 hover:text-gray-400" href="#header" aria-label="Navigate to Home">Home</a>
                    <a className="block mb-2 hover:text-gray-400" href="#features" aria-label="Navigate to Features">Features</a>
                    <a className="block mb-2 hover:text-gray-400" href="#benefits" aria-label="Navigate to Benefits">Benefits</a>
                    <a className="block mb-2 hover:text-gray-400" href="#price" aria-label="Navigate to Price">Price</a>
                </div>

                {/* About Us Section */}
                <div>
                    <p className="font-semibold text-lg mb-4">About Us</p>
                    <a className="block mb-2 hover:text-gray-400" href="#privacy" aria-label="View Privacy Policy">Privacy Policy</a>
                    <a className="block mb-2 hover:text-gray-400" href="#terms" aria-label="View Terms of Service">Terms of Service</a>
                    <a className="block mb-2 hover:text-gray-400" href="#contact" aria-label="Contact Us">Contact Us</a>
                </div>

                {/* Contact Us Section */}
                <div>
                    <p className="font-semibold text-lg mb-4">Contact Us</p>
                    <a className="mb-2 flex items-center justify-center sm:justify-start hover:text-gray-400" href="mailto:info@digitalmartlab.com" aria-label="Email us at info@digitalmartlab.com">
                        <Mail className="mr-2" /> info@digitalmartlab.com
                    </a>
                    <a className="mb-2 flex items-center justify-center sm:justify-start hover:text-gray-400" href="tel:+918299207159" aria-label="Call us at +91 82992 07159">
                        <PhoneCall className="mr-2" /> +91 82992 07159
                    </a>

                    {/* Social Media Links */}
                    <div className="mt-4 flex justify-center sm:justify-start space-x-4">
                        <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/digitalmartlab.in" className="hover:text-gray-400" aria-label="Visit our Facebook page">
                            <LazyLoadImage className="h-6 w-6" src="./images/fb-icon.svg" alt="Facebook" />
                        </a>
                        <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/digital_mart_lab/" className="hover:text-gray-400" aria-label="Visit our Instagram profile">
                            <LazyLoadImage className="h-6 w-6" src="./images/insta-icon.svg" alt="Instagram" />
                        </a>
                        <a target="_blank" rel="noopener noreferrer" href="https://x.com/DigitalMartLab" className="hover:text-gray-400" aria-label="Visit our Twitter profile">
                            <LazyLoadImage className="h-6 w-6" src="./images/twitter-icon.svg" alt="Twitter" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Footer Bottom Section */}
            <a href="https://digitalmartlab.in/" className="block mt-8 text-center text-gray-500 text-xs" aria-label="Visit Digital Mart Lab">
                © {new Date().getFullYear()} CatalogueWala. All rights reserved.
            </a>
        </footer>
    )
}
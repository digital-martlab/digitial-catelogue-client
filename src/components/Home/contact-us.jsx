import { useState } from "react";
import { z } from "zod";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { createContactFn } from "@/services/contact-service";
import { Link } from "react-router-dom";

const initialState = {
    name: "",
    email: "",
    phone: "",
    message: "",
    referral_id: ""
};

export default function ContactUs() {
    const [formData, setFormData] = useState(initialState);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionStatus, setSubmissionStatus] = useState("");
    const [formErrors, setFormErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmissionStatus("");
        setFormErrors({});

        try {
            await createContactFn(formData);
            setSubmissionStatus("Thank you for your message! We'll get back to you soon.");
            setFormData(initialState);
        } catch (error) {
            if (error instanceof z.ZodError) {
                const errors = {};
                error.errors.forEach((err) => {
                    errors[err.path[0]] = err.message;
                });
                setFormErrors(errors);
            } else {
                setSubmissionStatus("Sorry, there was an error submitting your form. Please try again.");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact-us" className="container flex flex-col md:flex-row items-center justify-around pt-28 gap-8" aria-labelledby="contact-us-heading">
            <div className="rounded-lg bg-home flex flex-col items-center justify-between w-full md:w-[40%] p-5 shadow-xl self-stretch">
                <div className="text-center px-5 mt-8">
                    <h3 id="contact-us-heading" className="text-2xl sm:text-3xl font-semibold text-white">
                        Ready to Take Your <br /> Business Online?
                    </h3>
                    {/* Razorpay payment */}
                    <Link to="tel:+918299207159" className="home-button-white mx-auto inline-block mt-8" aria-label="Get started with your 15-day free trial">
                        Call Now
                    </Link>
                </div>
                <LazyLoadImage
                    className="mt-6 drop-shadow-2xl w-2/3"
                    src="./images/product-screens-2.png"
                    alt="Call to action - Start Your Free Trial"
                />
            </div>
            <div className="w-full md:w-[40%] px-4">
                <h2 className="text-3xl font-bold text-center" data-aos="fade-up" aria-labelledby="contact-form-heading">
                    Get in Touch with Us
                </h2>
                <div className="max-w-lg mx-auto p-8 rounded-lg shadow-lg bg-white" aria-live="polite">
                    <form onSubmit={handleSubmit} className="space-y-3" aria-labelledby="contact-form-heading">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700" htmlFor="name">
                                Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                aria-invalid={formErrors.name ? "true" : "false"}
                                aria-describedby={formErrors.name ? "name-error" : undefined}
                                className={`w-full p-2 border ${formErrors.name ? "border-red-500" : "border-gray-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-home transition duration-300`}
                            />
                            {formErrors.name && <p className="text-red-500 text-sm" id="name-error">{formErrors.name}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700" htmlFor="email">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                aria-invalid={formErrors.email ? "true" : "false"}
                                aria-describedby={formErrors.email ? "email-error" : undefined}
                                className={`w-full p-2 border ${formErrors.email ? "border-red-500" : "border-gray-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-home transition duration-300`}
                            />
                            {formErrors.email && <p className="text-red-500 text-sm" id="email-error">{formErrors.email}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700" htmlFor="phone">
                                Phone Number
                            </label>
                            <input
                                id="phone"
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                aria-invalid={formErrors.phone ? "true" : "false"}
                                aria-describedby={formErrors.phone ? "phone-error" : undefined}
                                className={`w-full p-2 border ${formErrors.phone ? "border-red-500" : "border-gray-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-home transition duration-300`}
                            />
                            {formErrors.phone && <p className="text-red-500 text-sm" id="phone-error">{formErrors.phone}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700" htmlFor="referral_id">
                                Referral Id (Optional)
                            </label>
                            <input
                                id="referral_id"
                                type="text"
                                name="referral_id"
                                value={formData.referral_id}
                                onChange={handleChange}
                                aria-invalid={formErrors.phone ? "true" : "false"}
                                aria-describedby={formErrors.phone ? "phone-error" : undefined}
                                className={`w-full p-2 border ${formErrors.phone ? "border-red-500" : "border-gray-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-home transition duration-300`}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700" htmlFor="message">
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows="4"
                                aria-invalid={formErrors.message ? "true" : "false"}
                                aria-describedby={formErrors.message ? "message-error" : undefined}
                                className={`w-full p-2 border ${formErrors.message ? "border-red-500" : "border-gray-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-home transition duration-300`}
                            />
                            {formErrors.message && <p className="text-red-500 text-sm" id="message-error">{formErrors.message}</p>}
                        </div>
                        <button
                            type="submit"
                            className={`w-full p-2 text-white bg-home rounded-lg hover:bg-home-dark transition duration-300 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                            disabled={isSubmitting}
                            aria-label={isSubmitting ? "Sending your message" : "Send Message"}
                        >
                            {isSubmitting ? "Sending..." : "Send Message"}
                        </button>
                    </form>
                    {submissionStatus && (
                        <div className="mt-4 text-center">
                            <p className={`text-lg ${submissionStatus.includes("error") ? "text-red-500" : "text-green-500"}`}>
                                {submissionStatus}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

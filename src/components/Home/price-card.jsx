import { currencyIcon } from "@/lib/constants";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

function PriceCard({ title, description, price, originalPrice, features }) {
    return (
        <div className="border min-w-[80vw] sm:min-w-[400px] md:min-w-full group even:bg-home even:text-white flex flex-col items-center rounded-xl shadow-borderShadow p-6">
            <h4 className="mt-6 font-bold text-2xl text-center">{title}</h4>
            {/* <p className="mt-2 text-center">{description}</p> */}

            <div className="mt-6 flex flex-col items-center">
                {/* Original Price (Strikethrough) */}
                {originalPrice && (
                    <p className="text-lg italic font-semibold line-through mb-1">
                        {currencyIcon}{originalPrice}
                    </p>
                )}
                {/* Current Price */}
                <p className="text-5xl font-bold text-home group-even:text-white">
                    {currencyIcon}{price}
                </p>
                <p className="text-sm text-gray-400 group-even:text-gray-200 mt-1">
                    Per Year
                </p>
            </div>

            <div className="mt-5 text-left">
                <h5 className="font-semibold text-lg mt-4 text-center">Features</h5>
                {features?.map((feature, index) => (
                    <p key={index} className="mt-2 flex items-center gap-2">
                        <CheckCircle className="text-green-500" />
                        {feature}
                    </p>
                ))}
            </div>

            <Link
                to={"/buy"}
                className="home-button-white mt-12 md:mt-8 lg:mt-12 inline-block"
            >
                Buy Now
            </Link>
        </div>
    );
}

export default PriceCard;

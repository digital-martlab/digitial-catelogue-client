import { currencyIcon } from "@/lib/constants";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

function PriceCard({ title, description, price, features }) {
    const message = `Hello! I am interested in the ${title} plan which costs ${currencyIcon}${price} per year. I would like to book a demo to learn more about the features and benefits.`;

    const encodedMessage = encodeURIComponent(message);

    return (
        <div className="border min-w-[80vw] sm:min-w-[400px] md:min-w-full group even:bg-home even:text-white flex flex-col items-center rounded-xl shadow-borderShadow p-6">
            <h4 className="mt-6 font-bold text-2xl text-center">{title}</h4>
            {/* <p className="mt-2 text-center">{description}</p> */}

            <div className="mt-6 flex items-center">
                <p className="text-7xl text-home group-even:text-white font-bold">{currencyIcon}{price}</p>
                {/* <div className="ml-2 flex flex-col items-start">
                    <p className="text-home group-even:text-white font-bold text-2xl">{currencyIcon}</p>
                    <p className="text-[#AFAFAF] group-even:text-[#E0E0E0] -mt-1">Per / year</p>
                </div> */}
            </div>

            <div className="mt-5 text-left">
                <h5 className="font-semibold text-lg mt-4 text-center">Features</h5>
                {features?.map((feature, index) => (
                    <p key={index} className="mt-2 flex items-center gap-2">
                        <CheckCircle />
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

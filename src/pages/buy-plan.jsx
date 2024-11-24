import LoadingSpinner from "@/components/loading-spinner";
import CustomInputComponent from "@/components/shared/custom-inputs";
import CustomSelectComponent from "@/components/shared/custom-select";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { showAlert } from "@/lib/catch-async-api";
import { buyPlanSchema } from "@/schemas/store-schema";
import { createOrderFn, verifyOrderFn } from "@/services/buy-plan-service";
import { getSuperAdminPlansFn } from "@/services/super-admin/plan-service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

export default function BuyPlan() {
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(false);
    const [afterOrderLoading, setAfterOrderLoading] = useState(false);

    // Default form values
    const defaultValues = useMemo(
        () => ({
            name: "",
            email: "",
            number: "",
            store_name: "",
            plan_id: "",
            state: "",
            city: "",
            area: "",
            password: "",
            agree_to_terms: false,
        }),
        []
    );

    // React Hook Form setup
    const form = useForm({
        resolver: zodResolver(buyPlanSchema),
        defaultValues,
    });

    // Fetch available plans
    useEffect(() => {
        getSuperAdminPlansFn()
            .then((data) => {
                setPlans(
                    data?.data?.map((p) => ({
                        label: `${p.plan_type} - ${p.plan_price}/-`,
                        value: p.plan_id.toString(),
                    }))
                );
            })
            .catch((err) => console.error("Error fetching plans", err));
    }, []);

    // Handle form submission
    const onSubmit = async (data) => {
        setLoading(true);
        try {
            delete data.agree_to_terms;
            data.plan_id = parseInt(data.plan_id);
            const { data: responseData } = await createOrderFn(data);

            const options = {
                ...responseData.paymentData,
                handler: async (response) => {
                    setAfterOrderLoading(true);
                    try {
                        const verifyResponse = await verifyOrderFn(response);
                        showAlert(verifyResponse);
                        form.reset(defaultValues);
                    } finally {
                        setAfterOrderLoading(false);
                    }
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container relative">
            {/* Overlay for loading */}
            {(afterOrderLoading) && (
                <div className="absolute inset-0 z-50 flex items-center justify-center">
                    <LoadingSpinner className="w-20 h-20" />
                </div>
            )}

            <div className="max-w-[1000px] mx-auto">
                <h1 className="text-3xl font-bold text-center">Buy Now</h1>
                <p className="mt-2 text-center text-sm text-destructive bg-red-50">
                    Note: These details cannot be re-edited after submission.
                </p>
                <div className="mt-8">
                    {/* Form */}
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="mt-4 space-y-4"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <CustomInputComponent
                                    label="Name"
                                    name="name"
                                    placeholder="Owner Name"
                                    form={form}
                                />
                                <CustomInputComponent
                                    label="Email"
                                    name="email"
                                    placeholder="Owner Email"
                                    form={form}
                                />
                                <CustomInputComponent
                                    label="Phone Number"
                                    name="number"
                                    placeholder="Phone number"
                                    form={form}
                                />
                                <CustomInputComponent
                                    label="Store Name"
                                    name="store_name"
                                    placeholder="Store Name"
                                    form={form}
                                />
                                <CustomInputComponent
                                    label="State"
                                    name="state"
                                    placeholder="State"
                                    form={form}
                                />
                                <CustomInputComponent
                                    label="City"
                                    name="city"
                                    placeholder="City"
                                    form={form}
                                />
                                <CustomInputComponent
                                    label="Area"
                                    name="area"
                                    placeholder="Near Landmark"
                                    form={form}
                                />
                                <CustomSelectComponent
                                    form={form}
                                    label="Plans"
                                    options={plans}
                                    name="plan_id"
                                    placeholder="Select Plan"
                                />
                                <CustomInputComponent
                                    label="Password"
                                    name="password"
                                    placeholder="Store Password"
                                    form={form}
                                    type="password"
                                />
                            </div>

                            {/* Checkbox for agreement */}
                            <div className="flex items-center gap-2">
                                <Input
                                    type="checkbox"
                                    id="agree_to_terms"
                                    className="h-4 w-4"
                                    {...form.register("agree_to_terms")}
                                />
                                <label
                                    htmlFor="agree_to_terms"
                                    className="text-sm text-gray-600"
                                >
                                    I confirm that these details are correct and cannot be
                                    edited later.
                                </label>
                            </div>

                            {/* Submit button */}
                            <Button type="submit" disabled={loading || !form.getValues("agree_to_terms")}>
                                {loading ? "Saving..." : "Save"}
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
}

import CustomInputComponent from "@/components/shared/custom-inputs";
import CustomSelectComponent from "@/components/shared/custom-select";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Title from "@/components/ui/title";
import { showAlert } from "@/lib/catch-async-api";
import { storeShema } from "@/schemas/store-schema";
import { getSuperAdminPlansFn } from "@/services/super-admin/plan-service";
import {
    createStoreFn,
    getSingleStoreFn,
    updateSingleStoreFn,
} from "@/services/super-admin/store-service";
import { zodResolver } from "@hookform/resolvers/zod";
import { State } from "country-state-city";
import { CameraIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

export default function CreateUpdateStore() {
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { status, store_id } = useParams();
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
            ...(status === "add" && { password: "" }),
        }),
        [status]
    );
    const [file, setFile] = useState(null);
    const [image, setImage] = useState(null);

    // React Hook Form setup
    const form = useForm({
        resolver: zodResolver(storeShema),
        defaultValues,
    });

    // Handle form submission
    const onSubmit = async (data) => {
        console.log(data);
        const formData = new FormData();

        console.log(data);

        // Append form data fields
        // formData.append("name", data.name);
        // formData.append("email", data.email);
        // formData.append("number", data.number);
        // formData.append("store_name", data.store_name);
        // formData.append("store_id", data.store_id);

        // setLoading(true);
        // if (status === "add") {
        //     formData.append("password", data.password);
        //     if (!file) {
        //         setLoading(false);
        //         return showAlert({ message: "Image is required" }, true);
        //     }
        //     formData.append("logo", file);
        //     createStoreFn(formData)
        //         .then((data) => {
        //             navigate("/super-admin/stores");
        //             window.location.href = data?.data;
        //             showAlert(data);
        //         })
        //         .finally(() => setLoading(false));
        // } else {
        //     if (file) formData.append("logo", file);
        //     formData.append("plan",);
        //     updateSingleStoreFn({ store_id, formData })
        //         .then((data) => {
        //             navigate("/super-admin/stores");
        //             showAlert(data);
        //         })
        //         .finally(() => setLoading(false));
        // }
    };

    // Handle image preview
    const handleImage = (e) => {
        const file = e.target?.files?.[0];
        if (file) {
            setFile(file);
            const url = URL.createObjectURL(file);
            setImage(url);
        }
    };

    useEffect(() => {
        if (status === "update" && store_id) {
            getSingleStoreFn(store_id).then(({ data }) => {
                form.reset({
                    acc_id: data?.acc_id,
                    name: data?.name,
                    email: data?.email,
                    number: data?.number,
                    store_name: data?.store_name,
                    store_id: data?.store_id,
                    plan_id: data?.plan_id.toString(),
                    state: data?.state,
                    city: data?.city,
                    area: data?.area
                });
                setImage(data?.logo);
            });
        }
    }, [form, status, store_id]);

    console.log(form.formState.errors);


    useEffect(() => {
        getSuperAdminPlansFn()
            .then(data => setPlans(data?.data?.map((p) => ({ label: p.plan_type, value: p.plan_id.toString() }))));
    }, [])

    return (
        <div className="max-w-[1000px] mx-auto">
            <Title title={status === "add" ? "Add New Store" : "Update Store"} />
            <div className="mt-8">
                <div className="relative group w-28 h-28 overflow-hidden rounded-sm border-2 border-primary bg-card">
                    <img
                        src={image || "https://placehold.co/100x100?text=logo+here"}
                        alt="Store logo"
                        className="w-full h-full object-contain"
                    />
                    <label
                        htmlFor="input_image"
                        className="absolute inset-0 bg-card bg-opacity-40 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                    >
                        <CameraIcon className="w-8 h-8 text-white" />
                    </label>
                    <Input
                        type="file"
                        accept="image/*"
                        id="input_image"
                        className="hidden"
                        onChange={handleImage}
                    />
                </div>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="mt-4 space-y-4"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            <CustomInputComponent
                                label={"Name"}
                                name={"name"}
                                placeholder={"Owner Name"}
                                form={form}
                            />

                            <CustomInputComponent
                                label={"Email"}
                                name={"email"}
                                placeholder={"Owner Email"}
                                form={form}
                            />

                            <CustomInputComponent
                                label={"Phone Number"}
                                name={"number"}
                                placeholder={"Phone number"}
                                form={form}
                            />

                            <CustomInputComponent
                                label={"Store Name"}
                                name={"store_name"}
                                placeholder={"Store Name"}
                                form={form}
                            />

                            <CustomInputComponent
                                label={"State"}
                                name={"state"}
                                placeholder={"state"}
                                form={form}
                            />

                            <CustomInputComponent
                                label={"City"}
                                name={"city"}
                                placeholder={"city"}
                                form={form}
                            />

                            <CustomInputComponent
                                label={"Area"}
                                name={"area"}
                                placeholder={"Near Landmark"}
                                form={form}
                            />

                            <CustomSelectComponent
                                form={form}
                                label={"Plans"}
                                options={plans}
                                name={"plan_id"}
                                placeholder={"Select Plan"}
                            />

                            <CustomInputComponent
                                label={"Plan"}
                                name={"area"}
                                placeholder={"Near Landmark"}
                                form={form}
                            />


                            {status === "add" && (
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Store Password</FormLabel>
                                            <FormControl>
                                                <Input placeholder='Store Password' {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )}
                        </div>

                        <Button type="submit">{loading ? "Saving..." : "Save"}</Button>
                    </form>
                </Form>
            </div>
        </div>
    );
}

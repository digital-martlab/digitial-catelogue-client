import useAuth from "@/hooks/use-auth";
import Title from "../ui/title";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { CameraIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import CustomInputComponent from "../shared/custom-inputs";
import { useMemo } from "react";
import { profileSchema } from "@/schemas/profile-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import { updateProfileFn } from "@/services/admin/profile-update";
import { showAlert } from "@/lib/catch-async-api";

export default function AdminProfileInformation() {
    const { auth, setAuth } = useAuth();
    const [file, setFile] = useState(null);
    const [image, setImage] = useState(null);

    const defaultValues = useMemo(() => ({
        meta_title: auth?.meta_title || "",
        meta_description: auth?.meta_description || "",
        meta_keywords: auth?.meta_keywords || "",
    }), [auth]);

    const form = useForm({
        resolver: zodResolver(profileSchema),
        defaultValues,
    });

    const onSubmit = (data) => {
        const formData = new FormData();
        Object.keys(data).map((key) => {
            const value = data[key];
            if (value)
                formData.append(key, value);
        });

        if (file) {
            formData.append("image", file);
        }

        updateProfileFn(formData)
            .then((data) => {
                showAlert(data);
                localStorage.setItem("digital_catelogue_app_token", data?.data);
                window.location.reload();
            });
    };

    const handleImage = (e) => {
        const file = e.target?.files?.[0];
        if (file) {
            setFile(file);
            const url = URL.createObjectURL(file);
            setImage(url);
        }
    };

    return (
        <>
            <Title title="Registered Details" />

            <div className="grid mt-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                    <Label className="mb-2">Store Name</Label>
                    <div>{auth.store_name}</div>
                </div>
                <div>
                    <Label className="mb-2">Store ID</Label>
                    <div>{auth.store_id}</div>
                </div>
                <div>
                    <Label className="mb-2">Store Slug</Label>
                    <div>{auth.store_slug}</div>
                </div>
                <div>
                    <Label className="mb-2">Owner Name</Label>
                    <div>{auth.name}</div>
                </div>
                <div>
                    <Label className="mb-2">Email</Label>
                    <div>{auth.email}</div>
                </div>
                <div>
                    <Label className="mb-2">Phone Number</Label>
                    <div>{auth.number}</div>
                </div>
                <div>
                    <Label className="mb-2">City</Label>
                    <div>{auth.city}</div>
                </div>
                <div>
                    <Label className="mb-2">State</Label>
                    <div>{auth.state}</div>
                </div>
                <div>
                    <Label className="mb-2">Area</Label>
                    <div>{auth.area}</div>
                </div>
                <div>
                    <Label className="mb-2">Paid Status</Label>
                    <div>{auth.paid_status}</div>
                </div>
                <div>
                    <Label className="mb-2">Plan Expiry</Label>
                    <div>{new Date(auth.plan_expires_in).toLocaleDateString()}</div>
                </div>
                <div>
                    <Label className="mb-2">Role</Label>
                    <div>{auth.role}</div>
                </div>
                <div>
                    <Label className="mb-2">Account ID</Label>
                    <div>{auth.acc_id}</div>
                </div>
            </div>

            <Title title={"Complete Your Profile"} className={"mt-8"} />

            <div className="relative group w-28 h-28 overflow-hidden rounded-sm border-2 border-primary bg-card mt-4">
                <img
                    src={image || auth?.logo || "https://placehold.co/100x100?text=logo+here"}
                    alt="Store logo"
                    className="w-full h-full object-contain"
                />
                <label
                    htmlFor="input_image"
                    className="absolute inset-0 bg-card bg-opacity-40 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                >
                    <CameraIcon className="w-8 h-8 text-accent-foreground opacity-50" />
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
                            label={"Meta Title"}
                            name={"meta_title"}
                            form={form}
                        />

                        <CustomInputComponent
                            label={"Meta Description"}
                            name={"meta_description"}
                            form={form}
                        />

                        <CustomInputComponent
                            label={"Meta Keywords"}
                            name={"meta_keywords"}
                            form={form}
                        />
                    </div>

                    <Button
                        disabled={!form.formState.isDirty}
                        className="mt-4 bg-primary hover:bg-primary-dark text-white py-2 rounded-md"
                        type="submit"
                    >
                        Save Changes
                    </Button>
                </form>
            </Form>
        </>
    );
}

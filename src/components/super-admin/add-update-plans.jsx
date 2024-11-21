import { planShema } from "@/schemas/plan-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { patchSuperAdminPlansFn, postSuperAdminPlansFn } from "@/services/super-admin/plan-service";
import { showAlert } from "@/lib/catch-async-api";
import LoadingSpinner from "../loading-spinner";

export default function CreateUpdatePlanPopup({ toggle, setToggle, refetchData }) {
    const [loading, setLoading] = useState(false);
    const defaultValues = useMemo(() => ({
        plan_type: "",
        plan_price: "",
        plan_duration_months: ""
    }), [])

    const form = useForm({
        resolver: zodResolver(planShema),
        defaultValues,
    });

    const onSubmit = (data) => {
        setLoading(true);
        if (toggle?.action === "add")
            postSuperAdminPlansFn(data)
                .then(data => {
                    showAlert(data);
                    handleOnChange();
                    refetchData();
                    setLoading(false);
                });
        else
            patchSuperAdminPlansFn({ ...data, plan_id: toggle?.plan?.plan_id }).then(data => {
                showAlert(data);
                handleOnChange();
                refetchData();
                setLoading(false);
            });

    }

    const handleOnChange = () => {
        setToggle(null);
        form.reset(defaultValues);
    }

    useEffect(() => {
        if (toggle?.action === "edit" && toggle?.plan) {
            form.reset({
                plan_type: toggle?.plan?.plan_type,
                plan_price: toggle?.plan?.plan_price.toString(),
                plan_duration_months: toggle?.plan?.plan_duration_months.toString()
            })
        }
    }, [toggle])

    return (
        <Dialog open={!!toggle} onOpenChange={handleOnChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Add New Plan
                    </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form className="grid grid-cols-1 gap-2" onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="plan_type"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Plan Type</FormLabel>
                                    <FormControl>
                                        <Input placeholder="" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="plan_price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Plan Price</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="plan_duration_months"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Plan Duration in Months</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button className="mt-4 w-20">{loading ? <LoadingSpinner className={"text-background"} /> : "Save"}</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
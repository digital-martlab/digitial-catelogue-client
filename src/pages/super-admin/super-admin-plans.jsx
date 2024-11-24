import LoadingSpinner from "@/components/loading-spinner";
import NotFound from "@/components/not-found";
import CreateUpdatePlanPopup from "@/components/super-admin/add-update-plans";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Title from "@/components/ui/title";
import { showAlert } from "@/lib/catch-async-api";
import { currencyIcon } from "@/lib/constants";
import { deleteSuperAdminPlansFn, getSuperAdminPlansFn } from "@/services/super-admin/plan-service";
import { Edit, Trash } from "lucide-react";
import { useEffect, useState } from "react";

export default function SuperAdminPlans() {
    const [data, setData] = useState([]);
    const [toggle, setToggle] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const refetch = () => {
        getSuperAdminPlansFn().then((response) => {
            setData(response.data || []);
        });
    };

    const handleDelete = (plan_id) => {
        setIsDeleting(true);
        deleteSuperAdminPlansFn({ plan_id })
            .then((data) => {
                showAlert(data)
                refetch();
            })
            .finally(() => setIsDeleting(false));
    }

    useEffect(() => {
        refetch();
    }, []);

    return (
        <div>
            {/* Header Section */}
            <div className="flex justify-between">
                <Title title="Plans" />
                <Button onClick={() => setToggle({ action: "add" })}>Create</Button>
                <CreateUpdatePlanPopup toggle={toggle} setToggle={setToggle} refetchData={refetch} />
            </div>

            {/* Plans Grid */}
            {data.length !== 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 mt-4 gap-4">
                    {data.map((plan) => (
                        <Card key={plan.plan_id} className="shadow-sm">
                            <CardHeader>
                                <CardTitle>
                                    <div className="flex items-center gap-2">
                                        {plan.plan_type}
                                    </div>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    Price: {currencyIcon}
                                    {plan.plan_price}
                                </p>
                                <p className="mt-1 text-muted-foreground">
                                    Duration: {plan.plan_duration_months === 150 ? "15 Days" : `${plan.plan_duration_months} months`}
                                </p>
                            </CardContent>
                            <CardFooter className="flex justify-end gap-2">
                                <Button
                                    variant="default"
                                    size="sm"
                                    onClick={() => setToggle({ action: "edit", plan })}
                                    disabled={plan.plan_duration_months === 150}
                                >
                                    <Edit />
                                </Button>
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => handleDelete(plan?.plan_id)}
                                    disabled={plan.plan_duration_months === 150}
                                >
                                    {isDeleting ? <LoadingSpinner /> : <Trash />}
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            ) : (
                <NotFound />
            )}
        </div>
    );
}

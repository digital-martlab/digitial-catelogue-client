import LoadingSpinner from "@/components/loading-spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { showAlert } from "@/lib/catch-async-api";
import { resetPasswordAdminFn } from "@/services/admin/login-service";
import { Eye, EyeClosed } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function ResetPasswordAdmin() {
    const { token } = useParams();
    const [loading, setLoading] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);


    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newPassword || !confirmPassword) {
            return showAlert({ message: "Both fields are required." }, true);
        }
        if (newPassword !== confirmPassword) {
            return showAlert({ message: "Passwords do not match." }, true);
        }

        setLoading(true);
        resetPasswordAdminFn({
            token,
            newPassword
        })
            .then((data) => {
                showAlert(data);
                navigate("/admin/login");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        return () => {
            setNewPassword("");
            setConfirmPassword("");
        };
    }, []);

    const EyeCustom = showPassword ? Eye : EyeClosed;

    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleSubmit} className="p-6 rounded-lg shadow-lg w-80">
                <h2 className="text-xl font-bold mb-4 text-center">Reset Password</h2>

                <div className="mb-4 space-y-2 relative">
                    <Label htmlFor="new-password" className="block mb-1 font-medium">
                        New Password
                    </Label>
                    <Input
                        type={showPassword ? "text" : "password"}
                        id="new-password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter new password"
                        required
                    />
                    <EyeCustom className="absolute right-2 -translate-y-1/2 top-1/2 w-4" onClick={() => setShowPassword(!showPassword)} />
                </div>

                <div className="mb-6 space-y-2 relative">
                    <Label htmlFor="confirm-password" className="block mb-1 font-medium">
                        Confirm Password
                    </Label>
                    <Input
                        type={showPassword ? "text" : "password"}
                        id="confirm-password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm new password"
                        required
                    />
                    <EyeCustom className="absolute right-2 -translate-y-1/2 top-1/2 w-4" onClick={() => setShowPassword(!showPassword)} />
                </div>

                <Button type="submit" className="w-full" size="sm" disabled={loading}>
                    {loading ? <LoadingSpinner className={"w-4 h-4 mx-auto text-background"} /> : "Reset Password"}
                </Button>
            </form>
        </div>
    );
}

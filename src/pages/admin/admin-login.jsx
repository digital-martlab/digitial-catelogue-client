import LoadingSpinner from "@/components/loading-spinner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useAuth from "@/hooks/use-auth";
import { showAlert } from "@/lib/catch-async-api";
import { forgotAdminFn, loginAdminFn } from "@/services/admin/login-service";
import { Eye, EyeClosed } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { setAuthFn } = useAuth();
    const [storeId, setStoreId] = useState("");
    const [password, setPassword] = useState("");
    const [mail, setMail] = useState("");
    const [forgotPassword, setForgotPassword] = useState(false);
    const [forgotLoading, setForgotLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!storeId || !password) {
            return showAlert({ message: "Store ID and password are required." }, true);
        }

        setLoading(true);
        loginAdminFn({
            store_id: storeId,
            password
        })
            .then((data) => {
                setAuthFn(data?.data?.token);
                navigate("/admin/");
                showAlert(data);
            })
            .finally(() => setLoading(false));
    };

    const toggleSubmit = () => {
        setForgotPassword(prev => !prev);
        setMail("");
    }

    const handleSubmitForgotPassword = (e) => {
        e.preventDefault();
        setForgotLoading(true);
        forgotAdminFn({ email: mail })
            .then((data) => {
                showAlert(data);
                toggleSubmit();
            })
            .finally(() => setForgotLoading(false));
    }

    useEffect(() => {
        return () => {
            setStoreId("");
            setPassword("");
        };
    }, []);

    const EyeCustom = showPassword ? Eye : EyeClosed;

    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleSubmit} className="p-6 rounded-lg shadow-lg w-80">
                <h2 className="text-xl font-bold mb-4 text-center">Admin Login</h2>

                <div className="mb-4 space-y-2">
                    <Label htmlFor="store-id" className="block mb-1 font-medium">
                        Store ID
                    </Label>
                    <Input
                        type="text"
                        id="store-id"
                        value={storeId}
                        onChange={(e) => setStoreId(e.target.value)}
                        placeholder="Enter Store ID"
                        required
                    />
                </div>

                <div className="mb-6 space-y-2 relative">
                    <Label htmlFor="password" className="block mb-1 font-medium">
                        Password
                    </Label>
                    <Input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                        required
                    />
                    <EyeCustom className="absolute right-2 -translate-y-1/2 top-1/2 w-4" onClick={() => setShowPassword(!showPassword)} />
                </div>

                <Button type="submit" className="w-full" size="sm" disabled={loading}>
                    {loading ? <LoadingSpinner className={"w-4 h-4 mx-auto text-background"} /> : "Login"}
                </Button>
                <p onClick={toggleSubmit} className="text-sm text-center mt-2 cursor-pointer">Forgot Password</p>
            </form>

            <Dialog open={forgotPassword} onOpenChange={toggleSubmit}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Forgot Password</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmitForgotPassword}>
                        <Input type="email" required placeholder="Enter your registered email address" value={mail} onChange={(e) => setMail(e.target.value)} />
                        <Button className="mt-4 w-20">{forgotLoading ? <LoadingSpinner className={"w-4 h-4 text-background"} /> : "Send"}</Button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}

import LoadingSpinner from "@/components/loading-spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useAuth from "@/hooks/use-auth";
import { showAlert } from "@/lib/catch-async-api";
import { loginSuperAdminFn } from "@/services/super-admin/login-service";
import { Eye, EyeClosed } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SuperAdminLogin() {
  const navigate = useNavigate();
  const { setAuthFn, auth, authLoading } = useAuth();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userName || !password)
      return showAlert({ message: "username and password is required." }, true);
    setLoading(true);
    loginSuperAdminFn({
      user_name: userName,
      password
    })
      .then((data) => {
        showAlert(data);
        localStorage.setItem("digital_catelogue_app_token", data?.data?.token);
        setAuthFn(data?.data?.token)
        navigate("/super-admin/")
        setLoading(false);
      })
  };

  useEffect(() => {
    return () => {
      setUserName("");
      setPassword("");
    }
  }, [auth, authLoading, navigate])

  const EyeCustom = showPassword ? Eye : EyeClosed;

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-xl font-bold mb-4 text-center">Super Admin Login</h2>

        <div className="mb-4 space-y-2">
          <Label htmlFor="username" className="block mb-1 font-medium">
            Username
          </Label>
          <Input
            type="text"
            id="username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter username"
            required
          />
        </div>

        <div className="mb-6 space-y-2 relative">
          <Label htmlFor="password" className="block mb-1 font-medium">
            Password
          </Label>
          <Input
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
          />
          <EyeCustom className="absolute right-2 -translate-y-1/2 top-1/2 w-4" onClick={() => setShowPassword(!showPassword)} />
        </div>

        <Button type="submit" className="w-full" size="sm" disabled={loading}>
          {loading ? <LoadingSpinner className={"w-4 h-4 mx-auto"} /> : "Login"}
        </Button>
      </form>
    </div>
  );
}

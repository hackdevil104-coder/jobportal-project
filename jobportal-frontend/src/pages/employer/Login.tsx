import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Briefcase } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import EmployerService from "@/services/EmployerService";

const EmployerLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.email || !formData.password) {
    toast.error("Please fill in all fields");
    return;
  }

  try {
    const response = await EmployerService.login(formData);
    if (response === "Login Successful!") {
      toast.success("✅ Logged in successfully!");
      navigate("/employer/post-job");
    } else {
      toast.error(response);
    }
  } catch (error) {
    toast.error("❌ Login Failed! Try again.");
  }
};

  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <Briefcase className="h-10 w-10 text-accent" />
            <h1 className="text-3xl font-bold">JobPortal</h1>
          </Link>
        </div>

        <Card className="shadow-card">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Employer Login</CardTitle>
            <CardDescription>Welcome back! Sign in to post jobs</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="employer@company.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <Button type="submit" variant="accent" className="w-full" size="lg">
                Sign In
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link to="/employer/signup" className="text-accent hover:underline">
                  Sign up
                </Link>
              </p>

              <div className="text-center">
                <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
                  Back to Home
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmployerLogin;

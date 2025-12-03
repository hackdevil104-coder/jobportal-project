import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Briefcase } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";

const EmployerSignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    toast.error("❌ Password & Confirm Password do not match");
    return;
  }

  if (!formData.companyName || !formData.email || !formData.password) {
    toast.error("⚠️ Please fill all required fields");
    return;
  }

  try {
    const response = await axios.post("http://16.176.4.16:9090/employer/signup", {
      companyName: formData.companyName,
      email: formData.email,
      password: formData.password
    });

    toast.success(response.data || "✅ Employer account created successfully!");
    navigate("/employer/login");

  } catch (error: any) {
    console.error(error);
    toast.error(error.response?.data || "❌ Signup Failed! Try again.");
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
            <CardTitle className="text-2xl">Create Employer Account</CardTitle>
            <CardDescription>Start posting jobs and finding talent</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  name="companyName"
                  placeholder="Tech Corp Inc."
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                />
              </div>

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

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>

              <Button type="submit" variant="accent" className="w-full" size="lg">
                Create Account
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link to="/employer/login" className="text-accent hover:underline">
                  Log in
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

export default EmployerSignup;

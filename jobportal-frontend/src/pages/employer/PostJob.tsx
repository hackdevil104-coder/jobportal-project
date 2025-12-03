import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Briefcase } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import JobService from "@/services/JobService";

const PostJob = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: "",
    jobTitle: "",
    jobType: "",
    location: "",
    salaryRange: "",
    experienceLevel: "",
    description: "",
    skillsRequired: "",
    companyLogo: "",
    applyLink: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.companyName || !formData.jobTitle || !formData.jobType) {
      toast.error("Please fill in all required fields");
      return;
    }

   
   const jobData = {
  companyName: formData.companyName,
  jobTitle: formData.jobTitle,
  jobType: formData.jobType,
  location: formData.location,
  salaryRange: formData.salaryRange,
  experienceLevel: formData.experienceLevel,
  jobDescription: formData.description, //  backend field name
  skillsRequired: formData.skillsRequired,
  companyLogo: formData.companyLogo,
  applyOption: formData.applyLink,       //  backend field name
};

    try {
      const res = await JobService.postJob(jobData);
      toast.success(res || "Job posted successfully!");
      navigate("/");
    } catch (err) {
      toast.error("Failed to post job! Check console.");
      console.error("Job post error:", err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Briefcase className="h-8 w-8 text-accent" />
            <h1 className="text-2xl font-bold">JobPortal</h1>
          </Link>
          <Link to="/">
            <Button variant="ghost">Home</Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <Card className="shadow-card">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl">Post a New Job</CardTitle>
              <CardDescription className="text-base">
                Find the perfect candidate for your open position
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name *</Label>
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
                    <Label htmlFor="jobTitle">Job Title *</Label>
                    <Input
                      id="jobTitle"
                      name="jobTitle"
                      placeholder="Senior Developer"
                      value={formData.jobTitle}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="jobType">Job Type *</Label>
                    <Select
                      value={formData.jobType}
                      onValueChange={(value) => handleSelectChange("jobType", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select job type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full-time">Full-time</SelectItem>
                        <SelectItem value="part-time">Part-time</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                        <SelectItem value="internship">Internship</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      name="location"
                      placeholder="San Francisco, CA / Remote"
                      value={formData.location}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="salaryRange">Salary Range</Label>
                    <Input
                      id="salaryRange"
                      name="salaryRange"
                      placeholder="$80k - $120k"
                      value={formData.salaryRange}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experienceLevel">Experience Level</Label>
                    <Select
                      value={formData.experienceLevel}
                      onValueChange={(value) => handleSelectChange("experienceLevel", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="entry">Entry Level</SelectItem>
                        <SelectItem value="mid">Mid-Level</SelectItem>
                        <SelectItem value="senior">Senior</SelectItem>
                        <SelectItem value="lead">Lead</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Job Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Describe the role, responsibilities, and what makes your company great..."
                    rows={5}
                    value={formData.description}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="skillsRequired">Skills Required</Label>
                  <Input
                    id="skillsRequired"
                    name="skillsRequired"
                    placeholder="React, TypeScript, Node.js (comma separated)"
                    value={formData.skillsRequired}
                    onChange={handleChange}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="companyLogo">Company Logo URL</Label>
                    <Input
                      id="companyLogo"
                      name="companyLogo"
                      placeholder="https://example.com/logo.png"
                      value={formData.companyLogo}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="applyLink">Apply Link / Email</Label>
                    <Input
                      id="applyLink"
                      name="applyLink"
                      placeholder="https://apply.com or jobs@company.com"
                      value={formData.applyLink}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <Button type="submit" size="lg" className="w-full" variant="accent">
                  Post Job
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PostJob;

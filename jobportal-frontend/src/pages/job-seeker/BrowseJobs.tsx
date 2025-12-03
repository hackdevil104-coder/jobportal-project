import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Briefcase, MapPin, DollarSign, Clock, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import JobApplicationService from "@/services/JobApplicationService";
import axios from "axios";

const applicationSchema = z.object({
  fullName: z.string().trim().min(1, "Full name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  resumeLink: z.string().trim().url("Please enter a valid URL").max(500),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(500),
});

type ApplicationFormData = z.infer<typeof applicationSchema>;

const BrowseJobs = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedJob, setSelectedJob] = useState<any | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
  });

  //  Fetch jobs from backend
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("http://16.176.4.16:9090/job/list"); //  change URL if needed
        setJobs(res.data || []);
      } catch (err) {
        console.error("❌ Error fetching jobs:", err);
        toast({
          title: "Error loading jobs",
          description: "Unable to fetch jobs from server.",
          variant: "destructive",
        });
      }
    };
    fetchJobs();
  }, []);

  // 🔹 Filter jobs
  const filteredJobs = jobs.filter((job) =>
    job.jobTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 🔹 Apply Button Click
  const handleApplyClick = (job: any) => {
    setSelectedJob(job);
    setIsDialogOpen(true);
  };

  // 🔹 Submit Application
  const onSubmit = async (data: ApplicationFormData) => {
    if (!selectedJob) return;

    const payload = {
      jobId: selectedJob.jobId,
      fullName: data.fullName,
      email: data.email,
      resumeLink: data.resumeLink,
      shortMessage: data.message,
    };

    try {
      const res = await JobApplicationService.apply(payload);
      toast({
        title: "✅ Application Submitted!",
        description: res || "Your application has been sent successfully!",
      });
      setIsDialogOpen(false);
      reset();
    } catch (err) {
      console.error("❌ Apply Error:", err);
      toast({
        title: "Error!",
        description: "Failed to submit application. Try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Briefcase className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold">JobPortal</h1>
          </Link>
          <div className="flex gap-3">
            <Link to="/job-seeker/profile">
              <Button variant="outline">My Profile</Button>
            </Link>
            <Link to="/">
              <Button variant="ghost">Home</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Search Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-6">Browse Jobs</h1>
          <div className="relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search by title, company, or location..."
              className="pl-10 h-12"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <p className="text-muted-foreground mt-4">
            Showing {filteredJobs.length} job{filteredJobs.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Jobs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <Card key={job.jobId} className="shadow-card hover:shadow-hover transition-smooth flex flex-col">
              <CardHeader>
                <div className="flex items-start justify-between mb-3">
                  <div className="text-4xl">💼</div>
                  <Badge variant="secondary">{job.jobType || "Full-time"}</Badge>
                </div>
                <CardTitle className="text-xl">{job.jobTitle}</CardTitle>
                <CardDescription className="text-base font-medium text-foreground">
                  {job.companyName}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <DollarSign className="h-4 w-4" />
                  <span>{job.salaryRange || "N/A"}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>Posted {job.postedDate || "recently"}</span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {job.jobDescription}
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => handleApplyClick(job)}>
                  Apply Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* No Jobs */}
        {filteredJobs.length === 0 && (
          <div className="text-center py-16">
            <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No jobs found</h3>
            <p className="text-muted-foreground">Try adjusting your search criteria</p>
          </div>
        )}
      </div>

      {/* Application Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Apply for {selectedJob?.jobTitle}</DialogTitle>
            <DialogDescription>
              {selectedJob?.companyName} - {selectedJob?.location}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" placeholder="John Doe" autoComplete="off" {...register("fullName")} />
              {errors.fullName && <p className="text-sm text-destructive">{errors.fullName.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="john@example.com" autoComplete="off"{...register("email")} />
              {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="resumeLink">Resume Link</Label>
              <Input id="resumeLink" type="url" placeholder="https://..." autoComplete="off" {...register("resumeLink")} />
              {errors.resumeLink && <p className="text-sm text-destructive">{errors.resumeLink.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Short Message</Label>
              <Textarea id="message" placeholder="Tell us why you're a great fit..." autoComplete="off" {...register("message")} />
              {errors.message && <p className="text-sm text-destructive">{errors.message.message}</p>}
            </div>
            <DialogFooter>
              <Button type="submit" className="w-full">Submit Application</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BrowseJobs;

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BrowseJobs from "./pages/job-seeker/BrowseJobs";
import Profile from "./pages/job-seeker/Profile";
import JobSeekerLogin from "./pages/job-seeker/Login";
import JobSeekerSignup from "./pages/job-seeker/Signup";
import PostJob from "./pages/employer/PostJob";
import EmployerLogin from "./pages/employer/Login";
import EmployerSignup from "./pages/employer/Signup";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/job-seeker/browse-jobs" element={<BrowseJobs />} />
          <Route path="/job-seeker/profile" element={<Profile />} />
          <Route path="/job-seeker/login" element={<JobSeekerLogin />} />
          <Route path="/job-seeker/signup" element={<JobSeekerSignup />} />
          <Route path="/employer/post-job" element={<PostJob />} />
          <Route path="/employer/login" element={<EmployerLogin />} />
          <Route path="/employer/signup" element={<EmployerSignup />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

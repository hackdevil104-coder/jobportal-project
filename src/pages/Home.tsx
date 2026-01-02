import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Users, Search, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b bg-card shadow-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Briefcase className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold">JobPortal</h1>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="gradient-hero py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Find Your Dream Job Today
          </h1>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Connect with top employers or discover talented professionals. Your next career move starts here.
          </p>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Job Seeker Card */}
            <Card className="shadow-card hover:shadow-hover transition-smooth border-2 hover:border-primary">
              <CardHeader>
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">Job Seeker</CardTitle>
                <CardDescription className="text-base">
                  Browse thousands of job opportunities
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/job-seeker/browse-jobs">
                  <Button size="lg" className="w-full">
                    Browse Jobs
                  </Button>
                </Link>
                <Link to="/job-seeker/login">
                  <Button variant="outline" size="lg" className="w-full">
                    Login
                  </Button>
                </Link>
                <Link to="/job-seeker/signup">
                  <Button variant="ghost" size="lg" className="w-full">
                    Sign Up
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Employer Card */}
            <Card className="shadow-card hover:shadow-hover transition-smooth border-2 hover:border-accent">
              <CardHeader>
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-accent" />
                </div>
                <CardTitle className="text-2xl">Employer</CardTitle>
                <CardDescription className="text-base">
                  Post jobs and find the best talent
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/employer/post-job">
                  <Button variant="accent" size="lg" className="w-full">
                    Post a Job
                  </Button>
                </Link>
                <Link to="/employer/login">
                  <Button variant="outline" size="lg" className="w-full">
                    Login
                  </Button>
                </Link>
                <Link to="/employer/signup">
                  <Button variant="ghost" size="lg" className="w-full">
                    Sign Up
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose JobPortal?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="shadow-card">
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Fast & Easy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Quick application process and instant job posting for employers
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <Search className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Smart Matching</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Find the perfect fit based on skills and requirements
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <Briefcase className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Quality Opportunities</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Verified companies and genuine job openings
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary py-8 border-t">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2025 JobPortal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;

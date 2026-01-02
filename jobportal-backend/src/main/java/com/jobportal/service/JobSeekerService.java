package com.jobportal.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jobportal.model.JobSeeker;
import com.jobportal.repository.JobSeekerRepository;

@Service
public class JobSeekerService {

    @Autowired
    private JobSeekerRepository jobSeekerRepository;

    // Job Seeker Sign Up
    public String registerJobSeeker(JobSeeker jobSeeker) {
        if (jobSeekerRepository.findByEmail(jobSeeker.getEmail()) != null) {
            return "Email already exists!";
        }
        jobSeekerRepository.save(jobSeeker);
        return "Job Seeker Registered Successfully!";
    }

    // Job Seeker Login
    public String loginJobSeeker(String email, String password) {
        JobSeeker seeker = jobSeekerRepository.findByEmail(email);

        if (seeker == null) {
            return "Email Not Found! Please Sign Up.";
        }
        if (!seeker.getPassword().equals(password)) {
            return "Invalid Password!";
        }
        return "Login Successful!";
    }
}

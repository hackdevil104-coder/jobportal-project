package com.jobportal.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jobportal.model.JobSeeker;
import com.jobportal.service.JobSeekerService;

@RestController
@RequestMapping("/jobseeker")
@CrossOrigin(origins = "*")

public class JobSeekerController {

    @Autowired
    private JobSeekerService jobSeekerService;

    // Job Seeker Sign Up
    @PostMapping("/signup")
    public String registerJobSeeker(@RequestBody JobSeeker jobSeeker) {
        return jobSeekerService.registerJobSeeker(jobSeeker);
    }

    // Job Seeker Login
    
    @PostMapping("/login")
    public String loginJobSeeker(@RequestBody JobSeeker jobSeeker) {
        return jobSeekerService.loginJobSeeker(jobSeeker.getEmail(), jobSeeker.getPassword());
    }

}

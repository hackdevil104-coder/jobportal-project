package com.jobportal.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jobportal.model.JobApplication;
import com.jobportal.service.JobApplicationService;

@RestController
@RequestMapping("/application")
@CrossOrigin(origins = "*")
public class JobApplicationController {

    @Autowired
    private JobApplicationService jobApplicationService;

    // Apply for Job
    @PostMapping("/apply")
    public String applyJob(@RequestBody JobApplication jobApplication) {
        return jobApplicationService.applyJob(jobApplication);
    }
}

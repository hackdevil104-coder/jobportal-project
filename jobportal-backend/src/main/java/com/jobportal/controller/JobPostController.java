package com.jobportal.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jobportal.model.JobPost;
import com.jobportal.service.JobPostService;

@RestController
@RequestMapping("/job")
@CrossOrigin(origins = "*")
public class JobPostController {

    @Autowired
    private JobPostService jobPostService;

    // Employer Post a Job
    @PostMapping("/post")
    public String createJobPost(@RequestBody JobPost jobPost) {
        return jobPostService.createJobPost(jobPost);
    }

    // Browse all Jobs
    @GetMapping("/list")
    public List<JobPost> getAllJobs() {
        return jobPostService.getAllJobs();
    }

    // Search Jobs
    @GetMapping("/search")
    public List<JobPost> searchJobs(@RequestParam String title) {
        return jobPostService.searchJobs(title);
    }
}

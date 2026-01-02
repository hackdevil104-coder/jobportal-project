package com.jobportal.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jobportal.model.JobPost;
import com.jobportal.repository.JobPostRepository;

@Service
public class JobPostService {

    @Autowired
    private JobPostRepository jobPostRepository;

    // Employer Post Job
    public String createJobPost(JobPost jobPost) {
        jobPostRepository.save(jobPost);
        return "Job Posted Successfully!";
    }

    // Browse all Jobs
    public List<JobPost> getAllJobs() {
        return jobPostRepository.findAll();
    }

    // Search by Job Title
    public List<JobPost> searchJobs(String title) {
        return jobPostRepository.findByJobTitleContaining(title);
    }
}

package com.jobportal.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jobportal.model.JobApplication;
import com.jobportal.repository.JobApplicationRepository;

@Service
public class JobApplicationService {

    @Autowired
    private JobApplicationRepository jobApplicationRepository;

    // Apply for a job
    public String applyJob(JobApplication application) {
        jobApplicationRepository.save(application);
        return "Job Applied Successfully!";
    }
}

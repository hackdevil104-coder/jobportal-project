package com.jobportal.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jobportal.model.JobApplication;

public interface JobApplicationRepository extends JpaRepository<JobApplication, Integer> {

    List<JobApplication> findByJobId(Integer jobId); // View applications for specific job
}

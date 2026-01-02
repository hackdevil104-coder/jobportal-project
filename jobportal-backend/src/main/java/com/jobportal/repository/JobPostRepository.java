package com.jobportal.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jobportal.model.JobPost;

public interface JobPostRepository extends JpaRepository<JobPost, Integer> {

    List<JobPost> findByCompanyName(String companyName);  // To filter jobs by company

    List<JobPost> findByJobTitleContaining(String title); // For browse search
}

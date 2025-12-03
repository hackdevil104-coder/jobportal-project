package com.jobportal.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jobportal.model.JobSeeker;

public interface JobSeekerRepository extends JpaRepository<JobSeeker, Integer> {

    JobSeeker findByEmail(String email); // Login validation
}

package com.jobportal.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jobportal.model.Employer;

public interface EmployerRepository extends JpaRepository<Employer, Integer> {

    Employer findByEmail(String email); // Employer Login validation
}

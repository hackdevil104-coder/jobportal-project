package com.jobportal.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jobportal.model.Employer;
import com.jobportal.repository.EmployerRepository;

@Service
public class EmployerService {

    @Autowired
    private EmployerRepository employerRepository;

    // Employer Sign Up
    public String registerEmployer(Employer employer) {
        if (employerRepository.findByEmail(employer.getEmail()) != null) {
            return "Email already exists!";
        }
        employerRepository.save(employer);
        return "Employer Registered Successfully!";
    }

    // Employer Login
    public String loginEmployer(String email, String password) {
        Employer employer = employerRepository.findByEmail(email);

        if (employer == null) {
            return "Email Not Found! Please Sign Up.";
        }
        if (!employer.getPassword().equals(password)) {
            return "Invalid Password!";
        }
        return "Login Successful!";
    }
}

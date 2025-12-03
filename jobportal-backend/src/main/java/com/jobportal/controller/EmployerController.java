package com.jobportal.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jobportal.model.Employer;
import com.jobportal.service.EmployerService;

@RestController
@RequestMapping("/employer")
@CrossOrigin(origins = "*")
public class EmployerController {

    @Autowired
    private EmployerService employerService;

    // Employer Sign Up
    @PostMapping("/signup")
    public String registerEmployer(@RequestBody Employer employer) {
        return employerService.registerEmployer(employer);
    }

    // Employer Login
    @PostMapping("/login")
    public String loginEmployer(@RequestBody Employer employer) {
        return employerService.loginEmployer(employer.getEmail(), employer.getPassword());
    }
    

}

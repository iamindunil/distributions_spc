package com.distribution.backend.service.impl;

import com.distribution.backend.dto.EmployeeDto;
import com.distribution.backend.entity.Employee;
import com.distribution.backend.repository.EmployeeRepository;
import com.distribution.backend.service.EmployeeService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository repository;

    public EmployeeServiceImpl(EmployeeRepository repository) {
        this.repository = repository;
    }

    @Override
    public Employee createEmployee(EmployeeDto dto) {
        String employeeId = "EMP-" + (int)(Math.random() * 1000);
        Employee emp = new Employee(dto.getFullName(), dto.getEmail(), employeeId, dto.getRole(), dto.isActive());
        return repository.save(emp);
    }

    @Override
    public Employee getEmployeeById(Long id) {
        return repository.findById(id).orElseThrow(() -> new RuntimeException("Employee not found"));
    }

    @Override
    public List<Employee> getAllEmployees() {
        return repository.findAll();
    }

    @Override
    public Employee updateEmployee(Long id, EmployeeDto dto) {
        Employee emp = getEmployeeById(id);
        emp.setFullName(dto.getFullName());
        emp.setEmail(dto.getEmail());
        emp.setRole(dto.getRole());
        emp.setActive(dto.isActive());
        return repository.save(emp);
    }

    @Override
    public void deleteEmployee(Long id) {
        repository.deleteById(id);
    }
}

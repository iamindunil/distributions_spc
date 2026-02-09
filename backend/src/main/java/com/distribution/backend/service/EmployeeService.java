package com.distribution.backend.service;

import com.distribution.backend.dto.EmployeeDto;
import com.distribution.backend.entity.Employee;

import java.util.List;

public interface EmployeeService {
    Employee createEmployee(EmployeeDto employeeDto);
    Employee getEmployeeById(Long id);
    List<Employee> getAllEmployees();
    Employee updateEmployee(Long id, EmployeeDto employeeDto);
    void deleteEmployee(Long id);
}

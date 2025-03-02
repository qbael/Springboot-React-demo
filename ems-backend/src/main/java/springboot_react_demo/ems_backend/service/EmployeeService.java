package springboot_react_demo.ems_backend.service;

import springboot_react_demo.ems_backend.dto.EmployeeDto;

import java.util.List;

public interface EmployeeService {
    EmployeeDto createEmployee(EmployeeDto employeeDto);
    EmployeeDto getEmployeeById(int employeeId);
    List<EmployeeDto> getAllEmployees();
    EmployeeDto updateEmployee(int employeeId, EmployeeDto employeeDto);
    void deleteEmployee(int employeeId);
}

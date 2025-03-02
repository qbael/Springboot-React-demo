package springboot_react_demo.ems_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import springboot_react_demo.ems_backend.entity.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Integer> {
}

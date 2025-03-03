import {useEffect, useState} from "react";
import {deleteEmployee, listEmployees} from "../services/EmployeeService.js";
import {useNavigate} from "react-router-dom";

export const ListEmployeeComponent = () => {

    const [employees, setEmployees] = useState([])

    const navigator = useNavigate();

    useEffect(() => {
        getAllEmployee()
    }, []);

    const getAllEmployee = () => {
        listEmployees().then(response => {
            setEmployees(response.data)
            console.log(response)
        }).catch(error => {
            console.log(error)
        })
    }

    const addNewEmployee = () => {
        navigator('/add-employee')
    }

    const editEmployee = (id) => {
        navigator(`/edit-employee/${id}`)
    }

    const removeEmployee = (id) => {
        deleteEmployee(id).then(response => {
            console.log(response.data)
            getAllEmployee()
        }).catch(error => {
            console.log(error)
        })
    }
    return (
        <div className='container'>
            <h2 className='text-center'>List of Employees</h2>
            <button className='btn btn-primary' onClick={addNewEmployee}>Add Employee</button>
            <table className='table table-striped table-bordered'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {
                    employees.map(item =>
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.firstName}</td>
                            <td>{item.lastName}</td>
                            <td>{item.email}</td>
                            <td>
                                <button className={'btn btn-info'} onClick={() => editEmployee(item.id)}>Update</button>
                                <button className={'btn btn-danger'} onClick={() => removeEmployee(item.id)} style={{ marginLeft: "10px" }} >Update</button>
                            </td>
                        </tr>
                    )
                }
                </tbody>
            </table>
        </div>
    )
};

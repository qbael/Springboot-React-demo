import {useEffect, useState} from "react";
import {createEmployee, getEmployee, updateEmployee} from "../services/EmployeeService.js";
import {useNavigate, useParams} from "react-router-dom";

export const EmployeeComponent = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: ''
    })

    const {id} = useParams()
    const navigator = useNavigate()

    useEffect(() => {
        if(id){
            getEmployee(id).then(response => {
                setFirstName(response.data.firstName)
                setLastName(response.data.lastName)
                setEmail(response.data.email)
            }).catch(error => {
                console.log(error)
            })
        }
    }, [id]);

    const saveOrUpdateEmployee = (e) => {
        e.preventDefault()

        if(validateForm()){
            const employee = {firstName, lastName, email}
            console.log(employee)

            if (id) {
                updateEmployee(id, employee).then(response => {
                    console.log(response.data);
                    navigator('/employees')
                }).catch(error => {
                    console.log(error)
                })
            } else {
                createEmployee(employee).then(response => {
                    console.log(response.data);
                    navigator('/employees')
                }).catch(error => {
                    console.log(error)
                })
            }

        }
    }

    const validateForm = () => {
        let valid = true;
        let errorsCopy = {... errors}

        if (firstName.trim()){
            errorsCopy.firstName = ''
        } else {
            errorsCopy.firstName = 'First name is required'
            valid = false
        }

        if (lastName.trim()){
            errorsCopy.lastName = ''
        } else {
            errorsCopy.lastName = 'Last name is required'
            valid = false
        }

        if (!email.trim()) {
            errorsCopy.email = 'Email is required'
            valid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errorsCopy.email = 'Invalid email format'
            valid = false;
        } else {
            errorsCopy.email = '';
        }

        setErrors(errorsCopy);
        return valid;
    }

    const pageTitle = () => {
        if (id) {
            return <h2 className='text-center'>Edit Employee</h2>
        } else {
            return <h2 className='text-center'>Add Employee</h2>
        }
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    {pageTitle()}
                    <div className='card-body'>
                        <form>
                            <div className='form-group mb-2'>
                                <label className='form-label'>First name:</label>
                                <input
                                    type='text'
                                    placeholder='Enter employee first name'
                                    name='firstName'
                                    value={firstName}
                                    className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                                {errors.firstName && <div className='invalid-feedback'>{errors.firstName}</div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Last name:</label>
                                <input
                                    type='text'
                                    placeholder='Enter employee last name'
                                    name='lastName'
                                    value={lastName}
                                    className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                                {errors.lastName && <div className='invalid-feedback'>{errors.lastName}</div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Email:</label>
                                <input
                                    type='email'
                                    placeholder='Enter employee email'
                                    name='email'
                                    value={email}
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
                            </div>

                            <button className='btn btn-success' onClick={saveOrUpdateEmployee}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import { Col} from "react-bootstrap";
import InputGroup from 'react-bootstrap/InputGroup';
import { SignupDetails, RoleGetApiDetails } from "../../src/pages/api/AxiosRequest";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import LoadingPage from "@/components/loadingPage";
import Link from "next/link";
import LoginLayout from "@/components/common/layout/login";
const Signup = () => {
    const router = useRouter();
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('')
    const [EmailError, setEmailError] = useState('');
    const [PasswordError, setPasswordError] = useState('');
    const [confirmpasswordError, setConfirmPasswordError] = useState('');
    const [roleError, setRoleError] = useState('');
    const [roleData, setRoleData] = useState([]);
    const [validated, setValidated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [AllData, setAlldata] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirm_password: '',
        roleselect: '',
    })
    const handleAllChange = (event) => {
        setAlldata({ ...AllData, [event.target.name]: event.target.value });
    };
    let handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            first_name: AllData.first_name,
            last_name: AllData.last_name,
            email: AllData.email,
            password: AllData.password,
            confirmpassword: AllData.confirm_password,
            role: AllData.roleselect
        }
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            setValidated(true);
        } else {
            setIsLoading(true);
            return SignupDetails(data)
                .then((resp) => {
                    console.log(resp)
                    router.push("/login");
                    toast.success(resp.data.message);
                    setIsLoading(false);
                    setAlldata('');
                    setFirstNameError(''); setLastNameError(''); setEmailError(""); setPasswordError(""); confirmpasswordError(''), setRoleError('');

                }).catch((error) => {
                    console.log(error?.response?.data)
                    setIsLoading(false);
                    setFirstNameError(error?.response?.data.error.errors?.first_name?.message);
                    setLastNameError(error?.response?.data.error.errors?.last_name?.message);
                    setEmailError(error?.response?.data.error.errors?.email?.message);
                    setPasswordError(error?.response?.data.error.errors?.password?.message);
                    setConfirmPasswordError(error?.response?.data.error.errors?.confirmpassword?.message)
                    setRoleError(error?.response?.data.error.errors?.role?.message)
                })
        }
    };

    const fetchRoleData = async () => {
        return RoleGetApiDetails()
            .then((resp) => {
                setRoleData(resp.data.data.roles)
            })
    }
    useEffect(() => {
        fetchRoleData();
    }, []);
    return (
        <>
        <LoginLayout>
            <section className="ftco-section">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6 text-center mb-3">
                            {/* <h2 className="heading-section">Sign Up </h2> */}
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-md-7 col-lg-5">
                            <div className="login-wrap p-4 p-md-5">
                                <div className="icon d-flex align-items-center justify-content-center">
                                    <span className="fa fa-user-o" />
                                </div>
                                <div className="text-center mb-3">
                            <h2 className="heading-section">Sign Up </h2>
                        </div>
                                <Form onSubmit={handleSubmit} noValidate validated={validated} className="login-form">
                                {isLoading ? <LoadingPage /> : null}
                                    <Form.Group as={Col} md="4" controlId="exampleForm.ControlInput1" className="col-12 col-lg-12 my-2 mb-3 d-flex">
                                        <InputGroup>
                                            <Form.Control
                                                required
                                                className="rounded-left login-form-control"
                                                type="text"
                                                placeholder='First Name'
                                                name="first_name"
                                                value={AllData.first_name || ''}
                                                onChange={handleAllChange}
                                            ></Form.Control>
                                            <Form.Control.Feedback type="invalid">
                                                <label className="validation-invalid-label">
                                                    First Name is required
                                                </label>
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                        {firstNameError ? <label className="error-msg" type="invalid">{firstNameError}</label> : null}
                                    </Form.Group>
                                    <Form.Group as={Col} md="4" controlId="exampleForm.ControlInput" className="col-12 col-lg-12 my-2 mb-3 d-flex">
                                        <InputGroup>
                                            <Form.Control
                                                required
                                                className="rounded-left login-form-control"
                                                type="text"
                                                placeholder='Last Name'
                                                name="last_name"
                                                value={AllData.last_name || ''}
                                                onChange={handleAllChange}
                                            ></Form.Control>
                                            <Form.Control.Feedback type="invalid">
                                                <label className="validation-invalid-label">
                                                    Last Name is required
                                                </label>
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                        {lastNameError ? <label className="error-msg">{lastNameError}</label> : null}
                                    </Form.Group>
                                    <Form.Group as={Col} md="4" controlId="exampleForm.ControlInputemail" className="col-12 col-lg-12 my-2 mb-3 d-flex">
                                        <InputGroup>
                                            <Form.Control
                                                required
                                                className="rounded-left login-form-control"
                                                type="text"
                                                placeholder='Email'
                                                name="email"
                                                value={AllData.email || ''}
                                                onChange={handleAllChange}
                                            ></Form.Control>
                                            <Form.Control.Feedback type="invalid">
                                                <label className="validation-invalid-label">
                                                    Email is required
                                                </label>
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                        {EmailError ? <label className="error-msg" type="invalid">{EmailError}</label> : null}
                                    </Form.Group>
                                    <Form.Group as={Col} md="4" controlId="validationCustom01" className="col-12 col-lg-12 my-2 mb-3 d-flex">
                                        <InputGroup>
                                            <Form.Control
                                                required
                                                className="rounded-left login-form-control"
                                                type="password"
                                                placeholder='Password'
                                                name="password"
                                                value={AllData.password || ''}
                                                onChange={handleAllChange}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                <label className="validation-invalid-label">
                                                    password is required
                                                </label>
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                        {PasswordError ? <label className="error-msg">{PasswordError}</label> : null}
                                    </Form.Group>
                                    <Form.Group as={Col} md="4" controlId="validationCustom" className="col-12 col-lg-12 my-2 mb-3 d-flex">
                                        <InputGroup>
                                            <Form.Control
                                                required
                                                className="rounded-left login-form-control"
                                                type="password"
                                                placeholder='Confirm Password'
                                                name="confirm_password"
                                                value={AllData.confirm_password || ''}
                                                onChange={handleAllChange}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                <label className="validation-invalid-label">
                                                    Confirm Password is required
                                                </label>
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                        {confirmpasswordError ? <label className="error-msg">{confirmpasswordError}</label> : null}
                                    </Form.Group>
                                    {/* <Form.Group md="4" className="InputField col-12 col-lg-12 my-2 mb-3">
                                        <Form.Select aria-label="Default select example"
                                            as="select"
                                            name="roleselect"
                                            value={AllData.roleselect || ""}
                                            onChange={handleAllChange}>
                                            <option>Open this select Role</option>
                                            {
                                                roleData.map(item => {
                                                    return (
                                                        <option key={item.role} vlaue={item.role}  >{item.role}</option>
                                                    )
                                                })
                                            }
                                        </Form.Select>
                                        {roleError ? <label className="validation-invalid-label">{roleError}</label> : null}
                                    </Form.Group> */}
                                    <div className="form-group">
                                        <button className="form-control login-form-control btn btn-primary rounded submit px-3" type="submit">Sign Up </button>
                                    </div>
                                    <div className="text-center justify-content-center mb-0">
              <p className="small fw-bold mt-1 pt-1">
            <Link className="btn-primary" style={{ textDecoration: "none", cursor: "pointer" }} href='/login'>Back to login</Link>
          </p>
          </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            </LoginLayout>
            {/* /main content */}
        </>
    )
}
export default Signup;
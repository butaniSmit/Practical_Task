import { PostApiDetails, RoleGetApiDetails } from "@/pages/api/AxiosRequest";
import { useEffect, useState } from "react";
import { ModalButton, ModalPopup } from "../common/modal";
import { toast } from "react-toastify";
import LoadingPage from "../loadingPage";

const { Button, Form, Row, Col } = require("react-bootstrap")

const AddUser = ({ reloadData }) => {
    const [FirstNameError, setFirstNameError] = useState('');
    const [LastNameError, setLastNameError] = useState('');
    const [EmailError, setEmailError] = useState('');
    const [PasswordError, setPasswordError] = useState('');
    const [ConfirmPasswordError, setConfirmPasswordError] = useState('');
    const [roleError, setRoleError] = useState('');
    const [validated, setValidated] = useState(false);
    const [show, setShow] = useState(false);
    const [roledata, setRoleData] = useState([]);
    const [loading, setLoading] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
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
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            first_name: AllData.first_name,
            last_name: AllData.last_name,
            email: AllData.email,
            password: AllData.password,
            confirmpassword: AllData.confirm_password,
            role: AllData.roleselect,
        }
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            setValidated(true);
        } else if (AllData.password !== AllData.confirm_password) {
            setConfirmPasswordError("The confirm password and new password must match");
            setRoleError('');
        }
        else {
            setLoading(true)
            return PostApiDetails(data)
                .then((resp) => {
                    console.log(resp)
                    handleClose();
                    setAlldata('');
                    reloadData();
                    setValidated(false);
                    setLoading(false)
                    toast.success(resp.data.message); setFirstNameError(''); setLastNameError(''); setEmailError(''); setPasswordError(''); setConfirmPasswordError(''); setRoleError('')
                })
                .catch(error => {
                    console.log(error)
                    // if (AllData.first_name === '' || AllData.last_name === '' || AllData.email === '' || AllData.phone_number === '' || AllData.password === '' || AllData.confirm_password === '' || AllData.roleselect === '' || AllData.password !== AllData.confirm_password) {
                    setLoading(false)
                    setFirstNameError(error?.response?.data.error.errors?.first_name?.message);
                    setLastNameError(error?.response?.data.error.errors?.last_name?.message);
                    setEmailError(error?.response?.data.error.errors?.email?.message);
                    setPasswordError(error?.response?.data.error.errors?.password?.message);
                    setConfirmPasswordError(error?.response?.data.error.errors?.confirmpassword?.message);
                    setRoleError(error?.response?.data.error.errors?.role?.message);
                    // }
                });
        }
    };
    const fetchRoleData = async () => {
        handleShow();
        return RoleGetApiDetails()
            .then((resp) => {
                setRoleData(resp.data.data.roles)
            })
    }
    return (
        <>
            <Button className="btn btn-success" onClick={fetchRoleData}><i className="fa fa-plus mt-1"></i> <span>Add
                New User</span>
            </Button>
            <ModalPopup title="Add Users" show={show} handleClose={() => { { setShow(false); setValidated(false); setFirstNameError(''); setLastNameError(''); setEmailError(''); setPasswordError(''); setConfirmPasswordError(''); setRoleError('') } }}>
                {loading ? <LoadingPage /> : null}
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row>
                        <Col className="col">
                            <Form.Group >
                                <Form.Label>First Name<span className="text-danger"> * </span></Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    name="first_name"
                                    value={AllData.first_name || ''}
                                    onChange={handleAllChange}
                                    placeholder="First Name"
                                />
                                <Form.Control.Feedback type="invalid">
                                    <label className="validation-invalid-label">
                                        Enter first name
                                    </label>
                                </Form.Control.Feedback>
                                <label className="error-msg">
                                    {FirstNameError}
                                </label>
                            </Form.Group>
                        </Col>
                        <Col className="col">
                            <Form.Group>
                                <Form.Label>Last Name<span className="text-danger"> * </span></Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    name="last_name"
                                    value={AllData.last_name || ''}
                                    onChange={handleAllChange}
                                    placeholder="Last Name"
                                />
                                <Form.Control.Feedback type="invalid">
                                    <label className="validation-invalid-label">
                                        Enter last name
                                    </label>
                                </Form.Control.Feedback>
                                <label className="error-msg">
                                    {LastNameError}
                                </label>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="rowcol">
                            <Form.Group>
                                <Form.Label>Email<span className="text-danger"> * </span></Form.Label>
                                <Form.Control
                                    required
                                    type="email"
                                    name="email"
                                    value={AllData.email || ''}
                                    onChange={handleAllChange}
                                    placeholder="Email"
                                />
                                <Form.Control.Feedback type="invalid">
                                    <label className="validation-invalid-label">
                                        Email is required
                                    </label>
                                </Form.Control.Feedback>
                                <label className="error-msg">
                                    {EmailError}
                                </label>
                            </Form.Group>
                        </Col>
                        <Col className="rowcol">
                            <Form.Group>
                                <Form.Label>Password<span className="text-danger"> * </span></Form.Label>
                                <Form.Control
                                    required
                                    type="password"
                                    name="password"
                                    value={AllData.password || ''}
                                    onChange={handleAllChange}
                                    placeholder="Password"
                                />
                                <Form.Control.Feedback type="invalid">
                                    <label className="validation-invalid-label">
                                        Password is required
                                    </label>
                                </Form.Control.Feedback>
                                <label className="error-msg">
                                    {PasswordError}
                                </label>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="rowcol">
                            <Form.Group>
                                <Form.Label>Confirm Password<span className="text-danger"> * </span></Form.Label>
                                <Form.Control
                                    required
                                    type="password"
                                    name="confirm_password"
                                    value={AllData.confirm_password || ''}
                                    onChange={handleAllChange}
                                    placeholder="Confirm Password"
                                />
                                <Form.Control.Feedback type="invalid">
                                    <label className="validation-invalid-label">
                                        Enter confirm password
                                    </label>
                                </Form.Control.Feedback>
                                <label className="error-msg">
                                    {ConfirmPasswordError}
                                </label>
                            </Form.Group>
                        </Col>
                        <Col className="rowcol">
                            <Form.Group md="4" className="InputField col-12 col-lg-12 my-2 mb-3">
                                <Form.Label>Role<span className="text-danger"> * </span></Form.Label>
                                <Form.Select aria-label="Default select example"
                                    as="select"
                                    name="roleselect"
                                    placeholder="Select Role"
                                    value={AllData.roleselect || ""}
                                    onChange={handleAllChange}>
                                    <option className="d-none" value="">
                                        Select Option
                                    </option>
                                    {
                                        roledata.map(item => {
                                            return (
                                                <option key={item.role} vlaue={item.role}  >{item.role}</option>
                                            )
                                        })
                                    }
                                </Form.Select>
                                {roleError ? <label className="error-msg">{roleError}</label> : null}
                            </Form.Group>
                        </Col>
                    </Row>
                    <ModalButton handleClose={() => { { setShow(false); setValidated(false); setFirstNameError(''); setLastNameError(''); setEmailError(''); setPasswordError(''); setConfirmPasswordError(''); setRoleError('') } }} />
                </Form>
            </ModalPopup>
        </>
    )
}

export default AddUser;
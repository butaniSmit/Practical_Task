import React, { useEffect, useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import AddUser from "./add";
import { Api, DeleteApiDetails, GetDetailsById, RoleGetApiDetails, UpdateApiDetails } from "@/pages/api/AxiosRequest";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { toast } from "react-toastify";
import { ModalButton, ModalPopup } from "../common/modal";
import DataTable from "../common/customDataTable";
import Cookies from 'js-cookie';
const UserList = () => {
    const [userData, setUserData] = useState([]);
    const [showw, setShoww] = useState(false);
    const handleClosee = () => setShoww(false);
    const [roledata, setRoleData] = useState([]); 
    const [FirstNameError, setFirstNameError] = useState('');
    const [LastNameError, setLastNameError] = useState('');
    const [EmailError, setEmailError] = useState('');
    const [PasswordError, setPasswordError] = useState('');
    const [ConfirmPasswordError, setConfirmPasswordError] = useState('');
    const [roleError, setRoleError] = useState('');
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [validated, setValidated] = useState(false);
    const [id, setId] = useState();
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalRecords, setTotalReacodes] = useState(0);
    const [recordsPerPage, setRecordsPerPage] = useState(5);
    const [datalenght, setDatalenght] = useState('0');
    const [filterinput,setFilterInput] = useState('');
    const [input, setInput] = useState({
        name: '', email: '', role: ''
    });
    const [sorting, setSorting] = useState({ column: "name", order: "asc" });
    const fieldName = [
        { value: "name", name: ["Name"], input: input.name },
        { value: "email", name: ["Email"], input: input.email },
        { value: "role", name: ["Role"], input: input.role },
    ];
    const [AllData, setAlldata] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirmpassword: '',
        role: '',
    });
    const handleAllChange = (event) => {
        setAlldata({ ...AllData, [event.target.name]: event.target.value });
    };
    const renderUsersData = ({ item, index }) => {
        return <tr role="row" className="odd" key={index}>
            {/* <td className="sorting_1">{index + 1}</td> */}
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>{item.role}</td>
            <td>
                <span className="fa fa-eye logoicon viewicon view" onClick={() => ViewItem(item._id)} />
                {item.email!=='smit@yopmail.com'?
                <span className="fa fas fa-edit logoicon editicon edit" onClick={() => handleShow(item)}></span>
                :null}
                {item._id !== Cookies.get("loginid") && item.email!=='smit@yopmail.com'? 
                <span className="fa fa-trash logoicon deleteicon delete" onClick={() => DeleteItem(item._id)} />
                :null}
            </td>
        </tr>
    };
    const onPageChanged = (page) => {
        setPage(page);
    }
    const onChangeRecordsPerPage = (event) => {
        setRecordsPerPage(parseInt(event.target.value));
        setPage(1);
    }
    const fetchData = async () => {
        setLoading(true);
        return Api("users", recordsPerPage, page,sorting.column,sorting.order,filterinput)
            .then((resp) => {
                setUserData(resp.data.data.users);
                setLoading(false);
                const totalPages = Math.ceil(resp.data.result / (recordsPerPage));
                setTotalPages(totalPages);
                setTotalReacodes(resp.data.result);
                setDatalenght(resp.data.datalength);
                if(resp.data.result===0){
                    setTotalPages(Math.ceil(resp.data.result / 0));
                }
            }).catch((error) => {
                setLoading(false);
            })
    }
    const fetchRoleData = async () => {
        return RoleGetApiDetails()
            .then((resp) => {
                setRoleData(resp.data.data.roles)
            })
    }
    const handleShow = (item) => {
        setShow(true);
        setId(item._id);
        setAlldata({first_name:item.first_name,last_name:item.last_name,email:item.email,role:item.role});
        fetchRoleData();
    }
    const ViewItem = (id) => {
        return GetDetailsById(id)
            .then((resp) => {
                setAlldata(resp.data.data.user);
                setShoww(true);
            })
    }
    const DeleteItem = async (id) => {
        if (window.confirm("Are you sure you want to delete?")) {
            const resp = await DeleteApiDetails(id);
            toast.success(resp.data.message);
            fetchData();
            setPage(1);
        }
    }
    let handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            first_name: AllData.first_name,
            last_name: AllData.last_name,
            confirmpassword: AllData.confirmpassword,
            email: AllData.email,
            role: AllData.role
        }
        if(AllData.password!==''){
            data.password=AllData.password
        }
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            setValidated(true);
        } else if (AllData.password !== AllData.confirmpassword && AllData.password !=='') {
            setConfirmPasswordError("The confirm password and new password must match.");
        }
        else {
            return UpdateApiDetails(data, id)
                .then((resp) => {
                    fetchData();
                    handleClose();
                    setValidated(false);
                    toast.success(resp.data.message);
                    setFirstNameError(''); setLastNameError(''); setEmailError(''); setPasswordError(''); setConfirmPasswordError(''); setRoleError('')
                })
                .catch(error => {
                    setFirstNameError(error?.response?.data.error.errors?.first_name?.message);
                    setLastNameError(error?.response?.data.error.errors?.last_name?.message);
                    setEmailError(error?.response?.data.error.errors?.email?.message);
                    setPasswordError(error?.response?.data.error.errors?.password?.message);
                    setConfirmPasswordError(error?.response?.data.error.errors?.confirmpassword?.message);
                    setRoleError(error?.response?.data.error.errors?.role?.message);
                });
        }
    };
    useEffect(() => {
        fetchData();
    }, [recordsPerPage, page,filterinput,sorting]);
    const reloadData = () => {
        fetchData();
    }
    return (
        <>
                <div className="table-responsive">
                    <div className="table-wrapper">
                        <div className="table-title">
                            <div className="row">
                                <div className="col-sm-6">
                                    <h2><b>Users</b></h2>
                                </div>
                                <div className="col-sm-6 ms-auto">
                                <AddUser reloadData={reloadData} />
                                </div>
                            </div>
                        </div>
                        <DataTable loading={loading} Users={userData} recordsPerPage={recordsPerPage} fieldName={fieldName} input={input} renderUsersData={renderUsersData} page={page} totalPages={totalPages} onPageChanged={onPageChanged} datalenght={datalenght} totalRecords={totalRecords} onChangeRecordsPerPage={onChangeRecordsPerPage} setSorting={setSorting} sorting={sorting} setFilterInput={setFilterInput} filterinput={filterinput} setPage={setPage}/>
                    </div>
                </div>
            <Modal show={showw} onHide={handleClosee} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>View Data</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <table className="table">
                        <tbody>
                            <tr>
                                <th scope="row">Name</th>
                                <td>{AllData ? AllData.name : null}</td>
                            </tr>
                            <tr>
                                <th scope="row">Email</th>
                                <td>{AllData ? AllData.email : null}</td>
                            </tr>
                            <tr>
                                <th scope="row">Role</th>
                                <td>{AllData ? AllData.role : null}</td>
                            </tr>
                        </tbody>
                    </table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClosee}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <ModalPopup title="Edit User" show={show} handleClose={() => { { setShow(false); setValidated(false); setFirstNameError(''); setLastNameError(''); setEmailError(''); setPasswordError(''); setConfirmPasswordError(''); setRoleError('') } }}>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row>
                        <Col className="rowcol">
                            <Form.Group>
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
                        <Col className="rowcol">
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
                                    type="password"
                                    name="confirmpassword"
                                    value={AllData.confirmpassword || ''}
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
                                    name="role"
                                    value={AllData.role || ""}
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
export default UserList;
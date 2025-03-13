import React, { useEffect, useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import Table from "react-bootstrap/Table";
import { DLT } from "@/redux/actions/action";
import { toast } from "react-toastify";
import { Badge, Menu } from "@mui/material";
import { useRouter } from "next/router";
import Cookies from 'js-cookie';

const NavBar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [price, setPrice] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const getdata = useSelector((state) => state.cartreducer.carts);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const dlt = (id) => {
    dispatch(DLT(id));
    toast.error("Item Removed From Cart", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const handleLogout = (e) => {
    Cookies.remove("nodejstoken");
    router.push("/login");
    toast.success("You have been successfully logged out");
  };
  // Calculate total price correctly
  useEffect(() => {
    let totalPrice = getdata.reduce(
      (acc, ele) => acc + ele.price * ele.qnty,
      0
    );
    setPrice(totalPrice);
  }, [getdata]); // Only depend on `getdata`

  return (
    <>
      <Navbar bg="dark" variant="dark" style={{ height: "60px" }}>
        <Container>
          <Link href="/" className="text-decoration-none text-light mx-3">
            Registration User
          </Link>
          <Nav className="me-auto">
            <Link href="/product" className="text-decoration-none text-light">
              Product
            </Link>
          </Nav>

          <Badge
            badgeContent={getdata.length}
            color="primary"
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <i
              className="fa-solid fa-cart-shopping text-light"
              style={{ fontSize: 25, cursor: "pointer" }}
            ></i>
          </Badge>
          <button
                className="btn btn-outline-primary me-2 mx-5"
                onClick={handleLogout}
              >
                Logout
              </button>
        </Container>

        {/* Dropdown Cart Menu */}
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{ "aria-labelledby": "basic-button" }}
        >
          {getdata.length ? (
            <div
              className="card_details"
              style={{ width: "24rem", padding: 10 }}
            >
              <Table>
                <thead>
                  <tr>
                    <th>Photo</th>
                    <th>Restaurant Name</th>
                  </tr>
                </thead>
                <tbody>
                  {getdata.map((e) => (
                    <tr key={e.id}>
                      <td>
                        <Link href={`/product/${e.id}`} onClick={handleClose}>
                          <img
                            src={e.imgdata}
                            style={{ width: "5rem", height: "5rem" }}
                            alt=""
                          />
                        </Link>
                      </td>
                      <td>
                        <p>{e.rname}</p>
                        <p>Price : ₹{e.price}</p>
                        <p>Quantity : {e.qnty}</p>
                        <p
                          style={{
                            color: "red",
                            fontSize: 20,
                            cursor: "pointer",
                          }}
                          onClick={() => dlt(e.id)}
                        >
                          <i className="fas fa-trash smalltrash"></i>
                        </p>
                      </td>
                      <td
                        className="mt-5"
                        style={{
                          color: "red",
                          fontSize: 20,
                          cursor: "pointer",
                        }}
                        onClick={() => dlt(e.id)}
                      >
                        <i className="fas fa-trash largetrash"></i>
                      </td>
                    </tr>
                  ))}
                  <p className="text-center">Total: ₹{price}</p>
                </tbody>
              </Table>
            </div>
          ) : (
            <>
              <div
                className="card_details d-flex justify-content-center align-items-center"
                style={{ width: "24rem", padding: 10, position: "relative" }}
              >
                <i
                  className="fas fa-close smallclose"
                  onClick={handleClose}
                  style={{
                    position: "absolute",
                    top: 2,
                    right: 20,
                    fontSize: 23,
                    cursor: "pointer",
                  }}
                ></i>
                <p style={{ fontSize: 22 }}>Your cart is empty</p>
                <img
                  src="/cart.gif"
                  alt="empty cart"
                  className="emptycart_img"
                  style={{ width: "5rem", padding: 10 }}
                />
              </div>
            </>
          )}
        </Menu>
      </Navbar>
    </>
  );
};

export default NavBar;

import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Cardsdata from "@/data/CardsData";
import { ADD } from "@/redux/actions/action";
import Layout from "@/components/common/layout/user";
import Form from "react-bootstrap/Form";

const Product = () => {
  const [data] = useState(Cardsdata);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const send = (e) => {
    dispatch(ADD(e));
    toast.success("Item Added To Your Cart", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const filteredData = data.filter((element) =>
    element.rname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="container mt-3">
        {/* Title and Search Input */}
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="text-center">Product</h2>
          <Form.Control
            type="text"
            placeholder="Search Product..."
            className="w-25"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Products List */}
        <div className="row d-flex justify-content-center align-items-center">
          {filteredData.length > 0 ? (
            filteredData.map((element, id) => {
              return (
                <Card
                  style={{ width: "22rem", border: "none" }}
                  className="mx-2 mt-4 card_style"
                  key={id}
                >
                    <Card.Img
                      variant="top"
                      src={element.imgdata}
                      style={{ height: "16rem" }}
                      className="mt-3"
                    />
                  <Card.Body>
                    <Card.Title>{element.rname}</Card.Title>
                    <Card.Text>Price : ₹ {element.price}</Card.Text>
                    <div className="button_div d-flex justify-content-center">
                      <Button
                        variant="primary"
                        onClick={() => send(element)}
                        className="col-lg-12"
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              );
            })
          ) : (
            <h4 className="text-center mt-3">No Products Found</h4>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Product;

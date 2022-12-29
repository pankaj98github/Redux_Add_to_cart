import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { useDispatch} from "react-redux";
import add from "../Redux/action/action";
import Spinner from "./Spinner";
import "../index.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = "https://fakestoreapi.com/products";

const Product = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async (url) => {
    try {
      const res = await fetch(url);
      const items = await res.json();
      if(items){
        setLoading(false);
        setData(items);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData(API_URL);
  }, []);

  const sendProduct = (product) => {
    dispatch(add(product));
    toast.success("Product added successfully",{position:"bottom-right"});
  }

  return (
    <>
      <div className="row d-flex gap-5 m-4 justify-content-center">
        {loading ? <Spinner/> :
          data.map((product) => {
            const {image, title, category, price} = product;
            return(
            <Card className="card" style={{ width: "16rem" }} key={product.id}>
              <Card.Img
                variant="top"
                style={{ width: "10rem", height: "12rem", margin: "8px" }}
                src={image}
                alt={title}
              />
              <ListGroup
                variant="flush"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ListGroup.Item>{title.substring(0, 20)}..</ListGroup.Item>
                <ListGroup.Item>{category}</ListGroup.Item>
                <ListGroup.Item>Price : ${price}</ListGroup.Item>
                <ListGroup.Item>
                  Rating : {product.rating.rate}⭐
                </ListGroup.Item>
                <Button style={{margin:"2rem 0"}} onClick={() => sendProduct(product) }>Add to Cart</Button>
              </ListGroup>
            </Card>)
})
      }
      </div>
      <ToastContainer/>
    </>
  );
};

export default Product;

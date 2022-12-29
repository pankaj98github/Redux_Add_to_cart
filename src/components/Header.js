import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { NavLink } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useEffect, useState } from "react";
import Badge from "@mui/material/Badge";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "react-bootstrap";
import DeleteIcon from "@mui/icons-material/Delete";
import add, { remove, setDecrease } from "../Redux/action/action";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

function Header() {
  const { cart } = useSelector((state) => state.updateCart);
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const getTotal = () => {
    let price = 0;
    cart.map(
      (product) => (price = product.price * product.rating.count + price)
    );
    setTotal(price);
  };

  useEffect(() => {
    getTotal();
  });

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
        <Container className="text-white">
          <Navbar.Brand href="#home" className="mx-4">
            Add To Cart Project
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink to="/" className="text-decoration-none text-white">
                Products
              </NavLink>
              <NavLink to="#" className="text-decoration-none text-white">
                <Badge badgeContent={cart.length} color="primary">
                  <ShoppingCartIcon
                    style={{ marginLeft: "60rem" }}
                    onClick={handleClick}
                  />
                </Badge>
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem>
          {cart.length === 0 ? (
            <div>Your cart is empty 😧</div>
          ) : (
            <div style={{ width: "35rem" }}>
              <Table>
                <thead>
                  <tr>
                    <td>
                      <b>Photo</b>
                    </td>
                    <td>
                      <b>Details</b>
                    </td>
                  </tr>
                </thead>
                {cart.map((product) => {
                  const { image, title, price} = product;
                  return (
                    <tbody key={product.id}>
                      <tr>
                        <td>
                          <img
                            src={image}
                            alt={title}
                            style={{ height: "7rem", width: "6rem" }}
                          />
                        </td>
                        <td>
                          <p>Name : {title.substring(0, 20)}..</p>
                          <p>Price : ${price}</p>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <p>Quantity : </p>
                            <h4
                              onClick={
                                product.rating.count === 1
                                  ? () => dispatch(remove(product))
                                  : () => dispatch(setDecrease(product))
                              }
                            >
                              <RemoveCircleIcon style={{ color: "blue" }} />
                            </h4>
                            <h5>{product.rating.count}</h5>
                            <h4 onClick={() => dispatch(add(product))}>
                              <AddCircleIcon style={{ color: "blue" }} />
                            </h4>
                          </div>
                        </td>
                        <td>
                          <DeleteIcon
                            onClick={() => dispatch(remove(product))}
                            style={{ color: "red" }}
                          />
                        </td>
                      </tr>
                    </tbody>
                  );
                })}
                <tfoot>
                  <tr>
                    <td>
                      <h5>
                        <b>Total Amount : ${total.toFixed(2)}</b>
                      </h5>
                    </td>
                  </tr>
                </tfoot>
              </Table>
            </div>
          )}
        </MenuItem>
      </Menu>
    </>
  );
}

export default Header;

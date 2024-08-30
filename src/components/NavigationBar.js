import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, Button, Modal } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import logo from "../logo.svg"; // Update with the correct path to your logo

function NavigationBar() {
  const [show, setShow] = useState(false);
  const [dateTime, setDateTime] = useState(new Date());
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClear = () => {
    localStorage.removeItem("metalEntries");
    setShow(false);
    navigate("/show-price");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#">
            <img
              src={logo}
              alt="Metal Price Manager Logo"
              style={{ width: "30px", height: "30px", marginRight: "10px" }}
            />
            Metal Price Manager
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <LinkContainer to="/set-price">
                <Nav.Link>Set Price</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/show-price">
                <Nav.Link>Show Prices</Nav.Link>
              </LinkContainer>
            </Nav>
            <Navbar.Text className="me-3 text-white">
              {dateTime.toLocaleDateString()} {dateTime.toLocaleTimeString()}
            </Navbar.Text>
            <Button variant="outline-danger" onClick={handleShow}>
              Clear Table
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Clear</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to clear all entries from the table?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleClear}>
            Clear Table
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default NavigationBar;

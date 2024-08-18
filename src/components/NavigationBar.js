import React from "react";
import { Navbar, Nav, Container, Button, Modal } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";

function NavigationBar() {
  const [show, setShow] = React.useState(false);
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClear = () => {
    // Clear localStorage and close modal
    localStorage.removeItem("metalEntries");
    setShow(false);
    // Navigate to the ShowPrice page to reflect the cleared data
    navigate("/show-price");
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#">Metal Price Manager</Navbar.Brand>
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

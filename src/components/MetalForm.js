import React, { useState } from "react";
import {
  Form,
  Button,
  Spinner,
  Container,
  Row,
  Col,
  Card,
} from "react-bootstrap";

const wrapperStyle = {
  backgroundColor: "#e0e2e5", // Light grey background for the page
  minHeight: "100vh", // Full viewport height
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

function MetalForm() {
  const [formData, setFormData] = useState({
    metal: "",
    tenGrams: "",
    oneTola: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate a form submission
    setTimeout(() => {
      console.log("Form Submitted:", formData);
      setLoading(false);
    }, 2000);
  };

  const handleClear = () => {
    setFormData({
      metal: "",
      tenGrams: "",
      oneTola: "",
    });
  };

  return (
    <div style={wrapperStyle}>
      <Container>
        <Row className="justify-content-center w-100">
          <Col md={6} lg={4}>
            <Card className="shadow-lg bg-white">
              <Card.Body>
                <Card.Title className="text-center mb-4">
                  Set Metal Prices
                </Card.Title>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formMetal" className="mb-3">
                    <Form.Label>Metal</Form.Label>
                    <Form.Control
                      type="text"
                      name="metal"
                      value={formData.metal}
                      onChange={handleChange}
                      placeholder="Enter metal name"
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="formTenGrams" className="mb-3">
                    <Form.Label>10 Grams</Form.Label>
                    <Form.Control
                      type="number"
                      step="0.01"
                      name="tenGrams"
                      value={formData.tenGrams}
                      onChange={handleChange}
                      placeholder="Enter value for 10 grams"
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="formOneTola" className="mb-3">
                    <Form.Label>1 Tola</Form.Label>
                    <Form.Control
                      type="number"
                      step="0.01"
                      name="oneTola"
                      value={formData.oneTola}
                      onChange={handleChange}
                      placeholder="Enter value for 1 tola"
                      required
                    />
                  </Form.Group>

                  <div className="d-flex justify-content-between">
                    <Button variant="secondary" onClick={handleClear}>
                      Clear
                    </Button>
                    <Button variant="primary" type="submit" disabled={loading}>
                      {loading ? (
                        <Spinner animation="border" size="sm" />
                      ) : (
                        "Submit"
                      )}
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default MetalForm;

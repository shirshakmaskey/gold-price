import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Spinner,
  Container,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const wrapperStyle = {
  backgroundColor: "#f0f2f5",
  minHeight: "100vh",
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
  const navigate = useNavigate();

  // Load existing entries from localStorage
  useEffect(() => {
    const savedEntries = JSON.parse(localStorage.getItem("metalEntries")) || [];
    setEntries(savedEntries);
  }, []);

  const [entries, setEntries] = useState([]);

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

    const newEntry = { ...formData };
    const existingEntries =
      JSON.parse(localStorage.getItem("metalEntries")) || [];

    // Check if the metal already exists
    const existingIndex = existingEntries.findIndex(
      (entry) => entry.metal.toLowerCase() === newEntry.metal.toLowerCase()
    );

    if (existingIndex !== -1) {
      // Update the existing entry's prices
      existingEntries[existingIndex].tenGrams = newEntry.tenGrams;
      existingEntries[existingIndex].oneTola = newEntry.oneTola;
    } else {
      // Add the new entry to the array
      existingEntries.push(newEntry);
    }

    // Save updated entries to localStorage
    localStorage.setItem("metalEntries", JSON.stringify(existingEntries));
    setEntries(existingEntries);

    setTimeout(() => {
      setLoading(false);
      navigate("/show-price", { state: existingEntries });
    }, 1000);
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

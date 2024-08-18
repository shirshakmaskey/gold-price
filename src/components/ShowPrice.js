import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Container, Card, Row, Col, Table } from "react-bootstrap";

const wrapperStyle = {
  backgroundColor: "#e9ecef",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const cardStyle = {
  borderRadius: "10px",
};

const tableStyle = {
  marginTop: "20px",
};

function ShowPrice() {
  const location = useLocation();
  const [entries, setEntries] = useState([]);

  // Load entries from localStorage on component mount
  useEffect(() => {
    const savedEntries = JSON.parse(localStorage.getItem("metalEntries")) || [];
    setEntries(savedEntries);
  }, [location]);

  return (
    <div style={wrapperStyle}>
      <Container>
        <Row className="justify-content-center w-100">
          <Col md={8} lg={6}>
            <Card className="shadow-lg bg-white" style={cardStyle}>
              <Card.Body>
                <Card.Title
                  className="text-center mb-4"
                  style={{ color: "#343a40", fontWeight: "bold" }}
                >
                  Kathmandu Gold and Silver Dealers' Association
                </Card.Title>
                <Table
                  bordered
                  hover
                  responsive
                  style={tableStyle}
                  className="text-center"
                >
                  <thead className="table-dark">
                    <tr>
                      <th>Metal</th>
                      <th>10 Grams</th>
                      <th>1 Tola</th>
                    </tr>
                  </thead>
                  <tbody>
                    {entries.map((entry, index) => (
                      <tr key={index}>
                        <td>{entry.metal}</td>
                        <td>{entry.tenGrams}</td>
                        <td>{entry.oneTola}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ShowPrice;

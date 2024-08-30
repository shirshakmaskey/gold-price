import React, { useState, useEffect } from "react";
import { Form, Card, Container, Table, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Creatable, { useCreatable } from "react-select/creatable";
import "../css/MetalForm.css";

const initialMetalOptions = [
  { value: "Gold 24K", label: "Gold 24K" },
  { value: "Gold 22K", label: "Gold 22K" },
  { value: "Silver 24K", label: "Silver 24K" },
  { value: "Gold Selling Rate", label: "Gold Selling Rate" },
  { value: "Silver Selling Rate", label: "Silver Selling Rate" },
];

function MetalForm() {
  const [entries, setEntries] = useState(() => {
    const savedEntries = localStorage.getItem("metalEntries");
    return savedEntries ? JSON.parse(savedEntries) : [];
  });
  const [metalOptions, setMetalOptions] = useState(initialMetalOptions);
  const [duplicateMetals, setDuplicateMetals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const duplicates = entries
      .map((entry, index) => ({ ...entry, index }))
      .filter(
        (entry, index, self) =>
          self.findIndex(
            (e) => e.metal === entry.metal && e.index !== entry.index
          ) !== -1
      )
      .map((entry) => entry.metal);

    setDuplicateMetals([...new Set(duplicates)]);

    if (
      entries.length === 0 ||
      (entries[entries.length - 1].metal &&
        entries[entries.length - 1].tenGrams !== "" &&
        entries[entries.length - 1].oneTola !== "")
    ) {
      setEntries([...entries, { metal: "", tenGrams: "", oneTola: "" }]);
    }
  }, [entries]);

  const handleInputChange = (index, field, value) => {
    let updatedEntries = entries.map((entry, i) =>
      i === index ? { ...entry, [field]: value } : entry
    );

    if (field === "metal" && !value) {
      updatedEntries = updatedEntries.slice(0, index).concat(
        updatedEntries.slice(index + 1).map((entry, i) => ({
          ...entry,
          tenGrams: i >= index ? "" : entry.tenGrams,
          oneTola: i >= index ? "" : entry.oneTola,
        }))
      );
    }

    if (
      updatedEntries.length > 0 &&
      !updatedEntries[updatedEntries.length - 1].metal
    ) {
      updatedEntries.pop();
    }

    if (
      updatedEntries.length === 0 ||
      (updatedEntries[updatedEntries.length - 1].metal &&
        updatedEntries[updatedEntries.length - 1].tenGrams !== "" &&
        updatedEntries[updatedEntries.length - 1].oneTola !== "")
    ) {
      updatedEntries.push({ metal: "", tenGrams: "", oneTola: "" });
    }

    setEntries(updatedEntries);
    localStorage.setItem("metalEntries", JSON.stringify(updatedEntries));
  };

  const handleMetalChange = (index, selectedOption) => {
    const value = selectedOption ? selectedOption.value : "";
    handleInputChange(index, "metal", value);
  };

  const handleSaveAndView = () => {
    const validEntries = entries.filter((entry) => entry.metal);
    navigate("/show-price", { state: validEntries });
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center min-vh-100"
      style={{ backgroundColor: "#f7f7f7" }}
    >
      <Card
        style={{
          width: "100%",
          maxWidth: "900px",
          padding: "20px",
          boxShadow: "0px 0px 15px rgba(0,0,0,0.2)",
        }}
      >
        <Card.Body>
          <Card.Title>Set Metal Prices</Card.Title>

          {/* Display Helper Text for Duplicate Metal */}
          {duplicateMetals.length > 0 && (
            <Alert variant="warning">
              {`The metal(s) ${duplicateMetals.join(
                ", "
              )} are already entered in other rows.`}
            </Alert>
          )}

          {/* Editable Table */}
          <div
            style={{
              maxHeight: entries.length > 4 ? "200px" : "none",
              overflowY: entries.length > 4 ? "auto" : "visible",
            }}
          >
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Metal</th>
                  <th>Price per 10 Grams</th>
                  <th>Price per 1 Tola</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry, index) => {
                  const isDuplicate =
                    entry.metal && duplicateMetals.includes(entry.metal);

                  return (
                    <tr
                      key={index}
                      className={isDuplicate ? "duplicate-row" : ""}
                    >
                      <td>
                        <Creatable
                          value={
                            entry.metal
                              ? { value: entry.metal, label: entry.metal }
                              : null
                          }
                          onChange={(selectedOption) =>
                            handleMetalChange(index, selectedOption)
                          }
                          options={metalOptions}
                          isClearable
                          isSearchable
                          placeholder="Select or type a metal..."
                        />
                      </td>
                      <td>
                        <Form.Control
                          type="number"
                          step="0.01"
                          value={entry.tenGrams}
                          onChange={(e) =>
                            handleInputChange(index, "tenGrams", e.target.value)
                          }
                          disabled={!entry.metal}
                        />
                      </td>
                      <td>
                        <Form.Control
                          type="number"
                          step="0.01"
                          value={entry.oneTola}
                          onChange={(e) =>
                            handleInputChange(index, "oneTola", e.target.value)
                          }
                          disabled={!entry.metal}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>

          <Form>
            <Form.Group>
              <Form.Control
                as="button"
                onClick={handleSaveAndView}
                className="btn btn-secondary mt-4"
              >
                Save & View Prices
              </Form.Control>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default MetalForm;

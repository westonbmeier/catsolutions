import React, { useEffect, useState } from "react";
import API from "../utils/API";
import { Input, FormBtn, TextArea, SelectEmployee } from "../components/Form";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Loader from "../components/Loader/Loader";
import PickDate from "../components/DatePicker/DatePicker";

export default function Equipment() {
  const [equipment, setEquipment] = useState([]);
  const [formObject, setFormObject] = useState({});
  const [updatedEquipmentObject, setUpdateEquipmentObject] = useState({});
  const [employeeNameList, setEmployeeeNameList] = useState([]);

  const [editState, setEditState] = useState({
    locked: true,
    _id: "",
  });
  useEffect(() => {
    loadEquipment();
    loadEmployeeNames();
  }, []);

  // function setPurchaseDate() {}

  // function setIssuedDate() {}
  //Get employee
  function loadEmployeeNames() {
    API.getEmployees()
      .then((res) => setEmployeeeNameList(res.data))
      .catch((err) => console.log(err));
  }

  //Get equipment
  function loadEquipment() {
    API.getEquipment()
      .then((res) => setEquipment(res.data))
      .catch((err) => console.log(err));
  }

  //update equipment
  const updateEquipment = (id, equipmentData) => {
    API.updateEquipment(id, equipmentData)
      .then(loadEquipment)
      .then(switchEditState)
      .catch((err) => console.log(err));
  };

  //delete equipment
  function deleteEquipment(id) {
    API.deleteEquipment(id)
      .then((res) => loadEquipment())
      .catch((err) => console.log(err));
  }

  //sets state for form object for its contents
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
  }

  function handleDateChange(date, name) {
    setFormObject({ ...formObject, [name]: date });
  }

  function handleInputChangeUpdateEquipment(event) {
    const { name, value } = event.target;
    setUpdateEquipmentObject({ ...updatedEquipmentObject, [name]: value });
  }
  function handleInputChangeUpdateDatesEquipment(date, name) {
    setUpdateEquipmentObject({ ...updatedEquipmentObject, [name]: date });
  }

  const handleSelectEmployeeChange = (event, eq) => {
    const employee = { _id: event.target.value };
    setFormObject({ ...formObject, employee_id: employee });
    setUpdateEquipmentObject({
      ...updatedEquipmentObject,
      employee_id: employee,
    });
    if (eq) {
      setEquipment(
        equipment.map((item) => {
          if (item._id === eq._id) {
            return { ...item, employee_id: equipment._id };
          }
          return item;
        })
      );
    }
  };

  function clearForm() {
    document.getElementById("create-course-form").reset();
  }

  function switchEditState(id) {
    if (editState._id === id) {
      setEditState({
        _id: "",
      });
    } else {
      setEditState({
        _id: id,
      });
    }
  }

  //Add equipment when button click
  function handleFormSubmit(event) {
    event.preventDefault();
    if (
      formObject.type &&
      formObject.model &&
      formObject.serialNum &&
      formObject.condition &&
      formObject.purchaseDate &&
      formObject.dateIssued &&
      formObject.initialCost
    ) {
      API.insertEquipment({
        // equipment DATA HERE
        type: formObject.type,
        model: formObject.model,
        serialNum: formObject.serialNum,
        condition: formObject.condition,
        purchaseDate: formObject.purchaseDate,
        dateIssued: formObject.dateIssued,
        employee_id: formObject.employee_id,

        initialCost: formObject.initialCost,
      })
        .then((res) => loadEquipment())
        .then(clearForm())
        .catch((err) => console.log(err));
    }
  }

  return (
    <div className="container">
      <h1>Equipment</h1>
      {equipment.length ? (
        equipment.map((equipment) => (
          <Accordion key={equipment._id}>
            <Card style={{ marginBottom: "10px", borderRadius: "5px" }}>
              <Accordion.Toggle
                as={Card.Header}
                eventKey="0"
                style={{ background: "light-grey" }}
              >
                {equipment.type + " " + equipment.model}
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <form>
                    <Row>
                      <SelectEmployee
                        label="Assigned Employee"
                        onChange={(e) =>
                          handleSelectEmployeeChange(e, equipment)
                        }
                        options={employeeNameList}
                        value={equipment.employee_id}
                        width={12}
                        disabled={
                          equipment._id === editState._id ? false : true
                        }
                      />
                      <Input
                        data-value={equipment._id}
                        label="Equipment Type"
                        onChange={handleInputChangeUpdateEquipment}
                        name="type"
                        placeholder={equipment.type}
                        width={12}
                        disabled={
                          equipment._id === editState._id ? false : true
                        }
                      />
                    </Row>
                    <Row>
                      <Input
                        data-value={equipment._id}
                        label="Model"
                        onChange={handleInputChangeUpdateEquipment}
                        name="model"
                        placeholder={equipment.model}
                        width={5}
                        disabled={
                          equipment._id === editState._id ? false : true
                        }
                      />
                      <Input
                        data-value={equipment._id}
                        label="Serial #"
                        onChange={handleInputChangeUpdateEquipment}
                        name="serialNum"
                        placeholder={equipment.serialNum}
                        width={3}
                        disabled={
                          equipment._id === editState._id ? false : true
                        }
                      />
                      <TextArea
                        data-value={equipment._id}
                        label="Condition"
                        onChange={handleInputChangeUpdateEquipment}
                        name="condition"
                        placeholder={equipment.condition}
                        width={12}
                        disabled={
                          equipment._id === editState._id ? false : true
                        }
                      />

                      <PickDate
                        data-value={equipment._id}
                        label="Purchase Date"
                        onChange={(date) =>
                          handleInputChangeUpdateDatesEquipment(
                            date,
                            "purchaseDate"
                          )
                        }
                        name="purchaseDate"
                        width={2}
                        value={!updatedEquipmentObject.purchaseDate ? new Date(equipment.purchaseDate) : updatedEquipmentObject.purchaseDate}
                        disabled={
                          equipment._id === editState._id ? false : true
                        }
                      />

                      <PickDate
                        data-value={equipment._id}
                        label="Date Issued"
                        onChange={handleInputChangeUpdateEquipment}
                        name="dateIssued"
                        width={2}
                        onChange={(date) =>
                          handleInputChangeUpdateDatesEquipment(
                            date,
                            "dateIssued"
                          )
                        }
                        value={!updatedEquipmentObject.dateIssued ? new Date(equipment.dateIssued) : updatedEquipmentObject.purchaseDate}
                        disabled={
                          equipment._id === editState._id ? false : true
                        }
                      />

                      {/* <Input
                        data-value={equipment._id}
                        label="Purchase Date"
                        onChange={handleInputChangeUpdateEquipment}
                        name="purchaseDate"
                        placeholder={new Date(equipment.purchaseDate)}
                        width={2}
                        disabled={
                          equipment._id === editState._id ? false : true
                        }
                      />
                      <Input
                        data-value={equipment._id}
                        label="Date Issued"
                        onChange={handleInputChangeUpdateEquipment}
                        name="dateIssued"
                        placeholder={equipment.dateIssued}
                        width={2}
                        disabled={
                          equipment._id === editState._id ? false : true
                        }
                      /> */}
                      <Input
                        data-value={equipment._id}
                        label="Initial Cost"
                        onChange={handleInputChangeUpdateEquipment}
                        name="initialCost"
                        placeholder={equipment.initialCost}
                        width={2}
                        disabled={
                          equipment._id === editState._id ? false : true
                        }
                      />
                    </Row>
                    <Row>
                      <div className="col">
                        <Button onClick={() => switchEditState(equipment._id)}>
                          {equipment._id === editState._id
                            ? "Cancel Update"
                            : "Update This Equipment"}
                        </Button>
                        {equipment._id === editState._id ? (
                          <Button
                            variant={"success"}
                            onClick={() =>
                              updateEquipment(
                                equipment._id,
                                updatedEquipmentObject
                              )
                            }
                          >
                            Save and Update
                          </Button>
                        ) : (
                          ""
                        )}
                        {equipment._id === editState._id ? (
                          ""
                        ) : (
                          <Button
                            variant={"danger"}
                            className={"float-right"}
                            onClick={() => deleteEquipment(equipment._id)}
                          >
                            Delete
                          </Button>
                        )}
                      </div>
                    </Row>
                  </form>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        ))
      ) : (
        <div>
          <Loader />
        </div>
      )}
      <Accordion>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="0">
            Add Equipment
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <form id="create-course-form">
                <SelectEmployee
                  label="Select Employee"
                  name="employee_id"
                  onChange={handleSelectEmployeeChange}
                  options={employeeNameList}
                  width={12}
                />

                <Input
                  onChange={handleInputChange}
                  name="type"
                  placeholder="Type (required)"
                />
                <Input
                  onChange={handleInputChange}
                  name="model"
                  placeholder="Model (required)"
                />
                <Input
                  onChange={handleInputChange}
                  name="serialNum"
                  placeholder="Serial # (required)"
                />
                {/*NEEDS TO BE A DROPDOWN. WILL DO LATER*/}
                <TextArea
                  onChange={handleInputChange}
                  name="condition"
                  placeholder="Condition (required)"
                />
                <PickDate
                  label="Purchase Date"
                  onChange={(date) => handleDateChange(date, "purchaseDate")}
                  name="purchaseDate"
                  value={formObject.purchaseDate}
                />

                <PickDate
                  label="Date Issued"
                  onChange={(date) => handleDateChange(date, "dateIssued")}
                  name="dateIssued"
                  value={formObject.dateIssued}
                />
                {/* <Input
                  onChange={handleInputChange}
                  name="purchaseDate"
                  placeholder="Purchase Date (required)"
                /> */}
                {/* <Input
                  onChange={handleInputChange}
                  name="dateIssued"
                  placeholder="Date Issued (required)"
                /> */}
                <Input
                  onChange={handleInputChange}
                  name="initialCost"
                  placeholder="Initial Cost (required)"
                />
                {/*NEEDS TO ADD THE Equipment FIELD*/}
                <FormBtn
                  disabled={
                    !(
                      formObject.type &&
                      formObject.model &&
                      formObject.serialNum &&
                      formObject.condition &&
                      formObject.purchaseDate &&
                      formObject.dateIssued &&
                      formObject.initialCost
                    )
                  }
                  onClick={handleFormSubmit}
                >
                  Add New Equipment
                </FormBtn>
              </form>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </div>
  );
}

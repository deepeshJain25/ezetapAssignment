import React, { useRef, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";

const TheatreForm = (props) => {
  const [theatreData, setTheatreData] = useState({});

  return (
    <div>
      <Modal
        size="lg"
        show={props.showTheatreModal}
        onHide={props.handleClose}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Theatre Details for {props.location} <br />
            (Add Theatre details and save changes to add more Theatres)
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Theatre Name</Form.Label>
            <Form.Control
              onChange={(e) => {
                setTheatreData((prev) => {
                  prev.theatre = e.target.value;
                  return prev;
                });
              }}
              value={theatreData.theatre}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Location of Theatre</Form.Label>
            <Form.Control
              onChange={(e) => {
                setTheatreData((prev) => {
                  prev.location = e.target.value;
                  return prev;
                });
              }}
              value={theatreData.location}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Price of Ticket</Form.Label>
            <Form.Control
              onChange={(e) => {
                setTheatreData((prev) => {
                  prev.price = e.target.value;
                  return prev;
                });
              }}
              value={theatreData.price}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Timings (Add times separated by Commas)</Form.Label>
            <Form.Control
              onChange={(e) => {
                setTheatreData((prev) => {
                  prev.timings = e.target.value;
                  return prev;
                });
              }}
              value={theatreData.timings}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              console.log(theatreData);
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TheatreForm;

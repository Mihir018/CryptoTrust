import React from "react";
import { Form, Button ,Container } from "react-bootstrap";

const home = () => {
  return (
    <div>
      <br></br>
      <h2
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        Please Fill the form given below
      </h2>
      <br></br>
      <Container
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Reason</Form.Label>
            <Form.Control type="email" placeholder="Reason" />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Amount</Form.Label>
            <Form.Control type="email" placeholder="Amount" />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Sender Address</Form.Label>
            <Form.Control type="password" placeholder="Sender Address" />
          </Form.Group>
          <button type="button" class="btn btn-success">
            Success
          </button>
        </Form>
      </Container>
    </div>
  );
};

export default home;

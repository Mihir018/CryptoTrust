import React from "react";
import { Card ,Button } from 'react-bootstrap';
const home = () => {
  return (
    <div>
      <h1>Total token supplied</h1>
      <br></br>
      <Card style={{ marginleft: "5rem", width: "18rem" }}>
        <Card.Img variant="top" src="" />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
          </Card.Text>
          <Button variant="primary">KYC Verified</Button>
        </Card.Body>
      </Card>
      <Card style={{ marginleft: "5rem", width: "18rem" }}>
        <Card.Img variant="top" src="" />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
          </Card.Text>
          <Button variant="primary">Bronze</Button>
        </Card.Body>
      </Card>
      <Card style={{ marginleft: "5rem", width: "18rem" }}>
        <Card.Img variant="top" src="" />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
          </Card.Text>
          <Button variant="primary">Silver</Button>
        </Card.Body>
      </Card>
      <Card style={{ marginleft: "5rem", width: "18rem" }}>
        <Card.Img variant="top" src="" />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
          </Card.Text>
          <Button variant="primary">Gold</Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default home;

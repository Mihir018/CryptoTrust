import React from "react";
import { Form,Button } from "react-bootstrap";
const kycApproved = () => {
  return (
    <div>
      <Form>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Sender Address</Form.Label>
          <Form.Control type="password" placeholder="Sender Address" />
        </Form.Group>
        <button type="button" class="btn btn-success">
          Success
        </button>
      </Form>
    </div>
  );


};

const kycNotApproved = () => {
  return (
    <div>
      <h1> You need to be KYC verified to invest</h1>
      <br></br>
      <Button>Make Request for Kyc's</Button>
    </div>
  );
};

// export default kycNotApproved;
export default kycApproved;
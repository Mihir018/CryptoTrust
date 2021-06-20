import React from "react";
import { Form, Button } from "react-bootstrap";

const kycApproved = () => {
  return (
    <div >
      <h1>
        <h1> Request for money wihthdrawl from the company</h1>
        <h3> Reason here</h3>
        <h3>0.02 crpyt</h3>
        <h3>0x54677d1A22221c77Db83E590DC71b8b39A5571ab</h3>
      </h1>
      <button style={{marginLeft:'2rem'}} type="button" class="btn btn-primary">
        Approve
      </button>
      <button style={{marginLeft:'2rem'}} type="button" class="btn btn-danger">
        Decline
      </button>
    </div>
  );
};

const kycNotApproved = () => {
  return (
    <div>
      <h1> You needed to be KYC approved to participate in a Voting poll</h1>
      <br></br>
      <Button>Make Request for Kyc's</Button>
    </div>
  );
};

// export default kycNotApproved;
export default kycApproved;

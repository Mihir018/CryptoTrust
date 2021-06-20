import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav } from "react-bootstrap";


const Navigation = () => {
  return (
    <div>
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand
          class="text-dark"
          class="p-3 mb-2 bg-success text-white"
          class="font-weight-bold"
          href="#home"
        >
          CryptoTrust
        </Navbar.Brand>

        <Nav className="ml-auto">
          <LinkContainer to="/">
            <Nav.Link href="#Stats">Stats</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/Withdraw">
            <Nav.Link href="#Withdraw Money">Withdraw Money</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/KYC">
            <Nav.Link href="#KYC">KYC Requests</Nav.Link>
          </LinkContainer>

          <LinkContainer to="/YourNFTS">
            <Nav.Link href="#YourNFS">Your NFTS</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/Invest">
            <Nav.Link href="Invest">Invest</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/Voting">
            <Nav.Link href="#Voting">Voting</Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar>
    </div>
  );
};

export default Navigation;

import { Button, Container, Form, Nav, Navbar } from "react-bootstrap";
import { useRouter } from "next/router";
import { useState } from "react";

export default function MainNav() {
  const router = useRouter();
  const [searchField, setSearchField] = useState("");

  function submitForm(e) {
    e.preventDefault(); // prevent the browser from automatically submitting the form
    router.push(`/artwork?title=true&q=${searchField}`);
    setSearchField(""); // reset searchField
  }

  return (
    <>
      <Navbar expand="lg" className="fixed-top navbar-dark bg-primary">
        <Container>
          <Navbar.Brand>Wing Ho Cheung</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/search">Advanced Search</Nav.Link>
            </Nav>

            <Form className="d-flex" onSubmit={submitForm}>
              <Form.Control
                value={searchField}
                onChange={(e) => setSearchField(e.target.value)}
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button type="submit" variant="success">
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
    </>
  );
}

import {
  Button,
  Container,
  Form,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";
import { useAtom } from "jotai";
import { searchHistoryAtom } from "../store";
import { addToHistory } from "../lib/userData";
import { readToken, removeToken } from "../lib/authenticate";

export default function MainNav() {
  const router = useRouter();
  let token = readToken();
  const [searchField, setSearchField] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  async function submitForm(e) {
    e.preventDefault(); // prevent the browser from automatically submitting the form
    let queryString = `title=true&q=${searchField}`;
    router.push(`/artwork?${queryString}`);
    setSearchField(""); // reset searchField
    setIsExpanded(false);
    setSearchHistory(await addToHistory(queryString));
  }

  function logout() {
    setIsExpanded(false);
    removeToken();
    router.push("/login");
  }

  return (
    <>
      <Navbar
        expanded={isExpanded}
        expand="lg"
        className="fixed-top navbar-dark bg-primary"
      >
        <Container>
          <Navbar.Brand>Wing Ho Cheung</Navbar.Brand>
          <Navbar.Toggle
            onClick={() =>
              isExpanded ? setIsExpanded(false) : setIsExpanded(true)
            }
            aria-controls="basic-navbar-nav"
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link href="/" passHref>
                <Nav.Link
                  active={router.pathname === "/"}
                  onClick={() => setIsExpanded(false)}
                >
                  Home
                </Nav.Link>
              </Link>
              {token && (
                <Link href="/search" passHref>
                  <Nav.Link
                    active={router.pathname === "/search"}
                    onClick={() => setIsExpanded(false)}
                  >
                    Advanced Search
                  </Nav.Link>
                </Link>
              )}
            </Nav>
            {!token && (
              <Nav>
                <Link href="/register" passHref>
                  <Nav.Link
                    active={router.pathname === "/register"}
                    onClick={() => setIsExpanded(false)}
                  >
                    Register
                  </Nav.Link>
                </Link>
                <Link href="/login" passHref>
                  <Nav.Link
                    active={router.pathname === "/login"}
                    onClick={() => setIsExpanded(false)}
                  >
                    Log In
                  </Nav.Link>
                </Link>
              </Nav>
            )}
            {token && (
              <>
                &nbsp;
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
                &nbsp;
                <Nav>
                  <NavDropdown title={token.userName} id="basic-nav-dropdown">
                    <Link href="/favourites" passHref>
                      <NavDropdown.Item
                        // active={router.pathname === "/favourites"}
                        onClick={() => setIsExpanded(false)}
                      >
                        Favourites
                      </NavDropdown.Item>
                    </Link>
                    <Link href="/history" passHref>
                      <NavDropdown.Item
                        // active={router.pathname === "/history"}
                        onClick={() => setIsExpanded(false)}
                      >
                        Search History
                      </NavDropdown.Item>
                    </Link>
                    <NavDropdown.Item onClick={() => logout()}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
    </>
  );
}

import { removeStorage } from "@/library/functions"
import { UserType } from "@/library/types"
import { clearUser } from "@/store"
import { Button, Container, Nav, Navbar, NavDropdown,} from "react-bootstrap"
import { useDispatch } from "react-redux"
import { Link, NavLink} from "react-router-dom"

export const TopNav:React.FC<{user: UserType}> = ({user}) => {
    const dispatch = useDispatch()

    const handleLogout = () => {
        removeStorage('merntoken')
        dispatch(clearUser())

    }

    return  <Navbar bg="dark" expand="lg" data-bs-theme="dark">
    <Container>
        <Navbar.Brand as={Link} to="/">MERN PROJECT</Navbar.Brand>
        <Navbar.Toggle/>
        <Navbar.Collapse>
            <Nav>
                {user?.role == 'Admin' && <Nav.Item>
                    <Nav.Link as={NavLink} to="/staffs">
                    <i className="fa-solid fa-users me-2"></i>staffs
                    </Nav.Link>
                </Nav.Item>}
            </Nav>
            <Nav>
            {(user?.role == 'Admin' || user?.role == 'Staff') && 
                            <Nav.Item>
                                <Nav.Link as={NavLink} to="/customers">
                                    <i className="fa-solid fa-users me-2"></i>customers
                                </Nav.Link>
                            </Nav.Item>
                        }
            </Nav>
            <Nav>
                    {(user?.role == 'Admin' || user?.role == 'Staff') && <Nav.Item>
                     <Nav.Link as={NavLink} to="/categories">
                        <i className="fa-solid fa-users me-2"></i>Categories
                      </Nav.Link>
                    </Nav.Item>}
            </Nav>
            <Nav>
                    {(user?.role == 'Admin' || user?.role == 'Staff') && <Nav.Item>
                      <Nav.Link as={NavLink} to="/brands">
                        <i className="fa-solid fa-users me-2"></i>Brands
                      </Nav.Link>
                    </Nav.Item>}

                    <Nav.Item>
                      <Nav.Link as={NavLink} to="/products">
                        <i className="fa-solid fa-gifts me-2"></i>Products
                      </Nav.Link>
                    </Nav.Item>

                    
                    <Nav.Item>
                      <Nav.Link as={NavLink} to="/reviews">
                        <i className="fa-solid fa-comments me-2"></i>Reviews
                      </Nav.Link>
                    </Nav.Item>

                    <Nav.Item>
                      <Nav.Link as={NavLink} to="/orders">
                        <i className="fa-solid fa-shopping-basket me-2"></i>Orders
                      </Nav.Link>
                    </Nav.Item>
            </Nav>
            <Nav className="ms-auto">
                <NavDropdown align="end" title={<>
                    <i className="fa-solid fa-user-circle me-2"></i>{user?.name}
                    </>}>
                    <NavDropdown.Item as={Link} to="/profile/edit">
                    <i className="fa-solid fa-user-edit me-2"></i> Edit Profile
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/profile/password">
                    <i className="fa-solid fa-asterisk me-2"></i> Change Password
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Button} variant ="link" onClick={handleLogout}>
                        <i className="fa-solid fa-arrow-right-from-bracket me-2"></i>Logout
                    </NavDropdown.Item>

                </NavDropdown>
            </Nav>
            

        </Navbar.Collapse>

    </Container>
    </Navbar>


}
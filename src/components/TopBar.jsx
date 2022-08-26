import React from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const TopBar = () => {
    const { i18n, t } = useTranslation(["topbar"])

    const { isLoggedIn, username, image } = useSelector((store) => {
        return {
            isLoggedIn: store.authReducer.isLoggedIn,
            username: store.authReducer.username,
            image: store.authReducer.image
        }
    });

    const handleLanguageChange = (e) => {
        i18n.changeLanguage(e.target.id)
    }

    let links = (
        <>
            <Navbar.Text className='ms-4'><Link to="/">{t("Home")}</Link></Navbar.Text>
            <Navbar.Text className='ms-4'><Link to='/login'>{t("Sign in")}</Link></Navbar.Text>
            <Navbar.Text className='ms-4'><Link to='/register'>{t("Sign up")}</Link></Navbar.Text>
        </>
    );

    if (isLoggedIn) {
        links = (
            <>
                <Navbar.Text className='ms-4'><Link to="/">{t("Home")}</Link></Navbar.Text>
                <Navbar.Text className='ms-4'><Link to="/editor">{t("New article")}</Link></Navbar.Text>
                <Navbar.Text className='ms-4'><Link to="/settings">{t("Settings")}</Link></Navbar.Text>
                <Navbar.Text className='ms-4'>
                    <img alt='user' className=' rounded-circle' style={{ width: "1.2rem", height: "1.2rem" }} src={image} />
                    <Link to={`/@${username}`}>{username}</Link>
                </Navbar.Text>
            </>
        )
    }

    return (
        <Navbar bg="dark" variant='dark' sticky='top' expand="md" >
            <Navbar.Brand className='ms-4'>
                Logo
            </Navbar.Brand>

            <Navbar.Toggle className='me-3' />
            <Navbar.Collapse className='me-4'>
                <Nav>
                    <NavDropdown className='ms-4' title={t("Languages")}>
                        <NavDropdown.Item onClick={handleLanguageChange} id="en">{t("English")}</NavDropdown.Item>
                        <NavDropdown.Item onClick={handleLanguageChange} id="tr">{t("Turkish")}</NavDropdown.Item>
                    </NavDropdown>
                    {links}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default TopBar
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import './Navbar.scss';
import { AuthContext } from '../../auth/authContext';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Logout } from '../../auth/authAction';
import MenuIcon from '@mui/icons-material/Menu';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuIsOpen, setmenuIsOpen] = useState(true);

  const { user, dispatch } = useContext(AuthContext);
  window.onscroll = () => {
    setIsScrolled(window.scrollY === 0 ? false : true);

    return () => (window.onscroll = null);
  };

  useEffect(() => {
    document.body.addEventListener('click', handleClose);
    return () => {
      document.body.removeEventListener('click', handleClose);
    };
  }, []);

  const handleClose = (e) => {
    e.stopPropagation();
    setmenuIsOpen(true);
    document.body.classList.remove('in-menu');
  };

  const logoutHandler = () => {
    dispatch(Logout());
  };

  const handelClick = (e) => {
    e.stopPropagation();
    setmenuIsOpen(!menuIsOpen);
    document.body.classList.add('in-menu');
  };

  return (
    <div className={isScrolled ? 'navbar scrolled' : 'navbar'}>
      <div className="container">
        <div className="right">
          <div className="profile">
            <MoreHorizIcon className="option" />
            <div className="options">
              <span onClick={logoutHandler}>Logout</span>
              <span>Settings</span>
            </div>
          </div>
          <Link className="link" to="/search">
            <SearchIcon className="icon" />
          </Link>
          <NotificationsIcon className="icon notific" />
        </div>
        <div className="left">
          <Link to="/">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
              alt="Netflix"
            />
          </Link>
          {menuIsOpen ? (
            <MenuIcon onClick={(e) => handelClick(e)} />
          ) : (
            <div className="menu">
              <div className="user-profile">
                <strong className="username">
                  {user ? user.username : '.'}
                </strong>
                <img
                  className="profile-menu"
                  src={user ? user.profilePicture : '.'}
                  alt=""
                />
              </div>
              <div className="links">
                <NavLink to="/" className="link">
                  <span>Homepage</span>
                </NavLink>
                <NavLink to="/series" className="link">
                  <span className="navbarmainLinks">Series</span>
                </NavLink>
                <NavLink to="/movies" className="link">
                  <span className="navbarmainLinks">Movies</span>
                </NavLink>
                <NavLink to="/new-and-popular" className="link">
                  <span>New and Popular</span>
                </NavLink>
                <NavLink to="/my-list" className="link">
                  <span>My List</span>
                </NavLink>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;

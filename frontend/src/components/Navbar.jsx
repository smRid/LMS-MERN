import React, { useEffect, useRef, useState } from 'react';
import { navbarStyles } from '../assets/dummyStyles';
import Logo from '../assets/Logo.png';
import { Home, BookOpen, BookMarked, Users, Contact, Menu, X, BookOpenText, Sun, Moon } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useAuth, useClerk, UserButton, useUser } from '@clerk/clerk-react';
import { useTheme } from '../context/ThemeContext';

const baseNav = [
  { name: "Home", icon: Home, href: "/" },
  { name: "Courses", icon: BookOpen, href: "/courses" },
  { name: "About", icon: BookMarked, href: "/about" },
  { name: "Faculty", icon: Users, href: "/faculty" },
  { name: "Contact", icon: Contact, href: "/contact" },
];

const Navbar = () => {
  // for clerk
  const { openSignUp } = useClerk();
  const { isSignedIn, isLoaded } = useUser();
  const { getToken } = useAuth();

  // for theme
  const { isDark, toggleTheme } = useTheme();

  // for mobile toggle
  const [isOpen, setIsOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const menuRef = useRef(null);
  const isloggedin = isSignedIn && Boolean(localStorage.getItem("token"));

  const navItems = isSignedIn
    ? [
      ...baseNav,
      { name: "My Courses", icon: BookOpenText, href: "/mycourses" },
    ]
    : baseNav;

  // fetch token
  useEffect(() => {
    const loadToken = async () => {
      if (isSignedIn) {
        const token = await getToken();
        localStorage.setItem("token", token);
        console.log("Clerk Login Token:", token);
      }
    };
    loadToken();
  }, [isSignedIn, getToken]);

  // remove token when signout
  useEffect(() => {
    if (!isSignedIn) {
      localStorage.removeItem("token");
      console.log("Clerk Token Removed");
    }
  }, [isSignedIn]);

  // INSTANT token removal using Clerk logout event
  useEffect(() => {
    const handleLogout = () => {
      localStorage.removeItem("token");
      console.log("Token removed instantly on Clerk logout event");
    };

    window.addEventListener("user:signed_out", handleLogout);
    return () => window.removeEventListener("user:signed_out", handleLogout);
  }, []);

  // Scroll hide/show
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);

      if (scrollY > lastScrollY && scrollY > 100) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      setLastScrollY(scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const [isScrolled, setIsScrolled] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);

  const desktopLinkClass = (isActive) =>
    `${navbarStyles.desktopNavItem} ${isActive ? navbarStyles.desktopNavItemActive : ""
    }`;

  const mobileLinkClass = (isActive) =>
    `${navbarStyles.mobileMenuItem} ${isActive
      ? navbarStyles.mobileMenuItemActive
      : navbarStyles.mobileMenuItemHover
    }`;

  return (
    <nav
      className={`${navbarStyles.navbar} ${showNavbar ? navbarStyles.navbarVisible : navbarStyles.navbarHidden
        } ${isScrolled ? navbarStyles.navbarScrolled : navbarStyles.navbarDefault}`}
    >
      <div className={navbarStyles.container}>
        <div className={navbarStyles.innerContainer}>
          {/* LOGO */}
          <div className="flex items-center gap-3 select-none">
            <img src={Logo} alt="logo" className='w-12 h-12' />
            <div
              className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r 
              from-sky-700 to-cyan-600 font-serif leading-[0.95]"
            >
              ShikhoHub
            </div>
          </div>

          <div className={navbarStyles.desktopNav}>
            <div className={navbarStyles.desktopNavContainer}>
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    end={item.href === "/"}
                    className={({ isActive }) => desktopLinkClass(isActive)}
                  >
                    <div className="flex items-center space-x-2">
                      <Icon size={16} className={navbarStyles.desktopNavIcon} />
                      <span className={navbarStyles.desktopNavText}>
                        {item.name}
                      </span>
                    </div>
                  </NavLink>
                );
              })}
            </div>
          </div>

          {/* Right Side */}
          <div className={navbarStyles.authContainer}>
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="theme-toggle-btn cursor-pointer flex items-center justify-center"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? (
                <Sun size={18} className="theme-toggle-icon text-yellow-300" />
              ) : (
                <Moon size={18} className="theme-toggle-icon text-white" />
              )}
            </button>

            {!isLoaded ? (
              <div className="w-10"></div>
            ) : !isSignedIn ? (
              <button type="button" onClick={() => openSignUp({})} className={
                navbarStyles.createAccountButton ?? navbarStyles.loginButton
              }>
                <span className='cursor-pointer'>Sign up</span>
              </button>
            ) : (
              <div className="flex items-center">
                <UserButton afterSignOutUrl="/" />
              </div>
            )}

            {/* Mobile Menu toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={navbarStyles.mobileMenuButton}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* mobile nav */}
        <div
          ref={menuRef}
          className={`${navbarStyles.mobileMenu} ${isOpen ? navbarStyles.mobileMenuOpen : navbarStyles.mobileMenuClosed
            }`}
        >
          <div className={navbarStyles.mobileMenuContainer}>
            <div className={navbarStyles.mobileMenuItems}>
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    end={item.href === "/"}
                    className={({ isActive }) => mobileLinkClass(isActive)}
                    onClick={() => setIsOpen(false)}
                  >
                    <div className={navbarStyles.mobileMenuIconContainer}>
                      <Icon size={18} className={navbarStyles.mobileMenuIcon} />
                    </div>
                    <span className={navbarStyles.mobileMenuText}>
                      {item.name}
                    </span>
                  </NavLink>
                );
              })}

              {!isLoaded ? (
                <div className="w-10"></div>
              ) : !isSignedIn ? (
                <button type="button" onClick={() => {
                  openSignUp({});
                  setIsOpen(false)
                }} className={
                  navbarStyles.mobileCreateAccountButton ?? navbarStyles.mobileLoginButton
                }>
                  <span className='cursor-pointer'>Sign up</span>
                </button>
              ) : (
                <div className="px-4 py-2">
                  <UserButton afterSignOutUrl='/' />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className={navbarStyles.backgroundPattern}>
        <div className={navbarStyles.pattern}></div>
      </div>
    </nav>
  );
};

export default Navbar;
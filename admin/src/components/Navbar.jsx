import React, { useEffect, useRef, useState } from 'react'
import { navbarStyles } from '../assets/dummyStyles';
import Logo from '../assets/Logo.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, ListChecks, Menu, PlusCircle, X, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const DashboardPage = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/" },
    {
      id: "addcourse",
      label: "Add Course",
      icon: PlusCircle,
      path: "/addcourse",
    },
    {
      id: "listcourse",
      label: "List Courses",
      icon: ListChecks,
      path: "/listcourse",
    },
    { id: "bookings", label: "Bookings", icon: ListChecks, path: "/bookings" },
  ];

  // Hide navbar on scroll down
  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 80) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  //close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMenuOpen]);

  return (
    <>
      <nav className={navbarStyles.nav(isVisible)}>
        <div className={navbarStyles.navContainer}>
          <div ref={menuRef} className={navbarStyles.navInner(isMenuOpen)}>
            <div className={navbarStyles.glowEffect}></div>

            <div className={navbarStyles.navbarContent}>
              <div className={navbarStyles.logoContainer}>
                <img src={Logo} alt="Logo" className={navbarStyles.logoImage} />
                <div className=" leading-[0.95]">
                  <div className={navbarStyles.logoText}>ShikhoHub</div>
                </div>
              </div>
              {/* desktop links */}
              <div className={navbarStyles.desktopNav}>
                <div className={navbarStyles.desktopNavInner}>
                  {menuItems.map(({ id, label, icon: Icon, path }) => {
                    const isActive = location.pathname === path;

                    return (
                      <Link
                        key={id}
                        to={path}
                        className={navbarStyles.desktopNavItem(isActive)}
                      >
                        <Icon className=" w-4 h-4" />
                        <span className=" lg:text-md xl:text-lg md:text-xs">
                          {label}
                        </span>
                        {isActive && (
                          <span className={navbarStyles.desktopActiveGlow} />
                        )}
                      </Link>
                    );
                  })}
                </div>
                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 ml-4 text-red-500 hover:text-white hover:bg-red-500 rounded-lg transition-all duration-200 border border-red-500/30"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="lg:text-md xl:text-lg md:text-xs">Logout</span>
                </button>
              </div>
              {/* mobile toggle */}
              <div className={navbarStyles.mobileToggleContainer}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMenuOpen(!isMenuOpen);
                  }}
                  className={navbarStyles.mobileToggleButton}
                >
                  {isMenuOpen ? (
                    <X className={navbarStyles.mobileToggleIcon} />
                  ) : (
                    <Menu className={navbarStyles.mobileToggleIcon} />
                  )}
                </button>
              </div>
            </div>
            {/* mobile navigations */}
            <div className={navbarStyles.mobileMenu(isMenuOpen)}>
              <div className={navbarStyles.mobileMenuInner}>
                {menuItems.map(({ id, label, icon: Icon, path }) => {
                  const isActive = location.pathname === path;
                  return (
                    <Link
                      key={id}
                      to={path}
                      onClick={() => setIsMenuOpen(false)}
                      className={navbarStyles.mobileMenuItem(isActive)}
                    >
                      <Icon className={navbarStyles.mobileMenuIcon} />
                      <span className={navbarStyles.mobileMenuText}>
                        {label}
                      </span>
                    </Link>
                  );
                })}
                {/* Mobile Logout Button */}
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    handleLogout();
                  }}
                  className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-500/10 rounded-lg transition-all duration-200 w-full"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default DashboardPage
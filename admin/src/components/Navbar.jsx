
import { navbarStyles } from '../assets/dummyStyles.js';
import Logo from '../assets/Logo.png';
import { useState, useRef } from 'react';
import { LayoutDashboard, PlusCircle, ListChecks, Menu, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';



const Navbar = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const menuRef = useRef(null);

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

  //hide navbar on scroll down, show on scroll up
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


    //close mobile menu on outside click
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

  const desktopLinkClass = (isActive) =>
    `${navbarStyles.desktopNavItem} ${
        isActive ? navbarStyles.desktopNavItemActive : ""
    }`;

  return (
    <>
      <nav className={`${navbarStyles.navbar} ${navbarStyles.navbarDefault} ${isVisible ? navbarStyles.navbarVisible : navbarStyles.navbarHidden}`}>
        <div className={navbarStyles.container}>
          <div ref={menuRef} className={navbarStyles.innerContainer}>
            {/* LOGO */}
            <div className="flex items-center gap-3 select-none">
              <img src={Logo} alt="logo" className='w-18 h-12' />
              <div
                className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r 
                from-sky-700 to-cyan-600 font-serif leading-[0.95]"
              >
                ShikhoHub
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className={navbarStyles.desktopNav}>
              <div className={navbarStyles.desktopNavContainer}>
                {menuItems.map(({id, label, icon: Icon, path}) => {
                  return (
                    <NavLink
                      key={id}
                      to={path}
                      end={path === "/"}
                      className={({ isActive }) => desktopLinkClass(isActive)}
                    >
                      <div className="flex items-center space-x-2">
                        <Icon size={16} className={navbarStyles.desktopNavIcon} />
                        <span className={navbarStyles.desktopNavText}>
                          {label}
                        </span>
                      </div>
                    </NavLink>
                  )
                })}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsMenuOpen(!isMenuOpen);
              }}
              className={navbarStyles.mobileMenuButton}
            >
              {isMenuOpen ? (
                <X size={20} />
              ) : (
                <Menu size={20} />
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <div className={`${navbarStyles.mobileMenu} ${isMenuOpen ? navbarStyles.mobileMenuOpen : navbarStyles.mobileMenuClosed}`}>
          <div className={navbarStyles.mobileMenuContainer}>
            <div className={navbarStyles.mobileMenuItems}>
              {menuItems.map(({ id, label, icon: Icon, path }) => {
                return (
                  <NavLink
                    key={id}
                    to={path}
                    end={path === "/"}
                    className={({ isActive }) =>
                      `${navbarStyles.mobileMenuItem} ${
                        isActive ? navbarStyles.mobileMenuItemActive : ""
                      }`
                    }
                  >
                    <div className={navbarStyles.mobileMenuIconContainer}>
                      <Icon size={18} className={navbarStyles.mobileMenuIcon} />
                    </div>
                    <span className={navbarStyles.mobileMenuText}>{label}</span>
                  </NavLink>
                );
              })}
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
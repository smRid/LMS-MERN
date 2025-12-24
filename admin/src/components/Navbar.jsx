import React from 'react'
import { navbarStyles } from '../assets/dummyStyles.js';
import Logo from '../assets/Logo.png';
import { useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, ListChecks} from 'lucide-react';



const Navbar = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const location = useLocation();
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

  return (
    <>
      <nav className={navbarStyles.nav(isVisible)}>
        <div className={navbarStyles.navContainer}>
          <div ref={menuRef} className={navbarStyles.navInner(isMenuOpen)}>
            <div className={navbarStyles.glowEffect}></div>

            <div className={navbarStyles.navbarContent}>
              <div className={navbarStyles.logoContainer}>
                <img src={Logo} alt="logo" className={navbarStyles.logoImage} />
                <div className=" leading-[0.95]">
                  <div className={navbarStyles.logoText}>SkillForge</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
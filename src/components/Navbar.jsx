import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutGrid, Info, ChevronDown } from "lucide-react";
import "./Navbar.css";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        closeDropdown();
      }
    };

    // Close dropdown on escape key
    const handleEscKey = (event) => {
      if (event.key === "Escape" && isDropdownOpen) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscKey);

    // Prevent body scroll when dropdown is open
    if (isDropdownOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscKey);
      document.body.style.overflow = "";
    };
  }, [isDropdownOpen]);

  // Close dropdown on route change
  useEffect(() => {
    closeDropdown();
  }, [location]);

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="logo" onClick={closeDropdown}>
          AI.dev
        </Link>

        {/* Desktop Navigation */}
        <div className="nav-links">
          <Link to="/" className={location.pathname === "/" ? "active" : ""}>
            <LayoutGrid size={18} /> Projects
          </Link>
          <Link
            to="/about"
            className={location.pathname === "/about" ? "active" : ""}
          >
            <Info size={18} /> About
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          ref={buttonRef}
          className="mobile-menu-btn"
          onClick={toggleDropdown}
          aria-label="Menu"
        >
          Menu <ChevronDown size={18} />
        </button>

        {/* Mobile Dropdown Menu */}
        <div
          ref={dropdownRef}
          className={`mobile-dropdown ${isDropdownOpen ? "open" : ""}`}
        >
          <Link to="/" onClick={closeDropdown}>
            <LayoutGrid size={20} /> Projects
          </Link>
          <Link to="/about" onClick={closeDropdown}>
            <Info size={20} /> About Me
          </Link>
        </div>
      </nav>

      {/* Overlay */}
      <div
        className={`dropdown-overlay ${isDropdownOpen ? "open" : ""}`}
        onClick={closeDropdown}
      />
    </>
  );
};

export default Navbar;

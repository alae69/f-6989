import React, { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { List, X, User, Mail, Lock, ChevronDown } from "lucide-react";
import AuthModal from "./AuthModal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [loginMethod, setLoginMethod] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setIsScrolled(scrollTop > 50);
    };

    // Check authentication status
    const checkAuth = () => {
      const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
      const name = localStorage.getItem('userName') || 'User';
      const method = localStorage.getItem('loginMethod') || '';
      setIsLoggedIn(loggedIn);
      setUserName(name);
      setLoginMethod(method);
    };
    window.addEventListener("scroll", handleScroll);
    checkAuth();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const navigationLinks = [{
    name: "Home",
    path: "/"
  }, {
    name: "Properties",
    path: "/properties"
  }, {
    name: "About",
    path: "/about"
  }, {
    name: "Contact",
    path: "/contact"
  }];
  const handleListPropertyClick = () => {
    if (isLoggedIn) {
      navigate('/owner-dashboard');
    } else {
      setShowAuthModal(true);
    }
    setIsMobileMenuOpen(false);
  };
  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    setIsLoggedIn(true);
    setUserName(localStorage.getItem('userName') || 'User');
    setLoginMethod(localStorage.getItem('loginMethod') || '');
    navigate('/owner-dashboard');
  };
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('loginMethod');
    setIsLoggedIn(false);
    setUserName('');
    setLoginMethod('');
    navigate('/');
  };
  const getLoginMethodIcon = () => {
    switch (loginMethod) {
      case 'google':
        return (
          <svg className="h-3 w-3" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
        );
      case 'email':
        return <Mail className="h-3 w-3 text-green-500" />;
      case 'credentials':
        return <Lock className="h-3 w-3 text-orange-500" />;
      default:
        return <User className="h-3 w-3 text-gray-500" />;
    }
  };
  const getLoginMethodText = () => {
    switch (loginMethod) {
      case 'google':
        return 'Google';
      case 'email':
        return 'Email';
      case 'credentials':
        return 'Admin';
      default:
        return 'User';
    }
  };
  return <>
      <header className={`${isScrolled ? "bg-white shadow-sm" : "bg-transparent"} sticky top-0 z-50 transition-all duration-300`}>
        <div className="container-custom mx-auto px-4 bg-slate-200">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-moroccan-blue flex items-center justify-center rounded-md shadow-md">
                  <span className="text-white font-serif text-xl font-bold">M</span>
                </div>
                <div className="ml-2 font-serif flex items-center">
                  <span className="text-moroccan-blue text-xl font-medium">Martil</span>
                  <span className="text-moroccan-gold text-xl font-medium">Haven</span>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigationLinks.map(link => <NavLink key={link.path} to={link.path} className={({
              isActive
            }) => `text-sm font-medium transition-colors hover:text-moroccan-blue ${isActive ? "text-moroccan-blue" : "text-gray-700"}`}>
                  {link.name}
                </NavLink>)}
              
              {isLoggedIn ? <div className="flex items-center space-x-3">
                  <Button onClick={handleListPropertyClick} className="bg-moroccan-gold hover:bg-moroccan-gold/90 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-colors">
                    Dashboard
                  </Button>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      {getLoginMethodIcon()}
                    </div>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="flex items-center space-x-1 p-2 hover:bg-gray-100 rounded-lg">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-moroccan-blue text-white text-sm">
                              {userName.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <ChevronDown className="h-3 w-3 text-gray-600" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem className="flex items-center space-x-2">
                          <User className="h-4 w-4" />
                          <div>
                            <div className="font-medium">{userName}</div>
                            <div className="text-xs text-gray-500">{getLoginMethodText()}</div>
                          </div>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleListPropertyClick}>
                          Dashboard
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                          Logout
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div> : <Button onClick={handleListPropertyClick} className="bg-moroccan-gold hover:bg-moroccan-gold/90 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-colors">
                  Become a host
                </Button>}
            </nav>

            {/* Mobile menu button */}
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden flex items-center p-2" aria-expanded={isMobileMenuOpen}>
              {isMobileMenuOpen ? <X className="h-6 w-6 text-gray-700" /> : <List className="h-6 w-6 text-gray-700" />}
              <span className="sr-only">
                {isMobileMenuOpen ? "Close menu" : "Open menu"}
              </span>
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && <nav className="lg:hidden py-4 border-t">
              <ul className="flex flex-col space-y-4">
                {navigationLinks.map(link => <li key={link.path}>
                    <NavLink to={link.path} className={({
                isActive
              }) => `block text-base transition-colors hover:text-moroccan-blue ${isActive ? "text-moroccan-blue" : "text-gray-700"}`} onClick={() => setIsMobileMenuOpen(false)}>
                      {link.name}
                    </NavLink>
                  </li>)}
                <li>
                  {isLoggedIn ? <div className="space-y-2">
                      <Button onClick={handleListPropertyClick} className="w-full bg-moroccan-gold hover:bg-moroccan-gold/90 text-white">
                        Dashboard
                      </Button>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-moroccan-blue text-white text-sm">
                              {userName.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-sm">{userName}</div>
                            <div className="text-xs text-gray-500 flex items-center space-x-1">
                              {getLoginMethodIcon()}
                              <span>{getLoginMethodText()}</span>
                            </div>
                          </div>
                        </div>
                        <Button onClick={handleLogout} variant="outline" size="sm">
                          Logout
                        </Button>
                      </div>
                    </div> : <Button onClick={handleListPropertyClick} className="w-full bg-moroccan-gold hover:bg-moroccan-gold/90 text-white">
                      Become a host
                    </Button>}
                </li>
              </ul>
            </nav>}
        </div>
      </header>

      {/* Authentication Modal */}
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} onSuccess={handleAuthSuccess} />
    </>;
};

export default Header;

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Menu, X, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/SupabaseAuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, profile, signOut } = useAuth();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Resources', path: '/resources' },
    { name: 'Progress', path: '/progress' },
    { name: 'Contact', path: '/contact' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-effect">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-white" />
            <span className="text-xl font-bold text-white">ReadNow</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-white hover:text-yellow-100 transition-colors ${
                  isActive(item.path) ? 'text-yellow-100 font-semibold' : ''
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-white">
                  <User className="h-4 w-4" />
                  <span className="text-sm">{profile?.name || user.email}</span>
                </div>
                {profile?.is_teacher && (
                  <Link to="/teacher">
                    <Button variant="outline" size="sm" className="text-white border-white hover:bg-white hover:text-orange-600">
                      Teacher Dashboard
                    </Button>
                  </Link>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={signOut}
                  className="text-white hover:bg-white/20"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button variant="outline" className="text-white border-white hover:bg-white hover:text-orange-600">
                  Sign In
                </Button>
              </Link>
            )}
          </div>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-white"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden py-4 border-t border-white/20"
          >
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-white hover:text-yellow-100 transition-colors ${
                    isActive(item.path) ? 'text-yellow-100 font-semibold' : ''
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              {user ? (
                <div className="flex flex-col space-y-2 pt-4 border-t border-white/20">
                  <div className="flex items-center space-x-2 text-white">
                    <User className="h-4 w-4" />
                    <span className="text-sm">{profile?.name || user.email}</span>
                  </div>
                  {profile?.is_teacher && (
                    <Link to="/teacher" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" size="sm" className="w-full text-white border-white hover:bg-white hover:text-orange-600">
                        Teacher Dashboard
                      </Button>
                    </Link>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      signOut();
                      setIsOpen(false);
                    }}
                    className="text-white hover:bg-white/20 justify-start"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" className="w-full text-white border-white hover:bg-white hover:text-orange-600">
                    Sign In
                  </Button>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
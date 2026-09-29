import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FileText, LogOut, User, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="app-header">
      <Link to="/" className="app-brand">
        <div className="app-brand-icon">
          <FileText size={18} />
        </div>
        <span>AI Resume Builder</span>
      </Link>

      <nav className="app-nav">
        {isAuthenticated ? (
          <>
            <Link to="/dashboard" className="btn btn-secondary btn-sm">
              <LayoutDashboard size={15} />
              <span>Dashboard</span>
            </Link>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem', padding: '0 0.25rem' }}>
              <User size={15} />
              <span style={{ fontWeight: 500 }}>{user?.name || 'User'}</span>
            </div>

            <button onClick={handleLogout} className="btn btn-secondary btn-sm" title="Log out">
              <LogOut size={15} />
              <span>Logout</span>
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-secondary btn-sm">
              Sign In
            </Link>
            <Link to="/register" className="btn btn-primary btn-sm">
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Navbar;

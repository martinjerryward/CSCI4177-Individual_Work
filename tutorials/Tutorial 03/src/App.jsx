import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams, Link } from 'react-router-dom';

const theme = {
  bg: '#f0f0f0',
  text: '#555555',
  accent: '#333333',
  outset: '12px 12px 24px #d1d1d1, -12px -12px 24px #ffffff',
  inset: 'inset 6px 6px 10px #d1d1d1, inset -6px -6px 10px #ffffff',
  borderRadius: '20px',
  fontFamily: '"Roboto Condensed", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
};

const pageWrapperStyle = {
  backgroundColor: theme.bg,
  minHeight: '100vh',
  width: '100vw',
  margin: 0,
  padding: 0,
  display: 'flex',
  flexDirection: 'column',
  boxSizing: 'border-box',
  fontFamily: theme.fontFamily
};

const cardStyle = {
  background: theme.bg,
  borderRadius: theme.borderRadius,
  boxShadow: theme.outset,
  padding: '40px',
  color: theme.text,
  border: 'none',
  fontFamily: theme.fontFamily
};

const inputStyle = {
  background: theme.bg,
  border: 'none',
  borderRadius: '12px',
  boxShadow: theme.inset,
  padding: '15px',
  color: theme.text,
  outline: 'none',
  width: '100%',
  boxSizing: 'border-box',
  fontFamily: theme.fontFamily,
  fontSize: '16px'
};

const buttonStyle = {
  background: theme.bg,
  border: 'none',
  borderRadius: '10px',
  boxShadow: '5px 5px 10px #d1d1d1, -5px -5px 10px #ffffff',
  padding: '15px',
  color: theme.accent,
  fontWeight: 'bold',
  cursor: 'pointer',
  fontFamily: theme.fontFamily,
  fontSize: '16px',
  transition: 'all 0.3s ease'
};

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://express-t4.onrender.com/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "username": email, "password": password })
      });
      if (response.ok) navigate('/users');
      else alert('Login failed. Use: testemail@dal.ca / Test@123');
    } catch (err) { console.error(err); }
  };

  return (
    <div style={{ ...pageWrapperStyle, justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ ...cardStyle, width: '90%', maxWidth: '400px', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '30px', color: theme.text, fontFamily: theme.fontFamily }}>Welcome Back</h2>
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={inputStyle} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={inputStyle} />
          <button type="submit" style={buttonStyle}>Login</button>
        </form>
      </div>
    </div>
  );
};

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('https://express-t4.onrender.com/api/users')
      .then(res => res.json())
      .then(data => setUsers(Array.isArray(data) ? data : []))
      .catch(err => console.error(err));
  }, []);

  const filteredUsers = users.filter(user => 
    (user?.name || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ ...pageWrapperStyle, padding: '40px' }}>
      <h2 style={{ textAlign: 'center', color: theme.text, marginBottom: '40px', fontFamily: theme.fontFamily }}>Team Directory</h2>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '50px' }}>
        <input 
          type="text" 
          placeholder="Search users..." 
          style={{ ...inputStyle, maxWidth: '500px' }}
          value={search}
          onChange={(e) => setSearch(e.target.value)} 
        />
      </div>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
        gap: '40px',
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {filteredUsers.map(user => (
          <Link key={user._id} to={`/user/${user._id}`} style={{ textDecoration: 'none' }}>
            <div style={{ ...cardStyle, textAlign: 'center', transition: 'transform 0.3s ease, box-shadow 0.3s ease', cursor: 'pointer' }}>
              <img 
                src={user.picture} 
                alt="profile" 
                style={{ width: '100px', height: '100px', borderRadius: '50%', boxShadow: theme.outset, marginBottom: '20px', border: `5px solid ${theme.bg}` }} 
                onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}`; }}
              />
              <h3 style={{ margin: 0, color: theme.text, fontFamily: theme.fontFamily }}>{user.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`https://express-t4.onrender.com/api/users/${id}`)
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(err => console.error(err));
  }, [id]);

  if (!user) return <div style={{ ...pageWrapperStyle, justifyContent: 'center', alignItems: 'center', fontFamily: theme.fontFamily }}>Loading...</div>;

  return (
    <div style={{ ...pageWrapperStyle, padding: '40px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
        <Link to="/users" style={{ color: theme.accent, textDecoration: 'none', fontWeight: 'bold' }}>
           <div style={{ ...buttonStyle, display: 'inline-block', padding: '10px 20px', marginBottom: '30px' }}>← Back</div>
        </Link>
        <div style={{ ...cardStyle, display: 'flex', gap: '40px', flexWrap: 'wrap', alignItems: 'center' }}>
          <img 
            src={user.picture} 
            alt="profile" 
            style={{ width: '250px', height: '250px', borderRadius: '20px', boxShadow: theme.outset }} 
            onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}`; }} 
          />
          <div style={{ flex: 1 }}>
            <h1 style={{ color: theme.text, marginTop: 0, fontFamily: theme.fontFamily }}>{user.name}</h1>
            <p style={{ fontFamily: theme.fontFamily }}><strong>Email:</strong> {user.email}</p>
            <p style={{ fontFamily: theme.fontFamily }}><strong>Company:</strong> {user.company}</p>
            <p style={{ lineHeight: '1.6', fontFamily: theme.fontFamily }}><strong>About:</strong> {user.about}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/user/:id" element={<UserDetail />} />
      </Routes>
    </Router>
  );
}

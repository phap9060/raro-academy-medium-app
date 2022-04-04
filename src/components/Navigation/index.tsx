import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
export const Navigation = () => {
  const [auth, setAuth] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setAuth(localStorage.getItem('id') !== null);
  }, [])




  const logout = () => {
    localStorage.clear()
    setAuth(false);
    navigate('/');
  }
  if (!auth) {
    return (
      <>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
      </>
    );
  }

  return (
    <>
      <Link to="/">Home</Link>
      <Link to="/artigos">Meus Artigos</Link>
      <Link to="/artigos/novo">Novo Artigo</Link>
      <Link to="/" onClick={logout}>Logout</Link>
    </>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import './css/NotFound.css'; // Si tienes estilos específicos para esta página

function NotFound() {
  return (
    <div className="notfound-container">
      <header className="notfound-header">
        <h1>404 - Página no encontrada</h1>
        <p>Lo sentimos, la página que estás buscando no existe.</p>
        <nav>
          <Link to="/">Volver a la página principal</Link>
        </nav>
      </header>
    </div>
  );
}

export default NotFound;

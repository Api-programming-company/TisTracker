import React from 'react';
import { Link } from 'react-router-dom';
import './css/Home.css';

function Home() {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Bienvenido a Mi Aplicación</h1>
        <p>Esta es la página de inicio. Aquí puedes encontrar una introducción a nuestra aplicación y enlaces a otras seccioness.</p>
        <nav>
          <ul>
            <li>
              <Link to="/about">Conoce más sobre nosotros</Link>
            </li>
            <li>
              <Link to="/contact">Contáctanos</Link>
            </li>
            <li>
              <Link to="/registrodocente">Registro docente</Link>
            </li>
            <li>
              <Link to="/registroestudiante">Registro Estudiante</Link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}

export default Home;

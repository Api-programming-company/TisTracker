import React, { useState } from 'react';
import './css/RegistroDocente.css'; // Opcional, para estilos personalizados

function RegistroDocente() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    phone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí podrías manejar el envío del formulario
    console.log('Datos enviados:', formData);
  };

  return (
    <div className="register-teachers-container">
      <h1>Registrar Docentes/Tutores</h1>
      <form onSubmit={handleSubmit} className="register-teachers-form">
        <label>
          Nombre:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Correo Electrónico:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Departamento:
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Teléfono:
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
}

export default RegistroDocente;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8081/login', {
        email,
        password,
      });

      if (response.data.success) {
        alert('Inicio de sesión exitoso');
        navigate('/welcome');
      } else {
        console.log('Credenciales inválidas');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  return (
    <div style={{ backgroundColor: 'maroon', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className='bg-white p-3 rounded w-25'>
        <h2>Iniciar sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='correo'><strong>Correo</strong></label>
            <input
              type='text'
              placeholder='Enter Correo'
              name='correo'
              className='form-control rounded-0'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='password'><strong>Contraseña</strong></label>
            <input
              type='password'
              placeholder='Ingrese la contraseña'
              name='Enter password'
              className='form-control rounded-0'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type='submit' className='btn btn-danger w-100 rounded-0'>Iniciar Sesión</button>
          <div style={{ margin: '10px 0' }}></div>
        </form>
      </div>
    </div>
  );
}

export default Login;

const express = require('express');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
const port = 8081;

// Configuración de la conexión a PostgreSQL
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'taller',
  password: 'postgres',
  port: 5432,
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta para el registro de usuarios (ejemplo básico)
app.post('/signup', async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Hasheamos la contraseña antes de almacenarla
    const hashedPassword = await bcrypt.hash(password, 10);

    // Ajustamos la inserción de datos en la base de datos para usar la contraseña hasheada
    const result = await pool.query(
      'INSERT INTO Usuario (Nombre, CorreoElectronico, Contraseña, role_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email, hashedPassword, role]
    );

    res.json({ success: true, message: 'Usuario registrado exitosamente', user: result.rows[0] });
  } catch (error) {
    console.error('Error en la consulta SQL:', error);
    res.status(500).json({ success: false, message: 'Error en el servidor' });
  }
});


app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verificar las credenciales en la base de datos
    const user = await pool.query('SELECT * FROM Usuario WHERE CorreoElectronico = $1 AND Contraseña = $2', [email, password]);

    if (user.rows.length > 0) {
      res.json({ success: true, message: 'Inicio de sesión exitoso' });
    } else {
      res.json({ success: false, message: 'Credenciales inválidas' });
    }
  } catch (error) {
    console.error('Error al verificar credenciales:', error);
    res.status(500).json({ success: false, message: 'Error en el servidor' });
  }
});


app.listen(port, () => {
  console.log(`Servidor backend corriendo en http://localhost:${port}`);
});
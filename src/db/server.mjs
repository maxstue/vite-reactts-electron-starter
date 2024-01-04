// server.js
import express from 'express';
import cors from 'cors';
import multer from 'multer';

import { query } from './db.mjs';
// import pkg from 'body-parser';
import axios from 'axios'; // Import axios
import dotenv from 'dotenv';
dotenv.config();

const storage = multer.memoryStorage(); // Store images in memory for temporary processing
const upload = multer({ storage });

// const { json } = pkg;

const app = express();
const port = 3001;

const allowedOrigins = ['http://localhost:3000'];

const corsOpts = {
  origin: allowedOrigins,
  credentials: true, // Allow requests from your frontend
  methods: 'POST', // Allow specific HTTP methods
  allowedHeaders: ['Content-Type']
};

app.use(cors(corsOpts));
app.use(express.json());

// Handle preflight requests explicitly
app.options('/upload-image', cors(corsOpts));

app.use('/upload-image', upload.single('image'), async (req, res) => {
  try {
    res.setHeader('Content-Type', 'application/json');
    const freeImageHostResponse = await axios.post('https://freeimage.host/api/1/upload', req.file.buffer, {
      headers: {
        'Content-Type': ['image/jpeg', 'image/png'], // Ganti sesuai dengan tipe gambar yang diizinkan oleh FreeImage.Host
        Authorization: `Bearer ${process.env.FREEIMAGE_HOST_API_KEY}`
      },
      responseType: 'json'
    });
    const imageUrl = freeImageHostResponse.data.image.url;
    res.json({ imageUrl });
  } catch (error) {
    console.error(error);
    console.error(error.response.data);
    if (error.response) {
      console.error(error.response.data);
      res.status(error.response.status).send(error.response.data);
    } else if (error.request) {
      console.error(error.request);
      res.status(500).send('Request Error');
    } else {
      console.error(error.message);
      res.status(500).send('Internal Server Error');
    }
  }
  console.log(req.file);
  console.log(process.env.FREEIMAGE_HOST_API_KEY);
});

// Create
app.post('/employees', async (req, res) => {
  try {
    res.setHeader('Content-Type', 'application/json');
    const { id, name, email, phone, gender, department, role, retirementStatus, image } = req.body;

    if (!id || !name || !email || !phone || !gender || !department || !role || !retirementStatus || !image) {
      return res.status(400).send('Bad Request: Incomplete data');
    }

    const sql =
      'INSERT INTO employee (id, name, email, `phone number`, gender, department, role, retirementStatus, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    await query(sql, [id, name, email, phone, gender, department, role, retirementStatus, image]);
    res.status(201).send('Employee added successfully');
  } catch (error) {
    console.error(error);
    if (error.response && error.response.data && error.response.data.error) {
      res.status(error.response.data.status_code).send(error.response.data.error.message);
    } else {
      if (error.response) {
        console.error(error.response.data);
        res.status(error.response.status).send(error.response.data);
      } else if (error.request) {
        console.error(error.request);
        res.status(500).send('Request Error');
      } else {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
      }
    }
  }
});

// Read
app.get('/employees', async (req, res) => {
  try {
    res.setHeader('Content-Type', 'application/json');
    const sql = 'SELECT * FROM employee';
    const employees = await query(sql);
    res.status(200).json(employees);
  } catch (error) {
    console.error(error);
    if (error.response) {
      console.error(error.response.data);
      res.status(error.response.status).send(error.response.data);
    } else if (error.request) {
      console.error(error.request);
      res.status(500).send('Request Error');
    } else {
      console.error(error.message);
      res.status(500).send('Internal Server Error');
    }
  }
});

// Update
app.put('/employees/:id', async (req, res) => {
  try {
    const { name, email, phone, gender, department, role, retirementStatus, image } = req.body;
    const sql =
      'UPDATE employee SET name=?, email=?, `phone number`=?, gender=?, department=?, role=?, retirementStatus=?, image=? WHERE id=?';
    await query(sql, [name, email, phone, gender, department, role, retirementStatus, image, req.params.id]);
    res.status(200).send('Employee updated successfully');
  } catch (error) {
    console.error(error);
    if (error.response) {
      console.error(error.response.data);
      res.status(error.response.status).send(error.response.data);
    } else if (error.request) {
      console.error(error.request);
      res.status(500).send('Request Error');
    } else {
      console.error(error.message);
      res.status(500).send('Internal Server Error');
    }
  }
});

// Delete
app.delete('/employees/:id', async (req, res) => {
  try {
    const sql = 'DELETE FROM employee WHERE id=?';
    await query(sql, [req.params.id]);
    res.status(200).send('Employee deleted successfully');
  } catch (error) {
    console.error(error);
    if (error.response) {
      console.error(error.response.data);
      res.status(error.response.status).send(error.response.data);
    } else if (error.request) {
      console.error(error.request);
      res.status(500).send('Request Error');
    } else {
      console.error(error.message);
      res.status(500).send('Internal Server Error');
    }
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

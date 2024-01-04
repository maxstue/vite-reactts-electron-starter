import axios from 'axios';

const BASE_URL = 'http://localhost:3001';
const IMGUR_API_ENDPOINT = 'https://api.imgur.com/3/image'; // Update Imgur API endpoint
const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID;

export const getAllEmployees = async () => {
  const response = await axios.get(`${BASE_URL}/employees`);
  return response.data;
};

export const addEmployee = async (employeeData: { image: string }) => {
  try {
    const formData = new FormData();
    formData.append('image', employeeData.image);

    // Upload gambar ke Imgur
    const response = await axios.post(IMGUR_API_ENDPOINT, formData, {
      headers: {
        Authorization: `Client-ID ${IMGUR_CLIENT_ID}`
      }
    });

    const imageUrl = response.data.data.link;

    // Perbarui data karyawan dengan URL gambar dari Imgur
    const updatedEmployeeData = {
      ...employeeData,
      image: imageUrl
    };

    // Simpan data karyawan ke MySQL
    const addEmployeeResponse = await axios.post(`${BASE_URL}/employees`, updatedEmployeeData);

    return addEmployeeResponse.data;
  } catch (error) {
    console.error('Error adding employee:', error);
    throw error;
  }
};

export const updateEmployee = async (id: number, employeeData: { image: string }) => {
  try {
    // Jika ada perubahan gambar, upload gambar baru ke Imgur
    if (employeeData.image && !employeeData.image.startsWith('http')) {
      const imgurResponse = await axios.post(IMGUR_API_ENDPOINT, {
        key: IMGUR_CLIENT_ID,
        source: employeeData.image // data URL gambar
      });

      // Perbarui data karyawan dengan URL gambar dari Imgur
      employeeData.image = imgurResponse.data.data.link;
    }

    const response = await axios.put(`${BASE_URL}/employees/${id}`, employeeData);
    return response.data;
  } catch (error) {
    console.error('Error updating employee:', error);
    throw error;
  }
};

export const deleteEmployee = async (id: any) => {
  const response = await axios.delete(`${BASE_URL}/employees/${id}`);
  return response.data;
};

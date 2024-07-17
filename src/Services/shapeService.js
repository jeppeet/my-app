import axios from 'axios';

const getShapes = async () => {
  try {
    const response = await axios.get('http://localhost:5000/areas');
    return response.data;
  } catch (error) {
    console.error('Error fetching shapes:', error);
    throw error;
  }
};

export { getShapes };

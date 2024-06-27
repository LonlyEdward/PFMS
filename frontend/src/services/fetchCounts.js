import axios from 'axios';

export const fetchCounts = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/counts/', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching counts:', error);
    throw error;
  }
};

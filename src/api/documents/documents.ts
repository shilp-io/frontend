import axios from 'axios';
import { API_BASE_URL } from '../config';
import { ENDPOINTS } from '../endpoints';

export const uploadPdf = async (file: File, userId: string): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('user_id', userId);

  const response = await axios.post(`${API_BASE_URL}${ENDPOINTS.UPLOAD_PDF}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data.message; // Assuming the API returns a message with the file URL
};
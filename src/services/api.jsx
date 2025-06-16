import axios from "axios";

const API_BASE_URL = "";

const apiClient = axios.create({
  baseURL: API_BASE_URL
});

// **GET**
export const getData = async (endpoint, params = {}) => {
  try {
    const response = await apiClient.get(endpoint, { params });
    return response.data;
  } catch (error) {
    console.error("GET error:", error);
    throw error;
  }
};

// **POST**
export const postData = async (endpoint, data) => {
  try {
    const response = await apiClient.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error("POST error:", error);
    throw error;
  }
};

// **Edit**
export const updateData = async (endpoint, data) => {
  try {
    const response = await apiClient.put(endpoint, data);
    return response.data;
  } catch (error) {
    console.error("PUT error:", error);
    throw error;
  }
};

// **DELETE**
export const deleteData = async (endpoint) => {
  try {
    const response = await apiClient.delete(endpoint);
    return response.data;
  } catch (error) {
    console.error("DELETE error:", error);
    throw error;
  }
};

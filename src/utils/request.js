import axios from "axios";

const request = axios.create({
  baseURL: "http://localhost:8080/api/v1/",
  timeout: 1000,
});

export const get = async (path) => {
  const response = await request.get(path);
  return response.data;
};

export const post = async (path, object = {}) => {
  const response = await request.post(path, object);
  return response.data;
};

export const deleted = async (path, id) => {
  const response = await request.delete(path, id);
  return "deleted";
};

export default request;

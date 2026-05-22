import API from "./api";

export const getEmployees = () =>
  API.get("/employees");

export const addEmployee = (data) =>
  API.post("/employees", data);

export const deleteEmployee = (id) =>
  API.delete(`/employees/${id}`);
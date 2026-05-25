import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import Dashboard from "./components/Dashboard";

import Employees from "./components/Employees";

import Departments from "./components/Departments";

import Attendance from "./components/Attendance";

import Leave from "./components/Leave";

import Salary from "./components/Salary";

import Analytics from "./components/Analytics";

import Inventory from "./components/Inventory";

import Finance from "./components/Finance";

import Task from "./components/Task";

import Performance from "./components/Performance";

import Recruitment from "./components/Recruitment";

import Profile from "./components/Profile";

import Login from "./components/Login";

import Register from "./components/Register";

import Reports from "./components/Reports";

import MainLayout from "./layouts/MainLayout";

function App() {

  return (

    <BrowserRouter>

      <ToastContainer />

      <Routes>

        {/* LOGIN */}

        <Route path="/" element={<Login />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        {/* DASHBOARD LAYOUT */}

        <Route element={<MainLayout />}>

          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/employees" element={<Employees />} />

          <Route path="/departments" element={<Departments />} />

          <Route path="/attendance" element={<Attendance />} />

          <Route path="/leave" element={<Leave />} />

          <Route path="/salary" element={<Salary />} />

          <Route path="/analytics" element={<Analytics />} />

          <Route path="/inventory" element={<Inventory />} />

          <Route path="/finance" element={<Finance />} />

          <Route path="/tasks" element={<Task />} />

          <Route path="/performance" element={<Performance />} />

          <Route path="/recruitment" element={<Recruitment />} />

          <Route path="/reports" element={<Reports />} />

          <Route path="/profile" element={<Profile />} />

        </Route>

      </Routes>

    </BrowserRouter>

  );
}

export default App;
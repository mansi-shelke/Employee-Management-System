import { useState, useEffect, useRef } from "react";
import Update from "./Update";
import Navbar from "./Navbar";
import axios from "axios";

function App() {
  const [activePage, setActivePage] = useState("home");
  const [showForm, setShowForm] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [salary, setSalary] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("");
  const [editEmployee, setEditEmployee] = useState(null);
  const [search, setSearch] = useState("");

  // Employee Table साठी Ref
  const tableRef = useRef(null);

  const scrollToTable = () => {
    setTimeout(() => {
      if (tableRef.current) {
        tableRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  // Save Employee
  const saveEmployee = () => {
    axios
      .post(
        "https://employee-management-backend-3dzy.onrender.com/saveEmployee",
        { name, email, phone, department, salary },
      )
      .then((response) => {
        setEmployees([...employees, response.data]);
        alert("Employee Added Successfully!");
        setName("");
        setEmail("");
        setPhone("");
        setDepartment("");
        setSalary("");
        setShowForm(false);
      })
      .catch((error) => console.log(error));
  };

  // Get Employees
  useEffect(() => {
    axios
      .get(
        "https://employee-management-backend-3dzy.onrender.com/getAllEmployees",
      )
      .then((response) => setEmployees(response.data))
      .catch((error) => console.log(error));
  }, []);

  // Delete Employee
  const deleteEmployee = (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this employee?",
    );

    if (isConfirmed) {
      axios
        .delete(
          `https://employee-management-backend-3dzy.onrender.com/deleteEmployee/${id}`,
        )
        .then(() => {
          setEmployees(employees.filter((emp) => emp.id !== id));
          alert("Employee Deleted Successfully!");
        })
        .catch((error) => console.log(error));
    }
  };

  // Update Employee
  const updateEmployee = () => {
    axios
      .put(
        `https://employee-management-backend-3dzy.onrender.com/updateEmployee/${editEmployee.id}`,
        editEmployee,
      )
      .then((response) => {
        setEmployees(
          employees.map((emp) =>
            emp.id === editEmployee.id ? response.data : emp,
          ),
        );
        alert("Employee Updated Successfully!");
        setEditEmployee(null);
      })
      .catch((error) => console.log(error));
  };

  // Search Employee
  const filteredEmployees = employees.filter((employee) => {
    const searchText = search.toLowerCase();
    return (
      employee.name?.toLowerCase().includes(searchText) ||
      employee.email?.toLowerCase().includes(searchText) ||
      employee.department?.toLowerCase().includes(searchText)
    );
  });

  // 📊 DASHBOARD LOGIC (यामुळे तो एरर जात आहे)
  const totalEmployees = employees.length;

  const totalSalary = employees.reduce((sum, emp) => {
    return sum + (Number(emp.salary) || 0);
  }, 0);

  const totalDepartments = new Set(
    employees
      .map((emp) => emp.department?.trim().toLowerCase())
      .filter(Boolean),
  ).size;

  return (
    <div className="min-h-screen bg-purple-100/60 flex flex-col font-sans">
      {/* Navbar */}
      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
        search={search}
        setSearch={setSearch}
      />
      {/* Main Content */}
      <main className="flex-grow">
        {/* ================= HOME PAGE ================= */}
        {activePage === "home" && (
          <div className="max-w-6xl mx-auto px-6 py-16 text-center">
            {/* Header Title */}
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
              Employee Management{" "}
              <span className="text-purple-600">System</span>
            </h1>

            <p className="text-slate-600 text-lg mb-8 max-w-xl mx-auto">
              Manage your employees easily and efficiently.
            </p>

            {/* View Employees Button */}
            <button
              onClick={() => setActivePage("employees")}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3.5 rounded-xl font-semibold shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition duration-200"
            >
              View Employees
            </button>

            {/* 📊 STATS DASHBOARD CARDS (फक्त होम पेजवर बदलले आहेत) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 text-left">
              {/* Card 1: Total Employees */}
              <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition border border-purple-100 flex items-center gap-4">
                <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center text-2xl font-bold">
                  👥
                </div>
                <div>
                  <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">
                    Total Employees
                  </p>
                  <h3 className="text-3xl font-extrabold text-slate-900 mt-1">
                    {totalEmployees}
                  </h3>
                </div>
              </div>

              {/* Card 2: Total Salary Expense */}
              <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition border border-purple-100 flex items-center gap-4">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center text-2xl font-bold">
                  💰
                </div>
                <div>
                  <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">
                    Total Payroll
                  </p>
                  <h3 className="text-3xl font-extrabold text-slate-900 mt-1">
                    ₹{totalSalary.toLocaleString("en-IN")}
                  </h3>
                </div>
              </div>

              {/* Card 3: Total Departments */}
              <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition border border-purple-100 flex items-center gap-4">
                <div className="w-14 h-14 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center text-2xl font-bold">
                  🏢
                </div>
                <div>
                  <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">
                    Active Departments
                  </p>
                  <h3 className="text-3xl font-extrabold text-slate-900 mt-1">
                    {totalDepartments}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* ================= EMPLOYEES ================= */}
        {activePage === "employees" && (
          <div className="max-w-7xl mx-auto px-6 py-10">
            <h1 className="text-3xl font-extrabold text-center text-slate-900 mb-6">
              Employee Directory
            </h1>

            {/* Add Employee Button */}
            <div className="flex justify-center mb-8">
              <button
                onClick={() => setShowForm(true)}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold shadow-md shadow-purple-500/20 transition duration-200 flex items-center gap-2"
              >
                <span>+</span> Add Employee
              </button>
            </div>

            {/* Employee List Table (इथे ref जोडला आहे) */}
            <div
              ref={tableRef}
              className="overflow-x-auto bg-white rounded-2xl shadow-md border border-purple-100"
            >
              <table className="w-full text-left border-collapse">
                <thead className="bg-purple-600 text-white">
                  <tr>
                    <th className="px-6 py-4 font-semibold text-sm">ID</th>
                    <th className="px-6 py-4 font-semibold text-sm">Name</th>
                    <th className="px-6 py-4 font-semibold text-sm">Email</th>
                    <th className="px-6 py-4 font-semibold text-sm">Phone</th>
                    <th className="px-6 py-4 font-semibold text-sm">
                      Department
                    </th>
                    <th className="px-6 py-4 font-semibold text-sm">Salary</th>
                    <th className="px-6 py-4 font-semibold text-sm text-center">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-purple-50 text-slate-700">
                  {filteredEmployees.map((employee) => (
                    <tr
                      key={employee.id}
                      className="hover:bg-purple-50/50 transition duration-150"
                    >
                      <td className="px-6 py-4 font-medium">{employee.id}</td>
                      <td className="px-6 py-4 font-semibold text-slate-800">
                        {employee.name}
                      </td>
                      <td className="px-6 py-4">{employee.email}</td>
                      <td className="px-6 py-4">{employee.phone}</td>
                      <td className="px-6 py-4">
                        <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold">
                          {employee.department}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-medium">
                        ₹{employee.salary}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => setEditEmployee(employee)}
                          className="bg-purple-100 hover:bg-purple-200 text-purple-700 font-medium px-3.5 py-1.5 rounded-lg mr-2 transition duration-200"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => deleteEmployee(employee.id)}
                          className="bg-rose-100 hover:bg-rose-200 text-rose-600 font-medium px-3.5 py-1.5 rounded-lg transition duration-200"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* No Result */}
            {filteredEmployees.length === 0 && (
              <div className="text-center py-12 bg-white rounded-2xl border border-purple-100 mt-4">
                <p className="text-slate-500 font-medium">
                  No employees found.
                </p>
              </div>
            )}
          </div>
        )}

        {/* ================= ABOUT ================= */}
        {/* ================= ABOUT PAGE ================= */}
        {activePage === "about" && (
          <div className="max-w-5xl mx-auto px-6 py-12">
            {/* Header Section */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
                About{" "}
                <span className="text-purple-600">
                  Employee Management System
                </span>
              </h1>
              <p className="text-slate-600 text-base max-w-2xl mx-auto">
                A modern, full-stack web application designed to streamline HR
                management, track employee records, and optimize organizational
                efficiency.
              </p>
            </div>

            {/* 🎯 Key Features Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white p-6 rounded-2xl border border-purple-100 shadow-sm hover:shadow-md transition">
                <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center text-xl font-bold mb-4">
                  ⚡
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">
                  Real-time Analytics
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Track total employees, active departments, and total salary
                  expenses dynamically on the dashboard.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-purple-100 shadow-sm hover:shadow-md transition">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center text-xl font-bold mb-4">
                  🔒
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">
                  Full CRUD Functionality
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Seamlessly add new workforce, update existing employee
                  records, or delete outdated data with confirmation modals.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-purple-100 shadow-sm hover:shadow-md transition">
                <div className="w-14 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center text-xl font-bold mb-4">
                  🔍
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">
                  Smart Search & Filter
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Instantly find any employee by searching their Name, Email, or
                  Department in real-time.
                </p>
              </div>
            </div>

            {/* 🛠 Tech Stack Section */}
            <div className="bg-white rounded-2xl border border-purple-100 shadow-sm p-8 mb-12">
              <h2 className="text-2xl font-bold text-slate-900 text-center mb-8">
                Tech Stack & Architecture
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="p-4 bg-purple-50/50 rounded-xl border border-purple-100 text-center">
                  <span className="text-2xl mb-1 block">⚛️</span>
                  <h4 className="font-bold text-slate-800">React.js</h4>
                  <p className="text-xs text-purple-600 font-medium mt-1">
                    Frontend Framework
                  </p>
                </div>

                <div className="p-4 bg-purple-50/50 rounded-xl border border-purple-100 text-center">
                  <span className="text-2xl mb-1 block">🎨</span>
                  <h4 className="font-bold text-slate-800">Tailwind CSS</h4>
                  <p className="text-xs text-purple-600 font-medium mt-1">
                    Modern UI Styling
                  </p>
                </div>

                <div className="p-4 bg-purple-50/50 rounded-xl border border-purple-100 text-center">
                  <span className="text-2xl mb-1 block">🌱</span>
                  <h4 className="font-bold text-slate-800">Spring Boot</h4>
                  <p className="text-xs text-purple-600 font-medium mt-1">
                    REST API Backend
                  </p>
                </div>

                <div className="p-4 bg-purple-50/50 rounded-xl border border-purple-100 text-center">
                  <span className="text-2xl mb-1 block">🐘</span>
                  <h4 className="font-bold text-slate-800">PostgreSQL</h4>
                  <p className="text-xs text-purple-600 font-medium mt-1">
                    Relational Database
                  </p>
                </div>
              </div>
            </div>

            {/* 👨‍💻 Developer Profile Card */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white shadow-lg text-center">
              <h3 className="text-2xl font-bold mb-2">Developed with ❤️</h3>
              <p className="text-purple-100 text-sm max-w-lg mx-auto mb-6">
                Designed and engineered as a full-stack project demonstrating
                production-ready CRUD workflows and clean REST integration.
              </p>

              <div className="inline-flex items-center gap-3 bg-white/10 px-5 py-2.5 rounded-full backdrop-blur-md border border-white/20 text-sm font-medium">
                🚀 Full Stack Developer Project
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ================= ADD EMPLOYEE MODAL ================= */}
      {showForm && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 relative border border-purple-100">
            <button
              onClick={() => setShowForm(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 text-2xl"
            >
              ×
            </button>

            <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
              Add New Employee
            </h2>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-purple-100 rounded-xl px-4 py-2.5 text-slate-800 outline-none focus:ring-2 focus:ring-purple-500 transition"
              />

              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-purple-100 rounded-xl px-4 py-2.5 text-slate-800 outline-none focus:ring-2 focus:ring-purple-500 transition"
              />

              <input
                type="number"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border border-purple-100 rounded-xl px-4 py-2.5 text-slate-800 outline-none focus:ring-2 focus:ring-purple-500 transition"
              />

              <input
                type="text"
                placeholder="Department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full border border-purple-100 rounded-xl px-4 py-2.5 text-slate-800 outline-none focus:ring-2 focus:ring-purple-500 transition"
              />

              <input
                type="number"
                placeholder="Enter Salary"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                className="w-full border border-purple-100 rounded-xl px-4 py-2.5 text-slate-800 outline-none focus:ring-2 focus:ring-purple-500 transition"
              />

              <button
                onClick={saveEmployee}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-semibold shadow-lg shadow-purple-500/20 transition duration-200 mt-2"
              >
                Save Employee
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= UPDATE MODAL ================= */}
      {editEmployee && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 relative border border-purple-100">
            <button
              onClick={() => setEditEmployee(null)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 text-2xl"
            >
              ×
            </button>

            <Update
              employee={editEmployee}
              setEmployee={setEditEmployee}
              updateEmployee={updateEmployee}
            />
          </div>
        </div>
      )}

      {/* ================= FOOTER ================= */}
      <footer className="bg-purple-950 text-purple-200 border-t border-purple-900 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center">
          <h2 className="text-xl font-bold text-white mb-2">
            Employee Management System
          </h2>

          <p className="text-purple-300 text-sm">
            Manage employee records easily and efficiently.
          </p>

          <div className="border-t border-purple-900 mt-6 pt-4">
            <p className="text-purple-400 text-xs">
              © 2026 Employee Management System. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

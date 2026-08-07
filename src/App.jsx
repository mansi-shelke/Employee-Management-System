import { useState, useEffect } from "react";
import "./App.css";
import Update from "./Update";
import axios from "axios";

function App() {
  const [showForm, setShowForm] = useState(false);

  const [employees, setEmployees] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [salary, setSalary] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("");
  const [editEmployee, setEditEmployee] = useState(null);

  const saveEmployee = () => {
    console.log("Save button clicked");

    axios
      .post("http://localhost:8080/saveEmployee", {
        name,
        email,
        phone,
        department,
        salary,
      })
      .then((response) => {
        console.log(response.data);

        setEmployees([...employees, response.data]);

        alert("Employee Added Successfully!");

        setName("");
        setEmail("");
        setPhone("");
        setDepartment("");
        setSalary("");
        setShowForm(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/getAllEmployees")
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const deleteEmployee = (id) => {
    axios
      .delete(`http://localhost:8080/deleteEmployee/${id}`)
      .then(() => {
        setEmployees(employees.filter((emp) => emp.id !== id));
      })
      .catch((error) => console.log(error));
  };

  const updateEmployee = () => {
    axios
      .put(
        `http://localhost:8080/updateEmployee/${editEmployee.id}`,
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
      });
  };

  return (
    <>
      <h1 id="k">Employee Management System</h1>

      <button className="a" onClick={() => setShowForm(true)}>
        Add Employee
      </button>

      {showForm && (
        <div className="b">
          <div className="c">
            <button className="d" onClick={() => setShowForm(false)}>
              ×
            </button>

            <h2>Add Employee</h2>

            <input
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <br />
            <br />

            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <br />
            <br />

            <input
              type="number"
              placeholder="phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <br />
            <br />

            <input
              type="text"
              placeholder="Department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />

            <br />
            <br />

            <input
              type="number"
              placeholder="Enter Salary"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
            />

            <br />
            <br />

            <button onClick={saveEmployee}>Save Employee</button>
          </div>
        </div>
      )}
      <center>
        <h2 id="w">Employee List</h2>
      </center>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.phone}</td>
              <td>{employee.department}</td>
              <td>{employee.salary}</td>
              <td>
                <button onClick={() => deleteEmployee(employee.id)}>
                  Delete
                </button>

                <button onClick={() => setEditEmployee(employee)}>
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editEmployee && (
        <div className="b">
          <div className="c">
            <button className="d" onClick={() => setEditEmployee(null)}>
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
    </>
  );
}

export default App;

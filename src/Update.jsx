function Update({ employee, setEmployee, updateEmployee }) {
  return (
    <div>
      <h2>Update Employee</h2>

      <input
        type="text"
        value={employee.name}
        onChange={(e) => setEmployee({ ...employee, name: e.target.value })}
      />

      <br />
      <br />

      <input
        type="email"
        value={employee.email}
        onChange={(e) => setEmployee({ ...employee, email: e.target.value })}
      />

      <br />
      <br />

      <input
        type="number"
        value={employee.phone}
        onChange={(e) => setEmployee({ ...employee, phone: e.target.value })}
      />

      <br />
      <br />

      <input
        type="text"
        value={employee.department}
        onChange={(e) =>
          setEmployee({ ...employee, department: e.target.value })
        }
      />

      <br />
      <br />

      <input
        type="number"
        value={employee.salary}
        onChange={(e) => setEmployee({ ...employee, salary: e.target.value })}
      />

      <br />
      <br />

      <button onClick={updateEmployee}>Update Employee</button>
    </div>
  );
}

export default Update;

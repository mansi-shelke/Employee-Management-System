import React from "react";

function Update({ employee, setEmployee, updateEmployee }) {
  if (!employee) return null;

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
        Update Employee Details
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">
            Name
          </label>
          <input
            type="text"
            value={employee.name || ""}
            onChange={(e) => setEmployee({ ...employee, name: e.target.value })}
            className="w-full border border-purple-100 rounded-xl px-4 py-2 text-slate-800 outline-none focus:ring-2 focus:ring-purple-500 transition"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">
            Email
          </label>
          <input
            type="email"
            value={employee.email || ""}
            onChange={(e) =>
              setEmployee({ ...employee, email: e.target.value })
            }
            className="w-full border border-purple-100 rounded-xl px-4 py-2 text-slate-800 outline-none focus:ring-2 focus:ring-purple-500 transition"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">
            Phone
          </label>
          <input
            type="number"
            value={employee.phone || ""}
            onChange={(e) =>
              setEmployee({ ...employee, phone: e.target.value })
            }
            className="w-full border border-purple-100 rounded-xl px-4 py-2 text-slate-800 outline-none focus:ring-2 focus:ring-purple-500 transition"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">
            Department
          </label>
          <input
            type="text"
            value={employee.department || ""}
            onChange={(e) =>
              setEmployee({ ...employee, department: e.target.value })
            }
            className="w-full border border-purple-100 rounded-xl px-4 py-2 text-slate-800 outline-none focus:ring-2 focus:ring-purple-500 transition"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">
            Salary
          </label>
          <input
            type="number"
            value={employee.salary || ""}
            onChange={(e) =>
              setEmployee({ ...employee, salary: e.target.value })
            }
            className="w-full border border-purple-100 rounded-xl px-4 py-2 text-slate-800 outline-none focus:ring-2 focus:ring-purple-500 transition"
          />
        </div>

        <button
          onClick={updateEmployee}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-semibold shadow-lg shadow-purple-500/20 transition duration-200 mt-4"
        >
          Update Employee
        </button>
      </div>
    </div>
  );
}

export default Update;

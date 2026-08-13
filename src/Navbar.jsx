function Navbar({
  activePage,
  setActivePage,
  search,
  setSearch,
  scrollToTable,
}) {
  return (
    <nav className="bg-purple-600 text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <button
          onClick={() => setActivePage("home")}
          className="text-xl font-bold hover:text-purple-200 transition tracking-wide"
        >
          Employee Management
        </button>

        <div className="flex items-center gap-6">
          <button
            onClick={() => setActivePage("home")}
            className={`hover:text-purple-200 transition ${
              activePage === "home"
                ? "text-white font-bold border-b-2 border-white pb-0.5"
                : "text-purple-100"
            }`}
          >
            Home
          </button>

          <button
            onClick={() => {
              setActivePage("employees");
              if (scrollToTable) scrollToTable();
            }}
            className={`hover:text-purple-200 transition ${
              activePage === "employees"
                ? "text-white font-bold border-b-2 border-white pb-0.5"
                : "text-purple-100"
            }`}
          >
            Employees
          </button>

          <button
            onClick={() => setActivePage("about")}
            className={`hover:text-purple-200 transition ${
              activePage === "about"
                ? "text-white font-bold border-b-2 border-white pb-0.5"
                : "text-purple-100"
            }`}
          >
            About
          </button>

          <input
            type="text"
            placeholder="Search Employee..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setActivePage("employees");
            }}
            className="w-48 px-4 py-2 rounded-xl text-slate-800 bg-white/90 placeholder-purple-400 outline-none focus:ring-2 focus:ring-purple-300 transition text-sm"
          />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

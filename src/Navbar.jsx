import "./Navbar.css";
function Navbar() {
  return (
    <nav className="nav">
      <h2>Employee Management</h2>

      <div>
        <a href="#">Home</a>
        <a href="#">Employees</a>
        <a href="#">About</a>

        <input type="text" placeholder="Search Employee" />
      </div>
    </nav>
  );
}

export default Navbar;

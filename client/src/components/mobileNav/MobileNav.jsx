function MobileNav({ state, setState }) {
  return (
    <nav className="mobileNav" onClick={() => setState(!state)}>
      <div className="navLink" href="#">
        <div style={{ backgroundColor: state ? "#fff" : "#000" }}></div>
        <div style={{ backgroundColor: state ? "#fff" : "#000" }}></div>
        <div style={{ backgroundColor: state ? "#fff" : "#000" }}></div>
      </div>
    </nav>
  );
}

export default MobileNav;

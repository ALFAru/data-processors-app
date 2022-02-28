import React from "react";

const NavBar = ({ currentYear, onYearChange }) => {
  const years = [2017, 2018, 2019, 2020, 2021, 2022];

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          University Rankings
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            {years.map((year) => (
              <a
                key={year}
                onClick={() => onYearChange(year)}
                className={
                  currentYear == year ? "nav-link active disabled" : "nav-link"
                }
              >
                {year}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUni } from "../data/qs-world-university-rankings-2017-to-2022-V2";

const University = (props) => {
  let { year, name } = useParams();
  const navigate = useNavigate();
  let uni = getUni(name, year);
  console.log(uni);

  function handleClick() {
    navigate("/");
  }

  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            University Rankings
          </a>
        </div>
      </nav>

      <div className="container">
        <div className="row">
          <div className="col align-self-center">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">University name:</h5>
                <p className="card-text">{uni.university}</p>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Location</h5>
                <p className="card-text">
                  {uni.country}, {uni.city}
                </p>
              </div>
            </div>
          </div>
          <div className="col align-self-center">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Rank</h5>
                <p className="card-text">{uni.rank_display}</p>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Type and Size</h5>
                <p className="card-text">
                  {uni.type}, {uni.size}
                </p>
              </div>
            </div>
          </div>
          <div className="col align-self-center">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Year</h5>
                <p className="card-text">{uni.year}</p>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Link</h5>
                <p className="card-text">
                  <a href={uni.link}>Link to {uni.university}</a>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col align-self-center">
            <div>
              <div className="card-body">
                <h5 className="card-title"></h5>
                <p className="card-text"></p>
              </div>
            </div>
          </div>
          <div className="col align-self-center">
            <div>
              <div className="card-body">
                <h5 className="card-title"></h5>
                <p className="card-text">
                  <button
                    onClick={handleClick}
                    type="button"
                    className="btn btn-secondary"
                  >
                    Go Back
                  </button>
                </p>
              </div>
            </div>
          </div>
          <div className="col align-self-center">
            <div>
              <div className="card-body">
                <h5 className="card-title"></h5>
                <p className="card-text"></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default University;

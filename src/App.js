import React, { Component, useState, useRef, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import NavBar from "./components/navBar";
import CustomizedDialogs from "./components/popUp";
import { getUnis } from "./data/qs-world-university-rankings-2017-to-2022-V2";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

class App extends Component {
  state = {
    popUp: 0,
    year: 2022,
    rowData: getUnis(2022),
    columnDefs: [],
    uni: {},
  };

  componentDidMount() {
    this.setState({
      columnDefs: [
        { field: "university", flex: 1 },
        { field: "rank_display", comparator: this.yearComparator, width: 150 },
        { field: "country", width: 300 },
        { field: "city", width: 200 },
        { field: "size", width: 150 },
      ],
    });
  }

  yearComparator = (year1, year2) => {
    const yearNum1 = parseInt(year1);
    const yearNum2 = parseInt(year2);
    if (yearNum1 === null && yearNum2 === null) {
      return 0;
    }
    if (yearNum1 === null) {
      return -1;
    }
    if (yearNum2 === null) {
      return 1;
    }
    return yearNum1 - yearNum2;
  };

  handleYearChange = (year) => {
    this.setState({ year, rowData: getUnis(year) });
  };

  handleRowClick = ({ data }) => {
    console.log(data, "Clicked");
    const popUp = this.state.popUp + 1;
    this.setState({ uni: data, popUp });
  };
  handlePopClose = () => {
    console.log("its closed");
    this.setState({ popUp: 0 });
  };

  render() {
    const defaultColDef = {
      sortable: true,
      filter: true,
      floatingFilter: true,
    };
    return (
      <div className="ag-theme-alpine" style={{ height: 700 }}>
        {this.state.popUp > 0 ? (
          <CustomizedDialogs
            openState={true}
            onClose={this.handlePopClose}
            data={this.state.uni}
          />
        ) : null}
        <NavBar
          onYearChange={this.handleYearChange}
          currentYear={this.state.year}
        />
        <AgGridReact
          rowData={this.state.rowData}
          columnDefs={this.state.columnDefs}
          defaultColDef={defaultColDef}
          pagination={true}
          paginationAutoPageSize={true}
          onRowClicked={(e) => this.handleRowClick(e)}
        ></AgGridReact>
      </div>
    );
  }
}

export default App;

// const App = () => {
//   const [popUp, setPopUp] = useState(false);
//   const [year, setYear] = useState(2022);
//   // let temp = getUnis(year);
//   // temp.forEach((element) => {
//   //   element.year = parseInt(element.year);
//   //   console.log(typeof element.year);
//   // });
//   const [rowData, setData] = useState(getUnis(year));

//   const yearComparator = (year1, year2) => {
//     const yearNum1 = parseInt(year1);
//     const yearNum2 = parseInt(year2);
//     if (yearNum1 === null && yearNum2 === null) {
//       return 0;
//     }
//     if (yearNum1 === null) {
//       return -1;
//     }
//     if (yearNum2 === null) {
//       return 1;
//     }
//     return yearNum1 - yearNum2;
//   };

//   const [columnDefs] = useState([
//     { field: "university", flex: 1 },
//     { field: "rank_display", comparator: yearComparator, width: 150 },
//     { field: "country", width: 300 },
//     { field: "city", width: 200 },
//     { field: "size", width: 150 },
//   ]);

//   const defaultColDef = {
//     sortable: true,
//     filter: true,
//     floatingFilter: true,
//   };

//   const handleYearChange = (year) => {
//     setYear(year);
//     setData(getUnis(year));
//   };

//   const handleRowClick = ({ data }) => {
//     console.log(data, "Clicked");
//     setPopUp(true);
//   };

//   const handlePopUp = () => {};

//   return (
//     <div className="ag-theme-alpine" style={{ height: 700 }}>
//       <CustomizedDialogs openState={popUp} />
//       <NavBar onYearChange={handleYearChange} currentYear={year} />
//       <AgGridReact
//         rowData={rowData}
//         columnDefs={columnDefs}
//         defaultColDef={defaultColDef}
//         pagination={true}
//         paginationAutoPageSize={true}
//         onRowClicked={(e) => handleRowClick(e)}
//       ></AgGridReact>
//     </div>
//   );
// };

// export default App;

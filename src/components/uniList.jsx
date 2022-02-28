import React, { Component } from "react";
import { getUnis } from "../data/qs-world-university-rankings-2017-to-2022-V2";
import Pagination from "./pagination";
import _ from "lodash";
import NavBar from "./navBar";
import UniTable from "./uniTable";

class UniList extends Component {
  state = {
    unis: [],
    pageSize: 12,
    currentPage: 1,
    currentYear: 2022,
    sortCol: null,
  };

  componentDidMount() {
    this.setState({ unis: getUnis(2022) });
  }

  paginate = (unis) => {
    const indexStart = (this.state.currentPage - 1) * this.state.pageSize;
    return _(unis).slice(indexStart).take(this.state.pageSize).value();
  };

  handlePageChange = (pageNum) => {
    this.setState({ currentPage: pageNum });
  };

  handleYearChange = (year) => {
    this.setState({
      unis: getUnis(year),
      currentYear: year,
      sortCol: null,
      currentPage: 1,
    });
  };

  handleSort = (col) => {
    if (col === "rank_display") {
      let unis = this.state.unis;
      for (let i = 0; i < unis.length; i++) {
        unis[i].rank_display = parseInt(unis[i].rank_display);
      }

      const sortCol = { ...this.state.sortCol };
      if (sortCol.col === col) {
        sortCol.order = sortCol.order === "desc" ? "asc" : "desc";
      } else if (!sortCol.col) {
        sortCol.col = col;
        sortCol.order = "desc";
      } else {
        sortCol.col = col;
        sortCol.order = "asc";
      }

      this.setState({ unis, sortCol });
    } else {
      const sortCol = { ...this.state.sortCol };
      if (sortCol.col === col) {
        sortCol.order = sortCol.order === "asc" ? "desc" : "asc";
      } else {
        sortCol.col = col;
        sortCol.order = "asc";
      }
      this.setState({ sortCol });
    }
  };

  render() {
    const { pageSize, currentPage, currentYear, sortCol } = this.state;

    let pagUnis = null;

    if (sortCol) {
      pagUnis = _.orderBy(this.state.unis, [sortCol.col], [sortCol.order]);
      pagUnis = this.paginate(pagUnis);
    } else {
      pagUnis = this.paginate(this.state.unis);
    }

    return (
      <React.Fragment>
        <NavBar
          currentYear={currentYear}
          onYearChange={this.handleYearChange}
        />

        <UniTable unis={pagUnis} onSort={this.handleSort} sortCol={sortCol} />

        <Pagination
          count={this.state.unis.length}
          pageSize={pageSize}
          onPageChange={this.handlePageChange}
          currentPage={currentPage}
        />
      </React.Fragment>
    );
  }
}

export default UniList;

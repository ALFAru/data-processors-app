import React, { Component } from "react";
import { Link } from "react-router-dom";

class UniTable extends Component {
  columns = [
    { col: "university", label: "University Name" },
    { col: "rank_display", label: "Rank" },
    { col: "country", label: "Country" },
    { col: "city", label: "City" },
    { col: "size", label: "Size" },
  ];

  renderIcon = (column) => {
    if (!this.props.sortCol) return null;
    if (column.col !== this.props.sortCol.col) return null;
    if (this.props.sortCol.order === "asc")
      return <i className="fa fa-sort-asc"></i>;
    return <i className="fa fa-sort-desc"></i>;
  };

  render() {
    const { sortCol, onSort, unis } = this.props;
    return (
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            {this.columns.map((column) => (
              <th key={column.col} onClick={() => onSort(column.col)}>
                {column.label} {this.renderIcon(column)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {unis.map((uni) => (
            <tr key={uni.university}>
              <td>
                <Link to={`/uni/${uni.year}/${uni.university}`}>
                  {uni.university}
                </Link>
              </td>
              <td>{uni.rank_display}</td>
              <td>{uni.country}</td>
              <td>{uni.city}</td>
              <td>{uni.size}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default UniTable;

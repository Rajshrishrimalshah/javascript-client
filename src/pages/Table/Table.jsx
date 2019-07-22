/* eslint-disable no-unused-vars */
import moment from "moment";
import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Paper from "@material-ui/core/Paper";

const style = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  table: {
    minWidth: 650
  }
});

class TablePage extends Component {
  render() {
    const { classes, data, columns, onSort, order, orderBy } = this.props;

    return (
      <Paper className={classes.root}>
        <Table className={classes.table} style={{}}>
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell
                  key={column.field}
                  align={column.align}
                  // sortDirection={orderBy === column.field ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === column.field}
                    direction={order}
                    onClick={() => onSort(column.field)}
                  >
                    {column.label}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map(row => (
              <TableRow key={row.name} hover selected={10 % 2 === 0}>
                {columns.map(column => (
                  <TableCell component="th" scope="row" align={column.align}>
                    {column.format
                      ? column.format(row[column.field])
                      : row[column.field]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default withStyles(style)(TablePage);

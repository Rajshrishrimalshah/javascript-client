import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const style = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',

  },
  table: {
    minWidth: 650,
  },
});

class TablePage extends Component {


  render() {
    const { classes, data, columns } = this.props;

    return (
      <Paper className={classes.root}>
      <Table className={classes.table} style={{}}>

      <TableHead>
        <TableRow >
          {
            columns.map(column =>
            <TableCell key={column.field} align={column.align} > {column.label}</TableCell>
          )
          }
        </TableRow>
      </TableHead>

        <TableBody>
          {data.map(row => (
            <TableRow key={row.name}>
            {
              columns.map(column => (
                <TableCell component="th" scope="row" align={column.align}>
                  {row[column.field]}
                </TableCell>
              ))
            }
            </TableRow>
          ))
          }
        </TableBody>


      </Table>
    </Paper>
  );
}
}

export default withStyles(style)(TablePage);

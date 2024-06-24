import React, { useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  Paper,
  TableRow,
  Table,
  IconButton,
  TableHead,
  TableBody,
  TablePagination,
  TableCell,
  TableContainer,
} from "@material-ui/core";

const StyledTableHead = withStyles((theme) => ({
  head: {
    backgroundColor: "#f4f8fd",
    color: theme.palette.common.black,
    borderColor: "#e0e0e0",
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.action.white,
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

const PatientsTable = ({ rows = [], columns = [], handleDelete }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const classes = useStyles();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
   
  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <StyledTableHead
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </StyledTableHead>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.length > 0 &&
              rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(({ firstName, lastName, patientId, email }) => {
                  return (
                    <StyledTableRow key={`pat-${patientId}`}>
                      <StyledTableCell component="th" scope="row">
                        {`${firstName} ${lastName}`}
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        {`${email}`}
                      </StyledTableCell>
                      {/* Delete */}
                      <StyledTableCell align="right">
                        <IconButton
                          onClick={() => handleDelete(patientId)}
                          size="small"
                          aria-label="delete"
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};
export default PatientsTable;

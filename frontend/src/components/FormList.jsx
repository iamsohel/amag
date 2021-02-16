import React, {useEffect, useState} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import {Card, CardContent, CircularProgress} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import useRouter from '../util/useRouter';

import {getForms} from '../apis/api';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles( theme => ({
    root: {
        minHeight: "70vh",
        alignContent: "stretch",
        [theme.breakpoints.down("sm")]: {
            alignContent: "flex-start"
        },
        marginTop: '30px',
        border: '2px solid #9fc5e8'
    },
    table: {
        minWidth: 700,
        marginTop: '30px'
    },
    headerCard: {
        backgroundColor:'#f5f5f5',
        marginTop:'20px'
    }
}));

export default function FormList() {
  const { history } = useRouter();
  const classes = useStyles();
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(false)

  const getFormData = async () => {
    setLoading(true)
    try{
      const {data } = await getForms();
      setForms(data.forms);
      setLoading(false)
    } catch(ex) {
      setLoading(false)
    }
  }

  useEffect(()=> {
    getFormData();
  },[])

  return (
    <Container container className={classes.root}>
      <Card className={classes.headerCard}>
            <CardContent>
                <Button
                variant="contained"
                color="primary"
                size="large"
                type="submit"
                onClick={() => {
                  history.push("/form/new")
                }}
                >
                    Create Form
                </Button>
                <Button
                    variant="contained"
                    color="secondary"  
                    size="large"
                    style={{marginLeft:"5px"}}
                    onClick={() => {
                      history.push("/");
                      localStorage.removeItem("token")
                    }}
                    >
                    Logout
                </Button>
                {loading && (<CircularProgress />)}
            </CardContent>
        </Card>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Form List</StyledTableCell>
            <StyledTableCell align="right">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {forms.length > 0 && forms.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">
              <Button
                variant="contained"
                color="primary"
                size="large"
                type="submit"
                onClick={() => {
                  history.push("/form/"+ row.id)
                }}
                >
                Update
            </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Container>
  );
}

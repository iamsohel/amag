import React, {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, TextField, Button, Card, CardContent, Container, Typography, CircularProgress } from "@material-ui/core";
import SaveIcon from '@material-ui/icons/Save';
import {Link} from 'react-router-dom';
import login  from '../../apis/api';
const useStyles = makeStyles(theme => ({
  root: {
    minHeight: "70vh",
    alignContent: "stretch",
    [theme.breakpoints.down("sm")]: {
      alignContent: "flex-start"
    },
    marginTop: '30px',
    border: '2px solid #9fc5e8'
  },
  headerCard: {
    marginBottom: '30px',
    marginTop: '20px'
  },
  footerCard: {
    marginTop: '20px',
    marginBottom: '20px',
    backgroundColor:"#F2f2f2"
  },
  divider: {
    marginBottom:"10px", marginTop: '5px'
  },
  
}));
function Login() {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoding] = useState(false);
  const [serverErrorMsg, setServerErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoding(true);
    const data ={
        email, password
    }
    try {
        const {data: jwt} = await login(data);
        localStorage.setItem("token", jwt.token)
        setLoding(false);
        window.location =  "/form-list";
    } catch(ex){
        setLoding(false);
        setServerErrorMsg(ex.response.data.message[0].message)
        console.log(ex.response)
    }
  }

  return (
      <Container container="true" className={classes.root}>
        <form onSubmit={handleSubmit}>
            <Card className={classes.headerCard}>
            <CardContent>
            <Typography variant="subtitle1" color="textSecondary">
                Login
            </Typography>
            {loading && (<CircularProgress />)}
            {serverErrorMsg && (
                 <Typography variant="subtitle1" color="secondary" >
                    {serverErrorMsg}
                </Typography>
            )}
            </CardContent>
            </Card>
            <Grid container spacing={2}>
            <Grid item xs={8}>
                <TextField
                placeholder='Email'
                id="email"
                name='email'
                label='Email'
                type="email"
                variant='outlined'
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
                InputLabelProps={{
                    shrink: true
                }}
                required
                inputProps={{
                    minLength: 3,
                    maxLength: 20
                }}
                fullWidth
                />
            </Grid>
            
            <Grid item xs={8} >
                <TextField
                placeholder='Password'
                name='password'
                label='Password'
                type="password"
                variant='outlined'
                margin='normal'
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
                InputLabelProps={{
                    shrink: true
                }}
                required
                inputProps={{
                    minLength: 6,
                    maxLength: 20
                }}
                fullWidth
                />
            </Grid>
           
            </Grid>
            <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<SaveIcon />}
                type="submit"
                >
                Login
            </Button>
            <Link to="/register" style={{textDecoration: 'none'}}>
                <Typography variant="subtitle1" color="textSecondary" style={{ marginTop: '20px'}}>
                    Don't a have account? Register
                </Typography>
            </Link>
        </form>
      </Container>
   
  );
}

export default Login;

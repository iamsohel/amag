import React, {useState, useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, TextField, Button, Card, CardContent, Container, CircularProgress, Typography } from "@material-ui/core";
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';
import Log from "./Log";
import useRouter from '../util/useRouter';

import {getForm, createFrom, updateForm} from '../apis/api';

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
function Form(props) {
  //console.log("params:: ",props.match.params.id);
  let param_id = props.match.params.id;
  const classes = useStyles();
  const [logs, setLogs] = useState([]);
  const [name, setName] = useState('');
  const [region, setRegion] = useState('');
  const [description, setDescription] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [loading, setLoding] = useState(false);
  const [serverErrorMsg, setServerErrorMsg] = useState('');
  const { history } = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name,
      region,
      description,
      latitude,
      longitude
    }
  setLoding(true);
    try {
      if(param_id === 'new'){
        await createFrom(data);
      } else {
        await updateForm(param_id, data);
      }
      setLoding(false);
      history.push("/form-list")
    } catch(ex){
        setLoding(false);
        setServerErrorMsg(ex.response.data.message[0].message)
        console.log(ex.response)
    }
  }

  const getFormData = async (id) => {
    try {
      const {data: response} = await getForm(id);
      let {name, region, description, latitude, longitude} = response.form;
      setName(name);
      setRegion(region);
      setDescription(description);
      setLatitude(latitude);
      setLongitude(longitude);
      setLogs(response.logs)
    } catch(ex) {
      console.log(ex)
    }
  }

  useEffect(() => {
    if(param_id !== 'new' ){
      getFormData(param_id)
    }
  }, [param_id])

  return (
      <Container container="true" className={classes.root}>
        <form onSubmit={handleSubmit}>
            <Card className={classes.headerCard}>
            <CardContent>
                <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<SaveIcon />}
                type="submit"
                >
                Save
            </Button>
            <Button
                variant="contained"
                color="inherit"  
                size="large"
                style={{marginLeft:"5px"}}
                startIcon={<CloseIcon />}
                onClick={() => {
                  history.push("/form-list")
                }}
                >
                Cancel
            </Button>
            {loading && (<CircularProgress />)}
            {serverErrorMsg && (
                 <Typography variant="subtitle1" color="secondary" >
                    {serverErrorMsg}
                </Typography>
            )}
            </CardContent>
            </Card>
            {/* <Divider /> */}
            <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                placeholder='Name'
                name='name'
                label='Name'
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                }}
                variant='outlined'
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
            <Grid item xs={12}>
                <TextField
                placeholder='Jurisdiction/City/Region'
                name='region'
                label='Jurisdiction/City/Region'
                variant='outlined'
                margin='normal'
                value={region}
                onChange={(e) => {
                  setRegion(e.target.value)
                }}
                InputLabelProps={{
                    shrink: true
                }}
                required
                fullWidth
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                placeholder='Site Description'
                name='description'
                label='Site Description'
                variant='outlined'
                margin='normal'
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value)
                }}
                InputLabelProps={{
                    shrink: true
                }}
                required
                fullWidth
                />
            </Grid>
            <Grid item xs={12} lg={4}>
                <TextField
                placeholder='Latitude'
                name='latitude'
                label='Latitude'
                variant='outlined'
                margin='normal'
                value={latitude}
                onChange={(e) => {
                  setLatitude(e.target.value)
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
            <Grid item xs={12} lg={4}>
                <TextField
                placeholder='Longitude'
                label='Longitude'
                name='longitude'
                variant='outlined'
                margin='normal'
                value={longitude}
                onChange={(e) => {
                  setLongitude(e.target.value)
                }}
                InputLabelProps={{
                    shrink: true
                }}
                inputProps={{
                    minLength: 3,
                    maxLength: 20
                }}
                required
                fullWidth
                />
            </Grid>
            </Grid>
        </form>
        {logs.length > 0 && <Log logs={logs}/> }
        
      </Container>
   
  );
}

export default Form;

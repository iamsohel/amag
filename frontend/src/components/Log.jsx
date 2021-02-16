import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {Divider, Card, CardContent, Typography } from "@material-ui/core";
import moment from 'moment';
const useStyles = makeStyles(theme => ({
  footerCard: {
    marginTop: '20px',
    marginBottom: '20px',
    backgroundColor:"#F2f2f2"
  },
  divider: {
    marginBottom:"10px", marginTop: '5px'
  },
  
}));
function Logs({logs}) {
  const classes = useStyles();
  return (
    <Card className={classes.footerCard}>
        <CardContent>
        <Typography component="h5" variant="h5">
        Audit Log:
        </Typography>
        <Divider className={classes.divider} />
          {logs.map(log => (
              <Typography variant="subtitle1" color="textSecondary" key={log.id}>
                  {log.event} by {log.User.name} on {moment(log.dateTime).format("DD/MM/YYYY, hh:mm:ss A")}
              </Typography>
          ))}
        </CardContent>
    </Card>
  );
}

export default Logs;

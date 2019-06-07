import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import React, { Component } from "react"
import { Redirect, Route } from 'react-router-dom';
import trainees from "./data/trainee";
import Typography from "@material-ui/core/Typography";
import NoMatch from "../NoMatch";
import { withStyles } from "@material-ui/core/styles";



const style = theme => ({
  card: {
    display: "flex",
  },
  details: {
    display: "flex",
    flex: 1,
    flexDirection: "column"
  },
  content: {
    flex: "1 0 auto"
  },
  cover: {
    width: 151,
    justifyContent: "flex-start"
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  },
});
class TraineeDetails extends Component {


  validateUser = (id) => {
    if(id)
      return trainees.filter( trainee  => id === trainee.id )
    else
      //return <Redirect to='/' />
      return <Route component={NoMatch} />
  }


  render() {
    const { classes } = this.props;
    const { id } = this.props.match.params
    const details = this.validateUser(id);
    console.log(details[0]);

    return(
      <div>
          <Card className={classes.card}>

          <CardMedia
            className={classes.cover}
            image="/images/thumb.png"
            title="Live from space album cover"
          />
        <div className={classes.details}>
            <CardContent className={classes.content}>
                <Typography component="h5" variant="h5">
                    {details[0].name}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                    Mac Miller
                </Typography>
                <Typography component="h6" variant="subtitle1">
                    <br />
                    {details[0].email}
                </Typography>
            </CardContent>
      </div>


        </Card>
      </div>
    );
  }
}

export default withStyles(style)(TraineeDetails);

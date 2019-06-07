import Button from '@material-ui/core/Button';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { Link } from "react-router-dom"
import moment from 'moment';
import React, { Component } from "react";
import trainees from "./data/trainee";
import Typography from "@material-ui/core/Typography";
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
  button: {
    margin: theme.spacing(1),
    alignItems: "center"
  },
  wrapper: {
    textAlign: "center"
  }
});
class TraineeDetails extends Component {


  validateUser = (id) => {
    if(id)
      return trainees.filter( trainee  => id === trainee.id )
    else
    return () => {
      return (
        <div style={{ textAlign: 'center'}}>
          <h1> Page Not Found</h1>
          <h3> You seems to be on wrong page ! </h3>
        </div>
      );
    };
  }

  printDateFormat = (date) => {
    return moment(date).format('dddd, MMMM Do YYYY, h:mm:ss a')
  }

  render() {
    const { classes } = this.props;
    const { id } = this.props.match.params
    const details = this.validateUser(id);

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
                    {this.printDateFormat(details[0].createdAt)}
                </Typography>
                <Typography component="h6" variant="subtitle1">
                    {details[0].email}
                </Typography>
            </CardContent>
      </div>
        </Card>

        <div className={classes.wrapper}>
            <br />
            <Link to="/trainee">
            <Button variant="contained" component="span" className={classes.button}>
                Back
            </Button>
            </Link>
        </div>

      </div>
    );
  }
}

export default withStyles(style)(TraineeDetails);

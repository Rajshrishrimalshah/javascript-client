/* eslint-disable no-unused-vars */
import AccountCircle from "@material-ui/icons/AccountCircle";
import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import Mail from "@material-ui/icons/Mail";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";

class EditDialog extends Component {
  constructor(props) {
    super(props);
    console.log('constructor', props.selectedRow);
    this.state = {
      name: "",
      email: ''
    }
  }

  handleFieldChange = event => {
    console.log('in change handler', event.target.name, event.target.value)
    this.setState(
      { [event.target.name]: event.target.value }
    );
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { selectedRow } = nextProps;
    const { name, email } = prevState;
    if (selectedRow && (selectedRow.email != prevState.email || selectedRow.name != prevState.name) )
    return {name: name, email: email}
    else
    return null;
  }

  handleSubmit = () => {
    const {name, email} = this.state;
    //console.log(`name: ${name}, email: ${email}`);
    console.log(this.state);
  }



  render() {
    const { name, email } = this.state;
    const { clickHandler, openProp, selectedRow, handleCancel } = this.props;
    // console.log(selectedRow.name);
    // console.log('name in state', this.state.name);
    console.log(this.state);



    const style = {
      margin: 12,
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-end"
    };

    return (
      <>
      <Dialog open={openProp} onClose={handleCancel} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit Trainee</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter your trainee details
          </DialogContentText>
          <Paper style={style}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                name="name"
                value={selectedRow.name}
                defaultValue={selectedRow.name}
                id="outlined-required"
                label="Name"
                margin="normal"
                variant="outlined"
                fullWidth
                onChange={this.handleFieldChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                name="email"
                defaultvalue={selectedRow.email}
                //defaultValue={selectedRow.email}
                id="outlined-required"
                label="Email Address"
                margin="normal"
                variant="outlined"
                fullWidth
                onChange={this.handleFieldChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Mail />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
          </Grid>
        </Paper>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button color="primary" onClick={this.handleSubmit}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      </>
    );
  }
}

export default EditDialog;

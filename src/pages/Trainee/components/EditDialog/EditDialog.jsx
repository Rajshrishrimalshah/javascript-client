/* eslint-disable no-unused-vars */
import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { callApi } from "../../../../lib/utils/api";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Mail from "@material-ui/icons/Mail";
import InputAdornment from "@material-ui/core/InputAdornment";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Button from "@material-ui/core/Button";
import { Grid, TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { withSnackBarConsumer } from "../../../../contexts/snackBarProvider/withSnackBarConsumer";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
});

class EditDialog extends React.PureComponent {
  constructor(props) {
    super(props);
    const { data } = props;
    const { name, email, _id } = data;
    this.state = { name, email, _id, button: true, loading: false };
  }

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
      button: false
    });
  };

  handleSubmit = async () => {
    const { name, email, _id } = this.state;
    const { snackBarOpen, onClose, reloadTable } = this.props;

    this.setState({
      loading: true
    });
    try {
      const res = await callApi({
        url: process.env.REACT_APP_BASE_URL + process.env.REACT_APP_UPDATE_URL,
        method: "put",
        data: {
          id: _id,
          name,
          email
        }
      });
      snackBarOpen(res.data.message, "success");
      console.log("success", res);
      this.setState({
        loading: false
      });
      onClose();
      reloadTable();
    } catch (error) {
      const err = error.response.data.message;
      snackBarOpen(err, "Error");
      this.setState({
        loading: false
      });
      onClose();
    }
  };

  render() {
    const { open, onClose, classes, snackBarOpen } = this.props;
    //console.log(this.state);
    const { name, email, loader, button, loading, _id } = this.state;
    console.log(_id);
    return (
      <Dialog open={open} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit Trainee Details</DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                id="outlined-name"
                label="Name"
                name="name"
                value={name}
                fullWidth
                defaultValue=""
                className={classes.textField}
                onChange={this.handleInputChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  )
                }}
                margin="normal"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-name"
                label="email"
                type="email"
                value={email}
                name="email"
                defaultValue=""
                fullWidth
                className={classes.textField}
                onChange={this.handleInputChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Mail />
                    </InputAdornment>
                  )
                }}
                margin="normal"
                variant="outlined"
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button color="primary" onClick={onClose}>
            Cancel
          </Button>

          <Button
            color="primary"
            disabled={button}
            onClick={() => {
              this.handleSubmit();
            }}
          >
            {loading && <CircularProgress />}
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
export default withSnackBarConsumer(withStyles(styles)(EditDialog));

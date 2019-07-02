/* eslint-disable no-unused-vars */
import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { callApi } from "../../../../lib/utils/api";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Mail from "@material-ui/icons/Mail";
import { gql } from "apollo-boost";
import InputAdornment from "@material-ui/core/InputAdornment";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Button from "@material-ui/core/Button";
import { Grid, TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { withSnackBarConsumer } from "../../../../contexts/snackBarProvider/withSnackBarConsumer";
import { withApollo } from "react-apollo";

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
    const { name, email, originalId } = data;
    this.state = { name, email, originalId, button: true, loading: false };
  }

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
      button: false
    });
  };

  handleSubmit = async () => {
    console.log("Hello from EditDEMO");
    const { name, email, originalId } = this.state;
    const { snackBarOpen, onClose, reloadTable, client } = this.props;
    const id = originalId;
    this.setState({
      loading: true
    });

    const UPDATE_TRAINEE1 = gql`
      mutation updateTrainee($id: String, $name: String, $email: String) {
        updateTrainee(id: $id, name: $name, email: $email) {
          message
          data {
            id
          }
        }
      }
    `;

    try {
    const res = await client.mutate({
      mutation: UPDATE_TRAINEE1,
      variables: { id, name, email }
    });

    console.log(res);
    snackBarOpen(res.data.updateTrainee.message, "success");

  }catch(error){
    console.log("EditDialog Error",error);
    snackBarOpen(error.message, "error");
  }
    this.setState({
      loading: false
    });

    onClose();
    // try {
    //   const res = await callApi({
    //     url: process.env.REACT_APP_BASE_URL + process.env.REACT_APP_UPDATE_URL,
    //     method: "put",
    //     data: {
    //       id: _id,
    //       name,
    //       email
    //     }
    //   });

    //   console.log("success", res);
    //   this.setState({
    //     loading: false
    //   });
    //   onClose();
    //   reloadTable();
    // } catch (error) {
    //   const err = error.response.data.message;
    //   snackBarOpen(err, "error");
    //   this.setState({
    //     loading: false
    //   });
    //   onClose();
    // }
  };

  render() {
    const { open, onClose, classes, snackBarOpen } = this.props;
    const { name, email, loader, button, loading, _id } = this.state;

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
export default withApollo(withSnackBarConsumer(withStyles(styles)(EditDialog)));

/* eslint-disable no-unused-vars */
import Button from "@material-ui/core/Button";
import { callApi } from "../../../../lib/utils/api";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { gql } from "apollo-boost";
import { Grid, TextField, DialogContentText } from "@material-ui/core";
import React from "react";
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

class RemoveDialog extends React.PureComponent {
  constructor(props) {
    super(props);
    const { data } = props;
    const { name, email, _id } = data;
    this.state = { name, email, _id, button: false, loading: false };
  }

  handleInputChange = event => {
    this.setState(
      {
        [event.target.name]: event.target.value
      },
      this.handleValidator
    );
  };

  handleSubmit = async () => {
    const { onSubmit, data, onClose } = this.props;
    const { snackBarOpen, reloadTable, client,  } = this.props;
    const { _id } = data;
    const id = _id;

    this.setState({
          loading: true,
          button: false
        });

    const DELETE_TRAINEE = gql`
      mutation deleteTrainee($id: String){
        deleteTrainee(id: $id) {
          message
          data {
            id
          }
        }
      }
    `;

    const  res  = await client.mutate({
      mutation: DELETE_TRAINEE,
      variables: {id}
    })
    snackBarOpen(res.data.deleteTrainee.message, "success");
    this.setState({
      loading: false,
    });
    onClose();
    // try {
    //   const res = await callApi({
    //     url: process.env.REACT_APP_BASE_URL + process.env.REACT_APP_DELETE_URL,
    //     method: "delete",
    //     params: {
    //       id: _id
    //     }
    //   });
    //   const message = res.data.message;
    //   snackBarOpen(message, "success");
    //   console.log("success", res);
    //   this.setState({
    //     loading: false,
    //     button: false
    //   });
    //   onSubmit(data);
    //   onClose();
    // } catch (error) {
    //   const err = error.response.data.message;
    //   snackBarOpen(err, "error");
    //   this.setState({
    //     loading: false,
    //     button: false
    //   });
    //   onClose();
    // }
  };

  render() {
    const { open, onClose, classes } = this.props;
    const { button, loading } = this.state;

    return (
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete Trainee?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure to delete a trainee?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button
            color="primary"
            autoFocus
            onClick={this.handleSubmit}
            disabled={button}
          >
            {loading && <CircularProgress />}
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
export default withApollo(
  withSnackBarConsumer(withStyles(styles)(RemoveDialog))
);

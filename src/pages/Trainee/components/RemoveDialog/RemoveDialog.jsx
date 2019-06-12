import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { Grid, TextField, DialogContentText } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

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
    const { name, email } = data;
    this.state = { name, email };
  }

  handleInputChange = event => {
    this.setState(
      {
        [event.target.name]: event.target.value
      },
      this.handleValidator
    );
  };

  handleSubmit = () => {
    const { onSubmit, data, onClose } = this.props;
    onSubmit(data);
    onClose();
  };

  render() {
    const { open, onClose, classes } = this.props;

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
          <Button color="primary" autoFocus onClick={this.handleSubmit}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
export default withStyles(styles)(RemoveDialog);

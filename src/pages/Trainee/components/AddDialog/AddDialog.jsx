import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";


class FormDialog extends React.Component {
  render() {
    const { openProp, clickHandler , children } = this.props;
    console.log(this.state);
    return (
      <div>
        <Dialog
          open={openProp}
          onClose={clickHandler}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add Trainee</DialogTitle>
          <DialogContent>
            <DialogContentText>Enter your trainee details</DialogContentText>
          </DialogContent>

          {children}

        </Dialog>
      </div>
    );
  }
}

export default FormDialog;

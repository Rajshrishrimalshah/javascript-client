import React from 'react';
	import Dialog from '@material-ui/core/Dialog';
	import DialogActions from '@material-ui/core/DialogActions';
	import DialogContent from '@material-ui/core/DialogContent';
	import DialogTitle from '@material-ui/core/DialogTitle';
	// import Mail from '@material-ui/icons/Mail';
	// import InputAdornment from '@material-ui/core/InputAdornment';
	// import AccountCircle from '@material-ui/icons/AccountCircle';
	import Button from '@material-ui/core/Button';
	import { Grid, TextField, DialogContentText } from '@material-ui/core';
	import { withStyles } from '@material-ui/core/styles';


	const styles = theme => ({
	  root: {
	    flexGrow: 1,
	  },
	  paper: {
	    padding: theme.spacing(2),
	    textAlign: 'center',
	    color: theme.palette.text.secondary,
	  },
	});

	class EditDialog extends React.PureComponent {
	  constructor(props) {
	    super(props);
	    // eslint-disable-next-line react/prop-types
	    const { data } = props;
	    const { name, email } = data;
	    this.state = { name, email };
	  } // state = {
	  //   // eslint-disable-next-line react/no-unused-state
	  //   name: '', email: '',
	  // };

	  handleInputChange = (event) => {
	    // eslint-disable-next-line no-unused-vars
	    const { isTouch } = this.state;
	    // isTouch.push(event.target.name);
	    this.setState({
	      [event.target.name]: event.target.value,
	    }, this.handleValidator);
	  }

	  handleSubmit = () => {
	    const { onSubmit, data, onClose } = this.props;
	    onSubmit(data);
	    onClose();
	  }

	  render() {
	    // eslint-disable-next-line react/prop-types
	    const { open, onClose, classes } = this.props;
	    console.log("check",this.props);
	    console.log("state check",this.state);

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
	export default withStyles(styles)(EditDialog);




import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import  Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { SnackBarProvider } from "./Context"

//export const SnackBarContext = React.createContext();

const style1 = theme => ({
  close: {
    padding: theme.spacing(0.5),
  },
});

class SimpleSnackbar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      open: false,
      message: ''
    }
  }

  handleClick = () =>  {
    this.setState({
      open: true,
    });
  }

  snackBarOpen = (message) => (event)  => {
   // const { message } = this.state;
    this.setState({
      open: true,
      message: message
  });
  }

  snackBarClose = () => {
    this.setState({
      open: false,
  });
}

  handleClose = (event, reason) => {
    this.setState({
      open: false,
    });
  }

  render() {

    const {open, message} = this.state;
    const  {classes, children} = this.props;
    return (
      <div>

    <SnackBarProvider
        value={{
              snackBarOpen: this.snackBarOpen
            }}
      >
      {children}
    </SnackBarProvider>

        <Button onClick={() => this.handleClick()}>Open simple snackbar</Button>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
            }}
          open={open}
          autoHideDuration={3000}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id"> {message} </span>}
          action={[
            <Button key="undo" color="secondary" size="small" onClick={this.handleClose}>
              UNDO
            </Button>,
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </div>
    );
  }
}


export default withStyles(style1)(SimpleSnackbar);

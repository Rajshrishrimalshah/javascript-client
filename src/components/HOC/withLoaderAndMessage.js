import React,{ Component } from 'react';

const withLoaderAndMessage = WrappedComponent => (props) => {

  class NewLoader extends Component {
    constructor(props){
      super(props);
      this.state = {
        loading: false,
        dataLength:50
      }
    }

    render() {
      return <WrappedComponent {...this.state} {...props} />;
    }
  }
    return NewLoader;
};

export default withLoaderAndMessage;

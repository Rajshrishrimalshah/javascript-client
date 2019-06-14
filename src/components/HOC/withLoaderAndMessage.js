import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress'



const withLoaderAndMessage = WrappedComponent => (props) => {

  const {  loading, datalength} = props;

      if (loading === true) {
      return   <LinearProgress  color="secondary" />
      }

      if(datalength === 0) {
        return <h4>  OOPS!, No More Trainees when no data is available </h4>
      }

  return <WrappedComponent {...props} />;
};

export default withLoaderAndMessage;

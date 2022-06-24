import React from "react";
import {BallTriangle} from "react-loader-spinner"

const Loading: React.FC<{}> =(() => {
  return (
    <div className="max-w-3xl mx-auto px-6 sm:px-6 lg:max-w-7xl lg:px-8 flex items-center justify-center">
      <BallTriangle color="grey" height="100" width="100"  ariaLabel="loading-indicator" wrapperClass="dummy-class"/>
    </div>
  )
});


export default Loading;

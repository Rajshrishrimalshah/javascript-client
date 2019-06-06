import React from "react";
import { Link, Route } from  "react-router-dom"

// export const TraineeDetails = (route) => {
//   console.log(route);
//   return (

//         <div> {route.id}</div>
//   );
// };

export const TraineeDetails = ({match: url}, trainees, props) => {
  console.log(props);
  const { id }= trainees;
  return(
    <div>
      details
    </div>
  );
}

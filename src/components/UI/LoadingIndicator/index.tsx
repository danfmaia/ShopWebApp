import { FunctionComponent } from 'react';

// import classes from './.module.css';

type Props = {
  //
};

const LoadingIndicator: FunctionComponent<Props> = (props) => {
  return (
    <div className="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default LoadingIndicator;

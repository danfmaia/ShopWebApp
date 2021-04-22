import { FunctionComponent } from 'react';

import classes from './.module.css';

interface Props {
  //
}

const Card: FunctionComponent<Props> = (props) => {
  return <div className={classes.card}>{props.children}</div>;
};

export default Card;

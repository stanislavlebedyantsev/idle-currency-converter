import React, {useState, useEffect } from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/styles';
import { Collapse } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

type TProps = {
  infoText?: string;
};

const useStyles = makeStyles({
	root:{
		marginBottom: '1em'
	},
  progress: {
    width: '100%',
  },
});

const Info = ({ infoText }: TProps) => {
  const classes = useStyles();
  const [progress, setProgress] = useState<number>(0);
  const [isInfoVisible, setIsInfoVisible] = useState<boolean>(true);

	const handleClick = () => {
		setIsInfoVisible(() => (false))
	}

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100 || !isInfoVisible) {
          setIsInfoVisible(false);
          clearInterval(timer);
          return 0;
        }
        return Math.min(oldProgress + 1, 100);
      });
    }, 100);

    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <>
      <Collapse className={classes.root} in={isInfoVisible}>
			<Alert
			severity="info"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={handleClick}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          <AlertTitle>Info</AlertTitle>
          {infoText}
        </Alert>
        <LinearProgress
          className={classes.progress}
          variant="determinate"
          value={progress}
        />
      </Collapse>
    </>
  );
};

export default Info;

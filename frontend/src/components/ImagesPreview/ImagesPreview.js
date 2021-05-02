import React from 'react';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import UploadedImage from '../UploadedImage/UploadedImage';
import ResultImage from '../ResultImage/ResultImage';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { blue } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    previewBox: {
        width: '100%',
        height: '70vh',
        display: 'flex',
        justifyContent: 'center',
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
            height: '100vh',
            alignItems: 'center',
            justifyContent: 'space-evenly'
          },
    },
    arrowCont: {
        width: '12%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: blue[600],
        [theme.breakpoints.down('xs')]: {
            height: '5vh',
            width: '100%',
            transform: 'rotate(90deg)'
        },
    },
    arrowIcon: {
        fontSize: 100,
    }
}));

function ImagesPreview() {
  const classes = useStyles();

  return (
    <Box className={classes.previewBox}>
        <UploadedImage/>
        <Box className={classes.arrowCont}>
            <ArrowRightAltIcon className={classes.arrowIcon} />
        </Box>
        <ResultImage/>
    </Box>
  );
}

export default ImagesPreview;
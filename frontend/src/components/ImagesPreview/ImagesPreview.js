import React from 'react';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import UploadedImage from '../UploadedImage/UploadedImage';
import ResultImage from '../ResultImage/ResultImage';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { connect } from "react-redux";
import { blue } from '@material-ui/core/colors';

const useStyles = makeStyles({
    previewBox: {
        width: '100%',
        minHeight: '80vh',
        backgroundColor: blue[100],
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    arrowCont: {
        width: '12%',
        height: '20%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: blue[600]
    }
});

function ImagesPreview() {
  const classes = useStyles();

  return (
    <Box className={classes.previewBox}>
        <UploadedImage/>
        <Box className={classes.arrowCont}>
            <ArrowRightAltIcon style={{ fontSize: 100}} />
        </Box>
        <ResultImage/>
    </Box>
  );
}

export default ImagesPreview;
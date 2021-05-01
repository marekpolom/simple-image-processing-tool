import React from 'react';
import { Container, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import ImageIcon from '@material-ui/icons/Image';
import UploadImage from '../UploadImage/UploadImage';

const useStyles = makeStyles({
    uploadedImgCont: {
        width: '100%',
        height: '80%',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0px 0px 10px gray',
        margin: '0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    uploadedImgBox: {
        width: '35%',
        height: '90%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around'
    }
});

function UploadedImage({image}) {
  const classes = useStyles();

  return (
    <Box className={classes.uploadedImgBox}>
        <UploadImage/>
        <Container className={classes.uploadedImgCont}>
            {(image.length > 0) ? <img src={image[0]['data_url']} alt="" width="100%" /> : <ImageIcon style={{ fontSize: 100, color: 'rgba(0, 0, 0, 0.2)'}} />}
        </Container>
    </Box>
  );
}

const mapStateToProps = (state) => {
    return {
        image: state.image,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadedImage);
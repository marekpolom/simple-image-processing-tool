import React from 'react';
import { Box, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import GetAppIcon from '@material-ui/icons/GetApp';
import BurstModeIcon from '@material-ui/icons/BurstMode';
import { connect } from "react-redux";
import { blue } from '@material-ui/core/colors';
import augmentImage from '../../requests/augmentImage';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
        backgroundColor: blue[400],
        width: '200px',
        '&:hover':{
            backgroundColor: blue[300],
        }
      },
    downloadBox: {
        width: '100%',
        minHeight: '10vh',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
  }));

function DownloadImage({image, inputs, order, augImage, setAugImage}) {
  const classes = useStyles();

  return (
    <Box className={classes.downloadBox}>
        <Button
            variant="contained"
            className={classes.button}
            startIcon={<BurstModeIcon />}
            onClick={async () => {
                if(image.length > 0){
                    const img = await augmentImage(image[0], inputs, order);
                    console.log(img);
                    setAugImage(img);
                }}}
            >
                Augment Image
        </Button>
        <a download="FILENAME.EXT" href={augImage}>
            <Button
                variant="contained"
                className={classes.button}
                startIcon={<GetAppIcon />}
                onClick={() => {console.log('click!')}}
                >
                    Download Image
            </Button>
        </a>
    </Box>
  );
}

const mapStateToProps = (state) => {
    return {
        image: state.image,
        inputs: state.inputs,
        order: state.order,
        audImage: state.augImage
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setAugImage: (image) => {
            dispatch({ type: "SET_AUG_IMG", image: image });
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DownloadImage);
import React from 'react';
import { Box, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ImageUploading from 'react-images-uploading';
import DeleteIcon from '@material-ui/icons/Delete';
import PublishIcon from '@material-ui/icons/Publish';
import { connect } from "react-redux";
import { blue } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
        backgroundColor: blue[400],
        width: '200px',
        '&:hover':{
            backgroundColor: blue[300],
        }
      },
    btnsBox: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'space-around'
    },
    uploadBox: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
  }));

function UploadImage({image, setImage}) {
  const classes = useStyles();

  const onChange = (imageList, addUpdateIndex) => {
    setImage(imageList);
  };

  return (
    <Box className={classes.uploadBox}>
        <ImageUploading
        value={image}
        onChange={onChange}
        dataURLKey="data_url"
        acceptType={['jpg', 'png', 'bmp']}
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
        }) => (
          <Box className={classes.btnsBox}>
              <Button
                    variant="contained"
                    className={classes.button}
                    startIcon={<PublishIcon />}
                    onClick={onImageUpload}
                >Upload Image</Button>
                <Button
                    variant="contained"
                    className={classes.button}
                    startIcon={<DeleteIcon />}
                    onClick={onImageRemoveAll}
                >Remove Image</Button>
          </Box>
        )}
      </ImageUploading>
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
        setImage: (image) => {
            dispatch({ type: "SET_IMG", image: image });
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadImage);
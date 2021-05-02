import React from "react";
import { Container, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ImageIcon from "@material-ui/icons/Image";
import DownloadImage from "../DownloadImage/DownloadImage";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  resultImgCont: {
    width: "100%",
    height: "80%",
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0px 0px 10px gray",
    margin: "0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  resultImgBox: {
    width: "35%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    [theme.breakpoints.down('sm')]: {
      width: '40%',
    },
  [theme.breakpoints.down('xs')]: {
      width: '90%',
      height: '40vh'
  },
  },
}));

function ResultImage({augImage}) {
  const classes = useStyles();

  return (
    <Box className={classes.resultImgBox}>
      <DownloadImage />
      <Container className={classes.resultImgCont}>
      {(augImage !== '') ? <img src={augImage} alt="" style={{maxWidth: '95%', maxHeight: '95%', boxShadow: '0px 0px 3px gray'}}/> : <ImageIcon style={{ fontSize: 100, color: 'rgba(0, 0, 0, 0.2)'}} />}
      </Container>
    </Box>
  );
}

const mapStateToProps = (state) => {
  return {
      augImage: state.augImage
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResultImage);

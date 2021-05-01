import React, {useEffect, useState} from 'react';
import { Box, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { connect } from "react-redux";
import { blue, grey } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    mainBox: {
        width: '100%',
        minHeight: "13vh",
        backgroundColor: blue[100],
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    orderBox: {
        height: '60%',
        width: '80%',
        backgroundColor: 'white',
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'row'
    },
    orderElement: {
        backgroundColor: blue[400],
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: '0.4%',
        padding: '0 1%',
        fontSize: '20px'
    },
    noOrderElement: {
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '0.4%',
        padding: '0 1%',
        fontSize: '20px',
        color: grey[400],
        width: '100%',
        fontWeight: 700,
        cursor: 'default'
    }
  }));


function AugOrder({order, handleOrder, clearOrder}) {
  const classes = useStyles();

//   const [orderCopy, setOrderCopy] = useState(order);

//   useEffect(() => {
//     setOrderCopy(order);
//   }, [order])

  return (
    <Box className={classes.mainBox}>
        <Box className={classes.orderBox}>
            {(order.length > 0) ? order.map((item, index) => {
                return(
                    <Box key={index} className={classes.orderElement} style={{width: `${100/order.length}%`}}>
                        <NavigateBeforeIcon style={{fontSize: '30px', cursor: `${(index === 0) ? 'not-allowed' : 'pointer'}`}} onClick={() => {
                            let orderCp = order.map((item) => item);
                            if(index > 0){
                                clearOrder();
                                const x = orderCp[index-1];
                                orderCp[index-1] = item;
                                orderCp[index] = x;
                                handleOrder(orderCp);
                            }
                        }}/>
                        {item}
                        <NavigateNextIcon style={{fontSize: '30px', cursor: `${(index === order.length-1) ? 'not-allowed' : 'pointer'}`}} onClick={() => {
                            let orderCp = order.map((item) => item);
                            if(index < orderCp.length-1){
                                clearOrder();
                                const x = orderCp[index+1];
                                orderCp[index+1] = item;
                                orderCp[index] = x;
                                handleOrder(orderCp);
                            }
                        }}/>
                    </Box>
                );
            }) : <Box className={classes.noOrderElement}>CHANGE ORDER OF AUGMENTATION</Box>}
        </Box>
    </Box>
  );
}

const mapStateToProps = (state) => {
    return {
        order: state.order
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleOrder: (data) => {
            dispatch({ type: "HANDLE_ORDER", data: data });
        },
        clearOrder: () => {
            dispatch({ type: "CLEAR_ORDER"});
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AugOrder);
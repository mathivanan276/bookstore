import Axios from "axios";

export const GET_ORDERS = "SET_ORDERS";
export const ORDERS_LOADING_TRUE = "ORDERS_LOADING_TRUE";
export const ORDERS_LOADING_FALSE = "ORDERS_LOADING_FALSE";

const saveOrders = (data) => {
  return {
    type: GET_ORDERS,
    data: data,
  };
};

const ordersLoadingTrue = () => {
  return {
    type: ORDERS_LOADING_TRUE,
  };
};

const ordersLoadingFalse = () => {
  return {
    type: ORDERS_LOADING_FALSE,
  };
};

export const sortedOrders = (sortDate) => {
  return (dispatch) => {
    dispatch(ordersLoadingTrue());
    if (localStorage.getItem("userDetails")) {
      let token = JSON.parse(localStorage.getItem("userDetails")).token;
      Axios.post(
        "/orders/specificdate",
        { date: sortDate },
        {
          headers: { HTTP_AUTHORIZATION: token },
        }
      ).then((res) => {
        console.log(res);
        if (res.data.response === true) {
          dispatch(saveOrders(res.data.data));
          dispatch(ordersLoadingFalse());
        }else if (res.data.error !== ''){
            console.log(res.data);
            alert('Your Session Is Closed');
            localStorage.removeItem('userDetails');
            localStorage.removeItem('expireDate');
            window.location.reload(false);
        } 
         else {
          dispatch(saveOrders(res.data.data));
          dispatch(ordersLoadingFalse());
        }
      });
    }
  };
};
export const rangedOrders = (date1, date2) => {
  return (dispatch) => {
    dispatch(ordersLoadingTrue());
    if (localStorage.getItem("userDetails")) {
      let token = JSON.parse(localStorage.getItem("userDetails")).token;
      Axios.post(
        "/orders/range",
        { date1, date2 },
        {
          headers: { HTTP_AUTHORIZATION: token },
        }
      ).then((res) => {
        console.log(res);
        if (res.data.response === true) {
          dispatch(saveOrders(res.data.data));
          dispatch(ordersLoadingFalse());
        }else if (res.data.error !== ''){
          console.log(res.data);
          alert('Your Session Is Closed');
          localStorage.removeItem('userDetails');
          localStorage.removeItem('expireDate');
          window.location.reload(false);
      } 
         else {
          dispatch(saveOrders(res.data.data));
          dispatch(ordersLoadingFalse());
        }
      });
    }
  };
};
export const getorders = () => {
  return (dispatch) => {
    dispatch(ordersLoadingTrue());
    if (localStorage.getItem("userDetails")) {
      let token = JSON.parse(localStorage.getItem("userDetails")).token;
      Axios.get("/orders/lastsevendays", {
        headers: { HTTP_AUTHORIZATION: token },
      }).then((res) => {
        // console.log(res);
        if (res.data.response === true) {
          dispatch(saveOrders(res.data.data));
          dispatch(ordersLoadingFalse());
        }else if (res.data.error !== ''){
          console.log(res.data);
          alert('Your Session Is Closed');
          localStorage.removeItem('userDetails');
          localStorage.removeItem('expireDate');
          window.location.reload(false);
      } 
         else {
          dispatch(saveOrders(res.data.data));
          dispatch(ordersLoadingFalse());
        }
      });
    }
  };
};

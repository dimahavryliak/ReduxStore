import { asyncThunkCreator, createSlice } from "@reduxjs/toolkit";
import { mainActions } from "./main-slice";

const initialState = {
  items: [],
  itemsQuantity: 0,
  isCartContentChanged: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.isCartContentChanged = true;
      state.itemsQuantity++;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          title: newItem.title,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.price * existingItem.quantity;
      }
    },
    removeItem(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.isCartContentChanged = true;

      state.itemsQuantity--;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },

    updateCart(state, action) {
      state.items = action.payload.items;
      state.itemsQuantity = action.payload.itemsQuantity;
    },
  },
});

export const sendCartData = (cartData) => {
  return async (dispatchAction) => {
    dispatchAction(
      mainActions.showStatusMessage({
        status: "pending",
        title: "Sending Data",
        message: "Cart Data Sending to Server...",
      })
    );

    const sendDataHttpRequest = async () => {
      const response = await fetch(
        "https://react-learn-e675d-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({
            items: cartData.items,
            itemsQuantity: cartData.itemsQuantity,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Sending Data Error");
      }
    };
    try {
      await sendDataHttpRequest();
      dispatchAction(
        mainActions.showStatusMessage({
          status: "success",
          title: "Data Sent",
          message: "Cart Data Is Successfully sent to Server",
        })
      );
    } catch (error) {
      dispatchAction(
        mainActions.showStatusMessage({
          status: "error",
          title: "Data Error",
          message: "Error occured while sending data",
        })
      );
    }
  };
};

export const cartActions = cartSlice.actions;

export const getCartData = () => {
  return async (dispatchAction) => {
    const getDataHttpRequest = async () => {
      const response = await fetch(
        "https://react-learn-e675d-default-rtdb.firebaseio.com/cart.json"
      );

      if (!response.ok) {
        throw new Error("Unable to get Data");
      }

      const responseData = await response.json();
      return responseData;
    };
    try {
      const cartData = await getDataHttpRequest();
      dispatchAction(
        cartActions.updateCart({
          items: cartData.items || [],
          itemsQuantity: cartData.itemsQuantity,
        })
      );
    } catch (e) {
      dispatchAction(
        mainActions.showStatusMessage({
          status: "error",
          title: "Data Error",
          message: "Error occured while getting data",
        })
      );
    }
  };
};

export default cartSlice;

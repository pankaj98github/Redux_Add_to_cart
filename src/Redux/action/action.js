export const add = (product) => {
    return {
        type: "ADDTOCART",
        payload: product,
    }
}

export const setDecrease = (product) => {
    return {
        type: "DECREASE",
        payload: product,
    }
  };

export const remove = (product) => {
    return {
        type: "REMOVE",
        payload: product,
    }
}

export default add;

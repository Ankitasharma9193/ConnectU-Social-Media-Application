import axios from "axios";

export const loginCall = async (userCredential, dispatch) => {
    console.log('I am here in login')
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post("/auth/login", userCredential);
    console.log('res.data:', res)
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  }
};
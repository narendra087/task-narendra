import axios from "axios";
import header from "@/constant/header"
const path = 'http://45.77.45.245:8021/api/v1';

export const authLogin = async (data) => {
  const url = `${path}/auths/login`;
  try {
    const response = await axios.post(url, data)
    return response
  } catch (error) {
    console.log(error)
  }
}

export const getUser = async (userToken) => {
  const url = `${path}/employees/current`;
  try {
    const response = await axios.get(url,{
      headers: header({ token: userToken || localStorage.token }),
    })
    return response
  } catch (error) {
    console.log(error)
  }
}

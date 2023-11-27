import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const httpClient = axios.create({
  baseURL: 'http://192.168.0.100:3001'
});

httpClient.interceptors.request.use(async config => {
  const accessToken = await AsyncStorage.getItem('financeApp:token')

  if (accessToken) {
    return Object.assign(config, { headers: { Authorization: `Bearer ${accessToken}` } });
  }

  return config;
})

/* function delay(ms = 1000) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve;
    }, ms)
  })
} */

httpClient.interceptors.response.use(async data => {
  // await delay(5000);
  return data
})

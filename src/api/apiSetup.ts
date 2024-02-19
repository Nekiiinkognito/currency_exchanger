import axios from "axios";

export const apiAxiosInstance = axios.create({'baseURL': 'https://openexchangerates.org/api/latest.json?app_id=2bfacf036ac14a778572fd49c4ef7e20'})
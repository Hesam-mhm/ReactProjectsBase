import { BaseUrl } from "../../../../configs/base_url_constant";
import { FrappeUserType } from "../../../../modules/auth/core/Auth";
import frappeAxiosInstance from "../../Configs/Axios/AxiosConfig";

export const login = async (email: string, password: string) => {
  const response = await frappeAxiosInstance.post(
    `${BaseUrl.frappe}/api/method/login`,
    { usr: email, pwd: password }
  );
  return response.data;
};

export const getLoggedUser = async () => {
  const response = await frappeAxiosInstance.get(
    `${BaseUrl.frappe}/api/method/frappe.auth.get_logged_user`
  );
  return response.data;
};

export const getUserDetails = async (username: string) => {
  const response = await frappeAxiosInstance.get(
    `${BaseUrl.frappe}/api/resource/User/${username}`
  );
  return response.data.data as FrappeUserType;
}; 
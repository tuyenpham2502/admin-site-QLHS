import { DashboardManagementService } from '../service/DashboardManagementService';
import Endpoint from "src/core/application/common/Endpoint";
import Cookie from "src/core/application/common/models/Cookie";

export const getTopFilmsAsync = async (
  cookie: any,
  params: any,
  setData: Function,
  setLoading: Function,
) => {
  try {
    setLoading(true);
    let response = await new DashboardManagementService().getFilms(
      Endpoint.DashboardManagement.getFilms,
      params,
      cookie
    );
    if (response.status == 200) {
      let result = (response as any).data.films;
    setData(result);
    setLoading(false);
    return response;
    }
    // if(response.status == 401) {
    //   localStorageService.setStorage(Constant.API_TOKEN_STORAGE, new Cookie(false, "", ""));
    //   router.push("/account/sign-in.html");
    //   setTimeout(() => {
    //     setLoading(false);
    //   }, 300);
    // }
  } catch (e) {
    throw e;
  }
};


import { setRecoilStateAsync } from "./../common/libs/recoil-outside/Service";
import Constants from "src/core/application/common/Constants";
import { IRequestService } from "src/core/application/services/IRequestService";
import LoggerService from "src/infrastructure/services/LoggerService";
import LocalStorageService from "src/infrastructure/services/LocalStorageService";
import Cookie from "src/core/application/common/models/Cookie";
import { RequestResponse } from "src/core/application/dto/common/responses/RequestResponse";
import FailureResponse from "src/core/application/dto/common/responses/FailureResponse";
import SuccessResponse from "src/core/application/dto/common/responses/SuccessResponse";
import InvalidModelStateResponse from "src/core/application/dto/common/responses/InvalidModelStateResponse";
import axios, { AxiosResponse } from "axios";
import NetworkException from "src/core/application/common/exceptions/NetworkException";
import { LoadingState } from "src/core/application/common/atoms/global/LoadingState";

export default class RequestService implements IRequestService {
  private readonly loggerService = new LoggerService();
  private readonly baseURL = process.env.NEXT_PUBLIC_API_URL;
  private readonly localStorageService = new LocalStorageService();

  private getOptions(context: Cookie, file: boolean = false) {
    let storage = this.localStorageService.readStorage(
      Constants.API_TOKEN_STORAGE
    );
    let token = storage?.token || "";
    let opts: any = {
      headers: {
        Authorization: `Bearer ${token}`,
      },

      // timeout: 1000,
      // cancelToken: cancellationToken
    };

    if (file) {
      opts.responseType = "blob";
    }

    return opts;
  }

  /**
   * Convert AxiosResponse to app request
   * @param response
   */
  private processRequest(response: AxiosResponse): RequestResponse {
    try {
      if (response.status == 200) {
        return new SuccessResponse(response.data.message, response.data.data);
      }
      if (response.status == 202) {
        return new FailureResponse(response.data.errors);
      }
      if (response.status == 400) {
        return new InvalidModelStateResponse(response.data.errors);
      }
      throw new NetworkException("No http status code handler");
    } catch (e) {
      new LoggerService().error(e);
      throw e;
    }
  }

  getCancellationToken() {}

  async makeGetRequestAsync(
    url: string,
    params: any,
    context: Cookie
  ): Promise<RequestResponse> {
    try {
      const _params = params
        ? Object.keys(params)
            .map((key) => `${key}=${encodeURIComponent(params[key])}`)
            .join("&")
        : "";
      const _url = `${this.baseURL}/${url}${
        _params === "" ? "" : "?" + _params
      }`;
      const _options = this.getOptions(context);
      return this.processRequest(await axios.get(_url, _options));
    } catch (e) {
      if (
        e.response?.status == 400 ||
        e.response?.status == 401 ||
        e.response?.status == 500
      ) {
        this.localStorageService.setStorage(
          Constants.API_TOKEN_STORAGE,
          new Cookie(false, "", "")
        );
        window.location.href = "/account/sign-in.html";
      }
      this.loggerService.error(e);
      return new FailureResponse(e.response?.errors || e.errors);
    } finally {
      await setRecoilStateAsync(LoadingState, { isLoading: false, uri: "" });
    }
  }

  async makePostRequestAsync(
    endpoint: string,
    params: object,
    context: Cookie
  ): Promise<RequestResponse> {
    //const setIsLoading = useSetRecoilState(LoadingState);
    try {
      const _url = `${this.baseURL}/${endpoint}`;
      await setRecoilStateAsync(LoadingState, { isLoading: true, uri: _url });
      const _params = JSON.stringify(params);
      const _options = this.getOptions(context, false);
      _options.headers["Content-Type"] = "application/json";
      _options.headers["accept"] = "text/xml";
      return this.processRequest(await axios.post(_url, _params, _options));
    } catch (e) {
      // this.loggerService.error(e);
      // throw e;

      if (
        e.response?.status == 400 ||
        e.response?.status == 401 ||
        e.response?.status == 500
      ) {
        this.localStorageService.setStorage(
          Constants.API_TOKEN_STORAGE,
          new Cookie(false, "", "")
        );
        window.location.href = "/account/sign-in.html";
      }

      return new FailureResponse(e.response?.errors || e.errors);
    } finally {
      await setRecoilStateAsync(LoadingState, { isLoading: false, uri: "" });
    }
  }

  async makeGetFileRequestAsync(
    url: string,
    params: any,
    context: Cookie
  ): Promise<RequestResponse> {
    try {
      const _params = params
        ? Object.keys(params)
            .map((key) => `${key}=${encodeURIComponent(params[key])}`)
            .join("&")
        : "";
      const _url = `${this.baseURL}/${url}${
        _params === "" ? "" : "?" + _params
      }`;
      const _options = this.getOptions(context);
      return this.processRequest(
        await axios.get(_url, this.getOptions(context, true))
      );
    } catch (e) {
      this.loggerService.error(e);
      return new FailureResponse(e.response?.errors || e.errors);
    } finally {
      await setRecoilStateAsync(LoadingState, { isLoading: false, uri: "" });
    }
  }

  async makeUploadRequestAsync(
    endpoint: string,
    file: File,
    context: Cookie
  ): Promise<RequestResponse> {
    //const setIsLoading = useSetRecoilState(LoadingState);

    try {
      const _url = `${this.baseURL}/${endpoint}`;
      await setRecoilStateAsync(LoadingState, { isLoading: true, uri: _url });
      const _form = new FormData();
      _form.append("File", file);
      const _options = this.getOptions(context);
      _options.headers["Content-Type"] = "multipart/form-data";
      return this.processRequest(
        await axios.post(_url, _form, this.getOptions(context))
      );
    } catch (e) {
      // this.loggerService.error(e);
      // throw e;
      let result = (e as Error).message;
      return new FailureResponse(result || e.errors);
    } finally {
      await setRecoilStateAsync(LoadingState, { isLoading: false, uri: "" });
    }
  }

  async makePutRequestAsync(
    endpoint: string,
    params: any,
    context: Cookie
  ): Promise<RequestResponse> {
    //const setIsLoading = useSetRecoilState(LoadingState);
    try {
      const _url = `${this.baseURL}/${endpoint}`;
      await setRecoilStateAsync(LoadingState, { isLoading: true, uri: _url });
      const _params = JSON.stringify(params);
      const _options = this.getOptions(context);
      _options.headers["Content-Type"] = "application/json";
      return this.processRequest(
        await axios.put(_url, _params, this.getOptions(context))
      );
    } catch (e) {
      // this.loggerService.error(e);
      // throw e;
      let result = (e as Error).message;
      return new FailureResponse(result || e.errors);
    } finally {
      await setRecoilStateAsync(LoadingState, { isLoading: false, uri: "" });
    }
  }

  makeDeleteRequestAsync() {
    axios.CancelToken.source().token;
  }
}

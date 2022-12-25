import Axios, { AxiosInstance, CancelToken } from "axios";

const apiBase = "https://api.spacexdata.com/v3";

//https://api.spacexdata.com/v3/
// --------------------------------------------------------------PEs------------------

class api {
  fetch(arg0: string, data: FormData, arg2: number) {
    throw new Error("Method not implemented.");
  }
  private _apiBase: string;
  private axios: AxiosInstance;
  private timeout: number = 10000;

  constructor(apiBase: string) {
    this._apiBase = apiBase;
    this.axios = Axios.create({
      baseURL: this.apiBase,
      timeout: this.timeout,
    });
  }

  get apiBase() {
    return this._apiBase;
  }
  get = (
    url: string,
    params: any = {},
    timeout?: number,
    cancelToken?: CancelToken
  ) => {
    return this.axios({
      method: "get",
      url,
      params,
      timeout: timeout ?? this.timeout,
      cancelToken,
    });
  };
}

const API = new api(apiBase);

export { API };

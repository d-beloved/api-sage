export interface RequestData {
  url: string;
  method: string;
  headers: string;
  body: string;
}

export interface ResponseData {
  status: string;
  headers: any;
  message?: any;
  error?: any;
}

export interface ResponseContextType {
  resp: ResponseData;
  setResp: (value: ResponseData) => void;
}

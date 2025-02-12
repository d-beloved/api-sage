export interface RequestData {
  url: string;
  method: string;
  headers: string;
  body: string;
}

export interface ResponseData {
  status: string;
  headers: any;
  body: any;
}

export interface ResponseContextType {
  resp: ResponseData | string;
  setResp: (value: ResponseData | string) => void;
}

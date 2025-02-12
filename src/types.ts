export interface RequestData {
  url: string;
  method: string;
  headers: string;
  body: string;
}

export interface ResponseData {
  status: number;
  headers: any;
  body?: any;
}

export interface ResponseContextType {
  resp: ResponseData;
  setResp: (value: ResponseData) => void;
}

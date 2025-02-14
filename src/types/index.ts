import { REQUEST, RESPONSE } from "@/constants";

export interface RequestData {
  url: string;
  method: string;
  headers: any;
  body?: any;
}

export interface ResponseData {
  status: number;
  headers: Record<string, any>;
  body?: any;
}

export interface ResponseContextType {
  resp: ResponseData;
  setResp: (value: ResponseData) => void;
}

export interface AIExplanation {
  request?: {
    url: string;
    method: string;
    headers: Record<string, string>;
    body?: any;
  };
  response?: {
    status: string;
    headers: Record<string, string>;
    body?: any;
  };
}

export interface AIExplainProps {
  text: string;
  type: typeof REQUEST | typeof RESPONSE;
  disabled: boolean;
  url?: string;
  method?: string;
  headers?: string;
  body?: string;
}

export interface Tab {
  name: string;
  content: string;
}

export interface JSONTabProps {
  Tabs: Tab[];
}

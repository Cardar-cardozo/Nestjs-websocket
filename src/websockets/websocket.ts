export interface MessagePayload {
  type: string;
  data: any;
}

export interface ResponseMessage {
  sender: string;
  message: string;
}

export interface BaseHttpResponseModel<T> {
  expectedObjectKeys: Array<keyof T>; // potentially would be cool to specify types as well
  receivedObject: Partial<T>;
}

import { AddressModel } from "./address.model";

export interface ClientModel {
  firstName: string;
  lastName: string;
  sex: string;
  currentAddress: AddressModel | string;
  dateOfBirth: Date | string;
  email: string;
  birthplace: AddressModel | string;
}

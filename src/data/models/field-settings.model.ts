import {ValidatorFn} from "@angular/forms";

export interface FieldSettingsModel {
  fieldName: string;
  type: InputTypes;
  validators: ValidatorFn[];
  label: string;
  placeholder: string;
  initValue: any;
  validatorsMessages?: { [key in ValidatorsKeys]?: string };
}

export enum ValidatorsKeys {
  REQUIRED = 'required',
  EMAIL = 'email',
  MINLENGTH = 'minlength'
}

export enum InputTypes {
  TEXT = 'text',
  NUMBER = 'number',
  EMAIL = 'email',
  DATE = 'date',
  PASSWORD = 'password',
  TEXTAREA = 'textarea',
  SELECT = 'select',
  RADIO = 'radio',
  CHECKBOX = 'checkbox'
}

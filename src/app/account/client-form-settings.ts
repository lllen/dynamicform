import {FieldSettingsModel, InputTypes, ValidatorsKeys} from "../../data/models/field-settings.model";
import {Validators} from "@angular/forms";

export const clientFormSettings: FieldSettingsModel[] = [
  {
    fieldName: 'firstName',
    type: InputTypes.TEXT,
    validators: [Validators.required, Validators.minLength(2)],
    label: 'First Name',
    placeholder: 'Enter first name',
    initValue: '',
    validatorsMessages: {
      [ValidatorsKeys.REQUIRED]: 'Please enter first name',
      [ValidatorsKeys.MINLENGTH]: 'Min length is 2',
    }
  },
  {
    fieldName: 'lastName',
    type: InputTypes.TEXT,
    validators: [Validators.required, Validators.minLength(2)],
    label: 'Last Name',
    placeholder: 'Enter last name',
    initValue: '',
    validatorsMessages: {
      [ValidatorsKeys.REQUIRED]: 'Please enter last name',
      [ValidatorsKeys.MINLENGTH]: 'Min length is 2',
    }
  },
  {
    fieldName: 'dateOfBirth',
    type: InputTypes.DATE,
    validators: [Validators.required],
    label: 'Date Of Birth',
    placeholder: 'Enter date of birth',
    initValue: '',
    validatorsMessages: {
      [ValidatorsKeys.REQUIRED]: 'Please enter date of birth'
    }
  },
  {
    fieldName: 'email',
    type: InputTypes.EMAIL,
    validators: [Validators.required, Validators.email],
    label: 'Email',
    placeholder: 'Enter email',
    initValue: '',
    validatorsMessages: {
      [ValidatorsKeys.REQUIRED]: 'Please enter email',
      [ValidatorsKeys.EMAIL]: 'Email is invalid',
    },
  },
  {
    fieldName: 'currentAddress',
    type: InputTypes.TEXT,
    validators: [Validators.required],
    label: 'Current Address',
    placeholder: 'Enter current address',
    initValue: '',
    validatorsMessages: {
      [ValidatorsKeys.REQUIRED]: 'Please enter address',
    },
  },
  {
    fieldName: 'birthplace',
    type: InputTypes.TEXT,
    validators: [Validators.required],
    label: 'Birthplace Address',
    placeholder: 'Enter birthplace address',
    initValue: '',
    validatorsMessages: {
      [ValidatorsKeys.REQUIRED]: 'Please enter birthplace',
    },
  },
  {
    fieldName: 'sex',
    type: InputTypes.TEXT,
    validators: [Validators.required],
    label: 'Sex',
    placeholder: 'Enter sex',
    initValue: '',
    validatorsMessages: {
      [ValidatorsKeys.REQUIRED]: 'Please enter sex',
    },
  }
];

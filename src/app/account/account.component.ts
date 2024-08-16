import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ClientFormComponent} from "../client-form/client-form.component";
import {ClientModel} from "../../data/models/client.model";
import {FieldSettingsModel, InputTypes, ValidatorsKeys} from "../../data/models/field-settings.model";
import {Validators} from "@angular/forms";
import {HttpClientService} from "../../data/httpServices/http-client.service";
import {JsonPipe} from "@angular/common";

const clientFormSettings: FieldSettingsModel[] = [
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
]

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [
    ClientFormComponent,
    JsonPipe
  ],
  templateUrl: './account.component.html',
  providers: [HttpClientService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountComponent {
  client: Partial<ClientModel> = {};
  clientFormSettings: FieldSettingsModel[] = [];

  constructor(private httpClientService: HttpClientService) {
    this.httpClientService.getClientInfo().subscribe((response) => {
      this.client = response.receivedObject;
      this.clientFormSettings = this.getFieldSettings(response.expectedObjectKeys.filter((key) => !response.receivedObject[key]));
    });
  }

  getFieldSettings(keys: Array<Partial<keyof ClientModel>>): FieldSettingsModel[] {
      return keys.map((key) => clientFormSettings.find((el) => el.fieldName === key))
        .filter((el): el is FieldSettingsModel => el !== undefined);
  }

  onFormSubmit(event: Partial<ClientModel>): void {
    console.log('POST', { ...event, ...this.client });
    this.httpClientService.saveClientInfo({ ...event, ...this.client as ClientModel}).subscribe();
  }
}

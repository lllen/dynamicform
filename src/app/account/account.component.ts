import {ChangeDetectionStrategy, Component} from '@angular/core';
import {DynamicFormComponent} from "../dynamic-form/dynamic-form.component";
import {ClientModel} from "../../data/models/client.model";
import {FieldSettingsModel} from "../../data/models/field-settings.model";
import {HttpClientService} from "../../data/httpServices/http-client.service";
import {JsonPipe} from "@angular/common";
import {clientFormSettings} from "./client-form-settings";

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [
    DynamicFormComponent,
    JsonPipe
  ],
  templateUrl: './account.component.html',
  providers: [HttpClientService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountComponent {
  client: Partial<ClientModel> = {};
  clientFormSettings: FieldSettingsModel[] = [ ...clientFormSettings ];
  mappedClientFormSettings: FieldSettingsModel[] = [];

  constructor(private httpClientService: HttpClientService) {
    this.httpClientService.getClientInfo().subscribe((response) => {
      this.client = response.receivedObject;
      this.mappedClientFormSettings = this.getFieldSettings(response.expectedObjectKeys.filter((key) => !response.receivedObject[key]));
    });
  }

  getFieldSettings(keys: Array<Partial<keyof ClientModel>>): FieldSettingsModel[] {
      return keys.map((key) => this.clientFormSettings.find((el) => el.fieldName === key))
        .filter((el): el is FieldSettingsModel => el !== undefined);
  }

  onFormSubmit(event: Partial<ClientModel>): void {
    this.httpClientService.saveClientInfo({ ...this.client, ...event as ClientModel}).subscribe();
  }
}

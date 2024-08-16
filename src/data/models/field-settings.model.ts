import {Validators} from "@angular/forms";

export interface FieldSetupModel {
  fieldName: string;
  type: string;
  validators: Validators[];
  label: string;
  placeholder: string;
}

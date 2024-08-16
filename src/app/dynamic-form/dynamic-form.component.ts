import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {FieldSettingsModel, ValidatorsKeys} from "../../data/models/field-settings.model";

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './dynamic-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicFormComponent implements OnInit {
    @Input() fieldsSettings: FieldSettingsModel[] = [];
    @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>()

    formGroup: FormGroup | undefined;
    validationErrors: { [key:string]: string } = {};

    ngOnInit(): void {
      if (this.fieldsSettings?.length) {
        this.initForm();
        this.watchFormErrors();
      }
    }

    initForm(): void {
      let controls: any = {};
      this.fieldsSettings.forEach((fieldSetting: FieldSettingsModel) => {
        controls[fieldSetting.fieldName] = new FormControl(fieldSetting.initValue, [...fieldSetting.validators]);
      });
      this.formGroup = new FormGroup(controls);
    }

    watchFormErrors(): void {
      this.formGroup?.valueChanges.subscribe((data) => {
        for (const fieldName in this.formGroup?.controls) {
          this.validationErrors[fieldName] = this.formGroup?.controls[fieldName].invalid ? this.getFieldError(fieldName) : '';
        }
      });
  }

  getFieldError(fieldName: string): string {
    let errKey: ValidatorsKeys = Object.keys(this.formGroup?.controls[fieldName].errors || {})[0] as ValidatorsKeys; // take only the first error for now
    if (Object.values(ValidatorsKeys).includes(errKey)) {
      let fieldSetting = this.fieldsSettings?.find((fieldSetting: FieldSettingsModel) => fieldSetting.fieldName === fieldName);
      if (fieldSetting && fieldSetting.validatorsMessages) {
        return fieldSetting.validatorsMessages[errKey]!;
      }
    }

    return '';
  }

  onsubmit(): void {
    if (!this.formGroup?.invalid) {
      this.onSubmit.emit(this.formGroup?.value);
    }
  }
}

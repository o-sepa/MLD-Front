import { AbstractControl, FormArray, FormGroup, ValidationErrors } from '@angular/forms';

async function sleep(){
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, 2500);
  })
}

export class FormValidationUtils {

  /* Funciones de validación */
  static isInvalidField(formGroup: FormGroup, fieldName: string): boolean {
    return !!(formGroup.controls[fieldName].errors && formGroup.controls[fieldName].touched);
  }

  static isInvalidFieldArray(formArray: FormArray, index: number): boolean {
    return !!(formArray.controls[index].errors && formArray.controls[index].touched);
  }

  static getFieldError(formGroup: FormGroup, fieldName: string): string | null {
    const control = formGroup.controls[fieldName];
    if (!control) return null;
    const errors = formGroup.controls[fieldName].errors ?? {};
    return this.getValidationError(errors);
  }

  static getFieldErrorArray(formArray: FormArray, index: number): string | null {
    const control = formArray.at(index);
    if (!control) return null;
    const errors = control.errors ?? {};
    return this.getValidationError(errors);
  }

  static getPatternError(errors: ValidationErrors): string | null {
    if (!errors['pattern'].requiredPattern) return null;
    switch (errors['pattern'].requiredPattern) {
      case this.namePattern: return 'This field must contain first and last names separated by whitespace';
      case this.emailPattern: return 'This is not a valid email format';
      case this.notOnlySpacesPattern: return 'Whitespace-only inputs are not allowed';
      case this.slugPattern: return 'This is not a valid slug format';
      default: return 'Uncontrolled pattern error';
    }

  }

  static getValidationError(errors: ValidationErrors): string | null {
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required': return 'Campo obligatorio';
        case 'minlength': return `Minimum of ${errors['minlength'].requiredLength} characters required`;
        case 'min': return `Minimum value of ${errors['min'].min} is required`;
        case 'email': return 'This is not a valid email format';
        case 'pattern': return this.getPatternError(errors);
        case 'emailTaken': return 'This email is already taken. Try another one'
        case 'blackListedValue': return 'This username is not allowed. Try another one'

        default: return `Uncontrolled validation error [ERR: ${key}]`;
      }
    }
    return null;
  }

  /* Regular Expressions */
  static namePattern = '^([a-zA-Z]+) ([a-zA-Z]+)$';
  static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';
  static slugPattern = '^[a-z0-9_]+(?:-[a-z0-9_]+)*$';


  /* Custom sync validators */
  static sameValueInFields(fieldOne: string, fieldTwo: string): ValidationErrors | null {
    return (formGroup: AbstractControl) => {
      const valueInFieldOne = formGroup.get(fieldOne)?.value;
      const valueInFieldTwo = formGroup.get(fieldTwo)?.value;
      return valueInFieldOne === valueInFieldTwo ? null : { differentValueInFields: true };
    };
  }

  static notBlackListedValue(blacklisted: string) {
    return (control: AbstractControl): ValidationErrors | null => {
      return control.value !== blacklisted ? null : { blackListedValue: true };
    };
  }

  /* Custom async validators */
  static async checkServerResponse(control: AbstractControl): Promise<ValidationErrors | null> {
    await sleep();
    const formValue = control.value;
    if(formValue === 'hola@mundo.com'){
      return { emailTaken: true };
    }
    return null;
  }
}

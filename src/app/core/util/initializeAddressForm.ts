import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// ✅ Función reutilizable para inicializar el formulario de dirección
export const initializeAddressForm = (fb: FormBuilder, validations: any = {}): FormGroup => {
  return fb.group({
    countryCode: ['', validations.countryCode || []],
    stateCode: ['', validations.stateCode || []],
    cityState: ['', validations.cityState || []],
    lat: ['', validations.lat || [Validators.pattern('^-?\\d{1,3}\\.\\d+$')]],
    lon: ['', validations.lon || [Validators.pattern('^-?\\d{1,3}\\.\\d+$')]],
    street: ['', validations.street || [Validators.maxLength(50)]],
    race: ['', validations.race || [Validators.maxLength(100)]],
    neighborhood: ['', validations.neighborhood || [Validators.maxLength(100)]],
    description: ['', validations.description || []],
    zipcode: ['', validations.zipcode || [Validators.maxLength(50)]],
    propertyType: ['', validations.propertyType || []],
  });
};

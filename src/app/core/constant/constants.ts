import { ContractTypeEnum, GenderEnum, PropertyType } from "./enum";



export const genderObject:{label:string,value:GenderEnum }[] = [
    { label: 'Masculino', value: GenderEnum.MALE },
    { label: 'Femenino', value: GenderEnum.FEMALE },
    { label: 'Otro', value: GenderEnum.OTHER }
  ];


  export const contractType:{label:string,value:ContractTypeEnum }[] = [
    { label: 'INDEFINITE', value: ContractTypeEnum.INDEFINITE },
    { label: 'TEMPORARY', value: ContractTypeEnum.TEMPORARY },
    { label: 'FREELANCE', value: ContractTypeEnum.FREELANCE }
  ];


  export const propertyType:{label:string,value:PropertyType }[] = [
     { value: PropertyType.HOUSE, label: 'House' },
     { value: PropertyType.APARTMENT, label: 'Apartment' },
     { value: PropertyType.BUILDING, label: 'Building' },
     { value: PropertyType.COMMERCIAL_SPACE, label: 'Commercial Space' }
  ];

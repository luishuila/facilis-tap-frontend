import { PropertyType } from "../../constant/enum";
import { BaseAddress } from "./BaseAddressModel";
import {AddressUdpatedDtoI } from "./IAddress";

export class Address  extends BaseAddress implements AddressUdpatedDtoI {

  
    constructor(data: Partial<AddressUdpatedDtoI>) {
     super();
      Object.assign(this, data);
    }
  }
  
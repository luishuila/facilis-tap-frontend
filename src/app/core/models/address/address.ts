import { PropertyType } from "../../constant/enum";
import { BaseAddress } from "./BaseAddressModel";
import {AddressUdpatedDtoI } from "./AddressI";

export class Address  extends BaseAddress implements AddressUdpatedDtoI {

  
    constructor(data?: Partial<AddressUdpatedDtoI>) {
     super();
      Object.assign(this, data);
    }
  }


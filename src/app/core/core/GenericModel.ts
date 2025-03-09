export class GenericModel<T> {
  constructor(data?: Partial<T>) {
    if (data) {
      Object.assign(this, data); 
    }
  }

  toJson(): T {
    return JSON.parse(JSON.stringify(this));
  }
}

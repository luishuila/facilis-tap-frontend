export class GenericModel<T> {
  protected data?: T;
  constructor(data?: Partial<T>) {
    if (data) {
      Object.assign(this, data); 
    }
  }
  get model(): T|undefined {
    return this.data;
  }
  toJson(): T {
    return JSON.parse(JSON.stringify(this));
  }
}

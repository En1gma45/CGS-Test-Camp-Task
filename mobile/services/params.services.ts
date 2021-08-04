
abstract class ApiParam<V> {
  constructor(private name: string, protected value: V) { }

  public getParam() {
    // tslint:disable-next-line: no-null-keyword
    return this.nothingCondition() ? `${this.name}=${this.value}` : "";
  }

  public setValue(value: V): void {
    this.value = value;
  }

  abstract nothingCondition(): boolean;
}

export class PageParam extends ApiParam<number> {
  nothingCondition(): boolean {
    return this.value > 0;
  }
}

export class TitleParam extends ApiParam<string> {
  nothingCondition(): boolean {
    return this.value !== "";
  }
}

export class IsPublicParam extends ApiParam<boolean> {
  nothingCondition(): boolean {
    return this.value === true || true;
  }
}

export class IsCompletedParam extends ApiParam<boolean> {
  nothingCondition(): boolean {
    return this.value === true || true;
  }
}

export const urlHandler = (params: ApiParam<any>[]) => {
  const serializedParams = params.map((p) => p.getParam());
  const filteredParams = serializedParams.filter(item => item !== "");
  return `?${filteredParams.join("&")}`;
};
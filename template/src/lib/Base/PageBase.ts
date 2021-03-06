/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/no-empty-function */

export default class PageBase<IData> {
  /**
   * 页面名称，注意唯一性
   */
  get componentName(): string {
    return "Base";
  }

  data = {};

  options = {};

  // 序列化需要删除的属性
  private delProperties = ["options", "setData", "nextTick"];

  // 子类自定义配置序列化需要删除的属性名
  customerProperties: string[] = [];

  constructor() {
    return PageBase.serialize(this);
  }

  setData(opts?: Partial<IData>): void {
    if (opts) {
      //
    }
  }

  static serialize<T extends PageBase<any>>(obj: T): any {
    const start = Date.now();
    const that = Object.create(null);

    const delProperties = [...obj.delProperties];
    if (Array.isArray(obj.customerProperties)) {
      delProperties.push(...obj.customerProperties);
    }
    delete obj.delProperties;
    delete obj.customerProperties;

    const allProperties = [
      ...Object.keys(obj),
      ...Object.keys(Object.getPrototypeOf(obj)),
    ];
    allProperties.forEach((key) => {
      if (delProperties.includes(key)) {
        return;
      }
      that[key] = obj[key];
    });

    try {
      console.log(
        obj.componentName,
        " serialize time: ",
        Date.now() - start,
      );
    } catch (e) {
      console.log(e);
    }

    return that;
  }
}

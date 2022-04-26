/**
 * 函数类型接口:
 * interface Add {
 *  (x: number, y:number): number  // 参数个数|类型， 返回值类型
 * }
 * 
 * type Add = (x: number, y:number) => number
 * 
 * 混合类型接口：
 * 
 * interface Lib {
 *  (): void;
 *  version: string;
 *  dosomething(): void;
 * }
 * 
 * 函数：--------------------------------
 * function add(x:number, y:number) {
 *   return x + y
 * }
 * 
 * 函数类型定义：
 * 1.接口定义
 * interface add {
 *  (x:number, y:number): number
 * }
 * 
 * 2. 变量
 * let add = (x:number, y:number) => number
 * 
 * 3. type 类型别名
 * type add = (x:number, y:number) => number
 * 
 * 默认参数
 * 剩余参数
 * 
 * 重载定义：函数参数类型 | 函数参数个数 | 返回值类型 不同，方法名相同
 * function add(...rest: number[]): number;
 * function add(...rest: string[]): string;
 * function add(...rest: any[]): any {
 *  // 函数体
 * }
 * 
 * 
 */
/**
 * !!! 注意： ts存在报错，直接编译也会更新js code。编译后的js code亦可执行，但这违背ts规则。
 * 
 * 接口定义：
 * 
 * interface 接口名称 {
 *   属性名称: 类型限制
 *   readonly 属性名称: 类型限制  //只读属性限制
 * }
 * 
 * 索引签名：字符串签名| 数字签名 | symbol签名
 * 定义： [propName: propType]: valueType
 * 例如：
 * interface Persons {
 *      [x: string]: string
 * }
 * 
 * 传入的对象满足api的必要条件，即使传入对象存在多余字段也是被允许的。
 * 
 */
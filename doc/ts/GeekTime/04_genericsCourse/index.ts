/**
 * 泛型定义：不预先确定的数据类型，具体的类型在使用的时候才能确定。 [Ps: 配套函数| interface| type 进行使用]
 * 
 * 泛型函数：
 * function funcName<T> (value: T): T {}
 * 
 * 泛型接口：
 * 
 * !!! 注意： 泛型接口在运行时需要给出具体类型。 
 * 
 * 解决方法：
 * 1. 运行时给出泛型具体类型
 * 2. 设置泛型默认类型
 * 
 * interface Log<T> {
 *  (value: T): T
 * }
 * 
 * 调用方式：
 * 1. 直接指明泛型类型。 例如：
 * 2. 使用类型推断。 例如：
 * 
 * 
 * 泛型类：
 * 
 * !!! 注意： 泛型不能应用于类的静态成员
 * 
 * 
 * 泛型优点：
 * 
 * 1. 函数和类可以轻松地支持多种类型，增强程序的扩展性。
 * 2. 不必写多条函数重载，冗长的联合类型声明，增强代码可读性。
 * 3. 灵活控制里欸选哪个之间的约束。
 * 
 * */ 

function log<T> (value: T): T{ 
    console.log(value);
    return value;
}

interface Log<T> { // 运行时，需要给出泛型具体类型。
    (value: T): T
}

log("This is a test for you!")

let logVar: Log<string> = log

// ------------ 泛型类
class LogC<T> {
    run(value: T) {
        console.log(value);
        return value;
    } 
}

// 泛型约束
interface Length {
    length: number
}

function logC2<T extends Length>(value: T): T{// 当泛型不存在某一属性时，可以extends 对应interface进行实现。用于确保泛型必须存在某一属性，从而绕过类型验证
    console.log(value, value.length);
    return value;
}

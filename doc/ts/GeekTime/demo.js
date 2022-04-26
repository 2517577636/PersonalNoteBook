var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * class定义：
 *
 * class 类名 {
 *  construrctor() {
 *  }
 * }
 *
 * 1. 类成员方法挂载在原型上
 * 2. 类成员属性挂载在实例上
 * 3. 类成员属性必须具有初始值
 *
 * 类的继承【 extends 】
 * 1. super() 代表父类实例，必须存在于constructor 顶部
 * 2. 派生类构造器必须包含super()
 *
 * 成员修饰符： private| protected| publice| static  默认public
 * private: 仅能类本身进行调用，实例|派生类 无法调用。 构造函数前置private，表明当前类不能实例化，也不能被继承。
 * protected: 仅能在类和子类中调用，实例中不能调用。 构造函数前置protected，相当于基类，只能继承不能实例化。
 * readonly: 只读属性，不能被更改。 类| 子类| 实例都可以调用。
 * statict: 静态属性，可以继承，类和子类可以调用，实例不能调用。
 *
 *
 * 抽象类定义：可以继承而不能实例化的类。
 * abstract class 类名 {
 *   abstract funcName(): void; // 抽象方法定义方式
 * }
 *
 * 类型三要素：封装| 继承| 多态
 * 多态：同一功能的不同实现方式。（基类抽象方法，派生类实现抽象方法，不同派生类实现方式不同，这就为多态）
 * */
var Dog = /** @class */ (function () {
    function Dog(name) {
        this.color = "white"; // 验证private成员，实例化对象无法访问
        this.name = name;
    }
    // age: number; // 验证成员属性必须初始化
    Dog.prototype.run = function () { };
    Dog.prototype.eat = function () {
        console.log("dog eat");
    };
    Dog.prototype.getColor = function () {
        return this.color; // 验证private成员，只能在类内部进行访问
    };
    return Dog;
}());
var HuSky = /** @class */ (function (_super) {
    __extends(HuSky, _super);
    function HuSky(name) {
        return _super.call(this, name) || this;
    }
    HuSky.prototype.run = function () { };
    return HuSky;
}(Dog));
var dog = new Dog("小花");
var husky = new HuSky("husky");
console.log("dog: ", dog, "huSky: ", husky);
// console.log("husky: ", husky.eat());
var Animal = /** @class */ (function () {
    function Animal(name) {
        this.name = name;
    }
    Animal.prototype.say = function () { };
    ;
    return Animal;
}());

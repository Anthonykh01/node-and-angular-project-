"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Foo = void 0;
console.log('hello from typescript');
class Foo {
    constructor(field1) {
        this.field1 = field1;
    }
    print() {
        console.log('failed', this.field1);
    }
}
exports.Foo = Foo;
let foo = new Foo(123);
foo.print();

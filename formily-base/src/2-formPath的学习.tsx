import { createForm, FormPath } from "@formily/core";
// 创建表单领域模型
const form = createForm();
// 创建字段领域模型
const field = form.createField({ name: "target" });

const target = { arr: [] };
// 给 目标对象的 指定属性 赋值 如；给目标对象 a属性的b属性的c属性 赋值
FormPath.setIn(target, "a.b.c", "dotValue");
// 可以直接取值
// console.log(target, target.a.b.c);
// 也可以通过 getIn方法取值
console.log(FormPath.getIn(target, "a.b.c"));
// 也可以通过下标赋值取值
FormPath.setIn(target, "arr.0.d", 1);
console.log(target.arr); //[{d: 1}]

// 还可以解构赋值 我们在前后端通信 数据结构不一致的情况下特别方便
FormPath.setIn(target, "parent.[f,g]", [2, 3]);
FormPath.setIn(target, "son.{a,b}", { a: 4, b: 5 });
console.log(target);
function App() {
  return (
    <>
      <div>1</div>
    </>
  );
}

export default App;

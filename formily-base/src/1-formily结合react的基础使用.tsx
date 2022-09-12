import { observable, autorun } from "./@formily/reactive";
import { Observer } from "./@formily/reactive-react";

const demo1 = () => {
  // 创建不同的响应式行为的可观察对象
  const obs = observable({ name: "zs" });
  // reaction 可订阅对象的订阅者
  // autorun创建一个自动执行的响应器
  // 当tracker函数的执行的时候 如果函数内部有对observable对象的某个属性进行读操作 会进行依赖收集
  // 当前的reaction就会与 reaction 就会与属性进行一个绑定，当属性发生了写操作，就会触发tracker的重新执行（也会重新依赖收集）
  const tracker = () => {
    // tracker 跟踪器 访问可观察对象的某些属性
    console.log(obs.name);
  };
  // 接收一个tracker函数 如果函数内有消费observable数据 数据发送变化的时候tracker会重新执行
  autorun(tracker);
  setTimeout(() => {
    obs.name = "mj";
  }, 2000);
};

// 结合react 使用
const username = observable({ value: "zs" });
const age = observable({ value: 14 });
function App() {
  return (
    <>
      <Observer>
        {() => (
          <input
            value={username.value}
            onChange={(event) => (username.value = event.target.value)}
          />
        )}
      </Observer>
      <Observer>
        {() => {
          console.log("username render ...");
          return <div>{username.value}</div>;
        }}
      </Observer>
      <Observer>
        {() => (
          <input
            value={age.value}
            onChange={(event) => (age.value = +event.target.value)}
          />
        )}
      </Observer>
      <Observer>
        {() => {
          console.log("age render ...");
          return <div>{age.value}</div>;
        }}
      </Observer>
    </>
  );
}

export default App;

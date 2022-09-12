import { createForm, onFormReact, onFormInit } from "@formily/core";
import { useMemo, useState } from "react";

function App() {
  const [state, setState] = useState("未设置");
  const form = useMemo(() => {
    console.log('create form')
    return createForm({
      // 副作用逻辑
      effects() {
        // 表单初始化钩子
        onFormInit(() => {
          setState("表单初始化");
        });
        onFormReact((form) => {
          if (form.values.input === "hello") {
            setState("hello");
          }
        });
      },
    });
  }, []);
  return (
    <>
      <h1>{state}</h1>
      <button onClick={() => form.setValuesIn("input", "hello")}>按钮</button>
    </>
  );
}

export default App;

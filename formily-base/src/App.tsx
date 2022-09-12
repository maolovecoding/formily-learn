import { createForm, onFieldMount, onFieldValueChange } from "@formily/core";
import { Form, FormItem, Input } from "@formily/antd";
import { createSchemaField } from "@formily/react";
import "antd/dist/antd.css";

const form = createForm({
  // 表单创建成功后 会执行该函数
  effects() {
    // /防止初始化阶段直接挂载到页面
    onFieldMount("target", (field: any) => {
      form.setFieldState(field.query("target"), (targetState) => {
        if (field.value === "123") {
          targetState.visible = true;
        } else {
          targetState.visible = false;
        }
      });
    });
    onFieldValueChange("source", (field: any) => {
      form.setFieldState(field.query("target"), (targetState) => {
        if (field.value === "123") {
          targetState.visible = true;
        } else {
          targetState.visible = false;
        }
      });
    });
  },
});
const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
  },
});
// 实现表单联动 schema联动协议
// 根据来源的值 主动修改满足条件后的目标表单的值
const schema = {
  type: "object",
  properties: {
    source: {
      title: "来源",
      required: true,
      type: "string",
      // 外层装饰
      "x-decorator": "FormItem",
      // /ui框架
      "x-component": "Input",
      "x-component-props": {
        placeholder: "请输入",
      },
    },
    target: {
      title: "目标",
      type: "string",
      "x-decorator": "FormItem",
      "x-component": "Input",
      "x-component-props": {
        placeholder: "请输入",
      },
    },
  },
};
function App() {
  return (
    <Form form={form} labelCol={6} wrapperCol={5}>
      <SchemaField schema={schema} />
    </Form>
  );
}

export default App;

import { createForm } from "@formily/core";
import { Form, FormItem, Input } from "@formily/antd";
import { createSchemaField } from "@formily/react";
import "antd/dist/antd.css";

const form = createForm();
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
      // 被动联动
      "x-reactions": [
        {
          // 依赖来源
          dependencies: ["source"],
          // 联动条件 $self 当前字段的实例
          // 依赖的表单项的第一个的值是123的时候
          when: "{{$deps[0] === '123'}}",
          fulfill: {
            state: {
              visible: true,
            },
          },
          otherwise: {
            state: {
              visible: false,
            },
          },
        },
      ],
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

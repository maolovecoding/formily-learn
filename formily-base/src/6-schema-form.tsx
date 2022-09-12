import { createForm } from "@formily/core";
import { Form, FormItem, Input, NumberPicker } from "@formily/antd";
import { createSchemaField } from "@formily/react";
import "antd/dist/antd.css";

const form = createForm();
const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
  },
});
const schema = {
  type: "object",
  properties: {
    name: {
      title: "姓名",
      required: true,
      type: "string",
      // 外层装饰
      "x-decorator": "FormItem",
      // /ui框架
      "x-component": "Input",
    },
    email: {
      title: "邮箱",
      required: true,
      type: "string",
      // 规则验证
      "x-validator": "email",
      "x-decorator": "FormItem",
      "x-component": "Input",
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

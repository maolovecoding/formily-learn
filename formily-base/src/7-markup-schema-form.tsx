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

function App() {
  return (
    <Form form={form} labelCol={6} wrapperCol={5}>
      <SchemaField>
        <SchemaField.String
          name="name"
          required
          title="姓名"
          x-component="Input"
          x-component-props={{}}
          x-decorator="FormItem"
        />
        <SchemaField.String
          name="email"
          required
          title="邮箱"
          x-component="Input"
          x-validator="email"
          x-component-props={{}}
          x-decorator="FormItem"
        />
      </SchemaField>
    </Form>
  );
}

export default App;

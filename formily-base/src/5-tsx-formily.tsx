import { createForm } from "@formily/core";
import { Form, FormItem, Input, NumberPicker } from "@formily/antd";
import { Field } from "@formily/react";
import "antd/dist/antd.css";

const form = createForm();
function App() {
  return (
    <Form form={form} labelCol={6} wrapperCol={5}>
      <Field
        name="name"
        title="姓名"
        required
        component={[Input, {}]}
        decorator={[FormItem, {}]}
      />
      <Field
        name="age"
        title="年龄"
        required
        component={[Input, {}]}
        decorator={[FormItem, {}]}
      />
    </Form>
  );
}

export default App;

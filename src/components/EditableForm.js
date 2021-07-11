import React, { useState, useEffect, useContext } from 'react';
import { Form, Input, Button, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const EditableForm = ({onSubmitTag, item}) => {
  const onFinish = values => {
    console.log('Received values of form:', values);
    onSubmitTag()
  };

  console.log('ITEM ITEM ITEM ', item)

  return (
    <Form name="dynamic_form_nest_item" onFinish={(value) => onSubmitTag(value, item)} autoComplete="off">
      <Form.List name="transaction">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, fieldKey, ...restField }) => (
              <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                <Form.Item
                  {...restField}
                  name={'tag'}
                  fieldKey={[fieldKey, 'tag']}
                  rules={[{ required: true, message: 'Missing tag' }]}
                >
                  <Input placeholder="Tag" />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Add a Tag
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditableForm
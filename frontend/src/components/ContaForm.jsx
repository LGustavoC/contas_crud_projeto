import { Button, Form, Input, InputNumber, Select, Card } from 'antd';
import { useEffect } from 'react';
import { api } from '../api';

export default function ContaForm({ contaEditada, onSaved }) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (contaEditada) {
      form.setFieldsValue(contaEditada);
    } else {
      form.resetFields();
    }
  }, [contaEditada, form]);

  const onFinish = async (values) => {
    if (contaEditada) {
      await api.put(`/contas/${contaEditada.id}`, values);
    } else {
      await api.post('/contas', values);
    }
    onSaved();
    form.resetFields();
  };

  return (
    <Card title={contaEditada ? 'Editar Conta' : 'Nova Conta'}>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item name="nome" label="Nome" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="descricao" label="Descrição">
          <Input />
        </Form.Item>
        <Form.Item name="natureza" label="Natureza" rules={[{ required: true }]}>
          <Select>
            <Select.Option value="D">Devedora</Select.Option>
            <Select.Option value="C">Credora</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="valor" label="Valor" rules={[{ required: true }]}>
          <InputNumber style={{ width: '100%' }} min={0} step={0.01} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {contaEditada ? 'Atualizar' : 'Salvar'}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

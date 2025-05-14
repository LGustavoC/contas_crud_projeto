import { useState } from 'react';
import { Form, Input, Button, Card, message } from 'antd';

export default function Login({ onLogin }) {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      await onLogin(values.email, values.senha);
    } catch (err) {
      message.error('Falha ao tentar logar.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Login" style={{ maxWidth: 400, margin: '0 auto' }}>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: 'Informe o email' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="senha"
          label="Senha"
          rules={[{ required: true, message: 'Informe a senha' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Entrar
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

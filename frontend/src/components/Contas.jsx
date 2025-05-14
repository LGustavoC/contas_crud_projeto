import { useEffect, useState } from 'react';
import { Form, Input, Button, List, Card, message, Space, Popconfirm, Select } from 'antd';
import { DownloadOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import { InputNumber } from 'antd';
import { api } from '../api';
import * as XLSX from 'xlsx';

const { Option } = Select;

export default function Contas() {
  const [contas, setContas] = useState([]);
  const [form] = Form.useForm();
  const [editando, setEditando] = useState(null);
  const [filtro, setFiltro] = useState('');

  const fetchContas = async () => {
    try {
      const res = await api.get('/contas');
      setContas(res.data);
    } catch (err) {
      message.error('Erro ao carregar contas');
    }
  };

  useEffect(() => {
    fetchContas();
  }, []);

  const salvarConta = async (values) => {
    try {
      values.valor = parseFloat(values.valor);

      if (editando) {
        await api.put(`/contas/${editando.id}`, values);
        message.success('Conta atualizada');
      } else {
        await api.post('/contas', values);
        message.success('Conta criada');
      }

      form.resetFields();
      setEditando(null);
      fetchContas();
    } catch (err) {
      message.error('Erro ao salvar conta');
    }
  };

  const editarConta = (conta) => {
    setEditando(conta);
    form.setFieldsValue(conta);
  };

  const excluirConta = async (id) => {
    try {
      await api.delete(`/contas/${id}`);
      message.success('Conta excluída');
      fetchContas();
    } catch (err) {
      message.error('Erro ao excluir conta');
    }
  };

  const exportarParaExcel = () => {
    const ws = XLSX.utils.json_to_sheet(contas);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Contas');
    XLSX.writeFile(wb, 'contas-contabeis.xlsx');
  };

  const contasFiltradas = contas.filter((c) =>
    c.nome.toLowerCase().includes(filtro.toLowerCase()) ||
    c.natureza.toLowerCase().includes(filtro.toLowerCase()) ||
    c.descricao?.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <Card
      title="Contas Contábeis"
      extra={<Button icon={<DownloadOutlined />} onClick={exportarParaExcel}>Exportar</Button>}
    >
      <Input
        placeholder="Buscar por nome, natureza ou descrição"
        prefix={<SearchOutlined />}
        style={{ marginBottom: 16 }}
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
      />

      <Form
        form={form}
        layout="vertical"
        onFinish={salvarConta}
      >
        <Form.Item name="nome" label="Nome" rules={[{ required: true, message: 'Por favor, insira o nome' }]}> 
          <Input /> 
        </Form.Item>
        <Form.Item name="natureza" label="Natureza" rules={[{ required: true, message: 'Por favor, selecione a natureza' }]}> 
          <Select placeholder="Selecione a natureza">
            <Option value="D">Débito</Option>
            <Option value="C">Crédito</Option>
          </Select>
        </Form.Item>
        <Form.Item name="valor" label="Valor" rules={[{ required: true }]}>
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name="descricao" label="Descrição"> <Input.TextArea rows={2} /> </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">{editando ? 'Atualizar' : 'Salvar'}</Button>
            {editando && <Button onClick={() => {
              form.resetFields();
              setEditando(null);
            }}>Cancelar</Button>}
          </Space>
        </Form.Item>
      </Form>

      <List
        itemLayout="horizontal"
        dataSource={contasFiltradas}
        renderItem={item => (
          <List.Item
            actions={[
              <Button type="link" onClick={() => editarConta(item)}>Editar</Button>,
              <Popconfirm title="Excluir esta conta?" onConfirm={() => excluirConta(item.id)} okText="Sim" cancelText="Não">
                <Button type="link" danger icon={<DeleteOutlined />}>Excluir</Button>
              </Popconfirm>
            ]}
          >
            <List.Item.Meta
              title={item.nome}
              description={`Natureza: ${item.natureza} | Valor: R$ ${item.valor}`}
            />
          </List.Item>
        )}
      />
    </Card>
  );
}

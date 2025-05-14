import { useEffect, useState } from 'react';
import { api } from '../api';
import { Table, Button, Popconfirm, message } from 'antd';

export default function ContaList({ onEdit }) {
  const [contas, setContas] = useState([]);
  const [loading, setLoading] = useState(false);

  const carregarContas = async () => {
    setLoading(true);
    try {
      const response = await api.get('/contas');
      setContas(response.data);
    } catch (e) {
      message.error('Erro ao carregar contas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarContas();
  }, []);

  const deletarConta = async (id) => {
    try {
      await api.delete(`/contas/${id}`);
      message.success('Conta excluída');
      carregarContas();
    } catch (e) {
      message.error('Erro ao excluir');
    }
  };

  const columns = [
    { title: 'Nome', dataIndex: 'nome' },
    { title: 'Descrição', dataIndex: 'descricao' },
    { title: 'Natureza', dataIndex: 'natureza' },
    { title: 'Valor', dataIndex: 'valor' },
    {
      title: 'Ações',
      render: (_, record) => (
        <>
          <Button onClick={() => onEdit(record)} type="link">Editar</Button>
          <Popconfirm title="Confirmar exclusão?" onConfirm={() => deletarConta(record.id)}>
            <Button type="link" danger>Excluir</Button>
          </Popconfirm>
        </>
      )
    }
  ];

  return (
    <Table
      dataSource={contas}
      columns={columns}
      rowKey="id"
      loading={loading}
    />
  );
}

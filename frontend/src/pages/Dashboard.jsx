import { Button, Layout, Typography, Divider } from 'antd';
import ContaForm from '../components/ContaForm';
import ContaList from '../components/ContaList';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const { Header, Content } = Layout;
const { Title } = Typography;

export default function Dashboard() {
  const [editando, setEditando] = useState(null);
  const [refetch, setRefetch] = useState(0);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ background: '#001529', padding: '0 20px', display: 'flex', justifyContent: 'space-between' }}>
        <Title level={3} style={{ color: 'white', margin: 0 }}>Contas Contábeis</Title>
        <Button type="primary" danger onClick={logout}>Sair</Button>
      </Header>
      <Content style={{ padding: 20 }}>
        <ContaForm contaEditada={editando} onSaved={() => {
          setEditando(null);
          setRefetch(refetch + 1);
        }} />
        <Divider />
        <ContaList onEdit={setEditando} key={refetch} />
      </Content>
    </Layout>
  );
}

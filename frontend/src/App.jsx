import { useEffect, useState } from 'react';
import { Layout, Typography, message } from 'antd';
import Login from './components/Login';
import Contas from './components/Contas';
import { api, setAuthToken } from './api';

const { Header, Content } = Layout;
const { Title } = Typography;

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) setAuthToken(token);
  }, [token]);

  const handleLogin = async (email, senha) => {
    try {
      const res = await api.post('/auth/login', { email, senha });
      localStorage.setItem('token', res.data);
      setAuthToken(res.data);
      setToken(res.data);
    } catch (err) {
      message.error('Email ou senha inválidos');
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ backgroundColor: '#001529', padding: '0 20px' }}>
        <Title style={{ color: '#fff', margin: 0 }} level={3}>Contas Contábeis</Title>
      </Header>
      <Content style={{ padding: '20px' }}>
        {token ? <Contas /> : <Login onLogin={handleLogin} />}
      </Content>
    </Layout>
  );
}

export default App;
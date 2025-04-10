import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function CustomerDetail() {
  const { id } = useParams();
  const [cliente, setCliente] = useState(null);
  const [error, setError] = useState('');

  const fetchCliente = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/clientes/${id}`);
      setCliente(response.data);
    } catch (err) {
      setError('Erro ao buscar detalhes do cliente');
    }
  };

  useEffect(() => {
    fetchCliente();
  }, [id]);

  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!cliente) return <p>Carregando detalhes...</p>;

return (
    <div>
        <h2>Detalhes do Cliente</h2>
        <p><strong>ID:</strong> {cliente.id}</p>
        <p><strong>Nome:</strong> {cliente.nome}</p>
        <p><strong>Ano de Nascimento:</strong> {cliente.anoNascimento}</p>
        <p><strong>Endereço:</strong> {cliente.endereco}</p>
        <p><strong>Gênero:</strong> {cliente.genero}</p>
        <p><strong>CPF:</strong> {cliente.cpf}</p>
        <Link to="/clientes">
            <button>Voltar para a lista</button>
        </Link>
    </div>
);
}

export default CustomerDetail;

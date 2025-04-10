import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function CustomerList() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchClientes = async () => {
    try {
      const response = await axios.get('http://localhost:3001/clientes');
      setClientes(response.data);
    } catch (err) {
      setError('Erro ao buscar clientes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  const deleteCliente = async (id) => {
    if(window.confirm("Deseja realmente excluir este cliente?")){
      try {
        await axios.delete(`http://localhost:3001/clientes/${id}`);
        setClientes(clientes.filter(cliente => cliente.id !== id));
      } catch (err) {
        alert('Erro ao excluir cliente');
      }
    }
  };

  if (loading) return <p>Carregando clientes...</p>;
  if (error) return <p>{error}</p>;

return (
    <div>
        <h2>Lista de Clientes</h2>
        <div>
            <Link to="/clientes/new">
                <button>Adicionar Novo Cliente</button>
            </Link>
        </div>
        <table border="1" cellPadding="5" cellSpacing="0">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Ano Nascimento</th>
                    <th>Endereço</th>
                    <th>Gênero</th>
                    <th>CPF</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {clientes.map(cliente => (
                    <tr key={cliente.id}>
                        <td>{cliente.id}</td>
                        <td>{cliente.nome}</td>
                        <td>{cliente.anoNascimento}</td>
                        <td>{cliente.endereco}</td>
                        <td>{cliente.genero}</td>
                        <td>{cliente.cpf}</td>
                        <td>
                            <Link to={`/clientes/${cliente.id}`}>
                                <button>Detalhar</button>
                            </Link>{' '}
                            <Link to={`/clientes/${cliente.id}/edit`}>
                                <button>Editar</button>
                            </Link>{' '}
                            <button onClick={() => deleteCliente(cliente.id)}>Excluir</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);
}

export default CustomerList;

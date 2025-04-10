import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function CustomerForm() {
  const { id } = useParams();
  const isEditing = !!id;
  const navigate = useNavigate();

  const [cliente, setCliente] = useState({
    nome: '',
    anoNascimento: '',
    endereco: '',
    genero: '',
    cpf: '',
  });
  const [error, setError] = useState('');

  const fetchCliente = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/clientes/${id}`);
      setCliente(response.data);
    } catch (err) {
      setError('Erro ao buscar cliente');
    }
  };

  useEffect(() => {
    if (isEditing) {
      fetchCliente();
    }
  }, [id, isEditing]);

  const handleChange = e => {
    setCliente({ ...cliente, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!cliente.nome || !cliente.anoNascimento || !cliente.endereco || !cliente.genero || !cliente.cpf) {
      setError('Todos os campos são obrigatórios.');
      return;
    }

    try {
      if (isEditing) {
        await axios.put(`http://localhost:3001/clientes/${id}`, cliente);
        alert('Cliente atualizado com sucesso');
      } else {
        await axios.post('http://localhost:3001/clientes', cliente);
        alert('Cliente criado com sucesso');
      }
      navigate('/clientes');
    } catch (err) {
      setError('Erro ao salvar os dados');
    }
  };

return (
    <div>
        <h2>{isEditing ? 'Editar Cliente' : 'Novo Cliente'}</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
            <div>
                <label>Nome:</label>
                <input type="text" name="nome" value={cliente.nome} onChange={handleChange} />
            </div>
            <div>
                <label>Ano de Nascimento:</label>
                <input type="number" name="anoNascimento" value={cliente.anoNascimento} onChange={handleChange} />
            </div>
            <div>
                <label>Endereço:</label>
          <input type="text" name="endereco" value={cliente.endereco} onChange={handleChange} />
        </div>
        <div>
          <label>Gênero:</label>
          <select name="genero" value={cliente.genero} onChange={handleChange}>
            <option value="">Selecione</option>
            <option value="Masculino">Masculino</option>
            <option value="Feminino">Feminino</option>
            <option value="Outro">Outro</option>
          </select>
        </div>
        <div>
          <label>CPF:</label>
          <input type="text" name="cpf" value={cliente.cpf} onChange={handleChange} />
        </div>
        <button type="submit">{isEditing ? 'Atualizar' : 'Cadastrar'}</button>
      </form>
    </div>
  );
}

export default CustomerForm;

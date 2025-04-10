import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CustomerList from './components/CustomerList';
import CustomerForm from './components/CustomerForm';
import CustomerDetail from './components/CustomerDetail';

function App() {
return (
    <Router>
        <div>
            <header style={{ padding: '10px', backgroundColor: '#f0f0f0' }}>
                <h1>
                    Sistema 
                    C<h6 style={{ fontSize: '15px', display: 'inline' }}>reate</h6>R
                    <h6 style={{ fontSize: '15px', display: 'inline' }}>ead</h6>U
                    <h6 style={{ fontSize: '15px', display: 'inline' }}>pdate</h6>D
                    <h6 style={{ fontSize: '15px', display: 'inline' }}>elete</h6>
                    <br></br><h1>Clientes</h1>
                </h1>
                <p>Feito por Lucca Fabricio Magalhães (Turma 5B de BCC)</p>
                <nav>
                    <Link to="/clientes">Lista de Clientes</Link> |{' '}
                    <Link to="/clientes/new">Novo Cliente</Link>
                </nav>
            </header>

            <main style={{ padding: '20px' }}>
                <Routes>
                    <Route path="/clientes" element={<CustomerList />} />
                    <Route path="/clientes/new" element={<CustomerForm />} />
                    <Route path="/clientes/:id/edit" element={<CustomerForm />} />
                    <Route path="/clientes/:id" element={<CustomerDetail />} />
                    <Route path="/" element={<CustomerList />} />
                </Routes>
            </main>

            <footer style={{ padding: '10px', backgroundColor: '#f0f0f0', textAlign: 'center' }}>
                <p>2025 - Lucca Fabricio Magalhães</p>
            </footer>
        </div>
    </Router>
);
}

export default App;

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/esm/Container';
import { useState } from 'react';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const endpoint = import.meta.env.VITE_SERVER_ENDPOINT_DEV;
  
  const handleSubmit = async (e) => {
    console.log(endpoint);
      e.preventDefault();
      try {
          const response = await axios.post(`${endpoint}/login`, {
            username,
            password,
          });
    
          console.log('Response:', response.data);
        } catch (err) {
          console.error('Error:', err);
        }
  }
  return (
    <Container className='mt-5'>
        <h1>Login</h1>
        <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control 
                type="text" 
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
             />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control 
                type="password" 
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
            />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
            Submit
        </Button>
        </Form>
    </Container>
  );
}

export default Login;
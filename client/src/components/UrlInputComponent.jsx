import { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

const UrlInput = () => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState(null);

  const endpoint = import.meta.env.VITE_SERVER_ENDPOINT_DEV;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(`OG url: ${originalUrl}`);
      const response = await axios.post(`${endpoint}/shorten`, {
        url: originalUrl,
      });

      setShortUrl(`${endpoint}/${response.data.shortUrl}`);
      setError(null); 
    } catch (err) {
      setError('Error occurred while shortening URL.');
      setShortUrl('');
      console.error(err);
    }
  };

  return (
    <Container className="mt-5">
      <div style={{ maxWidth: '400px', margin: '0 auto' }}>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Enter URL to Shorten</Form.Label>
            <Form.Control
              type="url"
              placeholder="https://example.com"
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Shorten URL
          </Button>
        </Form>

        {shortUrl && (
          <Alert variant="success" className="mt-3">
            Short URL: <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a>
            <p>
               Want to store your converted URLs? Sign up for an account.
            </p>
          </Alert>
        )}

        {error && (
          <Alert variant="danger" className="mt-3">
            {error}
          </Alert>
        )}
      </div>
    </Container>
  );
};

export default UrlInput;

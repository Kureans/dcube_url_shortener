import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, ListGroup } from 'react-bootstrap';

const UrlPanel = (props) => {
//   const [urls, setUrls] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const endpoint = import.meta.env.VITE_SERVER_ENDPOINT_DEV;
  
//   useEffect(() => {
//     // Fetch the shortened and original URLs for the given user ID
//     axios.get(`${endpoint}?userId=${props.userId}`)
//       .then((response) => {
//         setUrls(response.data);
//         setLoading(false);
//         setError(null);
//       })
//       .catch((err) => {
//         setLoading(false);
//         setError('Error fetching data.');
//         console.error(err);
//       });
//   }, [userId]);

  return (
    <Container className="mt-5">
      {/* {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : urls.length === 0 ? (
        <p>No URLs found for this user.</p>
      ) : (
        <ListGroup>
          {urls.map((url, index) => (
            <ListGroup.Item key={index}>
              <strong>Shortened URL:</strong> {url.shortenedUrl}
              <br />
              <strong>Original URL:</strong> {url.originalUrl}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )} */}
    </Container>
  );
};

export default UrlPanel;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  CircularProgress,
  Box,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const API_BASE = 'http://localhost:5000';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products from backend on mount (and on page refresh)
  useEffect(() => {
    fetchProducts();
  }, []);

  // GET /api/products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${API_BASE}/api/products`);
      setProducts(data);
    } catch (err) {
      setError('Failed to load products. Please make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  // DELETE /api/products/:id
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE}/api/products/${id}`);
      // Remove from frontend state after successful backend delete
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error('Failed to delete product:', err);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Title */}
      <Typography
        variant="h4"
        fontWeight="bold"
        align="center"
        gutterBottom
        sx={{ mb: 4 }}
      >
        Simple Card List
      </Typography>

      {/* Product grid — responsive, centered */}
      <Grid container spacing={3} justifyContent="center">
        {products.map(product => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>

              {/* Delete icon button — top-right corner of card image */}
              <IconButton
                onClick={() => handleDelete(product.id)}
                size="small"
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  backgroundColor: 'rgba(255,255,255,0.85)',
                  color: 'error.main',
                  '&:hover': {
                    backgroundColor: 'error.main',
                    color: 'white',
                  },
                  zIndex: 1,
                }}
                aria-label={`Delete ${product.name}`}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>

              {/* Product image */}
              <CardMedia
                component="img"
                height="200"
                image={product.imageUrl}
                alt={product.name}
              />

              {/* Product info */}
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {product.name}
                </Typography>
                <Typography variant="body1" sx={{ mb: 0.5 }}>
                  ${product.price}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description}
                </Typography>
              </CardContent>

            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Empty state */}
      {products.length === 0 && (
        <Box textAlign="center" mt={8}>
          <Typography color="text.secondary">No products remaining.</Typography>
        </Box>
      )}
    </Container>
  );
};

export default ProductList;

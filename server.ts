import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import { PRODUCTS, CATEGORIES } from './src/data/mockProducts.ts';
import { Order } from './src/types.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// In-memory persistent order store for this session
const ordersDatabase: Map<string, Order> = new Map();

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // API Routes
  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({ status: 'ok', service: 'Volt Electronics Store API', timestamp: new Date().toISOString() });
  });

  // Get all products with search, filter, and sort
  app.get('/api/products', (req: Request, res: Response) => {
    const { category, search, sort } = req.query;
    let results = [...PRODUCTS];

    if (category && category !== 'all') {
      results = results.filter((p) => p.category === category);
    }

    if (search && typeof search === 'string') {
      const q = search.toLowerCase().trim();
      results = results.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    if (sort === 'price-asc') {
      results.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-desc') {
      results.sort((a, b) => b.price - a.price);
    } else if (sort === 'rating') {
      results.sort((a, b) => b.rating - a.rating);
    } else if (sort === 'reviews') {
      results.sort((a, b) => b.reviewsCount - a.reviewsCount);
    }

    res.json({
      success: true,
      count: results.length,
      products: results
    });
  });

  // Get single product
  app.get('/api/products/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const product = PRODUCTS.find((p) => p.id === id);

    if (!product) {
      res.status(404).json({ success: false, error: 'Product not found' });
      return;
    }

    // Include related products in the same category
    const related = PRODUCTS.filter((p) => p.id !== id && p.category === product.category).slice(0, 3);

    res.json({
      success: true,
      product,
      related
    });
  });

  // Get categories
  app.get('/api/categories', (_req: Request, res: Response) => {
    res.json({
      success: true,
      categories: CATEGORIES
    });
  });

  // Validate promotional coupon codes
  app.post('/api/validate-promo', (req: Request, res: Response) => {
    const { code, subtotal } = req.body;
    if (!code || typeof code !== 'string') {
      res.status(400).json({ valid: false, message: 'Please provide a valid promo code' });
      return;
    }

    const cleanCode = code.toUpperCase().trim();
    if (cleanCode === 'TECH20') {
      const discount = Math.round(Number(subtotal) * 0.2 * 100) / 100;
      res.json({
        valid: true,
        code: 'TECH20',
        discountPercentage: 20,
        discountAmount: discount,
        message: '20% Tech Savings coupon applied successfully!'
      });
      return;
    }

    if (cleanCode === 'PRIME10') {
      const discount = Math.round(Number(subtotal) * 0.1 * 100) / 100;
      res.json({
        valid: true,
        code: 'PRIME10',
        discountPercentage: 10,
        discountAmount: discount,
        message: '10% Prime Member discount applied!'
      });
      return;
    }

    if (cleanCode === 'FREESHIP') {
      res.json({
        valid: true,
        code: 'FREESHIP',
        discountPercentage: 0,
        discountAmount: 0,
        freeShipping: true,
        message: 'Free Express Shipping unlocked!'
      });
      return;
    }

    res.status(404).json({
      valid: false,
      message: 'Invalid or expired promotional code. Try using "TECH20"'
    });
  });

  // Create Order / Checkout endpoint
  app.post('/api/orders', (req: Request, res: Response) => {
    try {
      const { items, shippingAddress, deliveryOption, paymentDetails, promoCode } = req.body;

      if (!items || !Array.isArray(items) || items.length === 0) {
        res.status(400).json({ success: false, error: 'Shopping cart is empty' });
        return;
      }

      if (!shippingAddress || !shippingAddress.fullName || !shippingAddress.street || !shippingAddress.zipCode) {
        res.status(400).json({ success: false, error: 'Incomplete shipping address' });
        return;
      }

      // Calculate totals securely on server
      let subtotal = 0;
      for (const item of items) {
        const product = PRODUCTS.find((p) => p.id === item.product.id);
        const itemPrice = product ? product.price : item.finalPrice;
        const warrantyPrice = item.withWarranty ? 29.99 : 0;
        subtotal += (itemPrice + warrantyPrice) * item.quantity;
      }

      let discount = 0;
      if (promoCode === 'TECH20') {
        discount = subtotal * 0.2;
      } else if (promoCode === 'PRIME10') {
        discount = subtotal * 0.1;
      }

      const shippingCost = deliveryOption?.price || 0;
      const tax = (subtotal - discount) * 0.0825; // 8.25% standard sales tax
      const total = Math.max(0, subtotal - discount + shippingCost + tax);

      const orderNumber = `VOLT-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`;
      const orderId = `ord_${Date.now()}`;

      // Estimated delivery calculation
      const deliveryDays = deliveryOption?.id === 'express' ? 1 : deliveryOption?.id === 'priority' ? 2 : 4;
      const deliveryDate = new Date();
      deliveryDate.setDate(deliveryDate.getDate() + deliveryDays);

      const order: Order = {
        id: orderId,
        orderNumber,
        items,
        shippingAddress,
        deliveryOption: deliveryOption || {
          id: 'standard',
          name: 'FREE Standard Delivery',
          description: 'Delivered in 3-5 business days',
          estimatedDate: deliveryDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          price: 0
        },
        paymentDetails: {
          method: paymentDetails?.method || 'credit_card',
          cardNumber: paymentDetails?.cardNumber ? `•••• •••• •••• ${paymentDetails.cardNumber.slice(-4)}` : undefined
        },
        subtotal: Math.round(subtotal * 100) / 100,
        shippingCost: Math.round(shippingCost * 100) / 100,
        tax: Math.round(tax * 100) / 100,
        discount: Math.round(discount * 100) / 100,
        total: Math.round(total * 100) / 100,
        createdAt: new Date().toISOString(),
        estimatedDeliveryDate: deliveryDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
        status: 'confirmed'
      };

      ordersDatabase.set(orderId, order);

      res.status(201).json({
        success: true,
        order
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message || 'Server error creating order' });
    }
  });

  // Get order by id
  app.get('/api/orders/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const order = ordersDatabase.get(id);

    if (!order) {
      res.status(404).json({ success: false, error: 'Order not found' });
      return;
    }

    res.json({ success: true, order });
  });

  // Setup Vite in Dev or static in Prod
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: false
      },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Volt Electronic Store backend running at http://0.0.0.0:${PORT}`);
  });
}

startServer();

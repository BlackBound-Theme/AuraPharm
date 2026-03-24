const CACHE_NAME = 'vyloxia-demo-v1';

// Seeded Data
let demoSettings = {
  pharmacy_name: 'Vyloxia Global Demo',
  branch_address: '101 Demo Street, New York, NY 10001',
  contact_number: '+1 (555) 019-2837',
  gst_vat_number: 'VAT-DEMO-99182',
  currency_symbol: '$',
  currency_code: 'USD',
  tax_name: 'Tax',
  default_tax_rate: 8.5
};

const demoCategories = ['Pain Relief', 'Antibiotics', 'Vitamins', 'First Aid', 'Skincare'];

let demoProducts = [
  { id: 1, product_id: 1, brand_name: 'Paracetamol 500mg', generic_name: 'Acetaminophen', category: 'Pain Relief', stock_current: 120, selling_price: 5.99, cost_price: 1.50, batch_number: 'B-001X', expiry_date: '2028-12-01' },
  { id: 2, product_id: 2, brand_name: 'Amoxicillin 250mg', generic_name: 'Amoxicillin Trihydrate', category: 'Antibiotics', stock_current: 50, selling_price: 12.50, cost_price: 4.00, batch_number: 'A-229P', expiry_date: '2025-05-15' },
  { id: 3, product_id: 3, brand_name: 'Vitamin C Plus Zinc', generic_name: 'Ascorbic Acid + Zinc', category: 'Vitamins', stock_current: 200, selling_price: 18.00, cost_price: 6.00, batch_number: 'V-991C', expiry_date: '2027-01-20' },
  { id: 4, product_id: 4, brand_name: 'Ibuprofen 400mg', generic_name: 'Ibuprofen', category: 'Pain Relief', stock_current: 85, selling_price: 8.99, cost_price: 2.20, batch_number: 'I-400X', expiry_date: '2029-03-10' },
  { id: 5, product_id: 5, brand_name: 'Band-Aid Tough Strips', generic_name: 'Bandage', category: 'First Aid', stock_current: 300, selling_price: 4.50, cost_price: 1.00, batch_number: 'BA-T01', expiry_date: '2030-01-01' },
];

let demoSales = [];
let demoSuppliers = [
  { id: 1, name: 'PharmaCorp Global', registration_number: 'PAN-100293', phone: '1-800-PHARMA', email: 'sales@pharmacorp.com', address: 'London, UK', total_purchased: 45000, total_paid: 40000, total_due: 5000 },
  { id: 2, name: 'Medistore Logistics', registration_number: 'GST-99281', phone: '1-800-MEDIS', email: 'orders@medistore.com', address: 'Delhi, IN', total_purchased: 12000, total_paid: 12000, total_due: 0 },
];
let demoPurchases = [];

// Install Event
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

// Activate Event
self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

// Fetch Interceptor
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Intercept API calls (regardless of subfolder depth)
  if (url.pathname.includes('/api/')) {
    event.respondWith(handleApiRequest(event.request, url));
  } else if (url.pathname.includes('/sanctum/csrf-cookie')) {
    event.respondWith(new Response(null, { status: 204 })); // Mock Sanctum CSRF
  }
});

async function handleApiRequest(request, url) {
  const path = url.pathname;
  const method = request.method;

  // Handle Authentication Mock
  if (path === '/api/auth/login' && method === 'POST') {
      const data = await request.clone().json();
      if (data.email === 'admin@demo.com' && data.password === 'demo@123') {
          return jsonResponse({ token: 'mock-demo-token-999', user: { name: 'Demo Admin', email: 'admin@demo.com' } });
      } else {
          return new Response(JSON.stringify({ message: 'Invalid credentials. Use admin@demo.com and demo@123' }), { status: 401, headers: { 'Content-Type': 'application/json' }});
      }
  }
  if (path === '/api/auth/system-status' && method === 'GET') {
      return jsonResponse({ setup_complete: true, has_admin: true });
  }

  // Settings
  if (path === '/api/settings' && method === 'GET') return jsonResponse(demoSettings);
  if (path === '/api/settings' && method === 'POST') {
      const updates = await request.clone().json();
      demoSettings = { ...demoSettings, ...updates };
      return jsonResponse({ message: 'Settings saved', settings: demoSettings });
  }
  if (path === '/api/countries' && method === 'GET') return jsonResponse([
      { name: 'United States', currency_code: 'USD', currency_symbol: '$', tax_name: 'Tax', default_tax_rate: 8.5 },
      { name: 'United Kingdom', currency_code: 'GBP', currency_symbol: '£', tax_name: 'VAT', default_tax_rate: 20 },
      { name: 'India', currency_code: 'INR', currency_symbol: '₹', tax_name: 'GST', default_tax_rate: 18 },
      { name: 'Nepal', currency_code: 'NPR', currency_symbol: 'Rs', tax_name: 'VAT', default_tax_rate: 13 }
  ]);

  // POS Engine
  if (path === '/api/pos/categories' && method === 'GET') return jsonResponse(demoCategories);
  if (path === '/api/pos/products' && method === 'GET') return jsonResponse({ data: demoProducts });
  if (path === '/api/pos/checkout' && method === 'POST') {
      const payload = await request.clone().json();
      const transaction = {
          id: demoSales.length + 1,
          receipt_number: 'RCPT-DEMO-' + Date.now(),
          total_amount: payload.total_amount,
          discount_amount: payload.discount_amount,
          tax_amount: payload.tax_amount,
          total_paid: payload.total_amount - payload.discount_amount + payload.tax_amount,
          payment_method: payload.payment_method,
          status: 'Completed',
          items: payload.items,
          created_at: new Date().toISOString()
      };
      demoSales.push(transaction);

      // Deduct mock stock
      payload.items.forEach(cartItem => {
          let p = demoProducts.find(x => x.batch_number === cartItem.batch);
          if (p) p.stock_current -= cartItem.quantity;
      });

      return jsonResponse({ message: 'Checked out in Demo Mode!', receipt_id: transaction.id });
  }

  // Ledgers
  if (path === '/api/sales' && method === 'GET') return jsonResponse(demoSales.slice().reverse());
  if (path === '/api/inventory' && method === 'GET') return jsonResponse({ data: demoProducts });
  if (path === '/api/suppliers' && method === 'GET') return jsonResponse(demoSuppliers);
  if (path.match(/^\/api\/suppliers\/\d+$/) && method === 'GET') {
      const id = parseInt(path.split('/').pop());
      const supplier = demoSuppliers.find(s => s.id === id);
      if (supplier) return jsonResponse({ ...supplier, purchase_orders: demoPurchases.filter(p => p.supplier_id === id) });
      return new Response('Not Found', { status: 404 });
  }
  if (path === '/api/purchase-orders' && method === 'GET') return jsonResponse(demoPurchases);
  if (path === '/api/purchase-orders' && method === 'POST') {
      const payload = await request.clone().json();
      const newPO = { ...payload, id: demoPurchases.length + 1, created_at: new Date().toISOString() };
      demoPurchases.push(newPO);
      return jsonResponse({ message: 'Saved Purchase Order (Demo)', purchase_order: newPO });
  }

  // Analytics
  if (path === '/api/analytics/dashboard' && method === 'GET') {
      return jsonResponse({
          daily_sales: demoSales.reduce((acc, curr) => acc + curr.total_paid, 0) + 12500, // starting baseline
          profit_margin: 62.4,
          kpi: { gross_revenue: 12500, total_cost: 4700, total_tax: 1560, net_profit: 6240 },
          fastest_movers: [
              { brand_name: 'Paracetamol 500mg', total_sold: 450, total_revenue: 2695 },
              { brand_name: 'Vitamin C Plus Zinc', total_sold: 120, total_revenue: 2160 }
          ],
          expiring_count: 5,
          expired_count: 1
      });
  }

  // Return realistic 404 if API not implemented in mock
  return new Response(JSON.stringify({ error: 'Endpoint not implemented in static demo mode' }), { status: 404, headers: { 'Content-Type': 'application/json' }});
}

function jsonResponse(data) {
    return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
        status: 200
    });
}

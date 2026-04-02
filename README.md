# n8n-nodes-cin7-core

> **[Velocity BPA Licensing Notice]**
>
> This n8n node is licensed under the Business Source License 1.1 (BSL 1.1).
>
> Use of this node by for-profit organizations in production environments requires a commercial license from Velocity BPA.
>
> For licensing information, visit https://velobpa.com/licensing or contact licensing@velobpa.com.

This n8n community node provides comprehensive integration with Cin7 Core inventory management system, supporting 7 essential resources including products, sales, purchases, customers, suppliers, stock transfers, and locations. Enable seamless automation of inventory operations, order management, and business workflows with full CRUD capabilities across all major Cin7 Core entities.

![n8n Community Node](https://img.shields.io/badge/n8n-Community%20Node-blue)
![License](https://img.shields.io/badge/license-BSL--1.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![Inventory Management](https://img.shields.io/badge/Inventory-Management-green)
![ERP Integration](https://img.shields.io/badge/ERP-Integration-orange)
![Cin7 Core](https://img.shields.io/badge/Cin7-Core-red)

## Features

- **Complete Product Management** - Create, read, update and delete products with full inventory tracking capabilities
- **Sales Order Processing** - Automate sales workflows including order creation, updates, and status management
- **Purchase Order Automation** - Streamline procurement processes with comprehensive purchase order handling
- **Customer Relationship Management** - Manage customer data, contacts, and relationship information seamlessly
- **Supplier Management** - Handle supplier information, contacts, and procurement relationships
- **Stock Transfer Operations** - Automate inventory movements between locations with full tracking
- **Location Management** - Manage warehouse and location data for multi-location inventory control
- **Advanced Error Handling** - Robust error management with detailed logging and recovery options

## Installation

### Community Nodes (Recommended)

1. Open n8n
2. Go to **Settings** → **Community Nodes**
3. Click **Install a community node**
4. Enter `n8n-nodes-cin7-core`
5. Click **Install**

### Manual Installation

```bash
cd ~/.n8n
npm install n8n-nodes-cin7-core
```

### Development Installation

```bash
git clone https://github.com/Velocity-BPA/n8n-nodes-cin7-core.git
cd n8n-nodes-cin7-core
npm install
npm run build
mkdir -p ~/.n8n/custom
ln -s $(pwd) ~/.n8n/custom/n8n-nodes-cin7-core
n8n start
```

## Credentials Setup

| Field | Description | Required |
|-------|-------------|----------|
| API Key | Your Cin7 Core API key from account settings | Yes |
| Account ID | Your Cin7 Core account identifier | Yes |
| Environment | Production or sandbox environment URL | Yes |

## Resources & Operations

### 1. Product

| Operation | Description |
|-----------|-------------|
| Create | Create a new product with inventory details |
| Get | Retrieve a specific product by ID |
| Get All | List all products with optional filtering |
| Update | Modify existing product information |
| Delete | Remove a product from inventory |

### 2. Sale

| Operation | Description |
|-----------|-------------|
| Create | Create a new sales order or invoice |
| Get | Retrieve a specific sale by ID |
| Get All | List all sales with date and status filters |
| Update | Modify existing sale information |
| Delete | Cancel or remove a sales record |

### 3. Purchase

| Operation | Description |
|-----------|-------------|
| Create | Create a new purchase order |
| Get | Retrieve a specific purchase order by ID |
| Get All | List all purchase orders with filtering options |
| Update | Modify existing purchase order details |
| Delete | Cancel or remove a purchase order |

### 4. Customer

| Operation | Description |
|-----------|-------------|
| Create | Add a new customer to the system |
| Get | Retrieve specific customer information |
| Get All | List all customers with search capabilities |
| Update | Modify existing customer details |
| Delete | Remove a customer from the system |

### 5. Supplier

| Operation | Description |
|-----------|-------------|
| Create | Add a new supplier to the system |
| Get | Retrieve specific supplier information |
| Get All | List all suppliers with filtering options |
| Update | Modify existing supplier details |
| Delete | Remove a supplier from the system |

### 6. StockTransfer

| Operation | Description |
|-----------|-------------|
| Create | Create a new stock transfer between locations |
| Get | Retrieve a specific stock transfer by ID |
| Get All | List all stock transfers with status filters |
| Update | Modify existing transfer details |
| Delete | Cancel or remove a stock transfer |

### 7. Location

| Operation | Description |
|-----------|-------------|
| Create | Add a new warehouse or location |
| Get | Retrieve specific location information |
| Get All | List all locations in the system |
| Update | Modify existing location details |
| Delete | Remove a location from the system |

## Usage Examples

```javascript
// Create a new product
{
  "name": "Wireless Bluetooth Headphones",
  "sku": "WBH-001",
  "category": "Electronics",
  "price": 79.99,
  "description": "Premium wireless headphones with noise cancellation",
  "stockOnHand": 150
}
```

```javascript
// Create a sales order
{
  "customerId": "12345",
  "orderDate": "2024-01-15",
  "items": [
    {
      "productId": "67890",
      "quantity": 2,
      "unitPrice": 79.99
    }
  ],
  "shippingAddress": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001"
  }
}
```

```javascript
// Transfer stock between locations
{
  "fromLocationId": "LOC001",
  "toLocationId": "LOC002",
  "productId": "67890",
  "quantity": 25,
  "transferDate": "2024-01-15",
  "notes": "Restock for high-demand location"
}
```

```javascript
// Get all products with low stock
{
  "filters": {
    "stockLevel": "low",
    "category": "Electronics",
    "active": true
  },
  "limit": 50,
  "orderBy": "stockOnHand"
}
```

## Error Handling

| Error | Description | Solution |
|-------|-------------|----------|
| Authentication Failed | Invalid API key or account credentials | Verify API key and account ID in credentials |
| Rate Limit Exceeded | Too many requests sent to Cin7 Core API | Implement delays between requests or reduce frequency |
| Resource Not Found | Requested product, sale, or other resource doesn't exist | Check resource ID and ensure it exists in Cin7 Core |
| Validation Error | Required fields missing or invalid data format | Review field requirements and data types |
| Insufficient Permissions | API key lacks permissions for requested operation | Check API key permissions in Cin7 Core settings |
| Network Timeout | Request to Cin7 Core API timed out | Check network connectivity and retry request |

## Development

```bash
npm install
npm run build
npm test
npm run lint
npm run dev
```

## Author

**Velocity BPA**
- Website: [velobpa.com](https://velobpa.com)
- GitHub: [Velocity-BPA](https://github.com/Velocity-BPA)

## Licensing

This n8n community node is licensed under the **Business Source License 1.1**.

### Free Use
Permitted for personal, educational, research, and internal business use.

### Commercial Use
Use of this node within any SaaS, PaaS, hosted platform, managed service, or paid automation offering requires a commercial license.

For licensing inquiries: **licensing@velobpa.com**

See [LICENSE](LICENSE), [COMMERCIAL_LICENSE.md](COMMERCIAL_LICENSE.md), and [LICENSING_FAQ.md](LICENSING_FAQ.md) for details.

## Contributing

Contributions are welcome! Please ensure:

1. Code follows existing style conventions
2. All tests pass (`npm test`)
3. Linting passes (`npm run lint`)
4. Documentation is updated for new features
5. Commit messages are descriptive

## Support

- **Issues**: [GitHub Issues](https://github.com/Velocity-BPA/n8n-nodes-cin7-core/issues)
- **Cin7 Core API Documentation**: [https://core.cin7.com/api-docs](https://core.cin7.com/api-docs)
- **Cin7 Core Support**: [https://support.cin7.com](https://support.cin7.com)
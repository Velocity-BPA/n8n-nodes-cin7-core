# n8n-nodes-cin7-core

> **[Velocity BPA Licensing Notice]**
>
> This n8n node is licensed under the Business Source License 1.1 (BSL 1.1).
>
> Use of this node by for-profit organizations in production environments requires a commercial license from Velocity BPA.
>
> For licensing information, visit https://velobpa.com/licensing or contact licensing@velobpa.com.

A comprehensive n8n community node for Cin7 Core (formerly DEAR Inventory), providing full access to inventory management, sales, purchases, customers, suppliers, and stock operations for omnichannel retail, wholesale, and manufacturing businesses.

![n8n](https://img.shields.io/badge/n8n-community--node-orange)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-BSL--1.1-blue)

## Features

- **12 Resource Categories** with 70+ operations
- **Product Management** - Create, update, delete products, manage pricing tiers, track availability
- **Sales Order Processing** - Full order lifecycle: create, pick, pack, ship, invoice, payment
- **Purchase Order Management** - Create POs, authorize, receive stock, add costs, invoice
- **Customer & Supplier Management** - Contacts, addresses, credit limits, payment terms
- **Inventory Control** - Stock transfers, adjustments, multi-location tracking
- **Bill of Materials** - Component management for manufacturing
- **Reference Data** - Price tiers, chart of accounts, payment terms
- **Polling Trigger** - Monitor changes via ModifiedSince filtering
- **Rate Limiting** - Built-in exponential backoff for API rate limits
- **Pagination Support** - Automatic handling of large result sets

## Installation

### Community Nodes (Recommended)

1. Open n8n
2. Go to **Settings** → **Community Nodes**
3. Click **Install**
4. Enter `n8n-nodes-cin7-core`
5. Click **Install**

### Manual Installation

```bash
cd ~/.n8n/custom
npm install n8n-nodes-cin7-core
```

### Development Installation

```bash
# Clone the repository
git clone https://github.com/Velocity-BPA/n8n-nodes-cin7-core.git
cd n8n-nodes-cin7-core

# Install dependencies
npm install

# Build the project
npm run build

# Create symlink to n8n custom nodes directory
mkdir -p ~/.n8n/custom
ln -s $(pwd) ~/.n8n/custom/n8n-nodes-cin7-core

# Restart n8n
n8n start
```

## Credentials Setup

To use the Cin7 Core node, you need API credentials from your Cin7 Core account.

### Getting API Credentials

1. Log in to your Cin7 Core account
2. Navigate to **Settings & Options** → **Integrations & API** → **Cin7 Core API**
3. Click **Create API Application**
4. Note down the **Account ID** and **Application Key**

### Credential Configuration

| Field | Type | Description |
|-------|------|-------------|
| Account ID | String | Your Cin7 Core Account ID |
| Application Key | String | Your API Application Key |
| Use V2 API | Boolean | Use V2 API endpoints (recommended, default: true) |

## Resources & Operations

### Product
| Operation | Description |
|-----------|-------------|
| Get | Retrieve a product by ID |
| Get Many | List all products with filters |
| Create | Create a new product |
| Update | Update product details |
| Delete | Delete a product |
| Get Availability | Get stock availability across locations |
| Update Pricing | Update product pricing tiers |
| Attach File | Attach a file/image to a product |
| Get Suppliers | List suppliers for a product |
| Add Supplier | Add a supplier to a product |

### Sale
| Operation | Description |
|-----------|-------------|
| Get | Retrieve a sale by ID |
| Get Many | List all sales with filters |
| Create | Create a new sale order |
| Update | Update sale details |
| Void | Void a sale |
| Undo | Undo a voided sale |
| Pick | Pick items for a sale |
| Pack | Pack items for shipment |
| Ship | Ship a sale order |
| Create Invoice | Generate invoice for sale |
| Add Payment | Record payment against sale |

### Purchase
| Operation | Description |
|-----------|-------------|
| Get | Retrieve a purchase order by ID |
| Get Many | List all purchase orders |
| Create | Create a new purchase order |
| Update | Update purchase order |
| Delete | Delete a purchase order |
| Authorize | Authorize purchase order |
| Receive | Receive stock against PO |
| Add Cost | Add additional costs |
| Create Credit Note | Create credit note for PO |
| Invoice | Mark as invoiced |

### Customer
| Operation | Description |
|-----------|-------------|
| Get | Retrieve customer by ID |
| Get Many | List all customers |
| Create | Create a new customer |
| Update | Update customer details |
| Delete | Deactivate a customer |
| Get Contacts | List customer contacts |
| Add Contact | Add a contact to customer |
| Get Addresses | List customer addresses |
| Add Address | Add address to customer |

### Supplier
| Operation | Description |
|-----------|-------------|
| Get | Retrieve supplier by ID |
| Get Many | List all suppliers |
| Create | Create a new supplier |
| Update | Update supplier details |
| Delete | Deactivate a supplier |
| Get Contacts | List supplier contacts |
| Add Contact | Add contact to supplier |
| Get Products | List products from supplier |

### Stock Transfer
| Operation | Description |
|-----------|-------------|
| Get | Retrieve stock transfer by ID |
| Get Many | List all stock transfers |
| Create | Create a new stock transfer |
| Update | Update stock transfer |
| Authorize | Authorize transfer |
| Pick | Pick items for transfer |
| Complete | Complete transfer |
| Void | Void a transfer |

### Stock Adjustment
| Operation | Description |
|-----------|-------------|
| Get | Retrieve stock adjustment by ID |
| Get Many | List all stock adjustments |
| Create | Create a stock adjustment |
| Authorize | Authorize adjustment |
| Void | Void an adjustment |

### Location
| Operation | Description |
|-----------|-------------|
| Get | Retrieve location by ID |
| Get Many | List all locations |
| Create | Create a new location |
| Update | Update location details |
| Delete | Delete a location |
| Get Stock | Get stock levels at location |

### Bill of Materials
| Operation | Description |
|-----------|-------------|
| Get | Retrieve BOM by product ID |
| Create | Create BOM for product |
| Update | Update BOM components |
| Delete | Delete BOM |
| Get Components | List BOM components |
| Add Component | Add component to BOM |

### Price Tier
| Operation | Description |
|-----------|-------------|
| Get Many | List all price tiers |
| Get Prices | Get prices for a tier |
| Update Price | Update tier price for product |

### Chart of Accounts
| Operation | Description |
|-----------|-------------|
| Get | Get account details |
| Get Many | List all accounts |

### Payment Term
| Operation | Description |
|-----------|-------------|
| Get Many | List all payment terms |

## Trigger Node

The Cin7 Core Trigger node monitors for changes using polling with the ModifiedSince parameter.

### Supported Events

- Sale Created/Updated/Shipped
- Purchase Created/Updated/Received
- Product Created/Updated/Stock Changed
- Customer Created/Updated
- Stock Transfer Created/Completed

### Trigger Options

| Option | Description |
|--------|-------------|
| Location | Filter events by location |
| Status | Filter events by status |

## Usage Examples

### Create a Sales Order

```javascript
// Using the Cin7 Core node
{
  "resource": "sale",
  "operation": "create",
  "customer": "Acme Corp",
  "lines": {
    "lineItems": [
      {
        "productId": "abc123-def456-...",
        "quantity": 10,
        "price": 29.99
      }
    ]
  },
  "additionalFields": {
    "location": "Main Warehouse",
    "shipBy": "2025-02-15T00:00:00Z"
  }
}
```

### Sync Products Modified Since Yesterday

```javascript
// Using Get Many with ModifiedSince filter
{
  "resource": "product",
  "operation": "getAll",
  "returnAll": true,
  "filters": {
    "modifiedSince": "{{ $now.minus(1, 'day').toISO() }}"
  }
}
```

### Stock Transfer Between Warehouses

```javascript
{
  "resource": "stockTransfer",
  "operation": "create",
  "fromLocation": "Main Warehouse",
  "toLocation": "Retail Store",
  "lines": {
    "lineItems": [
      {
        "productId": "product-guid",
        "quantity": 50
      }
    ]
  }
}
```

## Cin7 Core Concepts

### Order Lifecycle

Sales in Cin7 Core follow a workflow: Draft → Authorized → Picking → Packing → Shipped → Completed. Each stage can be managed through the corresponding operations.

### GUID Identifiers

Cin7 Core uses GUID format for all entity IDs (e.g., `a1b2c3d4-e5f6-7890-abcd-ef1234567890`). The node validates GUID format before making API calls.

### Price Tiers

Cin7 supports multiple pricing tiers for B2B scenarios. You can assign customers to specific tiers and manage tier-specific pricing per product.

### Multi-Location Inventory

Stock levels are tracked per location. Use the Location resource to manage warehouses and the Product availability operations to check stock across all locations.

## Error Handling

The node handles common API errors:

| Status | Description | Handling |
|--------|-------------|----------|
| 400 | Bad Request | Validation error messages returned |
| 401 | Unauthorized | Invalid credentials |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Entity doesn't exist |
| 429 | Rate Limited | Exponential backoff (1s-60s, max 5 retries) |
| 500 | Server Error | Retry with backoff |

## Security Best Practices

1. **API Key Security** - Store API credentials in n8n's encrypted credential storage
2. **Least Privilege** - Create API applications with minimum required permissions
3. **Audit Logging** - Monitor API usage through Cin7's audit logs
4. **Rate Limits** - Be mindful of your subscription tier's rate limits

## Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Development mode (watch)
npm run dev

# Run linting
npm run lint

# Fix linting issues
npm run lint:fix

# Run tests
npm test

# Run tests with coverage
npm run test:coverage
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

For licensing inquiries:
**licensing@velobpa.com**

See [LICENSE](LICENSE), [COMMERCIAL_LICENSE.md](COMMERCIAL_LICENSE.md), and [LICENSING_FAQ.md](LICENSING_FAQ.md) for details.

## Contributing

Contributions are welcome! Please ensure:

1. Code follows the existing style
2. All tests pass
3. New features include tests
4. Update documentation as needed

## Support

- **Documentation**: [Cin7 Core API Docs](https://developer.cin7.com/)
- **Issues**: [GitHub Issues](https://github.com/Velocity-BPA/n8n-nodes-cin7-core/issues)
- **Licensing**: licensing@velobpa.com

## Acknowledgments

- [Cin7](https://www.cin7.com/) for their comprehensive inventory management API
- [n8n](https://n8n.io/) for the excellent workflow automation platform
- The n8n community for inspiration and best practices

# Menu Management API

## Folder Structure

```
src/menu/
├── menu.schema.ts      # Menu model (no parent_id)
├── submenu.schema.ts   # Submenu model (with parent_id)
├── menu.service.ts     # Unified service for both menus and submenus
├── menu.controller.ts  # Unified controller with all endpoints
└── menu.module.ts      # Single module
```

## API Endpoints

### Menu Management

- `GET /api/menu/menus` - Get all menus
- `GET /api/menu/menus/:id` - Get menu by ID
- `POST /api/menu/menus` - Create new menu
- `PUT /api/menu/menus/:id` - Update menu
- `DELETE /api/menu/menus/:id` - Delete menu (also deletes all submenus)

### Submenu Management

- `GET /api/menu/submenus` - Get all submenus
- `GET /api/menu/submenus?parent_id=xxx` - Get submenus by parent menu ID
- `GET /api/menu/submenus/:id` - Get submenu by ID
- `POST /api/menu/submenus` - Create new submenu
- `PUT /api/menu/submenus/:id` - Update submenu
- `DELETE /api/menu/submenus/:id` - Delete submenu

### Admin Frontend Endpoints (Combined)

- `GET /api/menu/admin/all` - Get all menus with their submenus
- `GET /api/menu/admin/:menuId` - Get specific menu with its submenus

## Example Usage for Frontend Admin

### Get all menus with submenus for admin page:

```javascript
GET / api / menu / admin / all;
```

Response:

```json
[
  {
    "menu": {
      "_id": "64f...",
      "name": "BEAUTY",
      "slug": "beauty",
      "status": true
    },
    "submenus": [
      {
        "_id": "64f...",
        "name": "beauty tips",
        "slug": "beauty-tips",
        "parent_id": "64f...",
        "status": true
      },
      {
        "_id": "64f...",
        "name": "hair",
        "slug": "hair",
        "parent_id": "64f...",
        "status": true
      }
    ]
  }
]
```

### Create a new menu:

```javascript
POST /api/menu/menus
{
  "name": "NEW MENU",
  "slug": "new-menu",
  "description": "Optional description"
}
```

### Create a submenu for a menu:

```javascript
POST /api/menu/submenus
{
  "name": "New Submenu",
  "slug": "new-submenu",
  "parent_id": "64f..." // Menu ID
}
```

## Benefits of This Structure

1. **Single Folder**: Everything menu-related is in `src/menu/`
2. **Unified Service**: One service handles both menus and submenus
3. **Admin-Friendly**: Special endpoints for frontend admin management
4. **Cascading Deletes**: Deleting a menu automatically deletes its submenus
5. **Clean API**: Logical endpoint structure under `/api/menu/`

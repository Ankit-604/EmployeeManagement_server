server

# Install server dependencies

cd server
npm install

# Install client dependencies

cd ../client
npm install

# Set up environment variables

Create a `.env` file in the server directory:

```env:readme.md
PORT=2112
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

4. Start the application

```bash
# Start server (from server directory)
npm start

# Start client (from client directory)
npm start
```

The server will run on http://localhost:2112 and the client on http://localhost:3000

## API Endpoints

### Authentication

- POST `/auth/login` - User login
- POST `/auth/register` - User registration

### Employee Management

- GET `/emp/getEmployee` - Get all employees
- GET `/emp/getEmployee/:id` - Get single employee
- POST `/emp/addEmployee` - Add new employee
- PUT `/emp/updateEmployee/:id` - Update employee
- DELETE `/emp/deleteEmployee` - Delete employee

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details

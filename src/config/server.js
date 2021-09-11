import express from 'express';

const server = express();

// Routes
import IndexRoute from '../routes/index.routes';
import SectorsRoutes from '../routes/sectors.routes';
import CategoriesRoutes from '../routes/categories.routes';
import ProductsRoutes from '../routes/products.routes';
import UsersRoutes from '../routes/users.routes';
import TypesUsersRoutes from '../routes/typesUsers.routes';
import PeriodsRoutes from '../routes/periods.routes';
import PublicationsRoutes from '../routes/publications.routes';
import Rental_RequestsRoutes from '../routes/rentails_requests.routes';
import Rents from '../routes/rents.routes';

// Settings
server.set('port', process.env.PORT || 4000);

// Middleware
server.use(express.json());

// Routes
server.use(IndexRoute);
server.use('/sectors', SectorsRoutes);
server.use('/categories', CategoriesRoutes);
server.use('/products', ProductsRoutes);
server.use('/users', UsersRoutes);
server.use('/types-users', TypesUsersRoutes);
server.use('/periods', PeriodsRoutes);
server.use('/publications', PublicationsRoutes);
server.use('/rental-requests', Rental_RequestsRoutes);
server.use('/rents', Rents);



export default server;
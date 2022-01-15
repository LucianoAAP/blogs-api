require('dotenv').config();
const express = require('express');
const errorMiddleware = require('./middlewares/error');

const app = express();
app.use(express.json());

app.use('/user', require('./routers/UsersRouter'));
app.use('/login', require('./routers/LoginRouter'));
app.use('/categories', require('./routers/CategoriesRouter'));
app.use('/post', require('./routers/PostsRouter'));

app.use(errorMiddleware);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Ouvindo na porta ${port}!`));

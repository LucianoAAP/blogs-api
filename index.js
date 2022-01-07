const express = require('express');
const errorMiddleware = require('./middlewares/error');

const app = express();
app.use(express.json());

app.use('/user', require('./routers/UsersRouter'));
app.use('/login', require('./routers/LoginRouter'));
app.use('/categories', require('./routers/CategoriesRouter'));
app.use('/post', require('./routers/PostsRouter'));

app.use(errorMiddleware);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

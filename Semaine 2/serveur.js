import chalk from 'chalk';
import app from './src/app.js';

const PORT = 1337;

app.listen(PORT,(err ) =>
{
    console.log(chalk.green('Serveur en fonction!'));
})

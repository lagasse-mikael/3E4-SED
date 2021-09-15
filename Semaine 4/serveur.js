import "./env.js";
import chalk from 'chalk';
import app from './src/app.js';

app.listen(process.env.PORT,(err ) =>
{
    console.log(chalk.bgYellowBright.black('Serveur en fonction!'));
})

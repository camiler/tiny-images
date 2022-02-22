#!/usr/bin/env node
import chalk from 'chalk'
import { program } from 'commander'
import inquirer from 'inquirer';
// import package from './package.json'

import tinypng from './src/tinypng.js'

const inputTip = 'the pictures specified directory: ';
const outputTip = 'the new directory, default is: ';
const defaultInput = 'assets/imgs';
const defaultOutput = 's3/ly';

program
  .version('1.0', '-v,--version')
  .description('Compress the pictures in the specified directory to a new directory')
  .option('-i,--input <input>', `${inputTip} ${defaultInput}`)
  .option('-o,--output <output>', `${outputTip} ${defaultOutput}`)
  .action(async (option) => {
    const promps = [];
    const {input = '', output = ''} = option;
    if (input === '') {
      promps.push({type: 'input', name: 'input', message: inputTip, default: defaultInput});
    }
    if (output === '') {
      promps.push({type: 'input', name: 'output', message: outputTip, default: defaultOutput});
    }
    try {
      const answers = await inquirer.prompt(promps)
      const config = Object.assign({input, output}, answers);
      const matches = await tinypng(config)
      console.log(chalk.green(`sucessfully! Here are compressed files: ${matches} `))
    } catch(err) {
      console.log(chalk.red(`something wrong: ${JSON.stringify(err)}`))
    }
  })
  program.parse(process.argv)
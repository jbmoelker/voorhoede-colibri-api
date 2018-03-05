#!/usr/bin/env node
const chalk = require('chalk')
const dumpData = require('../src/data-loader/dump-data')
const os = require('os')
const path = require('path')
const outputPath = path.join(os.tmpdir(), 'voorhoede-colibri')

dumpData()
  .then(() => console.log(chalk.green(`✓ CMS data saved to ${chalk.bold(outputPath)}`)))
  .catch(err => console.error(chalk.red('❌ Error dumping data'), err))

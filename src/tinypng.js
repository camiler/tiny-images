import tinify from 'tinify'
import fs from 'fs-extra'
import glob from 'glob'
import chalk from 'chalk'

tinify.key = 'TrDd55gRdc1RH7K32HYHPvlbx5crb0MT' // it it secret


export const compressFile = async (inputFile, {input, output}) => {
  const outPath = inputFile.replace(input, output)
  const outPathArr = outPath.split('/')
  outPathArr.pop()
  const outPathDir = outPathArr.join('/')
  console.log(outPathDir)
  await fs.ensureDir(outPathDir)
  const source = tinify.fromFile(inputFile)
  return source.toFile(outPath)
}

export default async ({input, output}) => {
  const matches = await glob.sync(`${input}/**/*.+(png|jpg|jpeg)`)
  if (matches && matches.length) {
    const compressFuncs = []
    matches.forEach(file => {
      compressFuncs.push(compressFile(file, { input, output }))
    })
    console.log(chalk.blue('start to compress, please wait...'))
    await Promise.all(compressFuncs)
  }
  return matches
}
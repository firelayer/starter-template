/*
|---------------------------------------------------------------------
| Firelayer Template Config File
|---------------------------------------------------------------------
|
| Starter - Default template for `firelayer init`
|
*/
module.exports = async function({ chalk, open, logger, prompt, targetDir }) {
  const website = 'https://firelayer.io/templates/starter'

  console.log(`\nTemplate Documentation - ${chalk.bold.green(website)}\n`)
  console.log(`If you wish to add a landing page: ${chalk.bold.yellow('firelayer add:template landing')}`)
  console.log(`For other templates see - ${chalk.bold.cyan('https://firelayer.io/templates')}\n`)

  open(website)
}

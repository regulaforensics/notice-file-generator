#!/usr/bin/env node
// const [,, ...args] = process.argv
const { execSync } = require('child_process')
const { readFileSync, writeFileSync } = require('fs')

const TMP_FILENAME = `${process.cwd()}/licenses.json`

execSync(`npx license-checker --production --exclude \'MIT, MIT OR X11, BSD, ISC, Unlicense\' --json > ${TMP_FILENAME}`)

const licenses = JSON.parse(readFileSync(TMP_FILENAME, 'utf8'));
const pkg = JSON.parse(readFileSync('package.json', 'utf8'));

let notice = `${pkg.title}\n`
notice += `Copyright ${new Date().getFullYear()} Regula\n\n`
notice += `This product includes software developed at\n`
notice += `The Regula (https://regulaforensics.com/).\n\n`

for (const pkg3rd in licenses) {
  const license = licenses[pkg3rd]
  const publisher = license.publisher.replace(/\.+$/, '')

  notice += `The Initial Developer of the ${pkg3rd} (${license.repository}),\n`
  notice += `is ${publisher}${license.url ? ` (${license.url})` : ''}.\n`
  notice += `Copyright ${publisher}. All Rights Reserved.\n\n`
}

writeFileSync(`${process.cwd()}/NOTICE`, notice)

execSync(`rm ${TMP_FILENAME}`)

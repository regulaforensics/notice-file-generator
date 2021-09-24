# Notice File Generator

This thing is used to generate a NOTICE file for apache-2.0 license.

Usage:

- Copy LICENSE-APACHE and LICENSE-MIT in root dir of your package
- Make license section of your package.json as follows: ```"license": "(MIT OR Apache-2.0)",```
- Make next changes in your package.json
``` 
"scripts": {
  ...
  "postinstall": "npx generate-notice"
  ...
},
```
- Install this package as dev dependency
- That's it!


To create or update NOTICE in this package simply run ```node cli.js```

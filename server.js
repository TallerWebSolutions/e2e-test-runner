const express = require('express')
const cypress = require('cypress')

const server = express()

server.get('/:project', (req, res) => {
  cypress.run({ project: `./projects/${req.params.project}` })
  res.send('Running Tests!');
});

server.listen(3000, () => {
  console.log('Test runner listening on port 3000!');
});

const express = require('express')
const cypress = require('cypress')
const shell = require('shelljs')
const fs = require('fs');

const server = express()

server.get('/', (req, res) => {
  if (!req.query.dir || !req.query.repo || !req.query.branch || !req.query.key || !req.query.url) {
    res.send('Not enough info to run tests!')
    return
  }

  const projectDir = `./projects/${req.query.dir}`
  const cypressConfig = {
    project: projectDir,
    key: req.query.key,
    record: true,
    config: {
      baseUrl: req.query.url,
    },
  }

  if (fs.existsSync(projectDir)) {
    shell.cd(projectDir)
    shell.exec('git fetch')
    shell.exec(`git checkout ${req.query.branch}`)
    shell.exec(`git reset --hard origin/${req.query.branch}`)
    shell.cd('../..')

    cypress.run(cypressConfig)
  }
  
  else {
    shell.cd('./projects')
    shell.exec(`git clone --branch ${req.query.branch} ${req.query.repo}`)
    shell.cd('..')

    cypress.run(cypressConfig)
  }

  res.send('Running Tests!')
})

server.listen(3000, () => {
  console.log('Test runner listening on port 3000!')
})

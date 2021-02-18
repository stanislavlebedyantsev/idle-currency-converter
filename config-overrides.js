const {alias} = require('react-app-rewire-alias')

module.exports = function override(config) {
  alias({
    '@': 'src',
    '@components': 'src/components',
    '@assets' : 'src/assets',
    '@reducers' : 'src/reducers',
    '@sagas' : 'src/sagas',
    '@actions' : 'src/actions',
    '@constants' : 'src/constants',
    '@api' : 'src/api',
  })(config)

  return config
}
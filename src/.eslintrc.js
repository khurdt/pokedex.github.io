module.exports = {
'env': {
    'browser': true,
    'es2021': true,
    'commonjs': true,
    'jquery': true,
    'es6': true
},
'extends': 'eslint:recommended',
'parserOptions': {
    'ecmaVersion': 13,
    'sourceType': 'module'
},
'plugins': [
'dollar-sign',
'jquery'
],
'rules': {
    'quotes': ['error', 'single'],
    'no-var': 0,
    }
}

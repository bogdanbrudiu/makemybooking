// Configuration is loaded based on the NODE_ENV environment variable.
// When no variable is set, the configuration is read from ./development.js.
if(process.env.OPENSHIFT_APP_NAME){
    module.exports = require('./openshift');
}else if(process.env.C9_FULLNAME){
    module.exports = require('./cloud9');
}else{
    module.exports = require('./' + (process.env.NODE_ENV || 'development'));
}
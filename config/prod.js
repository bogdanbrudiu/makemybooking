// This is an example configuration file. Rename this file to development.js
// and set the values to get going.
var server_frontend_port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var server_backend_port = process.env.OPENSHIFT_NODEJS_PORT2 || 8090;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';


 var mongodb_host = process.env.OPENSHIFT_MONGODB_DB_HOST || 'localhost';
 var mongodb_port = parseInt(process.env.OPENSHIFT_MONGODB_DB_PORT) || 27017;
 var mongodb_db = process.env.OPENSHIFT_APP_NAME || 'makemybooking';
 var mongodb_user = process.env.OPENSHIFT_MONGODB_DB_USERNAME;// || 'admin';
 var mongodb_pass = process.env.OPENSHIFT_MONGODB_DB_PASSWORD;// || 'hsSDSp7mVtNx';



mongodb_connection_string = 'mongodb://'+mongodb_user+':'+mongodb_pass+'@'+ mongodb_host+':'+mongodb_port+'/' + db_name;


var settings = {
  db: {
    connectionString: mongodb_connection_string
  }, 
  tokenSecret: 'my super duper shared secret',
  cors: {
    origin: "http://"+server_ip_address+":"+server_frontend_port,
    methods: [ "GET", "POST", "PUT", "PATCH", "DELETE", "HEAD" ]
  }
};


exports.settings = settings;
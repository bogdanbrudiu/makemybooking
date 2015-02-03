var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';


 var mongodb_host = process.env.OPENSHIFT_MONGODB_DB_HOST || 'localhost';
 var mongodb_port = parseInt(process.env.OPENSHIFT_MONGODB_DB_PORT) || 27017;
 var mongodb_db = process.env.OPENSHIFT_APP_NAME || 'makemybooking';
 var mongodb_user = process.env.OPENSHIFT_MONGODB_DB_USERNAME;// || 'admin';
 var mongodb_pass = process.env.OPENSHIFT_MONGODB_DB_PASSWORD;// || 'hsSDSp7mVtNx';



var mongodb_connection_string = 'mongodb://'+mongodb_user+':'+mongodb_pass+'@'+ mongodb_host+':'+mongodb_port+'/' + mongodb_db;


var settings = {
  db: {
    connectionString: mongodb_connection_string
  }, 
  authProviders: {
    facebook: { 
      clientId: 'your client id here', 
      clientSecret: 'your client secret here', 
      callbackUrl: 'http://localhost:3000/auth/facebook/callback' 
    },
    google: { 
      clientId: 'your client id here', 
      clientSecret: 'your client secret here', 
      callbackUrl: 'http://localhost:3000/auth/google/callback' 
    }
  },
  tokenSecret: 'my super duper shared secret',
  cors: {
    origin: "http://"+server_ip_address+":"+server_frontend_port,
    methods: [ "GET", "POST", "PUT", "PATCH", "DELETE", "HEAD" ]
  },
  port: server_port,
  server_ip_address: server_ip_address
};


exports.settings = settings;
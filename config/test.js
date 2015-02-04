var settings = {
  db: {
    connectionString: 'mongodb://localhost/makemybookingtest'
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
    origin: "http://localhost:3000",
    methods: [ "GET", "POST", "PUT", "PATCH", "DELETE", "HEAD" ]
  },
  port: 3000,
  server_ip_address: ''
};

exports.settings = settings;

var settings = {
  db: {
    connectionString: 'mongodb://localhost/makemybooking'
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
  tokenSecret: 'test token secret',
  cors: {
    origin: "http://"+process.env.IP+":"+process.env.PORT,
    methods: [ "GET", "POST", "PUT", "PATCH", "DELETE", "HEAD" ]
  },
  port: process.env.PORT,
  server_ip_address: process.env.IP
};

exports.settings = settings;
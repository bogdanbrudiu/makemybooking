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
    origin: "http://"+process.env.IP+":3001",
    methods: [ "GET", "POST", "PUT", "PATCH", "DELETE", "HEAD" ]
  },
  frontendPort: 3001,
  backendPort: 3000
};

exports.settings = settings;
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
      clientId: '390294162018-trdjjr9s1vhb2qdnn3gi7gm3kq8ucc97.apps.googleusercontent.com', 
      clientSecret: 'TO33UXftg4eJRrQHQAm_E9db', 
      callbackUrl: 'http://127.0.0.1:3000/api/auth/google/callback' 
    }
  },
  tokenSecret: 'test token secret',
  cors: {
    origin: "http://localhost:3001",
    methods: [ "GET", "POST", "PUT", "PATCH", "DELETE", "HEAD" ]
  },
  port: 3000,
  server_ip_address: ''
};

exports.settings = settings;

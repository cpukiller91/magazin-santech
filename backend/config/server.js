module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 4000),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', 'df43ca00f24208c8cf1d89881bea4521'),
    },
  },
});

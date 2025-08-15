import * as Sentry from "@sentry/nuxt";
 
Sentry.init({
  dsn: "https://2bba1985fa8c352a47e59cc4f6b7218b@o4509850120093696.ingest.de.sentry.io/4509850126123088",

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,

  // Enable logs to be sent to Sentry
  enableLogs: true,
  
  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
});

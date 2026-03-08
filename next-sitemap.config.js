/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://www.ambaaritoursandtravels.com',
  generateRobotsTxt: true,
  sitemapSize: 5000,
  changefreq: 'daily',
  priority: 0.7,
  exclude: ['/admin/*', '/dashboard/*'],
  transform: async (config, path) => {
    // Custom priorities for important pages
    let priority = config.priority;
    
    if (path === '/') {
      priority = 1.0; // Homepage highest priority
    } else if (path.startsWith('/Packages/')) {
      priority = 0.9; // Package pages high priority
    } else if (path.startsWith('/Destinations/')) {
      priority = 0.8; // Destination pages
    }
    
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: priority,
      lastmod: new Date().toISOString(),
    };
  },
};
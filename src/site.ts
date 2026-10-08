// Company details used across the site, in meta tags and in structured data.
export const site = {
  name: 'Upperkai',
  legalName: 'Upperkai Ventures',
  url: 'https://upperkai.com',
  email: 'hello@upperkai.com',
  supportEmail: 'support@upperkai.com',
  logo: '/brand/upperkai-icon-512.png',
  shareImage: '/og/upperkai-share.jpg',
  // The Firebase project the forms save to. A web API key only identifies
  // the project; firestore.rules is what limits what it can do.
  firebase: {
    projectId: 'upperkai-ventures',
    apiKey: 'AIzaSyDrEk7lbUUigd2KRd98gTLHZkHwcR8T-9Y',
  },
  // Replace each [handle] with the real profile. Profiles still holding a
  // placeholder are left out of the Organization structured data.
  social: [
    { name: 'LinkedIn', url: 'https://www.linkedin.com/company/[upperkai-handle]' },
    { name: 'X', url: 'https://x.com/[upperkai-handle]' },
    { name: 'Instagram', url: 'https://www.instagram.com/[upperkai-handle]' },
  ],
};

export const isPlaceholder = (value: string) => value.includes('[');

export const absolute = (path: string) => new URL(path, site.url).href;

export const formatDate = (date: Date) =>
  date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

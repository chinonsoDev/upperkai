// Company details used across the site, in meta tags and in structured data.
export const site = {
  name: 'Upperkai',
  legalName: 'Upperkai Ventures',
  url: 'https://upperkai.com',
  email: 'hello@upperkai.com',
  logo: '/brand/upperkai-icon-512.png',
  shareImage: '/og/upperkai-share.jpg',
  // The Firebase project the forms save to. A web API key only identifies
  // the project; firestore.rules is what limits what it can do.
  firebase: {
    projectId: 'upperkai-ventures',
    apiKey: 'AIzaSyDrEk7lbUUigd2KRd98gTLHZkHwcR8T-9Y',
  },
  // Shown in the footer and listed in the Organization structured data.
  // The footer has an icon for LinkedIn too, for when that profile exists.
  social: [
    { name: 'X', url: 'https://x.com/upperkai' },
    { name: 'Instagram', url: 'https://www.instagram.com/upperkaihq' },
  ],
};

export const isPlaceholder = (value: string) => value.includes('[');

export const absolute = (path: string) => new URL(path, site.url).href;

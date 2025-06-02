
const CACHE_NAME = 'grama-arogya-sathi-v1';
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json'
];

// Offline first aid data
const offlineFirstAid = [
  {
    title: 'CPR Steps',
    steps: [
      'Check responsiveness',
      'Call 108',
      '30 chest compressions',
      '2 rescue breaths',
      'Repeat until help arrives'
    ]
  },
  {
    title: 'Bleeding Control',
    steps: [
      'Apply direct pressure',
      'Elevate if possible',
      'Use clean cloth',
      'Don\'t remove embedded objects'
    ]
  },
  {
    title: 'Emergency Contacts',
    contacts: [
      { name: 'Ambulance', number: '108' },
      { name: 'Police', number: '100' },
      { name: 'Fire', number: '101' }
    ]
  }
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

// Handle offline first aid data requests
self.addEventListener('message', function(event) {
  if (event.data && event.data.type === 'GET_OFFLINE_FIRST_AID') {
    event.ports[0].postMessage(offlineFirstAid);
  }
});

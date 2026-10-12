import React from 'react';

export const JSONLD = () => {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Dart Sri Lanka",
    "url": "https://dartsrilanka.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://dartsrilanka.com/shop?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Dart Sri Lanka",
    "url": "https://dartsrilanka.com",
    "logo": "https://dartsrilanka.com/logo.png",
    "sameAs": [
      "https://facebook.com/dartsrilanka",
      "https://instagram.com/dartsrilanka",
      "https://twitter.com/dartsrilanka"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+94-XX-XXX-XXXX", 
      "contactType": "customer service",
      "areaServed": "LK",
      "availableLanguage": "English"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
    </>
  );
};

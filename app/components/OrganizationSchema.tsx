export default function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "name": "Ambaari Tours and Travels",
    "alternateName": "Ambaari Tours",
    "url": "https://www.ambaaritoursandtravels.com",
    "logo": "https://www.ambaaritoursandtravels.com/Images/nav-logo.jpg",
    "image": "https://www.ambaaritoursandtravels.com/Images/logo.jpeg",
    "description": "Ambaari Tours and Travels organizes expertly guided treks, domestic travel packages, and custom group trips across India. We specialize in bringing people together through travel, offering specialized services for corporate team-building events and energetic college excursions.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "3rd Floor, No.879/e, next to Income tax office, 6th Block",
      "addressLocality": "Koramangala",
      "addressRegion": "Karnataka",
      "addressCountry": "IN",
      "postalCode": "560034"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+91-8073097430",
        "contactType": "customer service",
        "availableLanguage": ["English", "Hindi", "Kannada"]
      },
      {
        "@type": "ContactPoint",
        "telephone": "+91-8073097430",
        "contactType": "sales",
        "availableLanguage": ["English", "Hindi", "Kannada"]
      },
      {
        "@type": "ContactPoint",
        "telephone": "+91-8073097430",
        "contactType": "reservations",
        "availableLanguage": ["English", "Hindi", "Kannada"]
      }
    ],
    "sameAs": [
      "https://www.facebook.com/ambaaritours",
      "https://www.instagram.com/ambaaritours",
      "https://twitter.com/ambaaritours"
    ],
    "priceRange": "₹₹ - ₹₹₹₹",
    "openingHours": "Mo-Su 09:00-21:00",
    "areaServed": ["India", "International"],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Travel Packages",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "International Tours",
            "description": "Luxury international travel packages to Europe, Thailand, and Turkey"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Domestic Tours",
            "description": "Expertly guided tours across India including North and South India packages"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Adventure Treks",
            "description": "Himalayan treks, Ladakh bike expeditions, and Winter Spiti 4x4 adventures"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Pilgrimage Tours",
            "description": "Spiritual journeys to Varanasi, Ayodhya, Dharmasthala, and other sacred destinations"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Weekend Getaways",
            "description": "Quick trips to Dandeli, Gokarna, Murdeshwara, Jog Falls, and Mantralaya"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Thailand Special Packages",
            "description": "Ladies special tours, budget Thailand packages, and all-inclusive Thailand trips"
          }
        }
      ]
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
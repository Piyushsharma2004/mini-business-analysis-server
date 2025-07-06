const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

// Enhanced SEO headlines pool with categories
const seoHeadlines = {
  restaurant: [
    "Why {name} is {location}'s Hidden Culinary Gem in 2025",
    "Discover the Flavors: {name}'s Rise in {location}",
    "Food Paradise: How {name} Became {location}'s Must-Visit Spot",
    "{name}: Where Tradition Meets Innovation in {location}",
    "Taste the Difference: {name}'s Secret to Success in {location}"
  ],
  retail: [
    "Shopping Revolution: {name} Transforms {location}'s Retail Scene",
    "Why {name} is {location}'s Premier Shopping Destination",
    "From Local to Legend: {name}'s Journey in {location}",
    "Discover Quality: {name}'s Impact on {location} Commerce",
    "{name}: Redefining Retail Excellence in {location}"
  ],
  service: [
    "Excellence Delivered: {name}'s Professional Services in {location}",
    "Trust and Quality: Why {location} Chooses {name}",
    "Service Excellence: {name}'s Commitment to {location}",
    "Professional Solutions: {name} Leads {location}'s Service Industry",
    "{name}: Your Trusted Partner in {location}"
  ],
  healthcare: [
    "Caring for {location}: {name}'s Healthcare Excellence",
    "Health and Wellness: {name}'s Impact on {location}",
    "Medical Excellence: Why {location} Trusts {name}",
    "Healing and Hope: {name}'s Mission in {location}",
    "{name}: Leading Healthcare Innovation in {location}"
  ]
};

// Business insights data
const businessInsights = [
  "Your business shows 23% growth in local searches this month",
  "Peak customer hours: 2-4 PM and 6-8 PM",
  "Top keywords driving traffic: quality, affordable, professional",
  "Mobile users account for 78% of your local searches",
  "Weekend traffic is 34% higher than weekdays"
];

// SEO tips
const seoTips = [
  "Add photos of your storefront and interior to boost visibility",
  "Encourage satisfied customers to leave Google reviews",
  "Update your business hours regularly, especially during holidays",
  "Use local keywords in your business description",
  "Post regular updates about new products or services"
];

// Keyword suggestions
const keywordSuggestions = {
  restaurant: ["local dining", "best restaurant", "gourmet food", "family-friendly", "cuisine"],
  retail: ["local shopping", "boutique store", "quality products", "retail deals", "fashion"],
  service: ["professional services", "local experts", "reliable service", "consulting", "repair"],
  healthcare: ["healthcare services", "local clinic", "medical care", "wellness", "dental care"]
};

// Backlink opportunities
const backlinkOpportunities = {
  restaurant: ["Local food blogs", "TripAdvisor", "Yelp", "City tourism websites", "Food review platforms"],
  retail: ["Local business directories", "Shopping guides", "E-commerce blogs", "Chamber of Commerce", "Local news sites"],
  service: ["Industry directories", "Local service guides", "Professional associations", "Business review sites", "Community boards"],
  healthcare: ["Health directories", "Local medical associations", "Wellness blogs", "Community health websites", "Patient review platforms"]
};

// Content ideas
const contentIdeas = {
  restaurant: ["Behind-the-scenes kitchen tour", "Chef's special recipe", "Local ingredient spotlight", "Customer stories", "Seasonal menu guide"],
  retail: ["New product showcase", "Shopping tips for {location}", "Behind-the-scenes at {name}", "Seasonal sales guide", "Customer styling tips"],
  service: ["Service process explained", "Customer success stories", "Industry tips and tricks", "Local service needs", "Expert advice series"],
  healthcare: ["Health and wellness tips", "Patient care stories", "Medical service guide", "Community health tips", "Wellness program highlights"]
};

// Competitor analysis data
const competitorData = {
  averageRating: 4.1,
  averageReviews: 89,
  topKeywords: ["quality", "service", "value", "professional", "reliable"],
  marketPosition: "Above Average"
};

// Social media insights
const socialMediaData = {
  engagement: Math.floor(Math.random() * 20 + 5),
  reach: Math.floor(Math.random() * 5000 + 1000),
  topPlatform: ["Facebook", "Instagram", "Twitter"][Math.floor(Math.random() * 3)]
};

// Helper function to categorize business
function categorizeBusinessType(name) {
  if (!name) return 'service';
  const foodKeywords = ['cafe', 'restaurant', 'bakery', 'food', 'kitchen', 'diner', 'bistro'];
  const retailKeywords = ['store', 'shop', 'boutique', 'mart', 'outlet', 'mall'];
  const serviceKeywords = ['service', 'repair', 'consulting', 'agency', 'studio'];
  const healthKeywords = ['clinic', 'hospital', 'medical', 'dental', 'health'];
  
  const lowerName = name.toLowerCase();
  
  if (foodKeywords.some(keyword => lowerName.includes(keyword))) return 'restaurant';
  if (retailKeywords.some(keyword => lowerName.includes(keyword))) return 'retail';
  if (serviceKeywords.some(keyword => lowerName.includes(keyword))) return 'service';
  if (healthKeywords.some(keyword => lowerName.includes(keyword))) return 'healthcare';
  
  return 'service'; // default
}

// Generate personalized headline
function generateHeadline(name, location) {
  const category = categorizeBusinessType(name);
  const templates = seoHeadlines[category];
  const template = templates[Math.floor(Math.random() * templates.length)];
  return template.replace('{name}', name).replace('{location}', location);
}

// Root route to handle GET /
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to GrowthProAI Backend API',
    status: 'OK',
    endpoints: [
      '/business-data (POST)',
      '/regenerate-headline (GET)',
      '/seo-tips (GET)',
      '/analytics (GET)',
      '/growth-recommendations (GET)',
      '/health (GET)'
    ],
    documentation: 'Please use the provided endpoints to interact with the API.'
  });
});

// POST /business-data
app.post('/business-data', (req, res) => {
  const { name, location } = req.body;
  
  if (!name || !location) {
    console.error('Missing name or location:', { name, location });
    return res.status(400).json({ error: 'Business name and location are required' });
  }
  
  try {
    const rating = (Math.random() * (5 - 3.5) + 3.5).toFixed(1);
    const reviews = Math.floor(Math.random() * 500 + 50);
    const category = categorizeBusinessType(name);
    
    const data = {
      rating: parseFloat(rating),
      reviews,
      headline: generateHeadline(name, location),
      businessInfo: {
        name,
        location,
        category,
        established: Math.floor(Math.random() * 20 + 2005),
        verified: Math.random() > 0.3
      },
      insights: businessInsights[Math.floor(Math.random() * businessInsights.length)],
      competitorAnalysis: {
        ...competitorData,
        yourRating: parseFloat(rating),
        yourReviews: reviews,
        performance: parseFloat(rating) > competitorData.averageRating ? 'Above Average' : 'Below Average'
      },
      socialMedia: {
        engagement: Math.floor(Math.random() * 20 + 5),
        reach: Math.floor(Math.random() * 5000 + 1000),
        topPlatform: ["Facebook", "Instagram", "Twitter"][Math.floor(Math.random() * 3)]
      },
      seoScore: Math.floor(Math.random() * 40 + 60), // 60-100
      monthlyViews: Math.floor(Math.random() * 10000 + 1000),
      clickThroughRate: (Math.random() * 5 + 2).toFixed(1) + '%',
      keywordSuggestions: keywordSuggestions[category],
      backlinkOpportunities: backlinkOpportunities[category],
      contentIdeas: contentIdeas[category]
    };
    
    console.log('Business data response:', { name, location, category });
    res.json(data);
  } catch (error) {
    console.error('Error in /business-data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /regenerate-headline
app.get('/regenerate-headline', (req, res) => {
  const { name, location } = req.query;
  
  if (!name || !location) {
    console.error('Missing name or location in /regenerate-headline:', { name, location });
    return res.status(400).json({ error: 'Business name and location are required' });
  }
  
  try {
    const headline = generateHeadline(name, location);
    res.json({ headline });
  } catch (error) {
    console.error('Error in /regenerate-headline:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /seo-tips
app.get('/seo-tips', (req, res) => {
  try {
    const shuffledTips = seoTips.sort(() => 0.5 - Math.random());
    res.json({ tips: shuffledTips.slice(0, 3) });
  } catch (error) {
    console.error('Error in /seo-tips:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /analytics
// GET /analytics
app.get('/analytics', (req, res) => {
  const { name, location } = req.query;
  
  if (!name || !location) {
    console.error('Missing name or location in /analytics:', { name, location });
    return res.status(400).json({ error: 'Business name and location are required' });
  }
  
  try {
    const analytics = {
      dailyViews: Array.from({ length: 7 }, (_, i) => ({
        day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
        views: Math.floor(Math.random() * 200 + 50)
      })),
      topSearchTerms: [
        { term: `${name} ${location}`, count: Math.floor(Math.random() * 100 + 50) },
        { term: `${location} business`, count: Math.floor(Math.random() * 80 + 30) },
        { term: name, count: Math.floor(Math.random() * 60 + 20) }
      ],
      deviceBreakdown: {
        mobile: Math.floor(Math.random() * 20 + 60),
        desktop: Math.floor(Math.random() * 20 + 20),
        tablet: Math.floor(Math.random() * 10 + 5)
      }
    };
    
    res.json(analytics);
  } catch (error) {
    console.error('Error in /analytics:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
// GET /growth-recommendations
app.get('/growth-recommendations', (req, res) => {
  const { name, location } = req.query;
  
  if (!name || !location) {
    console.error('Missing name or location in /growth-recommendations:', { name, location });
    return res.status(400).json({ error: 'Business name and location are required' });
  }
  
  try {
    const category = categorizeBusinessType(name);
    
    const recommendations = {
      priority: [
        `Optimize your ${category} listings with high-quality photos`,
        `Encourage customer reviews to boost your ${location} presence`,
        `Update your business hours and contact information regularly`
      ],
      marketing: [
        `Run targeted local ads for ${location} residents`,
        `Create social media content showcasing your ${category} expertise`,
        `Partner with other local businesses in ${location}`
      ],
      seo: [
        `Add location-specific keywords to your website`,
        `Create blog content about ${category} trends in ${location}`,
        `Optimize for voice search queries`
      ]
    };
    
    res.json(recommendations);
  } catch (error) {
    console.error('Error in /growth-recommendations:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 GrowthProAI Backend Server running at http://localhost:${PORT}`);
  console.log(`📊 Dashboard ready for business insights and analytics`);
});

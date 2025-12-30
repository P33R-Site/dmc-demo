// VAL8 Demo Data and Script
// Mock data for the luxury travel concierge chatbot demo

export interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    quickReplies?: string[];
    recommendations?: Recommendation[];
    categoryCard?: CategoryItem;
    timestamp: Date;
}

export interface Recommendation {
    id: string;
    name: string;
    image: string;
    price: string;
    tags: string[];
    description: string;
    rating: number;
}

export type BookingCategory = 'calendar' | 'weather' | 'flight' | 'hotel' | 'ride' | 'dining' | 'shopping' | 'experience';

export interface CategoryItem {
    id: string;
    category: BookingCategory;
    title: string;
    subtitle: string;
    details: string[];
    price: string;
    image?: string;
    gallery?: string[];  // Multiple images for gallery view
    icon: string;
    status?: 'pending' | 'held' | 'confirmed';
    editableFields?: {   // Fields that can be edited
        label: string;
        value: string;
        type: 'text' | 'date' | 'select' | 'number';
        options?: string[];  // For select type
    }[];
}

export interface TripContext {
    destination?: string;
    dates?: string;
    duration?: string;
    style?: string;
    budget?: string;
    travelers?: string;
    weather?: string;
}

export interface UserInfo {
    name: string;
    email: string;
    phone: string;
}

export interface BookedItems {
    calendar?: CategoryItem;
    weather?: CategoryItem;
    flight?: CategoryItem;
    hotel?: CategoryItem;
    ride?: CategoryItem;
    dining?: CategoryItem;
    shopping?: CategoryItem;
    experience?: CategoryItem;
}

// Atlanta Hotel Recommendations (for standard flow)
export const ATLANTA_HOTELS: Recommendation[] = [
    {
        id: 'four-seasons-atlanta',
        name: 'Four Seasons Atlanta',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
        price: 'From $450/night',
        tags: ['Luxury', 'Midtown', 'Spa'],
        description: 'Sophisticated luxury in the heart of Midtown with stunning city views and world-class service.',
        rating: 4.9,
    },
    {
        id: 'st-regis-atlanta',
        name: 'The St. Regis Atlanta',
        image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80',
        price: 'From $520/night',
        tags: ['Iconic', 'Butler Service', 'Buckhead'],
        description: 'Timeless elegance in Buckhead with legendary St. Regis butler service.',
        rating: 5.0,
    },
    {
        id: 'ritz-carlton-buckhead',
        name: 'The Ritz-Carlton, Buckhead',
        image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80',
        price: 'From $380/night',
        tags: ['Boutique', 'Shopping', 'Dining'],
        description: 'Sophisticated retreat in the heart of Buckhead\'s premier shopping district.',
        rating: 4.8,
    },
    {
        id: 'whitley-atlanta',
        name: 'The Whitley, a Luxury Collection',
        image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80',
        price: 'From $320/night',
        tags: ['Modern', 'Buckhead', 'Design'],
        description: 'Contemporary luxury with Southern hospitality in the heart of Buckhead.',
        rating: 4.7,
    },
];

// Atlanta Demo Data for Powered by PRV8 - One widget per category
export const ATLANTA_DEMO_DATA: Record<BookingCategory, CategoryItem> = {
    calendar: {
        id: 'calendar-atlanta',
        category: 'calendar',
        title: 'June 5-9, 2025',
        subtitle: '4 nights · Atlanta, GA',
        details: ['Check-in: Thu, Jun 5', 'Check-out: Mon, Jun 9'],
        price: '',
        icon: '📅',
        image: 'https://images.unsplash.com/photo-1575917649705-5b59aaa12e6b?w=800&q=80',
        gallery: [
            'https://images.unsplash.com/photo-1575917649705-5b59aaa12e6b?w=800&q=80',
            'https://images.unsplash.com/photo-1555217851-6141535f2f4f?w=800&q=80',
            'https://images.unsplash.com/photo-1587578855663-ce30df2f9de2?w=800&q=80',
            'https://images.unsplash.com/photo-1599758758477-f2d0dbe3c603?w=800&q=80',
        ],
        editableFields: [
            { label: 'Check-in Date', value: 'June 5, 2025', type: 'date' },
            { label: 'Check-out Date', value: 'June 9, 2025', type: 'date' },
            { label: 'Travelers', value: '2', type: 'number' },
        ],
    },
    weather: {
        id: 'weather-atlanta',
        category: 'weather',
        title: '82°F · Partly Cloudy',
        subtitle: 'Atlanta, GA',
        details: ['Perfect outdoor weather', 'Moderate humidity', 'Beautiful skies'],
        price: '',
        icon: '⛅',
        // No image/gallery/editableFields - weather is not editable
    },
    flight: {
        id: 'flight-sfo-atl',
        category: 'flight',
        title: 'SFO → Atlanta',
        subtitle: 'Delta · First Class',
        details: ['Nonstop · 4h 30m', 'June 5 → June 9', '2 passengers'],
        price: '$1,290',
        icon: '✈️',
        image: 'https://images.unsplash.com/photo-1540339832862-474599807836?w=800&q=80',
        gallery: [
            'https://images.unsplash.com/photo-1540339832862-474599807836?w=800&q=80',
            'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80',
            'https://images.unsplash.com/photo-1569629743817-70d8db6c323b?w=800&q=80',
            'https://images.unsplash.com/photo-1583243567239-3727551e0c59?w=800&q=80',
            'https://images.unsplash.com/photo-1556388158-158ea5ccacbd?w=800&q=80',
        ],
        editableFields: [
            { label: 'From', value: 'SFO - San Francisco', type: 'text' },
            { label: 'To', value: 'ATL - Atlanta', type: 'text' },
            { label: 'Class', value: 'First', type: 'select', options: ['Economy', 'Premium Economy', 'Business', 'First'] },
            { label: 'Passengers', value: '2', type: 'number' },
        ],
    },
    hotel: {
        id: 'hotel-four-seasons',
        category: 'hotel',
        title: 'Four Seasons Atlanta',
        subtitle: 'Premier Suite · City View',
        details: ['Midtown location', 'Private balcony', 'Club access'],
        price: '$650/night',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
        icon: '🏨',
        gallery: [
            'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
            'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80',
            'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80',
            'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80',
        ],
        editableFields: [
            { label: 'Room Type', value: 'Premier Suite', type: 'select', options: ['Standard Room', 'Deluxe Room', 'Premier Suite', 'Presidential Suite'] },
            { label: 'View', value: 'City View', type: 'select', options: ['Garden View', 'Pool View', 'City View', 'Skyline View'] },
            { label: 'Guests', value: '2', type: 'number' },
        ],
    },
    ride: {
        id: 'ride-chauffeur',
        category: 'ride',
        title: 'Chauffeur Service',
        subtitle: 'Premium Black Car',
        details: ['Airport pickup scheduled', 'Mercedes S-Class', 'Complimentary water'],
        price: '$89',
        icon: '🚗',
        image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80',
        gallery: [
            'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80',
            'https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&q=80',
            'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80',
            'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80',
        ],
        editableFields: [
            { label: 'Vehicle', value: 'Mercedes S-Class', type: 'select', options: ['Mercedes S-Class', 'BMW 7-Series', 'Cadillac Escalade', 'Tesla Model S'] },
            { label: 'Pickup Location', value: 'Atlanta Hartsfield-Jackson Airport', type: 'text' },
            { label: 'Pickup Time', value: 'On arrival', type: 'text' },
        ],
    },
    dining: {
        id: 'dining-bacchanalia',
        category: 'dining',
        title: 'Bacchanalia',
        subtitle: 'Fine Dining · Westside',
        details: ['Friday 8:00 PM', '2 guests', 'James Beard Award Winner'],
        price: '$195/pp',
        icon: '🍽️',
        image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
        gallery: [
            'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
            'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
            'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80',
            'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80',
            'https://images.unsplash.com/photo-1560717799-0c31c7e6e65e?w=800&q=80',
        ],
        editableFields: [
            { label: 'Restaurant', value: 'Bacchanalia', type: 'select', options: ['Bacchanalia', 'Staplehouse', 'Empire State South', 'Gunshow', 'Miller Union'] },
            { label: 'Date', value: 'Friday, June 6', type: 'date' },
            { label: 'Time', value: '8:00 PM', type: 'select', options: ['6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM'] },
            { label: 'Guests', value: '2', type: 'number' },
        ],
    },
    shopping: {
        id: 'shopping-sunglasses',
        category: 'shopping',
        title: 'Ray-Ban Aviators',
        subtitle: '⭐⭐⭐⭐⭐ 4.9 · Classic Style',
        details: ['Perfect for sunny days', 'Delivered to hotel', 'Ready on arrival'],
        price: '$179.99',
        icon: '🛍️',
        image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80',
        gallery: [
            'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80',
            'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80',
            'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&q=80',
            'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&q=80',
        ],
        editableFields: [
            { label: 'Product', value: 'Ray-Ban Aviators', type: 'text' },
            { label: 'Quantity', value: '1', type: 'number' },
            { label: 'Delivery', value: 'To Hotel', type: 'select', options: ['To Hotel', 'Hotel Lobby', 'Airport Lounge'] },
        ],
    },
    experience: {
        id: 'experience-food-tour',
        category: 'experience',
        title: 'Southern Food Tour',
        subtitle: 'Historic Sweet Auburn · Guided',
        details: ['Saturday morning', 'Private tour', 'Includes tastings'],
        price: '$150/person',
        icon: '🍑',
        image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
        gallery: [
            'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
            'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80',
            'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80',
            'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=800&q=80',
            'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&q=80',
        ],
        editableFields: [
            { label: 'Experience', value: 'Southern Food Tour', type: 'select', options: ['Southern Food Tour', 'Atlanta History Center', 'Georgia Aquarium VIP', 'Helicopter Tour', 'Civil Rights Tour'] },
            { label: 'Date', value: 'Saturday, June 7', type: 'date' },
            { label: 'Time', value: 'Morning', type: 'select', options: ['Morning', 'Afternoon', 'Evening'] },
            { label: 'Participants', value: '2', type: 'number' },
        ],
    },
};

// Exact Demo Script matching democonverstation.md
// Each step shows which categories should be displayed with that response
export interface DemoStep {
    id: string;
    trigger: string[];  // Keywords that trigger this step
    response: string;
    quickReplies?: string[];
    showCategories?: BookingCategory[];  // Widget cards to show on right panel
    bookCategories?: BookingCategory[];  // Categories to mark as booked
    showCheckout?: boolean;
}

export const DEMO_SCRIPT: DemoStep[] = [
    // Step 1: User says "I'm planning a trip to Atlanta"
    {
        id: 'destination',
        trigger: ['atlanta', 'planning', 'trip'],
        response: "Excellent choice. When are you planning to travel?",
        quickReplies: ['June 5-9', 'Next month', 'Flexible'],
    },
    // Step 2: User says dates - Show Calendar & Weather widgets
    {
        id: 'dates',
        trigger: ['june', '5', '9', 'dates', 'next', '5th'],
        response: "Noted. Weather is expected to be 82° and beautiful. I'll handle the logistics.\nWant flights, hotel, or activities first?",
        showCategories: ['calendar', 'weather'],
        bookCategories: ['calendar', 'weather'],
        quickReplies: ['Flights', 'Hotel', 'Activities'],
    },
    // Step 3: User says "Flights" - Show Flight widget
    {
        id: 'flights',
        trigger: ['flight', 'flights'],
        response: "I've got you nonstop from SFO to Atlanta on Delta, First Class.\nWant me to hold seats?",
        showCategories: ['flight'],
        quickReplies: ['Yes', 'Show other options'],
    },
    // Step 4: User confirms flight with "Yes" - Book flight, Show Hotel widget
    {
        id: 'flight-confirmed',
        trigger: ['yes'],
        response: "Done. I'd recommend the Four Seasons Atlanta for your stay. Premier Suite with City View.\nSecure it?",
        bookCategories: ['flight'],
        showCategories: ['hotel'],
        quickReplies: ['Secure it', 'Show alternatives'],
    },
    // Step 5: User says "Secure it" - Book hotel, Show Ride widget
    {
        id: 'hotel-confirmed',
        trigger: ['secure'],
        response: "Locked in. I've arranged a premium chauffeur service for your airport transfer.\nShall I schedule the pickup?",
        bookCategories: ['hotel'],
        showCategories: ['ride'],
        quickReplies: ['Yes, schedule it', 'No thanks'],
    },
    // Step 6: User says "Yes, schedule it" - Book ride, Show Dining widget
    {
        id: 'ride-confirmed',
        trigger: ['schedule', 'pickup'],
        response: "Confirmed. For dining, I've found a table at Bacchanalia — Atlanta's finest farm-to-table experience.\nFriday at 8pm?",
        bookCategories: ['ride'],
        showCategories: ['dining'],
        quickReplies: ['That sounds amazing. Book it', 'Different restaurant'],
    },
    // Step 7: User says "That sounds amazing. Book it" - Book dining, Show Shopping widget
    {
        id: 'dining-confirmed',
        trigger: ['book it', 'amazing', 'sounds'],
        response: "Reserved. Also — classic Ray-Ban Aviators are recommended for the sunny Georgia weather.\nShall I have a pair waiting at your hotel?",
        bookCategories: ['dining'],
        showCategories: ['shopping'],
        quickReplies: ['Yes please', 'Skip'],
    },
    // Step 8: User says "Yes please" - Book shopping, Show Experience widget  
    {
        id: 'shopping-confirmed',
        trigger: ['yes please', 'please'],
        response: "Added. Finally, a private Southern Food Tour through historic Sweet Auburn is highly rated.\nShall I add this experience?",
        bookCategories: ['shopping'],
        showCategories: ['experience'],
        quickReplies: ['Yes, add it', 'Skip'],
    },
    // Step 9: User says "Yes, add it" - Book experience, Show Checkout
    {
        id: 'experience-confirmed',
        trigger: ['add it', 'add'],
        response: "Done. Your Atlanta itinerary is fully organized.\nPlease review the summary below and complete your checkout.",
        bookCategories: ['experience'],
        showCheckout: true,
        quickReplies: ['Complete Checkout'],
    },
    // Step 10: Checkout
    {
        id: 'checkout',
        trigger: ['checkout', 'complete'],
        response: "Processing your booking...",
        showCheckout: true,
    },
];

// Standard flow responses (non-demo mode)
export const VAL8_RESPONSES: Record<string, { content: string; quickReplies?: string[]; showRecommendations?: boolean }> = {
    welcome: {
        content: "Hello! I'm your personal travel concierge. Where are you thinking of going?",
        quickReplies: ['Atlanta', 'Maldives', 'Paris', 'Tokyo'],
    },
    atlanta_intent: {
        content: "Beautiful choice. Atlanta in this season is extraordinary — warm days, vibrant culture, and world-class experiences await. What kind of escape are you looking for?",
        quickReplies: ['Relaxing', 'Adventure', 'Social', 'Surprise me'],
    },
    relaxing_style: {
        content: "I love that. Let me focus on luxurious retreats with exceptional spas and serene settings. How long would you like to unwind?",
        quickReplies: ['3 nights', '4 nights', '5 nights', '7 nights'],
    },
    duration_selected: {
        content: "Perfect. I've curated a few exceptional properties that match exactly what you're looking for — each offers stunning views, world-class service, and the peaceful escape you deserve.",
        showRecommendations: true,
    },
    adventure_style: {
        content: "Excellent taste. Atlanta offers thrilling outdoor adventures, incredible hiking, and experiences you'll remember forever. How many nights?",
        quickReplies: ['3 nights', '4 nights', '5 nights', '7 nights'],
    },
    social_style: {
        content: "You'll love it. Atlanta's social scene is unmatched — rooftop lounges, live music venues, and dining experiences that set the standard. How long are you staying?",
        quickReplies: ['3 nights', '4 nights', '5 nights', '7 nights'],
    },
    hotel_selected: {
        content: "Excellent choice — you have great taste. I've prepared your complete trip summary with all the details. Ready to review?",
        quickReplies: ['Continue to Checkout', 'Explore Similar', 'Ask a Question'],
    },
    booking_confirmed: {
        content: "Your trip is confirmed! I'm sending the complete itinerary to your email now. Would you like me to arrange spa treatments, reserve a table at the city's best restaurants, or book a food tour?",
        quickReplies: ['View Itinerary', 'Add Experiences', 'Plan Another Trip'],
    },
    concierge_escalation: {
        content: "Absolutely. I'll have one of our concierge specialists reach out to you personally within the hour. They'll take care of everything from here.",
        quickReplies: ['Thank you', 'Continue planning'],
    },
    question_response: {
        content: "Of course! What would you like to know? I'm happy to provide details about the property, local experiences, or help with any special requests.",
        quickReplies: ['Room details', 'Dining options', 'Activities nearby', 'Talk to Concierge'],
    },
    fallback: {
        content: "I'd be happy to help with that. Tell me a bit more about what you're looking for, and I'll take care of the rest.",
        quickReplies: ['Plan a Trip', 'Explore Ideas', 'Talk to Concierge'],
    },
};

// Quick action buttons for welcome screen
export const QUICK_ACTIONS = [
    { label: 'Plan a Trip', icon: '✈️' },
    { label: 'Explore Ideas', icon: '💡' },
    { label: "I'm Traveling Now", icon: '🗺️' },
    { label: 'Just Browsing', icon: '👀' },
];

// Demo mode quick actions
export const DEMO_QUICK_ACTIONS = [
    { label: "I'm planning a trip to Atlanta", icon: '🍑' },
];

// Context chips that appear during conversation
export const CONTEXT_CHIPS = {
    relaxing: ['Spa retreats', 'Fine dining', 'Piedmont Park'],
    adventure: ['Hiking trails', 'Water sports', 'Stone Mountain'],
    social: ['Live music', 'Rooftop bars', 'Fine dining'],
};

// Demo Types
export type DemoType = 'atlanta' | 'financial' | 'dmc';

export interface DemoConfig {
    id: DemoType;
    name: string;
    subtitle: string;
    icon: string;
    headerTitle: string;
    headerSubtitle: string;
    poweredBy: string;
    script: DemoStep[];
    quickActions: { label: string; icon: string }[];
    welcomeTitle: string;
    welcomeSubtitle: string;
    inputPlaceholder: string;
}

// Financial Institution Demo Data (Italy focus for Visa/JPM demo)
export const FINANCIAL_DEMO_DATA: Record<BookingCategory, CategoryItem> = {
    calendar: {
        id: 'calendar-italy',
        category: 'calendar',
        title: 'September 10-17, 2025',
        subtitle: '7 nights · Italy',
        details: ['Check-in: Wed, Sep 10', 'Check-out: Wed, Sep 17'],
        price: '',
        icon: '📅',
        image: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=800&q=80',
        gallery: [
            'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=800&q=80',
            'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&q=80',
        ],
        editableFields: [
            { label: 'Check-in Date', value: 'September 10, 2025', type: 'date' },
            { label: 'Check-out Date', value: 'September 17, 2025', type: 'date' },
            { label: 'Travelers', value: '2', type: 'number' },
        ],
    },
    weather: {
        id: 'weather-italy',
        category: 'weather',
        title: '75°F · Sunny',
        subtitle: 'Rome, Italy',
        details: ['Perfect weather for sightseeing', 'Low humidity', 'Clear skies expected'],
        price: '',
        icon: '☀️',
    },
    flight: {
        id: 'flight-jfk-fco',
        category: 'flight',
        title: 'JFK → Rome (FCO)',
        subtitle: 'Business Class · Preferred Partner',
        details: ['Direct · 8h 30m', 'September 10 → September 17', '2 passengers'],
        price: '$4,890',
        icon: '✈️',
        image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80',
        gallery: [
            'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80',
            'https://images.unsplash.com/photo-1540339832862-474599807836?w=800&q=80',
        ],
        editableFields: [
            { label: 'From', value: 'JFK - New York', type: 'text' },
            { label: 'To', value: 'FCO - Rome', type: 'text' },
            { label: 'Class', value: 'Business', type: 'select', options: ['Economy', 'Premium Economy', 'Business', 'First'] },
        ],
    },
    hotel: {
        id: 'hotel-rome-luxury',
        category: 'hotel',
        title: 'Hotel de Russie',
        subtitle: 'Preferred Partner · Elite Access',
        details: ['Via del Babuino, Rome', 'Suite upgrade available', 'Exclusive member benefits'],
        price: '$890/night',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
        icon: '🏨',
        gallery: [
            'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
            'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80',
        ],
        editableFields: [
            { label: 'Room Type', value: 'Deluxe Suite', type: 'select', options: ['Classic Room', 'Deluxe Room', 'Deluxe Suite', 'Penthouse'] },
            { label: 'View', value: 'Garden View', type: 'select', options: ['City View', 'Garden View', 'Piazza View'] },
        ],
    },
    ride: {
        id: 'ride-italy',
        category: 'ride',
        title: 'Premium Transfers',
        subtitle: 'Private Sedan',
        details: ['Airport transfers included', 'Mercedes E-Class', 'Professional chauffeur'],
        price: 'Included',
        icon: '🚗',
        image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80',
        gallery: [
            'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80',
        ],
        editableFields: [
            { label: 'Vehicle', value: 'Mercedes E-Class', type: 'select', options: ['Mercedes E-Class', 'BMW 5-Series', 'Audi A6'] },
        ],
    },
    dining: {
        id: 'dining-italy',
        category: 'dining',
        title: 'Ristorante Aroma',
        subtitle: 'Michelin 1-Star · Roman Cuisine',
        details: ['Saturday 8:00 PM', '2 guests', 'Colosseum views'],
        price: '$250/pp',
        icon: '🍽️',
        image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
        gallery: [
            'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
        ],
        editableFields: [
            { label: 'Restaurant', value: 'Ristorante Aroma', type: 'text' },
            { label: 'Time', value: '8:00 PM', type: 'select', options: ['7:00 PM', '8:00 PM', '9:00 PM'] },
        ],
    },
    shopping: {
        id: 'shopping-italy',
        category: 'shopping',
        title: 'Private Shopping Experience',
        subtitle: 'Via Condotti',
        details: ['Personal stylist', 'VIP access', 'Reserved appointments'],
        price: 'Complimentary',
        icon: '🛍️',
        image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80',
        gallery: [
            'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80',
        ],
        editableFields: [],
    },
    experience: {
        id: 'experience-italy',
        category: 'experience',
        title: 'Private Vatican Tour',
        subtitle: 'After-Hours Access',
        details: ['Expert art historian guide', 'Skip-the-line access', 'Sistine Chapel included'],
        price: '$450/person',
        icon: '🏛️',
        image: 'https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=800&q=80',
        gallery: [
            'https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=800&q=80',
        ],
        editableFields: [
            { label: 'Tour', value: 'Private Vatican Tour', type: 'select', options: ['Private Vatican Tour', 'Colosseum Underground', 'Pompeii Day Trip'] },
        ],
    },
};

// Financial Demo Script (Visa/JPM)
export const FINANCIAL_DEMO_SCRIPT: DemoStep[] = [
    {
        id: 'intent',
        trigger: ['travel', 'planning', 'dining', 'personal', 'experience', 'help'],
        response: "Of course. What kind of experience are you looking for today?",
        quickReplies: ['Travel', 'Dining', 'Experiences', 'Lifestyle Request'],
    },
    {
        id: 'travel-request',
        trigger: ['travel', 'trip', 'italy'],
        response: "Wonderful choice. When would you like to travel to Italy?",
        quickReplies: ['September 2025', 'Next month', 'Flexible dates'],
    },
    {
        id: 'dates',
        trigger: ['september', 'next', 'flexible'],
        response: "I'll design a personalized itinerary using preferred partners aligned with your profile and benefits.",
        showCategories: ['calendar', 'weather'],
        bookCategories: ['calendar', 'weather'],
        quickReplies: ['Continue', 'Adjust dates'],
    },
    {
        id: 'planning',
        trigger: ['continue', 'planning'],
        response: "I'm prioritizing flexible bookings, elite hotel programs, and premium ground services commonly available to clients like you.",
        showCategories: ['hotel'],
        quickReplies: ['View hotel options', 'Add flights'],
    },
    {
        id: 'hotel',
        trigger: ['hotel', 'view', 'options'],
        response: "The Hotel de Russie is a preferred partner property with suite upgrades and exclusive member benefits available.\n\nShall I secure a reservation?",
        bookCategories: ['hotel'],
        showCategories: ['flight'],
        quickReplies: ['Yes, secure it', 'Show alternatives'],
    },
    {
        id: 'flight',
        trigger: ['secure', 'yes'],
        response: "Done. I've also found excellent flight options with our partner airlines.\n\nBusiness class with lounge access included.",
        bookCategories: ['flight'],
        showCategories: ['ride'],
        quickReplies: ['Add transfers', 'Continue to experiences'],
    },
    {
        id: 'transfers',
        trigger: ['transfers', 'add'],
        response: "Premium ground transfers are arranged. Would you like me to coordinate with a dedicated concierge to finalize experiences?",
        bookCategories: ['ride'],
        showCategories: ['experience'],
        quickReplies: ['Continue with AI', 'Escalate to concierge'],
    },
    {
        id: 'experience',
        trigger: ['continue', 'ai'],
        response: "I've curated exclusive experiences including a private Vatican tour with after-hours access.\n\nShall I add this?",
        showCategories: ['dining'],
        quickReplies: ['Yes, add it', 'Show more options'],
    },
    {
        id: 'finalize',
        trigger: ['add it', 'yes'],
        response: "Your Italy itinerary is complete. I'll coordinate the next steps discreetly and keep everything aligned with your preferences.\n\nA concierge will follow up to finalize the details.",
        bookCategories: ['dining', 'experience'],
        showCheckout: true,
        quickReplies: ['Review & Confirm'],
    },
];

// DMC Demo Data (Italy multi-city for Liberty International)
export const DMC_DEMO_DATA: Record<BookingCategory, CategoryItem> = {
    calendar: {
        id: 'calendar-italy-dmc',
        category: 'calendar',
        title: 'October 5-15, 2025',
        subtitle: '10 nights · Rome, Florence, Amalfi',
        details: ['Check-in: Sun, Oct 5', 'Check-out: Wed, Oct 15'],
        price: '',
        icon: '📅',
        image: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=800&q=80',
        gallery: [
            'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=800&q=80',
            'https://images.unsplash.com/photo-1476362174823-3a23f4aa6c76?w=800&q=80',
            'https://images.unsplash.com/photo-1534445867742-43195f401b6c?w=800&q=80',
        ],
        editableFields: [
            { label: 'Check-in Date', value: 'October 5, 2025', type: 'date' },
            { label: 'Check-out Date', value: 'October 15, 2025', type: 'date' },
            { label: 'Travelers', value: '4 (2 couples)', type: 'text' },
        ],
    },
    weather: {
        id: 'weather-italy-dmc',
        category: 'weather',
        title: '72°F · Mild & Pleasant',
        subtitle: 'Italy · October',
        details: ['Ideal touring weather', 'Light layers recommended', 'Occasional rain possible'],
        price: '',
        icon: '🌤️',
    },
    flight: {
        id: 'flight-dmc',
        category: 'flight',
        title: 'Arrival: Rome FCO',
        subtitle: 'Departure: Naples NAP',
        details: ['Open-jaw routing', '4 passengers', 'Business class recommended'],
        price: 'TBD by DMC',
        icon: '✈️',
        image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80',
        gallery: [
            'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80',
        ],
        editableFields: [],
    },
    hotel: {
        id: 'hotel-rome-dmc',
        category: 'hotel',
        title: 'Multi-City Accommodations',
        subtitle: 'Rome · Florence · Amalfi',
        details: ['3 nights Rome', '3 nights Florence', '4 nights Amalfi Coast'],
        price: 'Quoted by Liberty',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
        icon: '🏨',
        gallery: [
            'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
            'https://images.unsplash.com/photo-1534445867742-43195f401b6c?w=800&q=80',
        ],
        editableFields: [
            { label: 'Rome Hotel', value: 'Hotel de Russie', type: 'text' },
            { label: 'Florence Hotel', value: 'Four Seasons Firenze', type: 'text' },
            { label: 'Amalfi Hotel', value: 'Belmond Caruso', type: 'text' },
        ],
    },
    ride: {
        id: 'ride-dmc',
        category: 'ride',
        title: 'Intercity Transfers',
        subtitle: 'Private Mercedes Sprinter',
        details: ['Rome → Florence', 'Florence → Amalfi', 'All local transfers'],
        price: 'Included',
        icon: '🚐',
        image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80',
        gallery: [
            'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80',
        ],
        editableFields: [],
    },
    dining: {
        id: 'dining-dmc',
        category: 'dining',
        title: 'Curated Dining',
        subtitle: '3 Michelin Experiences Included',
        details: ['Rome: Ristorante Aroma', 'Florence: Enoteca Pinchiorri', 'Amalfi: Don Alfonso'],
        price: 'Per itinerary',
        icon: '🍽️',
        image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
        gallery: [
            'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
        ],
        editableFields: [],
    },
    shopping: {
        id: 'shopping-dmc',
        category: 'shopping',
        title: 'Artisan Experiences',
        subtitle: 'Florence Leather Workshop',
        details: ['Private session', 'Custom piece creation', 'Shipped to home'],
        price: '€350/person',
        icon: '🛍️',
        image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80',
        gallery: [
            'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80',
        ],
        editableFields: [],
    },
    experience: {
        id: 'experience-dmc',
        category: 'experience',
        title: 'Guided Experiences',
        subtitle: 'Private Tours Throughout',
        details: ['Vatican Museums', 'Uffizi Gallery', 'Amalfi boat tour'],
        price: 'Per itinerary',
        icon: '🏛️',
        image: 'https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=800&q=80',
        gallery: [
            'https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=800&q=80',
        ],
        editableFields: [],
    },
};

// DMC Demo Script (Liberty International)
export const DMC_DEMO_SCRIPT: DemoStep[] = [
    {
        id: 'complex-request',
        trigger: ['italy', 'couples', 'days', 'rome', 'florence', 'amalfi', 'planning', 'trip'],
        response: "I'll prepare a structured itinerary and coordinate execution with Liberty International.\n\nLet me gather some details.",
        quickReplies: ['October 5-15', 'Flexible dates', '10 days'],
    },
    {
        id: 'dates',
        trigger: ['october', 'flexible', 'days', '10'],
        response: "Perfect. I'm creating a draft itinerary that optimizes routing and flow across Rome, Florence, and Amalfi.",
        showCategories: ['calendar', 'weather'],
        bookCategories: ['calendar', 'weather'],
        quickReplies: ['View itinerary draft', 'Adjust destinations'],
    },
    {
        id: 'itinerary',
        trigger: ['view', 'itinerary', 'draft'],
        response: "Here's the proposed routing:\n\n• Rome: 3 nights (arrival, Vatican, city exploration)\n• Florence: 3 nights (art, cuisine, Tuscan countryside)\n• Amalfi: 4 nights (coastal relaxation, boat tour)\n\nLiberty International will finalize guides, access, and experiences.",
        showCategories: ['hotel'],
        quickReplies: ['Looks great', 'Adjust pacing'],
    },
    {
        id: 'hotels',
        trigger: ['great', 'looks', 'pacing'],
        response: "I've selected premium properties at each destination. Liberty International will coordinate VIP amenities and special requests.",
        bookCategories: ['hotel'],
        showCategories: ['ride'],
        quickReplies: ['Add transfers', 'View properties'],
    },
    {
        id: 'transfers',
        trigger: ['transfers', 'add', 'properties'],
        response: "Private intercity transfers arranged with scenic stops en route.\n\nWould you like to add curated experiences?",
        bookCategories: ['ride'],
        showCategories: ['experience'],
        quickReplies: ['Add experiences', 'View transfer details'],
    },
    {
        id: 'experiences',
        trigger: ['experiences', 'add', 'details'],
        response: "I've included:\n• Private Vatican tour (after-hours)\n• Uffizi Gallery with art historian\n• Amalfi Coast boat charter\n\nLiberty International will arrange exclusive access.",
        bookCategories: ['experience'],
        showCategories: ['dining'],
        quickReplies: ['Add dining', 'Customize experiences'],
    },
    {
        id: 'dining',
        trigger: ['dining', 'add', 'customize'],
        response: "Three Michelin dining experiences included at premier restaurants in each city.\n\nLiberty recommends adjusting the Amalfi segment to avoid peak congestion. Shall I apply the update?",
        bookCategories: ['dining'],
        quickReplies: ['Yes, apply update', 'Keep as is'],
    },
    {
        id: 'finalize',
        trigger: ['apply', 'update', 'keep'],
        response: "Liberty International will manage your journey end-to-end. I'll retain your preferences for future trips.\n\nYour draft itinerary is ready for partner review.",
        showCheckout: true,
        quickReplies: ['Submit to Liberty', 'Review summary'],
    },
];

// Demo Configurations
export const DEMO_CONFIGS: Record<DemoType, DemoConfig> = {
    atlanta: {
        id: 'atlanta',
        name: 'Visit Dubai Demo',
        subtitle: 'Tourism Authority',
        icon: '🏙️',
        headerTitle: 'VAL8',
        headerSubtitle: 'Powered by PRV8',
        poweredBy: 'Powered by PRV8',
        script: DEMO_SCRIPT,
        quickActions: DEMO_QUICK_ACTIONS,
        welcomeTitle: 'Welcome back.',
        welcomeSubtitle: 'Planning a trip soon, or just browsing ideas?',
        inputPlaceholder: "Try: 'I'm planning a trip to Atlanta'",
    },
    financial: {
        id: 'financial',
        name: 'Financial Institution',
        subtitle: 'Visa / JPMorgan',
        icon: '💳',
        headerTitle: 'Private Client Concierge',
        headerSubtitle: 'Powered by PRV-8',
        poweredBy: 'JPMorgan Private Client',
        script: FINANCIAL_DEMO_SCRIPT,
        quickActions: [
            { label: 'Plan luxury travel to Italy', icon: '🇮🇹' },
        ],
        welcomeTitle: 'Welcome back.',
        welcomeSubtitle: 'Would you like help planning travel, dining, or something personal?',
        inputPlaceholder: "Try: 'Plan a luxury trip to Italy in September'",
    },
    dmc: {
        id: 'dmc',
        name: 'DMC Partner',
        subtitle: 'Liberty International',
        icon: '🌍',
        headerTitle: 'Luxury Travel Concierge',
        headerSubtitle: 'Powered by Liberty International',
        poweredBy: 'Liberty International Tourism Group',
        script: DMC_DEMO_SCRIPT,
        quickActions: [
            { label: '10 days in Italy for two couples', icon: '🇮🇹' },
        ],
        welcomeTitle: 'Welcome.',
        welcomeSubtitle: "I'll design your journey and coordinate directly with Liberty International's on-ground team.",
        inputPlaceholder: "Try: '10 days in Italy for two couples — Rome, Florence, Amalfi'",
    },
};

// Order for displaying booked items
export const CATEGORY_ORDER: BookingCategory[] = ['calendar', 'weather', 'flight', 'hotel', 'ride', 'dining', 'shopping', 'experience'];

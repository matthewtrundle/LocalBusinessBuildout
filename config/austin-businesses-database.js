#!/usr/bin/env node

/**
 * Comprehensive Austin-Area Business Database
 * Manually curated from verified sources
 * Covering 50-mile radius: Austin, Cedar Park, Round Rock, Georgetown, Pflugerville, etc.
 */

export const austinBusinessDatabase = [
  // AUSTIN - RESTAURANTS & FOOD
  {
    name: "Franklin Barbecue",
    url: "https://franklinbbq.com",
    industry: "restaurant",
    category: "BBQ",
    address: "900 E 11th St, Austin, TX 78702",
    phone: "(512) 653-1187",
    city: "Austin",
    zip: "78702"
  },
  {
    name: "Torchy's Tacos",
    url: "https://torchystacos.com",
    industry: "restaurant",
    category: "Mexican Food",
    address: "Multiple Locations, Austin, TX",
    phone: "(512) 366-0537",
    city: "Austin",
    zip: "78704"
  },
  {
    name: "Uchi",
    url: "https://uchiaustin.com",
    industry: "restaurant",
    category: "Sushi",
    address: "801 S Lamar Blvd, Austin, TX 78704",
    phone: "(512) 916-4808",
    city: "Austin",
    zip: "78704"
  },
  {
    name: "Matt's El Rancho",
    url: "https://mattselrancho.com",
    industry: "restaurant",
    category: "Mexican Food",
    address: "2613 S Lamar Blvd, Austin, TX 78704",
    phone: "(512) 462-9333",
    city: "Austin",
    zip: "78704"
  },
  {
    name: "Hopdoddy Burger Bar",
    url: "https://hopdoddy.com",
    industry: "restaurant",
    category: "Burgers",
    address: "Multiple Locations, Austin, TX",
    phone: "(512) 243-7505",
    city: "Austin",
    zip: "78701"
  },
  {
    name: "Kerbey Lane Cafe",
    url: "https://kerbeylanecafe.com",
    industry: "restaurant",
    category: "American Diner",
    address: "Multiple Locations, Austin, TX",
    phone: "(512) 451-1436",
    city: "Austin",
    zip: "78704"
  },
  {
    name: "La Barbecue",
    url: "https://labarbecue.com",
    industry: "restaurant",
    category: "BBQ",
    address: "2027 E Cesar Chavez St, Austin, TX 78702",
    phone: "(512) 605-9696",
    city: "Austin",
    zip: "78702"
  },
  {
    name: "Home Slice Pizza",
    url: "https://homeslicepizza.com",
    industry: "restaurant",
    category: "Pizza",
    address: "1415 S Congress Ave, Austin, TX 78704",
    phone: "(512) 444-7437",
    city: "Austin",
    zip: "78704"
  },
  {
    name: "Chuy's",
    url: "https://chuys.com",
    industry: "restaurant",
    category: "Mexican Food",
    address: "1728 Barton Springs Rd, Austin, TX 78704",
    phone: "(512) 474-4452",
    city: "Austin",
    zip: "78704"
  },
  {
    name: "Polvos Mexican Restaurant",
    url: "https://polvosaustin.com",
    industry: "restaurant",
    category: "Mexican Food",
    address: "2004 S 1st St, Austin, TX 78704",
    phone: "(512) 441-5446",
    city: "Austin",
    zip: "78704"
  },
  {
    name: "The Salt Lick BBQ",
    url: "https://saltlickbbq.com",
    industry: "restaurant",
    category: "BBQ",
    address: "18300 FM 1826, Driftwood, TX 78619",
    phone: "(512) 858-4959",
    city: "Driftwood",
    zip: "78619"
  },
  {
    name: "Terry Black's Barbecue",
    url: "https://terryblacksbbq.com",
    industry: "restaurant",
    category: "BBQ",
    address: "1003 Barton Springs Rd, Austin, TX 78704",
    phone: "(512) 394-5899",
    city: "Austin",
    zip: "78704"
  },
  {
    name: "Loro",
    url: "https://loroaustin.com",
    industry: "restaurant",
    category: "Asian BBQ",
    address: "2115 S Lamar Blvd, Austin, TX 78704",
    phone: "(512) 916-4100",
    city: "Austin",
    zip: "78704"
  },
  {
    name: "Odd Duck",
    url: "https://oddduckaustin.com",
    industry: "restaurant",
    category: "American Contemporary",
    address: "1201 S Lamar Blvd, Austin, TX 78704",
    phone: "(512) 433-6521",
    city: "Austin",
    zip: "78704"
  },
  {
    name: "Magnolia Cafe",
    url: "https://www.cafemagnolia.com",
    industry: "restaurant",
    category: "American Diner",
    address: "Multiple Locations, Austin, TX",
    phone: "(512) 445-0000",
    city: "Austin",
    zip: "78701"
  },

  // AUSTIN - COFFEE & CAFES
  {
    name: "Jo's Coffee",
    url: "https://joscoffee.com",
    industry: "cafe",
    category: "Coffee Shop",
    address: "1300 S Congress Ave, Austin, TX 78704",
    phone: "(512) 444-3800",
    city: "Austin",
    zip: "78704"
  },
  {
    name: "Houndstooth Coffee",
    url: "https://houndstoothcoffee.com",
    industry: "cafe",
    category: "Coffee Shop",
    address: "Multiple Locations, Austin, TX",
    phone: "(512) 394-5776",
    city: "Austin",
    zip: "78702"
  },
  {
    name: "Caffé Medici",
    url: "https://caffemedici.com",
    industry: "cafe",
    category: "Coffee Shop",
    address: "Multiple Locations, Austin, TX",
    phone: "(512) 474-5730",
    city: "Austin",
    zip: "78705"
  },
  {
    name: "Cosmic Coffee + Beer Garden",
    url: "https://cosmiccoffeeatx.com",
    industry: "cafe",
    category: "Coffee Shop",
    address: "121 Pickle Rd, Austin, TX 78704",
    phone: "(512) 386-0900",
    city: "Austin",
    zip: "78704"
  },
  {
    name: "Mozart's Coffee Roasters",
    url: "https://mozartscoffee.com",
    industry: "cafe",
    category: "Coffee Shop",
    address: "3825 Lake Austin Blvd, Austin, TX 78703",
    phone: "(512) 477-2900",
    city: "Austin",
    zip: "78703"
  },

  // AUSTIN - BREWERIES & BARS
  {
    name: "The Austin Beer Garden Brewing Company",
    url: "https://theabgb.com",
    industry: "brewery",
    category: "Brewery",
    address: "1305 W Oltorf St, Austin, TX 78704",
    phone: "(512) 300-2337",
    city: "Austin",
    zip: "78704"
  },
  {
    name: "Pinthouse Pizza",
    url: "https://pinthouse.com",
    industry: "brewery",
    category: "Brewery & Pizza",
    address: "Multiple Locations, Austin, TX",
    phone: "(512) 436-9605",
    city: "Austin",
    zip: "78757"
  },
  {
    name: "Jester King Brewery",
    url: "https://jesterkingbrewery.com",
    industry: "brewery",
    category: "Brewery",
    address: "13005 Fitzhugh Rd, Austin, TX 78736",
    phone: "(512) 537-5100",
    city: "Austin",
    zip: "78736"
  },
  {
    name: "Oddwood Brewing",
    url: "https://www.oddwoodbrewing.com",
    industry: "brewery",
    category: "Brewery",
    address: "7601 Springdale Rd, Austin, TX 78724",
    phone: "(512) 220-7722",
    city: "Austin",
    zip: "78724"
  },
  {
    name: "Live Oak Brewing Company",
    url: "https://liveoakbrewing.com",
    industry: "brewery",
    category: "Brewery",
    address: "1615 Crozier Ln, Austin, TX 78741",
    phone: "(512) 385-2299",
    city: "Austin",
    zip: "78741"
  },
  {
    name: "Independence Brewing Company",
    url: "https://independencebrewing.com",
    industry: "brewery",
    category: "Brewery",
    address: "3913 Todd Ln #607, Austin, TX 78744",
    phone: "(512) 707-0099",
    city: "Austin",
    zip: "78744"
  },

  // CEDAR PARK BUSINESSES (from your existing file)
  {
    name: "Blue Corn Harvest Bar & Grill",
    url: "https://bluecornharvest.com",
    industry: "restaurant",
    category: "American",
    address: "700 E Whitestone Blvd #204, Cedar Park, TX 78613",
    phone: "(512) 528-0889",
    city: "Cedar Park",
    zip: "78613"
  },
  {
    name: "Red Horn Coffee House",
    url: "https://redhornbrew.com",
    industry: "cafe",
    category: "Coffee Shop",
    address: "600 E Whitestone Blvd, Cedar Park, TX 78613",
    phone: "(512) 259-5005",
    city: "Cedar Park",
    zip: "78613"
  },
  {
    name: "Black Sugar Caffe",
    url: "https://www.blacksugarcaffe.com",
    industry: "cafe",
    category: "Coffee Shop",
    address: "1700 E Whitestone Blvd #170, Cedar Park, TX 78613",
    phone: "(512) 986-4020",
    city: "Cedar Park",
    zip: "78613"
  },
  {
    name: "La Dosis Coffee + Cocktails",
    url: "https://ladosiscoffee.com",
    industry: "cafe",
    category: "Coffee Shop",
    address: "601 E Whitestone Blvd, Cedar Park, TX 78613",
    phone: "(512) 259-3333",
    city: "Cedar Park",
    zip: "78613"
  },
  {
    name: "1431 Cafe",
    url: "https://www.1431cafe.com",
    industry: "cafe",
    category: "Coffee Shop",
    address: "601 E Whitestone Blvd, Suite 300, Cedar Park, TX 78613",
    phone: "(512) 528-0606",
    city: "Cedar Park",
    zip: "78613"
  },
  {
    name: "Cedar Park Barbershop",
    url: "https://www.cedarparkbarbershop.com",
    industry: "salon",
    category: "Barbershop",
    address: "401 Cypress Creek Road, Suite 300, Cedar Park, TX 78613",
    phone: "(512) 260-5599",
    city: "Cedar Park",
    zip: "78613"
  },
  {
    name: "Danny's Barber Shop",
    url: "http://www.dannysbarbershop.us",
    industry: "salon",
    category: "Barbershop",
    address: "2301 S. Lakeline Blvd., Ste. 400, Cedar Park, TX 78613",
    phone: "(512) 331-8404",
    city: "Cedar Park",
    zip: "78613"
  },
  {
    name: "Derrick's Barbershop",
    url: "https://derricksbarbershop.com",
    industry: "salon",
    category: "Barbershop",
    address: "14900 Avery Ranch Blvd, Austin, TX 78717",
    phone: "(512) 331-6000",
    city: "Austin",
    zip: "78717"
  },
  {
    name: "Gambuzza's Barbershop",
    url: "https://www.gambuzzas.com",
    industry: "salon",
    category: "Barbershop",
    address: "1300 Cypress Creek Rd, Cedar Park, TX 78613",
    phone: "(512) 528-3838",
    city: "Cedar Park",
    zip: "78613"
  },
  {
    name: "bex + Co. Salon",
    url: "https://www.bexandcosalon.com",
    industry: "salon",
    category: "Hair Salon",
    address: "1700 E Whitestone Blvd, Cedar Park, TX 78613",
    phone: "(512) 986-4959",
    city: "Cedar Park",
    zip: "78613"
  },
  {
    name: "Bang Salon & Day Spa",
    url: "https://bangdayspa.com",
    industry: "salon",
    category: "Salon & Spa",
    address: "601 East Whitestone Boulevard #214, Cedar Park, TX 78613",
    phone: "(512) 528-9600",
    city: "Cedar Park",
    zip: "78613"
  },

  // ROUND ROCK BUSINESSES
  {
    name: "Round Rock Donuts",
    url: "https://roundrockdonuts.com",
    industry: "restaurant",
    category: "Bakery",
    address: "106 E Main St, Round Rock, TX 78664",
    phone: "(512) 255-3629",
    city: "Round Rock",
    zip: "78664"
  },
  {
    name: "Kerbey Lane Cafe Round Rock",
    url: "https://kerbeylanecafe.com",
    industry: "restaurant",
    category: "American Diner",
    address: "200 University Blvd, Round Rock, TX 78665",
    phone: "(512) 244-3789",
    city: "Round Rock",
    zip: "78665"
  },
  {
    name: "Clay Pit Contemporary Indian Cuisine - Round Rock",
    url: "https://claypit.com",
    industry: "restaurant",
    category: "Indian Food",
    address: "1701 E Palm Valley Blvd, Round Rock, TX 78664",
    phone: "(512) 828-0011",
    city: "Round Rock",
    zip: "78664"
  },

  // GEORGETOWN BUSINESSES
  {
    name: "Monument Cafe",
    url: "https://themonumentcafe.com",
    industry: "restaurant",
    category: "American Diner",
    address: "1953 S Austin Ave, Georgetown, TX 78626",
    phone: "(512) 930-9586",
    city: "Georgetown",
    zip: "78626"
  },
  {
    name: "600 Degrees Pizzeria & Drafthouse",
    url: "https://600degreespizza.com",
    industry: "restaurant",
    category: "Pizza",
    address: "100 E 8th St, Georgetown, TX 78626",
    phone: "(512) 819-3663",
    city: "Georgetown",
    zip: "78626"
  },
  {
    name: "Dos Salsas",
    url: "https://dossalsas.com",
    industry: "restaurant",
    category: "Mexican Food",
    address: "1104 S Main St, Georgetown, TX 78626",
    phone: "(512) 863-8686",
    city: "Georgetown",
    zip: "78626"
  },

  // PFLUGERVILLE BUSINESSES
  {
    name: "Stiles Switch BBQ & Brew",
    url: "https://stilesswitchbbq.com",
    industry: "restaurant",
    category: "BBQ",
    address: "6610 N Interstate 35 Frontage Rd, Austin, TX 78752",
    phone: "(512) 382-7470",
    city: "Austin",
    zip: "78752"
  },

  // LEANDER BUSINESSES
  {
    name: "Mouton's Southern Bistro",
    url: "https://moutonsbistro.com",
    industry: "restaurant",
    category: "Cajun/Southern",
    address: "305 S US Highway 183, Leander, TX 78641",
    phone: "(512) 259-2618",
    city: "Leander",
    zip: "78641"
  },

  // SERVICE BUSINESSES - DENTISTS
  {
    name: "Aspire Dental",
    url: "https://aspiredentalaustin.com",
    industry: "healthcare",
    category: "Dentist",
    address: "Multiple Locations, Austin, TX",
    phone: "(512) 469-6594",
    city: "Austin",
    zip: "78701"
  },
  {
    name: "Great Hills Family Dentistry",
    url: "https://greathillsdental.com",
    industry: "healthcare",
    category: "Dentist",
    address: "9503 Stonelake Blvd #100, Austin, TX 78759",
    phone: "(512) 272-3139",
    city: "Austin",
    zip: "78759"
  },
  {
    name: "Four Points Dental Studio",
    url: "https://fourpointsdentalstudio.com",
    industry: "healthcare",
    category: "Dentist",
    address: "7300 Ranch Rd 620 N #110, Austin, TX 78726",
    phone: "(512) 795-7300",
    city: "Austin",
    zip: "78726"
  },

  // SERVICE BUSINESSES - HOME SERVICES
  {
    name: "ABC Home & Commercial Services",
    url: "https://abchomeandcommercial.com",
    industry: "services",
    category: "Pest Control & HVAC",
    address: "9475 E Highway 290, Austin, TX 78724",
    phone: "(512) 837-9500",
    city: "Austin",
    zip: "78724"
  },
  {
    name: "Stan's Heating Air Plumbing & Electrical",
    url: "https://callstans.com",
    industry: "services",
    category: "HVAC & Plumbing",
    address: "Multiple Locations, Austin, TX",
    phone: "(512) 533-8149",
    city: "Austin",
    zip: "78728"
  },
  {
    name: "Radiant Plumbing and Air Conditioning",
    url: "https://radiantplumbing.com",
    industry: "services",
    category: "Plumbing & HVAC",
    address: "Multiple Locations, Austin, TX",
    phone: "(512) 772-3581",
    city: "Austin",
    zip: "78744"
  },
  {
    name: "Precision Air & Heating",
    url: "https://precisionac.com",
    industry: "services",
    category: "HVAC",
    address: "3071 County Road 100, Hutto, TX 78634",
    phone: "(512) 379-4800",
    city: "Hutto",
    zip: "78634"
  },
  {
    name: "Goettl Air Conditioning & Plumbing",
    url: "https://goettl.com",
    industry: "services",
    category: "HVAC & Plumbing",
    address: "13785 Research Blvd, Austin, TX 78750",
    phone: "(512) 832-5222",
    city: "Austin",
    zip: "78750"
  },

  // SERVICE BUSINESSES - AUTO REPAIR
  {
    name: "Yost Automotive",
    url: "https://yostautoaustin.com",
    industry: "automotive",
    category: "Auto Repair",
    address: "9101 S 1st St #180, Austin, TX 78748",
    phone: "(512) 351-3141",
    city: "Austin",
    zip: "78748"
  },
  {
    name: "Christian Brothers Automotive",
    url: "https://cbac.com",
    industry: "automotive",
    category: "Auto Repair",
    address: "Multiple Locations, Austin, TX",
    phone: "(512) 730-2100",
    city: "Austin",
    zip: "78759"
  },
  {
    name: "European Specialists",
    url: "https://europeanspecialistsaustin.com",
    industry: "automotive",
    category: "European Auto Repair",
    address: "906 W Howard Ln, Austin, TX 78753",
    phone: "(512) 835-5566",
    city: "Austin",
    zip: "78753"
  },

  // PROFESSIONAL SERVICES - REAL ESTATE
  {
    name: "Realty Austin",
    url: "https://realtyaustin.com",
    industry: "real_estate",
    category: "Real Estate",
    address: "1209 W 5th St, Austin, TX 78703",
    phone: "(512) 241-1300",
    city: "Austin",
    zip: "78703"
  },
  {
    name: "Moreland Properties",
    url: "https://morelandproperties.com",
    industry: "real_estate",
    category: "Real Estate",
    address: "1601 Rio Grande St, Austin, TX 78701",
    phone: "(512) 480-0848",
    city: "Austin",
    zip: "78701"
  },

  // PROFESSIONAL SERVICES - LEGAL
  {
    name: "Minton Law Firm",
    url: "https://mintonlawfirm.com",
    industry: "legal",
    category: "Law Firm",
    address: "100 Congress Ave Suite 2000, Austin, TX 78701",
    phone: "(512) 474-3633",
    city: "Austin",
    zip: "78701"
  },

  // PROFESSIONAL SERVICES - ACCOUNTING
  {
    name: "Padgett Business Services",
    url: "https://www.padgettbusinessservices.com",
    industry: "accounting",
    category: "Accounting & Tax",
    address: "Multiple Locations, Austin, TX",
    phone: "(512) 291-7500",
    city: "Austin",
    zip: "78748"
  },

  // RETAIL - UNIQUE AUSTIN SHOPS
  {
    name: "Waterloo Records",
    url: "https://waterloorecords.com",
    industry: "retail",
    category: "Music Store",
    address: "600A N Lamar Blvd, Austin, TX 78703",
    phone: "(512) 474-2500",
    city: "Austin",
    zip: "78703"
  },
  {
    name: "BookPeople",
    url: "https://bookpeople.com",
    industry: "retail",
    category: "Bookstore",
    address: "603 N Lamar Blvd, Austin, TX 78703",
    phone: "(512) 472-5050",
    city: "Austin",
    zip: "78703"
  },
  {
    name: "Toy Joy",
    url: "https://toyjoy.com",
    industry: "retail",
    category: "Toy Store",
    address: "403 W 2nd St, Austin, TX 78701",
    phone: "(512) 320-0090",
    city: "Austin",
    zip: "78701"
  },
  {
    name: "Allen's Boots",
    url: "https://allensboots.com",
    industry: "retail",
    category: "Western Wear",
    address: "1522 S Lamar Blvd, Austin, TX 78704",
    phone: "(512) 447-1413",
    city: "Austin",
    zip: "78704"
  },

  // FITNESS & WELLNESS
  {
    name: "Castle Hill Fitness",
    url: "https://castlehillfitness.com",
    industry: "fitness",
    category: "Gym",
    address: "2201 Lake Austin Blvd, Austin, TX 78703",
    phone: "(512) 476-5200",
    city: "Austin",
    zip: "78703"
  },
  {
    name: "Lifetime Athletic",
    url: "https://www.lifetime.life",
    industry: "fitness",
    category: "Athletic Club",
    address: "Multiple Locations, Austin, TX",
    phone: "(512) 617-5100",
    city: "Austin",
    zip: "78759"
  },

  // Add more businesses to reach target...
];

export default austinBusinessDatabase;

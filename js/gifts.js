/**
 * Random gift generator
 * Vintage Charm - Perfect Gift Finder with Category-Specific Recommendations
 */

class GiftRecommender {
  constructor() {
    // Category-Specific Gift Database
    this.giftDatabase = {
      // 🏃 Sporty / Fit Category Gifts
      "Sporty / Fit": [
        {
          name: "Premium Yoga Mat",
          description:
            "Eco-friendly non-slip yoga mat with carrying strap. Perfect for daily practice and meditation sessions.",
          image:
            "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=400&h=300&fit=crop",
          tags: ["Sporty / Fit"],
          ages: ["25-30", "31-35", "36-40", "41-45"],
          genders: ["Male", "Female", "Either"],
        },
        {
          name: "Smart Fitness Watch",
          description:
            "Advanced fitness tracker with heart rate monitor, GPS, sleep tracking, and workout guidance.",
          image:
            "https://images.unsplash.com/photo-1767903622384-cfd81e2be7ba?q=80&w=1088&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          tags: ["Sporty / Fit"],
          ages: ["25-30", "31-35", "36-40", "41-45", "46-50"],
          genders: ["Male", "Female", "Either"],
        },
        {
          name: "Active Sport Wear Set",
          description:
            "Premium breathable moisture-wicking athletic wear set including shirt, shorts, and leggings for maximum comfort during workouts.",
          image:
            "https://images.unsplash.com/photo-1647389978214-7a296a9d73bf?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          tags: ["Sporty / Fit"],
          ages: ["25-30", "31-35", "36-40"],
          genders: ["Male", "Female", "Either"],
        },
        {
          name: "Calorie & Nutrition Guide Book",
          description:
            "Comprehensive nutrition guide with meal plans, calorie tracking tips, and healthy recipes for fitness enthusiasts.",
          image:
            "https://images.unsplash.com/photo-1609066217484-45a8f1da5d3a?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          tags: ["Sporty / Fit"],
          ages: ["31-35", "36-40", "41-45", "46-50"],
          genders: ["Male", "Female", "Either"],
        },
        {
          name: "Professional Running Shoes",
          description:
            "High-performance running shoes with advanced cushioning and support technology for optimal performance.",
          image:
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop",
          tags: ["Sporty / Fit"],
          ages: ["25-30", "31-35", "36-40"],
          genders: ["Male", "Female", "Either"],
        },
        {
          name: "Fitness Subscription Box",
          description:
            "Subscription box with premium workout gear, protein samples, supplements, and fitness accessories.",
          image:
            "https://plus.unsplash.com/premium_photo-1726676073297-0ebb7cc86682?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          tags: ["Sporty / Fit"],
          ages: ["25-30", "31-35", "36-40"],
          genders: ["Male", "Female", "Either"],
        },
        {
          name: "Protein Snacks Variety Pack",
          description:
            "Assorted high-protein snacks including bars, shakes, and bites. Perfect for post-workout recovery and on-the-go nutrition.",
          image:
            "https://images.unsplash.com/photo-1580314552228-5a7ce023fc9e?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          tags: ["Sporty / Fit"],
          ages: ["25-30", "31-35", "36-40", "41-45", "46-50"],
          genders: ["Male", "Female", "Either"],
        },
        {
          name: "Premium Gym Bag",
          description:
            "Spacious, durable gym bag with separate shoe compartment, wet pocket, and multiple zippered sections for organization.",
          image:
            "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
          tags: ["Sporty / Fit"],
          ages: ["25-30", "31-35", "36-40", "41-45"],
          genders: ["Male", "Female", "Either"],
        },

        {
          name: "Sports Sunglasses",
          description:
            "Polarized sports sunglasses with UV protection, shatterproof lenses, and anti-slip grip for outdoor activities.",
          image:
            "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          tags: ["Sporty / Fit"],
          ages: ["25-30", "31-35", "36-40", "41-45"],
          genders: ["Male", "Female", "Either"],
        },
        {
          name: "Sports Cap",
          description:
            "Breathable moisture-wicking baseball cap with UV protection, perfect for running, hiking, and outdoor sports.",
          image:
            "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=300&fit=crop",
          tags: ["Sporty / Fit"],
          ages: ["25-30", "31-35", "36-40", "41-45"],
          genders: ["Male", "Female", "Either"],
        },
      ],

      // 🌿 Nature Lover Category Gifts
      "Nature Lover": [
        {
          name: "Indoor Plant Collection",
          description:
            "Set of 5 beautiful low-maintenance indoor plants with decorative ceramic pots and care guide.",
          image:
            "https://images.unsplash.com/photo-1459156212016-c812468e2115?w=400&h=300&fit=crop",
          tags: ["Nature Lover"],
          ages: ["25-30", "31-35", "36-40", "41-45", "46-50", "51-55", "56-60"],
          genders: ["Male", "Female", "Either"],
        },
        {
          name: "Professional Gardening Set",
          description:
            "Premium garden tools for all gardening needs.",
          image:
            "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop",
          tags: ["Nature Lover"],
          ages: ["36-40", "41-45", "46-50", "51-55", "56-60"],
          genders: ["Male", "Female", "Either"],
        },
        {
          name: "Smart Bird Feeder Camera",
          description:
            "HD camera bird feeder that identifies species and sends notifications to your phone.",
          image:
            "https://images.unsplash.com/photo-1663011520498-cd8593b3f520?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          tags: ["Nature Lover"],
          ages: ["46-50", "51-55", "56-60"],
          genders: ["Male", "Female", "Either"],
        },
        {
          name: "Terrarium Building Kit",
          description:
            "Complete glass terrarium kit with preserved moss, air plants, and decorative stones.",
          image:
            "https://images.unsplash.com/photo-1487700160041-babef9c3cb55?w=400&h=300&fit=crop",
          tags: ["Nature Lover"],
          ages: ["25-30", "31-35", "36-40", "41-45"],
          genders: ["Male", "Female", "Either"],
        },
        {
          name: "Butterfly Garden Kit",
          description:
            "Grow your own butterfly garden with seeds, habitat net, and educational guide book.",
          image:
            "https://images.unsplash.com/photo-1632411840070-eaa47e9f1791?q=80&w=911&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          tags: ["Nature Lover"],
          ages: ["25-30", "31-35", "36-40"],
          genders: ["Male", "Female", "Either"],
        },
        {
          name: "Nature Photography Workshop",
          description:
            "Weekend workshop with professional nature photographer, includes guided outdoor sessions.",
          image:
            "https://images.unsplash.com/photo-1486916856992-e4db22c8df33?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          tags: ["Nature Lover"],
          ages: ["31-35", "36-40", "41-45", "46-50"],
          genders: ["Male", "Female", "Either"],
        },
        {
          name: "Mini Plant Terrarium",
          description:
            "Beautiful hand-blown glass mini terrarium with live succulent plants, moss, and decorative pebbles. Perfect for desk or shelf decoration.",
          image:
            "https://images.unsplash.com/photo-1762180581579-2f63d3d06a0d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8TWluaSUyMFBsYW50JTIwVGVycmFyaXVtfGVufDB8fDB8fHww",
          tags: ["Nature Lover"],
          ages: ["25-30", "31-35", "36-40", "41-45", "46-50"],
          genders: ["Male", "Female", "Either"],
        },
        {
          name: "Canvas Tote Bag",
          description:
            "Eco-friendly organic cotton canvas tote bag with nature-inspired artwork. Reusable, durable, and perfect for farmers market or grocery shopping.",
          image:
            "https://plus.unsplash.com/premium_photo-1726837248441-6162192d602d?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          tags: ["Nature Lover"],
          ages: ["25-30", "31-35", "36-40", "41-45", "46-50", "51-55", "56-60"],
          genders: ["Male", "Female", "Either"],
        },
        {
          name: "Plant Care Kit",
          description:
            "Complete plant care set including pruning shears, mister bottle, moisture meter, and organic fertilizer for healthy plant growth.",
          image:
            "https://images.unsplash.com/photo-1730902250461-3324a484e031?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          tags: ["Nature Lover"],
          ages: ["31-35", "36-40", "41-45", "46-50", "51-55", "56-60"],
          genders: ["Male", "Female", "Either"],
        },
        {
          name: "Organic Tea Set",
          description:
            "Luxury organic tea collection featuring 6 premium herbal blends including chamomile, mint, and lavender. Packaged in eco-friendly tin.",
          image:
            "https://images.unsplash.com/photo-1755685068178-4b57210ddcd4?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          tags: ["Nature Lover"],
          ages: ["31-35", "36-40", "41-45", "46-50", "51-55", "56-60"],
          genders: ["Male", "Female", "Either"],
        },
      ],

      // 👗 Fashionable Category Gifts
      Fashionable: [
        {
          name: "Designer Silk Scarf",
          description:
            "Luxury 100% silk scarf with elegant floral pattern, hand-rolled edges, comes in gift box.",
          image:
            "https://images.unsplash.com/photo-1573231971438-ed0790ba3cbb?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          tags: ["Fashionable"],
          ages: ["31-35", "36-40", "41-45", "46-50", "51-55"],
          genders: ["Female", "Either"],
        },
        {
          name: "Premium Leather Wallet",
          description:
            "Handcrafted genuine Italian leather wallet with RFID protection and multiple card slots.",
          image:
            "https://images.unsplash.com/photo-1624538000860-24716b9050f2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          tags: ["Fashionable"],
          ages: ["25-30", "31-35", "36-40", "41-45", "46-50", "51-55", "56-60"],
          genders: ["Male", "Either"],
        },
        {
          name: "Classic Wrist Watch",
          description:
            "Elegant analog watch with genuine leather strap, minimalist design, and sapphire crystal glass.",
          image:
            "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=400&h=300&fit=crop",
          tags: ["Fashionable"],
          ages: ["25-30", "31-35", "36-40", "41-45", "46-50"],
          genders: ["Male", "Female", "Either"],
        },
        {
          name: "Pearl Jewelry Set",
          description:
            "Elegant freshwater pearl necklace and matching earring set.",
          image:
            "https://plus.unsplash.com/premium_photo-1674986174314-c30a91ef8a13?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          tags: ["Fashionable"],
          ages: ["36-40", "41-45", "46-50", "51-55", "56-60"],
          genders: ["Female", "Either"],
        },
        {
          name: "Sunglasses Collection",
          description:
            "Premium sunglasses with UV protection and stylish cases.",
          image:
            "https://images.unsplash.com/photo-1765951440922-3dccdff22445?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          tags: ["Fashionable"],
          ages: ["25-30", "31-35", "36-40", "41-45"],
          genders: ["Male", "Female", "Either"],
        },
        {
          name: "Cashmere Scarf Set",
          description:
            "Luxurious pure cashmere scarf set in elegant gift packaging.",
          image:
            "https://plus.unsplash.com/premium_photo-1665408932908-dcedc5ed0f8c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          tags: ["Fashionable"],
          ages: ["41-45", "46-50", "51-55", "56-60"],
          genders: ["Female", "Either"],
        },
        {
          name: "Designer Perfume",
          description:
            "Luxury designer fragrance with long-lasting scent notes.",
          image:
            "https://images.unsplash.com/photo-1572533177115-5bea803c0f49?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          tags: ["Fashionable"],
          ages: ["25-30", "31-35", "36-40", "41-45", "46-50"],
          genders: ["Male", "Female", "Either"],
        },
        {
          name: "Classic Sneakers",
          description:
            "Vintage-style classic leather sneakers with cushioned sole, breathable lining, and timeless design.",
          image:
            "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop",
          tags: ["Fashionable"],
          ages: ["25-30", "31-35", "36-40", "41-45", "46-50"],
          genders: ["Female", "Male", "Either"],
        },
        {
          name: "Statement Earrings",
          description:
            "Handcrafted bold statement earrings with cubic zirconia stones, perfect for special occasions and parties. Lightweight and comfortable.",
          image:
            "https://plus.unsplash.com/premium_photo-1680181724947-75f0956f1469?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          tags: ["Fashionable"],
          ages: ["25-30", "31-35", "36-40", "41-45", "46-50"],
          genders: ["Female", "Either"],
        },
        {
          name: "Personalized Name Jewelry",
          description:
            "Custom engraved name necklace in sterling silver. Personalize with any name or word. Comes in elegant gift box with polishing cloth.",
          image:
            "https://images.unsplash.com/photo-1628128344224-80d13a8ac37e?q=80&w=1162&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          tags: ["Fashionable"],
          ages: ["25-30", "31-35", "36-40", "41-45", "46-50", "51-55"],
          genders: ["Female", "Either"],
        },
      ],

      // 🏠 Indoor Type Category Gifts
      "Indoor Type": [
        {
          name: "Cozy Weighted Blanket",
          description:
            "Premium weighted blanket with removable cover, promotes deep sleep and relaxation.",
          image:
            "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=300&fit=crop",
          tags: ["Indoor Type"],
          ages: ["31-35", "36-40", "41-45", "46-50", "51-55", "56-60"],
          genders: ["Male", "Female", "Either"],
        },
        {
          name: "Aromatherapy Diffuser Set",
          description:
            "Ultrasonic essential oil diffuser with 6 premium therapeutic oils and ambient lighting.",
          image:
            "https://images.unsplash.com/photo-1636403163922-d5476806c1d7?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          tags: ["Indoor Type"],
          ages: ["25-30", "31-35", "36-40", "41-45", "46-50", "51-55", "56-60"],
          genders: ["Male", "Female", "Either"],
        },
        {
          name: "Kindle Paperwhite",
          description:
            "Waterproof e-reader with adjustable warm light, weeks of battery life, perfect for book lovers.",
          image:
            "https://images.unsplash.com/photo-1577344224573-f9280c105a85?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          tags: ["Indoor Type"],
          ages: ["25-30", "31-35", "36-40", "41-45", "46-50", "51-55", "56-60"],
          genders: ["Male", "Female", "Either"],
        },
        {
          name: "Premium Coffee Maker",
          description:
            "Automatic espresso machine with built-in grinder, milk frother, and customizable settings.",
          image:
            "https://images.unsplash.com/photo-1583239864798-59b2ab133693?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8UHJlbWl1bSUyMENvZmZlZSUyME1ha2VyfGVufDB8fDB8fHww",
          tags: ["Indoor Type"],
          ages: ["31-35", "36-40", "41-45", "46-50"],
          genders: ["Male", "Female", "Either"],
        },
        {
          name: "Board Game Collection",
          description:
            "Premium set of classic board games perfect for game nights and family gatherings.",
          image:
            "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=400&h=300&fit=crop",
          tags: ["Indoor Type"],
          ages: ["25-30", "31-35", "36-40", "41-45"],
          genders: ["Male", "Female", "Either"],
        },
        {
          name: "Scented Candles Set",
          description:
            "Luxury aromatherapy candle set with 6 natural soy wax scents including lavender, vanilla, and sandalwood. Creates perfect relaxation ambiance.",
          image:
            "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=400&h=300&fit=crop",
          tags: ["Indoor Type"],
          ages: ["25-30", "31-35", "36-40", "41-45", "46-50", "51-55", "56-60"],
          genders: ["Male", "Female", "Either"],
        },
        {
          name: "Mini Table Lamp",
          description:
            "Modern minimalist LED table lamp with touch control, adjustable brightness, and warm light for cozy evenings.",
          image:
            "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=300&fit=crop",
          tags: ["Indoor Type"],
          ages: ["25-30", "31-35", "36-40", "41-45", "46-50", "51-55", "56-60"],
          genders: ["Male", "Female", "Either"],
        },
        {
          name: "Wall Art Canvas",
          description:
            "Beautiful hand-painted canvas wall art with abstract design. Perfect for living room or bedroom decoration.",
          image:
            "https://images.unsplash.com/photo-1515405295579-ba7b45403062?w=400&h=300&fit=crop",
          tags: ["Indoor Type"],
          ages: ["25-30", "31-35", "36-40", "41-45", "46-50", "51-55", "56-60"],
          genders: ["Male", "Female", "Either"],
        },
        {
          name: "Decorative Cushion Set",
          description:
            "Premium velvet decorative cushions with elegant designs. Adds comfort and style to any sofa or bed.",
          image:
            "https://images.unsplash.com/photo-1643755524969-3c350ebbd6be?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          tags: ["Indoor Type"],
          ages: ["25-30", "31-35", "36-40", "41-45", "46-50", "51-55", "56-60"],
          genders: ["Male", "Female", "Either"],
        },
        {
          name: "Home Theater System",
          description:
            "Premium soundbar with wireless subwoofer for immersive movie experience at home.",
          image:
            "https://images.unsplash.com/photo-1767808481476-7d6efca61638?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          tags: ["Indoor Type"],
          ages: ["31-35", "36-40", "41-45", "46-50"],
          genders: ["Male", "Female", "Either"],
        },
      ],

      // ⛰️ Outdoor Type Category Gifts
      "Outdoor Type": [
        {
          name: "Adventure Backpack",
          description:
            "Durable 50L hiking backpack with multiple compartments, hydration system, and rain cover.",
          image:
            "https://images.unsplash.com/photo-1617818748592-2610ed08c946?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fEFkdmVudHVyZSUyMEJhY2twYWNrfGVufDB8fDB8fHww",
          tags: ["Outdoor Type"],
          ages: ["25-30", "31-35", "36-40", "41-45"],
          genders: ["Male", "Female", "Either"],
        },
        {
          name: "Camping Hammock",
          description:
            "Portable camping hammock with mosquito net, tree straps, and stuff sack included.",
          image:
            "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400&h=300&fit=crop",
          tags: ["Outdoor Type"],
          ages: ["25-30", "31-35", "36-40"],
          genders: ["Male", "Female", "Either"],
        },
        {
          name: "Portable Grill",
          description:
            "Compact portable charcoal grill with carrying case, perfect for camping and picnics.",
          image:
            "https://images.unsplash.com/photo-1578387573983-20f34bc0983b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          tags: ["Outdoor Type"],
          ages: ["31-35", "36-40", "41-45", "46-50"],
          genders: ["Male", "Female", "Either"],
        },
        {
          name: "Hiking Boots",
          description:
            "Premium waterproof hiking boots with excellent ankle support and Vibram sole.",
          image:
            "https://images.unsplash.com/photo-1631287381310-925554130169?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          tags: ["Outdoor Type"],
          ages: ["25-30", "31-35", "36-40", "41-45"],
          genders: ["Male", "Female", "Either"],
        },
        {
          name: "Camping Tent",
          description:
            "4-season lightweight tent, easy setup, perfect for camping adventures.",
          image:
            "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400&h=300&fit=crop",
          tags: ["Outdoor Type"],
          ages: ["31-35", "36-40", "41-45"],
          genders: ["Male", "Female", "Either"],
        },
        {
          name: "Outdoor Survival Kit",
          description:
            "Complete survival kit with multi-tool, fire starter, first aid, and emergency supplies.",
          image:
            "https://images.unsplash.com/photo-1596055747042-731a269d208f?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          tags: ["Outdoor Type"],
          ages: ["25-30", "31-35", "36-40", "41-45"],
          genders: ["Male", "Female", "Either"],
        },
      ],
    };

    // Game state
    this.playerName = "";
    this.giftsFound = 0;
    this.searchesCount = 0;
    this.soundEnabled = true;
    this.audioContext = null;

    // DOM Elements
    this.playerModal = document.getElementById("playerModal");
    this.gameInterface = document.getElementById("gameInterface");
    this.playerNameInput = document.getElementById("playerNameInput");
    this.startGameBtn = document.getElementById("startGameBtn");
    this.displayPlayerName = document.getElementById("displayPlayerName");
    this.giftsFoundDisplay = document.getElementById("giftsFound");
    this.searchesCountDisplay = document.getElementById("searchesCount");
    this.searchBtn = document.getElementById("searchBtn");
    this.ageSelect = document.getElementById("ageSelect");
    this.personalitySelect = document.getElementById("personalitySelect");
    this.genderSelect = document.getElementById("genderSelect");
    this.recommendationsSection = document.getElementById(
      "recommendationsSection",
    );
    this.recommendationsGrid = document.getElementById("recommendationsGrid");
    this.loadingAnimation = document.getElementById("loadingAnimation");
    this.changePlayerBtn = document.getElementById("changePlayerBtn");
    this.soundToggle = document.getElementById("soundToggle");
    this.savedPlayersDiv = document.getElementById("savedPlayers");
    this.savedList = document.getElementById("savedList");

    this.init();
  }

  /**
   * Initialize the recommender
   */
  init() {
    this.setupEventListeners();
    this.loadSavedPlayers();
    this.initAudio();

    // ALWAYS show the modal first - no auto-login
    this.showModal();

    // Clear any saved auto-login flag
    localStorage.removeItem("giftRecommender_autoLogin");
  }

  /**
   * Initialize audio for sound effects
   */
  initAudio() {
    try {
      this.audioContext = new (
        window.AudioContext || window.webkitAudioContext
      )();
    } catch (e) {
      console.log("Web Audio API not supported");
      this.soundEnabled = false;
    }
  }

  /**
   * Play sweet sound effect
   */
  playSweetSound() {
    if (!this.soundEnabled || !this.audioContext) return;

    try {
      const now = this.audioContext.currentTime;
      const gainNode = this.audioContext.createGain();
      gainNode.connect(this.audioContext.destination);
      gainNode.gain.value = 0.3;

      const frequencies = [523.25, 659.25, 783.99];
      frequencies.forEach((freq, index) => {
        const oscillator = this.audioContext.createOscillator();
        oscillator.type = "sine";
        oscillator.frequency.value = freq;
        oscillator.connect(gainNode);
        oscillator.start(now + index * 0.1);
        oscillator.stop(now + index * 0.1 + 0.5);
      });
    } catch (e) {
      console.log("Error playing sound:", e);
    }
  }

  /**
   * Load saved players from localStorage for display only
   */
  loadSavedPlayers() {
    const allSaves = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith("giftRecommender_")) {
        try {
          const data = JSON.parse(localStorage.getItem(key));
          if (data && data.playerName) {
            allSaves[data.playerName] = data;
          }
        } catch (e) {}
      }
    }

    const players = Object.keys(allSaves)
      .sort((a, b) => {
        return (
          new Date(allSaves[b].lastPlayed) - new Date(allSaves[a].lastPlayed)
        );
      })
      .slice(0, 5);

    if (players.length > 0) {
      this.savedPlayersDiv.style.display = "block";
      this.savedList.innerHTML = "";

      players.forEach((player) => {
        const playerEl = document.createElement("div");
        playerEl.className = "saved-player";
        playerEl.textContent = player;
        playerEl.onclick = () => {
          this.playerNameInput.value = player;
          // Don't auto-start, just fill the input
          this.playerNameInput.focus();
        };
        this.savedList.appendChild(playerEl);
      });
    }
  }

  /**
   * Load game data
   */
  loadGameData(playerName) {
    const key = `giftRecommender_${playerName}`;
    const data = localStorage.getItem(key);
    if (data) {
      return JSON.parse(data);
    }
    return null;
  }

  /**
   * Start game with player - called ONLY when user clicks Start Journey
   */
  startGameWithPlayer(playerName) {
    this.playerName = playerName;
    const savedData = this.loadGameData(playerName);

    if (savedData) {
      this.giftsFound = savedData.giftsFound || 0;
      this.searchesCount = savedData.searchesCount || 0;
      this.showToast(`Welcome back, ${this.playerName}!`, "success");
    } else {
      this.giftsFound = 0;
      this.searchesCount = 0;
      this.showToast(
        `Welcome, ${this.playerName}! Let's find some gifts!`,
        "success",
      );
    }

    this.updateUI();
    this.hideModal();
    this.gameInterface.style.display = "block";
    this.displayPlayerName.textContent = this.playerName;

    this.playSweetSound();

    // Clear input field for next time
    this.playerNameInput.value = "";
  }

  /**
   * Save game data
   */
  saveGame() {
    if (!this.playerName) return;

    const gameData = {
      playerName: this.playerName,
      giftsFound: this.giftsFound,
      searchesCount: this.searchesCount,
      lastPlayed: new Date().toISOString(),
    };

    const key = `giftRecommender_${this.playerName}`;
    localStorage.setItem(key, JSON.stringify(gameData));

    console.log("💾 Game saved for", this.playerName);
  }

  /**
   * Get 3 random gift recommendations based on selected category
   */
  getRecommendations() {
    const age = this.ageSelect.value;
    const personality = this.personalitySelect.value;
    const gender = this.genderSelect.value;

    // Get gifts from the selected personality category ONLY
    let categoryGifts = this.giftDatabase[personality] || [];

    if (categoryGifts.length === 0) {
      return [];
    }

    // Filter by age and gender
    const filteredGifts = categoryGifts.filter((gift) => {
      const ageMatch = gift.ages.includes(age);
      const genderMatch =
        gift.genders.includes(gender) || gift.genders.includes("Either");
      return ageMatch && genderMatch;
    });

    // If not enough gifts after filtering, get from all category gifts
    let availableGifts = filteredGifts;
    if (availableGifts.length < 3) {
      availableGifts = categoryGifts.filter((gift) => {
        return gift.genders.includes(gender) || gift.genders.includes("Either");
      });
    }

    if (availableGifts.length < 3) {
      availableGifts = categoryGifts;
    }

    // Return 3 random gifts from available gifts
    const shuffled = [...availableGifts].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  }

  /**
   * Search for recommendations
   */
  async searchRecommendations() {
    if (!this.playerName) {
      this.showModal();
      this.showToast("Please enter your name first!", "warning");
      return;
    }

    // Show loading
    this.loadingAnimation.style.display = "block";
    this.recommendationsSection.style.display = "none";

    // Play sound
    this.playSweetSound();

    // Simulate loading
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Get recommendations
    const recommendations = this.getRecommendations();

    // Update stats
    this.searchesCount++;
    this.giftsFound += recommendations.length;

    // Hide loading
    this.loadingAnimation.style.display = "none";

    // Display recommendations
    this.displayRecommendations(recommendations);
    this.recommendationsSection.style.display = "block";
    this.updateUI();
    this.saveGame();

    // Play success sound
    this.playSweetSound();

    if (recommendations.length > 0) {
      this.showToast(
        `Found ${recommendations.length} perfect ${this.personalitySelect.options[this.personalitySelect.selectedIndex].text.trim()} gifts!`,
        "success",
      );
    } else {
      this.showToast(
        `No gifts found for this combination. Try different criteria!`,
        "warning",
      );
    }
  }

  /**
   * Display recommendations with beautiful images
   */
  displayRecommendations(recommendations) {
    if (recommendations.length === 0) {
      this.recommendationsGrid.innerHTML = `
                <div class="no-results" style="grid-column: 1/-1; text-align: center; padding: 60px;">
                    <i class="fas fa-sad-tear" style="font-size: 4rem; color: #b76e57; margin-bottom: 20px;"></i>
                    <h3 style="color: #5a4e3e;">No Gifts Found</h3>
                    <p style="color: #6b5f4f;">Try changing your age or gender preferences to find perfect gifts!</p>
                </div>
            `;
      return;
    }

    const ratings = ["❤️❤️❤️", "❤️❤️❤️❤️", "❤️❤️❤️❤️❤️"];
    const selectedPersonality =
      this.personalitySelect.options[
        this.personalitySelect.selectedIndex
      ].text.trim();

    this.recommendationsGrid.innerHTML = recommendations
      .map((gift, index) => {
        const rating = ratings[Math.floor(Math.random() * ratings.length)];

        return `
                <div class="gift-card" data-gift="${gift.name}" style="animation-delay: ${index * 0.1}s">
                    <div class="gift-image" style="background-image: url('${gift.image}')">
                        <div class="gift-overlay"></div>
                        <div class="gift-badge">${selectedPersonality}</div>
                    </div>
                    <div class="gift-card-header">
                        <h3>${gift.name}</h3>
                    </div>
                    <div class="gift-card-body">
                        <p class="gift-description">${gift.description}</p>
                        <div class="gift-details">
                            <span class="gift-tag">
                                <i class="fas fa-tag"></i> ${gift.tags[0]}
                            </span>
                            <span class="gift-rating">${rating}</span>
                        </div>
                    </div>
                </div>
            `;
      })
      .join("");

    // Add click animation
    document.querySelectorAll(".gift-card").forEach((card) => {
      card.addEventListener("click", () => {
        this.playSweetSound();
        card.style.transform = "scale(1.02)";
        setTimeout(() => {
          card.style.transform = "";
        }, 300);
      });
    });
  }

  /**
   * Update UI displays
   */
  updateUI() {
    if (this.giftsFoundDisplay) {
      this.giftsFoundDisplay.textContent = this.giftsFound;
    }
    if (this.searchesCountDisplay) {
      this.searchesCountDisplay.textContent = this.searchesCount;
    }
  }

  /**
   * Show modal
   */
  showModal() {
    if (this.playerModal) {
      this.playerModal.style.display = "flex";
      // Clear the input field
      if (this.playerNameInput) {
        this.playerNameInput.value = "";
        setTimeout(() => this.playerNameInput.focus(), 100);
      }
    }
  }

  /**
   * Hide modal
   */
  hideModal() {
    if (this.playerModal) {
      this.playerModal.style.display = "none";
    }
  }

  /**
   * Toggle sound
   */
  toggleSound() {
    this.soundEnabled = !this.soundEnabled;
    const icon = this.soundToggle.querySelector("i");
    icon.className = this.soundEnabled
      ? "fas fa-volume-up"
      : "fas fa-volume-mute";
    this.showToast(`Sound ${this.soundEnabled ? "on" : "off"}`, "info");
  }

  /**
   * Show toast message
   */
  showToast(message, type = "info") {
    const toast = document.createElement("div");
    toast.className = "game-toast";
    toast.textContent = message;
    toast.style.cssText = `
            position: fixed;
            bottom: 100px;
            left: 50%;
            transform: translateX(-50%);
            background: ${type === "success" ? "#8a9b6e" : "#c2a578"};
            color: white;
            padding: 12px 24px;
            border-radius: 50px;
            z-index: 10000;
            animation: fadeInUp 0.3s ease;
            font-family: 'Quicksand', sans-serif;
        `;

    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  }

  /**
   * Setup event listeners
   */
  setupEventListeners() {
    // Start game button - only starts when clicked
    this.startGameBtn.onclick = () => {
      const name = this.playerNameInput.value.trim();
      if (name) {
        this.startGameWithPlayer(name);
      } else {
        this.showToast("Please enter your name!", "warning");
        this.playerNameInput.focus();
      }
    };

    // Search button
    this.searchBtn.onclick = () => this.searchRecommendations();

    // Change player button
    this.changePlayerBtn.onclick = () => {
      this.saveGame();
      this.showModal();
    };

    // Sound toggle
    this.soundToggle.onclick = () => this.toggleSound();

    // Enter key support
    this.playerNameInput.onkeypress = (e) => {
      if (e.key === "Enter") {
        this.startGameBtn.click();
      }
    };

    // Close modal when clicking outside
    this.playerModal.onclick = (e) => {
      if (e.target === this.playerModal) {
        this.hideModal();
      }
    };

    // Save preferences on change
    const selects = [this.ageSelect, this.personalitySelect, this.genderSelect];
    selects.forEach((select) => {
      if (select) {
        select.addEventListener("change", () => {
          if (this.playerName) {
            this.saveGame();
          }
        });
      }
    });
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.giftRecommender = new GiftRecommender();
});

import { v4 as uuid } from 'uuid'

let inventory = [
  {
    "categories": ["womens", "tops"],
    "name": "Eco-Dry Long-Sleeve Sports Top for Women",
    "slug": "eco-dry-long-sleeve-sports-top-for-women",
    "image": "/products/eco-dry-long-sleeve-sports-top-for-women.png",
    "price": "59.99",
    "description": "Achieve peak performance with our Eco-Dry Long-Sleeve Sports Top for Women. Made from fast-drying, breathable functional fabric, this top ensures maximum comfort during even the most intense workouts. The overlocked seams provide additional comfort, reducing chafing and irritation. Plus, some of the polyester content of the top is recycled, making it an eco-friendly choice for the environmentally conscious athlete. The top is designed to fit the female body, with a sleek and flattering cut that's perfect for any workout.",
    "brand": "Frost Fit",
    "currentInventory": 6,
    "tags": [
      "long-sleeve top",
      "sports top",
      "women's top",
      "fast-drying",
      "breathable",
      "functional fabric",
      "overlocked seams",
      "eco-friendly",
      "recycled polyester",
      "comfortable fit"
    ]
  },
  {
    "categories": ["womens", "tops", "new arrivals"],
    "name": "FrostChill Snow Tee",
    "slug": "frostchill-snow-tee-womens",
    "price": "49.99",
    "image": "/products/frostchill-snow-tee-womens.png",
    "description": "Take on the slopes in style with our FrostChill Snow Tee. Designed with snow sports in mind, this sports top is made from fast-drying, functional fabric that will keep you comfortable and dry no matter how intense your activity gets. With short raglan sleeves and visible seams, the FrostChill Snow Tee is as stylish as it is functional. The comfortable, loose fit provides freedom of movement and ensures that you can move easily in any direction. \n\nThe FrostChill Snow Tee is versatile enough to wear for any activity, whether you're hitting the slopes, hiking, running, or working out at the gym. Its fast-drying fabric helps wick away moisture to keep you cool and comfortable during even the most strenuous activities. Available in a range of sizes, the FrostChill Snow Tee is the perfect snow sports top for women who want to perform at their best.",
    "brand": "Frost Fit",
    "currentInventory": 8,
    "tags": [
      "snow sports top",
      "fast-drying",
      "functional fabric",
      "short raglan sleeves",
      "visible seams",
      "loose fit",
      "freedom of movement",
      "versatile"
    ]
  },
  {
    "categories": ["womens", "pants", "new arrivals"],
    "name": "SereneFlow Yoga Pants",
    "slug": "sereneflow-yoga-pants",
    "price": "69.99",
    "image": "/products/sereneflow-yoga-pants.png",
    "description": "Achieve the perfect balance of comfort and style with our SereneFlow Yoga Pants. Made from fast-drying fabric, these pants provide excellent moisture-wicking properties, keeping you dry and comfortable during your yoga sessions. The high waistband provides ample support and coverage, while the side pockets are perfect for holding your phone or other essentials.\n\nThe pants have a flattering design with a slim fit that hugs your curves in all the right places, providing a comfortable fit and freedom of movement. The high waistband helps to keep the pants securely in place, so you can focus on your yoga poses without any distractions. With its sleek and modern design, our SereneFlow Yoga Pants are perfect for any activity, from yoga to Pilates, stretching, or simply lounging around. They are versatile and stylish, making them perfect for both indoor and outdoor activities. So why wait? Get your hands on these amazing Women's Yoga Pants today and experience the ultimate in comfort and style!",
    "brand": "Frost Fit",
    "currentInventory": 8,
    "tags": [
      "women's yoga pants",
      "fast-drying",
      "high waistband",
      "side pockets",
      "moisture-wicking",
      "slim fit",
      "flattering design",
      "versatile"
    ]
  },
  {
    "categories": ["new arrivals", "mens", "jackets"],
    "name": "Arctic Breeze Puffer Jacket",
    "slug": "arctic-breeze-puffer-jacket",
    "image": "/products/arctic-breeze-puffer-jacket.png",
    "price": "139.99",
    "description": "Introducing the Arctic Breeze Puffer Jacket from Frost Fit, the ultimate combination of style and warmth. Made from high-quality materials and designed with attention to detail, this jacket is the perfect addition to your cold weather wardrobe.\n\nThe padded short jacket is not only stylish, but also practical. The quilted lining provides extra warmth, ensuring that you stay cozy and comfortable even in the coldest temperatures. The jersey-lined hood and stand-up collar with a drawstring provide additional protection from the elements, keeping your head and neck warm and dry.\n\nThe zip-down front allows for easy on and off, while the flap side pockets with press-stud provide ample storage space for your essentials. There's even one inner pocket for added convenience, so you can keep your valuables close at hand. The ribbing at the cuffs and hem ensures a comfortable and snug fit, keeping out the cold air and trapping in the warmth. The short length of the jacket is perfect for layering, so you can wear it over your favorite winter sweater or under a heavier coat for added insulation.\n\nThe Arctic Breeze Puffer Jacket is available in a range of colors to suit your personal style. Whether you're hitting the slopes, going for a walk in the park, or just running errands around town, this jacket will keep you warm and stylish all winter long.",
    "brand": "Frost Fit",
    "currentInventory": 10,
    "tags": [
      "puffer jacket",
      "men's jacket",
      "short jacket",
      "hooded jacket",
      "lightweight",
      "warm",
      "zippered front",
      "side pockets",
      "ribbed cuffs",
      "stylish"
    ]
  },
  {
    "categories": ["accessories"],
    "name": "Arctic Chill Mens Beanie",
    "slug": "arctic-chill-mens-beanie",
    "image": "/products/arctic-chill-mens-beanie.png",
    "price": "29.99",
    "description": "Stay warm and stylish with the Arctic Chill Unisex Beanie from Frost Fit. Made from high-quality, soft wool, this beanie is perfect for winter sports or casual wear. The snug fit and thick knit provide maximum warmth, while the Frost Fit logo adds a touch of style. Available in a range of colors, this beanie is a must-have accessory for any cold weather outfit.",
    "brand": "Frost Fit",
    "currentInventory": 10,
    "tags": [
      "beanie",
      "wool",
      "winter sports",
      "casual wear",
      "warmth",
      "Frost Fit logo",
      "color options"
    ]
  },
  {
    "categories": ["new arrivals", "mens", "accessories",],
    "name": "Summit Outdoorsman Scarf",
    "slug": "summit-outdoorsman-scarf",
    "price": "99.99",
    "image": "/products/summit-outdoorsman-scarf.png",
    "description": "Introducing the ultimate luxury outdoorsman scarf, the Summit Stripes. Crafted from the finest materials, this scarf offers unparalleled comfort and warmth, perfect for those chilly days in the great outdoors. The design is Oxonian with just enough vox populi, making it both timeless and modern. The bold stripes and intricate stitching demand respect and attention, and you'll feel confident and unstoppable when you wear it. It's the perfect accessory for the man who requires few provisions when he heads off to wilder places, like a cabin with a view of a lake and a moon that looks like you could hang it on the wall. The Summit Stripes Luxury Outdoorsman Scarf is a true reflection of your adventurous spirit. Order yours today and let the adventures begin.",
    "brand": "Summit Stripes",
    "currentInventory": 10,
    "tags": [
      "luxury scarf",
      "outdoorsman accessory",
      "bold colors",
      "unparalleled comfort",
      "warmth",
      "modern design",
    ]
  },
  {
    "categories": ["mens", "tops"],
    "name": "Eco-Dry Long-Sleeve Sports Top for Men",
    "slug": "eco-dry-long-sleeve-sports-top-for-men",
    "image": "/products/eco-dry-long-sleeve-sports-top-for-men.png",
    "price": "59.99",
    "description": "Achieve peak performance with our Eco-Dry Long-Sleeve Sports Top. Made from fast-drying, breathable functional fabric, this top ensures maximum comfort during even the most intense workouts. The overlocked seams provide additional comfort, reducing chafing and irritation. Plus, some of the polyester content of the top is recycled, making it an eco-friendly choice for the environmentally conscious athlete.",
    "brand": "Frost Fit",
    "currentInventory": 8,
    "tags": [
      "long-sleeve top",
      "sports top",
      "men's top",
      "fast-drying",
      "breathable",
      "functional fabric",
      "overlocked seams",
      "eco-friendly",
      "recycled polyester",
      "comfortable fit"
    ]
  },

  {
    "categories": ["mens", "tops"],
    "name": "FrostBite Sports Tees",
    "slug": "frostbite-sports-tee",
    "price": "49.99",
    "image": "/products/frostbite-sports-tee.png",
    "description": "Get ready to conquer the slopes with our FrostBite Sports Tee. Made from fast-drying, functional fabric, this snow sports top is designed to keep you comfortable and dry during your snowboarding or skiing adventures. The short raglan sleeves and visible seams provide a stylish touch, while the loose fit ensures maximum freedom of movement.\n\nThe FrostBite Sports Tee has a versatile design that makes it perfect for any activity, from snow sports to hiking, running, or simply hitting the gym. The fast-drying fabric helps to wick away moisture, keeping you cool and comfortable throughout your workout. With its sleek and modern design, our FrostBite Sports Tee is perfect for both indoor and outdoor activities. It is available for both men and women and comes in a wide range of sizes. So why wait? Get your hands on this amazing snow sports top today and take your performance to the next level!",
    "brand": "Frost Fit",
    "currentInventory": 12,
    "tags": [
      "snow sports top",
      "fast-drying",
      "functional fabric",
      "short raglan sleeves",
      "visible seams",
      "loose fit",
      "freedom of movement",
      "versatile"
    ]
  }, {
    "categories": ["womens", "jackets"],
    "name": "Zephyr Windbreaker",
    "slug": "zephyr-windbreaker-womens",
    "price": "79.99",
    "image": "/products/zephyr-windbreaker-womens.png",
    "description": "Stay comfortable and stylish during your workouts with our Zephyr Windbreaker. Made from lightweight and windproof fabric, this jacket provides maximum protection against the elements while you work up a sweat. The stand-up collar and zippered pockets give the jacket a sleek and modern look that is perfect for any active woman. The high-quality fabric is fast-drying, so you don't have to worry about getting wet and uncomfortable during your workout. The jacket also has excellent breathability, ensuring that you stay cool and comfortable throughout your exercise routine.\n\nThe jacket has a slim fit design with a flattering shape that hugs your curves in all the right places, providing a comfortable fit and freedom of movement. The high waistband helps to keep the jacket securely in place, so you can focus on your workout without any distractions. With its sleek and modern design, our Zephyr Windbreaker is perfect for any activity, from running to hiking, cycling, or simply hitting the gym. It is versatile and stylish, making it perfect for both indoor and outdoor activities. So why wait? Get your hands on this amazing Women's Athletic Jacket today and take your workout to the next level!",
    "brand": "Frost Fit",
    "currentInventory": 5,
    "tags": [
      "women's athletic jacket",
      "windbreaker",
      "lightweight",
      "zippered pockets",
      "stand-up collar",
      "fast-drying",
      "breathable",
      "slim fit",
      "high waistband",
      "versatile"
    ]
  },
  {
    "categories": ["womens", "jackets", "new arrivals"],
    "name": "IceFlow Knit Sports Jacket",
    "slug": "iceflow-knit-sports-jacket",
    "price": "88.99",
    "image": "/products/iceflow-knit-sports-jacket.png",
    "description": "Introducing the IceFlow Knit Sports Jacket, the perfect blend of style and performance. This jacket is designed for the modern woman who demands both comfort and fashion in her active wear. The jacquard-knit construction provides maximum flexibility and comfort, while the stylish design ensures you stand out from the crowd.\n\nThe IceFlow Knit Sports Jacket is perfect for any outdoor activity, whether it's a morning run or an evening hike. The lightweight material keeps you cool and comfortable, while the snug fit ensures you stay protected from the elements. The jacket comes with a full-length zipper for easy on-and-off access, and two side pockets for carrying your essentials.\n\nThis jacket is part of our new arrivals collection and is available exclusively for women. It is part of the Jackets category and comes with a price of $88.99. The jacket features the IceFlow logo and is available in limited stock, with only 4 units currently available. Order now to add this stylish and functional sports jacket to your wardrobe!",
    "brand": "IceFlow",
    "currentInventory": 4,
    "tags": [
      "sports jacket",
      "women's jacket",
      "jacquard-knit",
      "lightweight",
      "flexible",
      "stylish design",
      "full-length zipper",
      "side pockets",
      "limited stock",
      "outdoor activities"
    ]
  },
  {
    "categories": ["mens", "shorts"],
    "name": "Flex Comfort Lounge Shorts",
    "slug": "flex-comfort-lounge-shorts",
    "image": "/products/flex-comfort-lounge-shorts.png",
    "price": "49.99",
    "description": "Stay comfortable and stylish with our Sweat Lounge Shorts. Made from soft sweatshirt fabric, these shorts feature an elasticated drawstring waist for a perfect fit, side pockets and a back pocket for storage, and ribbed hems for a snug fit. \n\nThe soft brushed inside ensures ultimate comfort and relaxation, making them perfect for lounging or exercising.",

    "brand": "Frost Fit",
    "currentInventory": 15,
    "tags": [
      "lounge shorts",
      "sweat shorts",
      "men's shorts",
      "elastic waistband",
      "sweatshirt fabric",
      "soft brushed inside",
      "ribbed hems",
      "comfortable fit",
      "versatile"
    ]
  },
  {
    "categories": ["womens", "jackets"],
    "name": "Breezeshield Sports Jacket",
    "slug": "breezeshield-sports-jacket",
    "price": "67.99",
    "image": "/products/breezeshield-sports-jacket.png",
    "description": "BreezeShield Sports Jacket is a perfect combination of style and function that will keep you looking great and feeling comfortable during your workouts. Made from lightweight and windproof fabric, this jacket is designed to provide you with maximum protection against the elements while you work up a sweat. Featuring a stand-up collar and zippered pockets, this jacket has a sleek and modern look that is perfect for any active woman. The high-quality fabric is fast-drying, so you don't have to worry about getting wet and uncomfortable during your workout. The jacket also has excellent breathability, ensuring that you stay cool and comfortable throughout your exercise routine.\n\nThe jacket has a slim fit design with a flattering shape that hugs your curves in all the right places, providing a comfortable fit and freedom of movement. The high waistband helps to keep the jacket securely in place, so you can focus on your workout without any distractions. With its sleek and modern design, our Women's Athletic Jacket is perfect for any activity, from running to hiking, cycling, or simply hitting the gym. It is versatile and stylish, making it perfect for both indoor and outdoor activities. So why wait? Get your hands on this amazing Women's Athletic Jacket today and take your workout to the next level!",
    "brand": "Breezeshield",
    "currentInventory": 4,
    "tags": [
      "sports jacket",
      "women's jacket",
      "windproof",
      "lightweight",
      "fast-drying",
      "breathable",
      "slim fit",
      "high waistband",
      "versatile",
      "outdoor activities"
    ]
  },
  {
    "categories": ["womens", "jackets"],
    "name": "Arctic Breeze Puffer Jacket for Women",
    "slug": "arctic-breeze-puffer-jacket-for-women",
    "image": "/products/arctic-breeze-puffer-jacket-for-women.png",
    "price": "139.99",
    "description": "Stay warm and stylish in this Women's Arctic Breeze Puffer Jacket, designed to fit the female form perfectly. The padded short jacket features a jersey-lined hood and stand-up collar with a drawstring, ensuring you're ready for any weather. The zip-down front, flap side pockets with press-stud, and one inner pocket provide ample storage space. Ribbing at the cuffs and hem ensures a comfortable and snug fit. The quilted lining provides extra warmth, making this jacket perfect for colder weather.\n\nWhether you're going for a walk in the park, running errands, or hitting the slopes, this jacket will keep you warm and looking great. The short length of the jacket makes it perfect for layering, so you can wear it over your favorite winter sweater or under a heavier coat for added insulation. The Arctic Breeze Puffer Jacket for Women is available in a range of colors to suit your personal style, and is made from high-quality materials that are built to last. With attention to detail and a focus on both style and functionality, this jacket is the perfect addition to any cold weather wardrobe.",
    "brand": "Frost Fit",
    "currentInventory": 8,
    "tags": [
      "puffer jacket",
      "women's jacket",
      "short jacket",
      "hooded jacket",
      "lightweight",
      "warm",
      "zippered front",
      "side pockets",
      "ribbed cuffs",
      "stylish"
    ]
  },

  {
    "categories": ["womens", "shorts"],
    "name": "Slope Side Lounge Shorts",
    "slug": "slope-side-lounge-shorts",
    "image": "/products/slope-side-lounge-shorts.png",
    "price": "49.99",
    "description": "Relax in style after a long day on the slopes with our Slope Side Lounge Shorts. Made from soft, breathable fabric, these shorts feature a relaxed fit and an elasticated drawstring waist for maximum comfort. The side pockets and back pocket provide ample storage space for your essentials. The soft brushed inside ensures ultimate comfort and relaxation, making them perfect for lounging after skiing or any other winter activity.\n\nThe Slope Side Lounge Shorts are designed to keep you warm and comfortable, with a focus on both style and functionality. The sleek design and flattering cut ensure you look great, while the high-quality materials and attention to detail ensure they last season after season. Available in a range of colors to suit your personal style, these shorts are the perfect addition to any après-ski wardrobe.\n\nWhether you're curling up by the fire, relaxing in the hot tub, or just lounging around, the Slope Side Lounge Shorts are the perfect choice. With their stylish design and comfortable fit, they'll become your go-to shorts for any winter activity.",
    "brand": "Frost Fit",
    "currentInventory": 12,
    "tags": [
      "lounge shorts",
      "womens",
      "bottoms",
      "elasticated drawstring waist",
      "soft breathable fabric",
      "side pockets",
      "back pocket",
      "soft brushed inside",
      "comfortable fit",
      "relaxation",
      "après-ski",
      "range of colors"
    ]
  },
  {
    "categories": ["accessories"],
    "name": "Skyline Aviator Sunglasses",
    "slug": "skyline-aviator-sunglasses",
    "image": "/products/skyline-aviator-sunglasses.png",
    "price": "99.99",
    "description": "Take your style to new heights with our Skyline Aviator Sunglasses. With a classic design inspired by the golden age of aviation, these sunglasses are the perfect accessory for any adventure. The high-quality metal frames are durable and lightweight, with adjustable nose pads for a comfortable fit. The polarized lenses provide superior glare reduction and 100% UV protection, making them perfect for outdoor activities.\n\nThe Skyline Aviator Sunglasses are designed to make a statement, with a bold and iconic look that is sure to turn heads. The sleek metal frames and double bridge design provide a timeless look that never goes out of style. Available in a range of lens colors to suit your personal style, these sunglasses are the perfect addition to any outfit.\n\nWhether you're flying high in the cockpit, hitting the beach, or cruising around town, the Skyline Aviator Sunglasses are the perfect companion. With attention to detail and a focus on both style and functionality, these sunglasses are built to last and designed to impress.",
    "brand": "Frost Fit",
    "currentInventory": 8,
    "tags": [
      "aviator sunglasses",
      "accessories",
      "sunglasses",
      "metal frames",
      "adjustable nose pads",
      "polarized lenses",
      "glare reduction",
      "100% UV protection",
      "bold design",
      "double bridge",
      "timeless look",
      "range of lens colors",
      "durability",
      "functionality"
    ]
  },
  {
    "categories": ["womens", "accessories"],
    "name": "Powder Peak Women's Beanie",
    "slug": "powder-peak-womens-beanie",
    "image": "/products/powder-peak-womens-beanie.png",
    "price": "29.99",
    "description": "Stay warm and stylish on the slopes with our Powder Peak Women's Beanie. Made from soft and cozy wool-blend yarn, this beanie features a classic cable-knit pattern with a pom-pom on top. The ribbed edge ensures a snug fit that will keep you warm and comfortable all day long.\n\nThe Powder Peak Women's Beanie is designed to keep you warm and stylish in any winter activity, from skiing to snowshoeing to simply enjoying a walk in the snow. With a classic and timeless design, this beanie is the perfect addition to any winter wardrobe. Available in a range of colors to suit your personal style, this beanie is the perfect gift for any winter sports enthusiast.\n\nCrafted with care and attention to detail, the Powder Peak Women's Beanie is a high-quality product that will last season after season. It is easy to care for and will maintain its shape and color even after repeated use.",
    "brand": "Frost Fit",
    "currentInventory": 20,
    "tags": [
      "women's beanie",
      "accessories",
      "womens",
      "wool-blend yarn",
      "cable-knit pattern",
      "pom-pom",
      "ribbed edge",
      "warm and comfortable",
      "timeless design",
      "range of colors",
      "winter sports",
      "high-quality",
      "durable",
      "easy to care for"
    ]
  },
  {
    "categories": ["mens", "pants"],
    "name": "Flex Comfort Sweatpants",
    "slug": "flex-comfort-sweatpants",
    "image": "/products/flex-comfort-sweatpants.png",
    "price": "69.99",
    "description": "Stay comfortable and stylish with our Flex Comfort Sweatpants. Made from soft sweatshirt fabric, these pants feature an elasticated drawstring waist for a perfect fit, side pockets and a back pocket for storage, and ribbed hems for a snug fit. The soft brushed inside ensures ultimate comfort and relaxation, making them perfect for lounging or exercising.\n\nThe Flex Comfort Sweatpants are designed for the modern man who wants to look good and feel good at the same time. Whether you're relaxing at home, running errands, or hitting the gym, these sweatpants will keep you comfortable and looking great. The elasticated drawstring waist ensures a perfect fit, while the side and back pockets provide ample storage space for your essentials. The ribbed hems ensure a snug fit, while the soft brushed inside provides ultimate comfort and relaxation.\n\nAvailable in a range of colors to suit your personal style, the Flex Comfort Sweatpants are made from high-quality materials that are built to last. With attention to detail and a focus on both style and functionality, these sweatpants are the perfect addition to any casual wardrobe.",
    "brand": "Frost Fit",
    "currentInventory": 10,
    "tags": [
      "sweatpants",
      "men's pants",
      "elastic waistband",
      "sweatshirt fabric",
      "soft brushed inside",
      "ribbed hems",
      "comfortable fit",
      "versatile",
      "loungewear",
      "exercise pants"
    ]
  },
  {
    "categories": ["womens", "pants"],
    "name": "FrostFit Women's Performance Leggings",
    "slug": "frostfit-womens-performance-leggings",
    "image": "/products/frostfit-womens-performance-leggings.png",
    "price": "89.99",
    "description": "Our FrostFit Women's Performance Leggings are designed with your comfort and style in mind. Made from a stretchy and moisture-wicking fabric, these leggings feature a high waistband that sits comfortably on your waist and provides support during your workouts. The sleek and stylish design is perfect for both gym and everyday wear, and the breathable material ensures that you stay cool and comfortable throughout the day. With their versatile design and high-quality materials, these leggings are built to last, so you can enjoy them season after season.\n\nAvailable in a range of colors to suit your personal style, our FrostFit Women's Performance Leggings are the ultimate in comfort and style. The leggings are perfect for any kind of workout, from yoga to running, and the moisture-wicking fabric ensures that you stay dry and comfortable no matter how intense your workout is.",
    "brand": "Frost Fit",
    "currentInventory": 25,
    "tags": [
        "performance leggings",
        "bottoms",
        "womens",
        "stretchy",
        "moisture-wicking",
        "high waistband",
        "supportive",
        "breathable",
        "sleek design",
        "versatile",
        "high-quality",
        "range of colors",
        "yoga",
        "running",
        "workout"
    ]
}
,
  {
    "categories": ["mens", "pants"],
    "name": "FrostFit Quick-Change Workout Pants",
    "slug": "frostfit-quick-change-workout-pants",
    "image": "/products/frostfit-quick-change-workout-pants.png",
    "price": "79.99",
    "description": "Our FrostFit Quick-Change Workout Pants are the perfect addition to any active man's wardrobe. Made from lightweight and breathable fabric, these pants feature a tapered fit and an elasticated waistband with an adjustable drawstring for a comfortable and secure fit. The zippered cuffs make them easy to remove over shoes, while the side and back pockets provide ample storage space for your essentials.\n\nBut what sets our FrostFit Quick-Change Workout Pants apart is the innovative zipper at the bottom, which allows you to quickly and easily change in and out of them in the locker room. This makes them perfect for skiers who need to change quickly after hitting the slopes. With attention to detail and a focus on both style and functionality, these pants are the perfect addition to any workout wardrobe.\n\nAvailable in a range of colors to suit your personal style, our FrostFit Quick-Change Workout Pants are made from high-quality materials that are built to last, so you can enjoy them season after season.",
    "brand": "Frost Fit",
    "currentInventory": 15,
    "tags": [
        "workout pants",
        "bottoms",
        "mens",
        "tapered fit",
        "elasticated waistband",
        "adjustable drawstring",
        "zippered cuffs",
        "side pockets",
        "back pocket",
        "quick-change",
        "locker room",
        "skiing",
        "high-quality",
        "innovative design",
        "range of colors"
    ]
},
{
  "categories": ["mens", "pants"],
  "name": "FrostFit Comfort Workout Pants",
  "slug": "frostfit-comfort-workout-pants",
  "image": "/products/frostfit-comfort-workout-pants.png",
  "price": "69.99",
  "description": "Our FrostFit Comfort Workout Pants are designed with your comfort in mind. Made from a soft and stretchy blend of cotton and polyester, these pants feature a tapered fit and an elasticated waistband with an adjustable drawstring for a comfortable and secure fit. The side and back pockets provide ample storage space for your essentials.\n\nWhether you're hitting the gym, going for a run, or just lounging around, our FrostFit Comfort Workout Pants are the perfect choice. With their versatile design and high-quality materials, they're built to last, so you can enjoy them season after season. Available in a range of colors to suit your personal style, they're the ultimate in comfort and style.",
  "brand": "Frost Fit",
  "currentInventory": 20,
  "tags": [
      "workout pants",
      "bottoms",
      "mens",
      "tapered fit",
      "elasticated waistband",
      "adjustable drawstring",
      "side pockets",
      "back pocket",
      "comfortable fit",
      "soft and stretchy",
      "high-quality",
      "versatile design",
      "range of colors"
  ]
}



];

inventory.map(i => {
  i.id = uuid()
  return i
})

export default inventory
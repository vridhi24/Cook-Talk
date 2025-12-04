// js/recipes.js
const RECIPES = {
  // BREAKFAST (10)
  "upma": {
    id: "upma", name: "Rava Upma", category: "breakfast", time: "20 min", servings: 2,
    image: "assets/images/upma.jpg",
    ingredients: ["1 cup rava (semolina)", "2 cups water", "1 tsp mustard seeds", "1 onion", "1 green chilli", "Salt", "2 tbsp oil"],
    steps: ["Roast rava lightly and keep aside.", "Heat oil, add mustard seeds, curry leaves and chopped onion.", "Add water and salt, bring to boil.", "Slowly add rava while stirring to avoid lumps.", "Cover and cook for 3-4 minutes, garnish and serve."]
  },
  "poha": {
    id: "poha", name: "Poha", category: "breakfast", time: "15 min", servings: 2,
    image: "assets/images/poha.jpg",
    ingredients: ["2 cups flattened rice (poha)", "1 onion", "1 potato (optional)", "1 tsp mustard seeds", "1 tsp turmeric", "Salt", "2 tbsp oil", "Lemon"],
    steps: ["Wash poha lightly and drain.", "Heat oil, add mustard seeds, curry leaves and onion.", "Add cubed potato, turmeric and cook till soft.", "Mix in poha with salt, cook 2 minutes and squeeze lemon."]
  },
  "aloo_paratha": {
    id: "aloo_paratha", name: "Aloo Paratha", category: "breakfast", time: "35 min", servings: 2,
    image: "assets/images/aloo_paratha.jpg",
    ingredients: ["2 boiled potatoes", "1 cup wheat flour", "Salt", "Chilli powder", "Ghee"],
    steps: ["Mash potatoes with spices.", "Knead dough and prepare stuffed balls.", "Roll and cook paratha on hot tawa with ghee."]
  },
  "omelette": { id: "omelette", name: "Masala Omelette", category: "breakfast", time: "10 min", servings: 1, image: "assets/images/omelette.jpg", ingredients: ["2 eggs", "Onion", "Tomato", "Green chilli", "Salt"], steps: ["Beat eggs, add veggies and spice.", "Cook on hot pan till set."] },
  "idli": { id: "idli", name: "Idli", category: "breakfast", time: "40 min", servings: 4, image: "assets/images/idli.jpg", ingredients: ["Idli batter"], steps: ["Grease idli plates", "Pour batter and steam 10-12 min."] },
  "dosa": { id: "dosa", name: "Dosa", category: "breakfast", time: "25 min", servings: 2, image: "assets/images/dosa.jpg", ingredients: ["Dosa batter"], steps: ["Spread batter thin on tawa", "Cook until crisp."] },
  "oats": { id: "oats", name: "Oats Porridge", category: "breakfast", time: "8 min", servings: 1, image: "assets/images/oats.jpg", ingredients: ["Oats", "Milk", "Sugar"], steps: ["Boil milk, add oats and simmer 3-4 min."] },
  "paneer_bhurji": { id: "paneer_bhurji", name: "Paneer Bhurji", category: "breakfast", time: "15 min", servings: 2, image: "assets/images/paneer_bhurji.jpg", ingredients: ["Paneer", "Onion", "Tomato", "Spices"], steps: ["Crumble paneer", "Saute onion and tomato, add paneer and spices."] },
  "paratha": { id: "paratha", name: "Plain Paratha", category: "breakfast", time: "20 min", servings: 2, image: "assets/images/paratha.jpg", ingredients: ["Wheat flour", "Water", "Salt"], steps: ["Knead dough", "Roll and cook paratha on tawa."] },
  "banana_pancake": { id: "banana_pancake", name: "Banana Pancake", category: "breakfast", time: "12 min", servings: 2, image: "assets/images/banana_pancake.jpg", ingredients: ["1 banana", "1 egg", "2 tbsp flour"], steps: ["Mash banana, mix egg and flour", "Fry small pancakes on tawa."] },

  // LUNCH (10)
  "dal_tadka": { id: "dal_tadka", name: "Dal Tadka", category: "lunch", time: "30 min", servings: 3, image: "assets/images/dal.jpg", ingredients: ["1 cup dal", "Onion", "Tomato", "Ghee", "Spices"], steps: ["Cook dal until soft.", "Prepare tadka with ghee, cumin, garlic, onion and tomato.", "Mix tadka with dal and simmer."] },
  "rajma": { id: "rajma", name: "Rajma Chawal", category: "lunch", time: "50 min", servings: 4, image: "assets/images/rajma.jpg", ingredients: ["Rajma", "Onion", "Tomato", "Spices"], steps: ["Soak rajma", "Cook rajma till soft", "Prepare masala and add rajma."] },
  "paneer_butter": { id: "paneer_butter", name: "Paneer Butter Masala", category: "lunch", time: "35 min", servings: 3, image: "assets/images/paneer_butter_masala.jpg", ingredients: ["Paneer", "Tomato", "Cream", "Spices"], steps: ["Make tomato gravy", "Add paneer and simmer."] },
  "veg_pulao": { id: "veg_pulao", name: "Vegetable Pulao", category: "lunch", time: "30 min", servings: 3, image: "assets/images/pulao.jpg", ingredients: ["Basmati rice", "Mixed vegetables", "Spices"], steps: ["Saute onions and spices", "Add rice and veg, cook till done."] },
  "chole": { id: "chole", name: "Chole", category: "lunch", time: "40 min", servings: 3, image: "assets/images/chole.jpg", ingredients: ["Chickpeas", "Onion", "Tomato", "Spices"], steps: ["Cook chickpeas", "Prepare masala and combine."] },
  "fried_rice": { id: "fried_rice", name: "Fried Rice", category: "lunch", time: "20 min", servings: 2, image: "assets/images/fried_rice.jpg", ingredients: ["Cooked rice", "Veggies", "Soy sauce"], steps: ["Stir-fry veggies", "Add rice and sauce."] },
  "matar_paneer": { id: "matar_paneer", name: "Matar Paneer", category: "lunch", time: "30 min", servings: 3, image: "assets/images/matar_paneer.jpg", ingredients: ["Paneer", "Peas", "Tomato", "Spices"], steps: ["Make gravy", "Add paneer & peas."] },
  "pav_bhaji": { id: "pav_bhaji", name: "Pav Bhaji", category: "lunch", time: "35 min", servings: 3, image: "assets/images/pav_bhaji.jpg", ingredients: ["Mixed veg", "Pav", "Butter", "Spices"], steps: ["Cook veg & mash", "Serve with buttered pav."] },
  "lemon_rice": { id: "lemon_rice", name: "Lemon Rice", category: "lunch", time: "12 min", servings: 2, image: "assets/images/lemon_rice.jpg", ingredients: ["Cooked rice", "Lemon", "Mustard seeds", "Turmeric"], steps: ["Prepare seasoning", "Mix with rice and lemon."] },
  "rajgira": { id: "rajgira", name: "Simple Veg Curry", category: "lunch", time: "25 min", servings: 3, image: "assets/images/veg_curry.jpg", ingredients: ["Mixed veg", "Onion", "Tomato", "Spices"], steps: ["Saute base", "Add vegetables and simmer."] },

  // DINNER (10)
  "roti_sabzi": { id: "roti_sabzi", name: "Roti & Sabzi", category: "dinner", time: "20 min", servings: 2, image: "assets/images/roti_sabzi.jpg", ingredients: ["Atta", "Veg sabzi", "Oil"], steps: ["Knead dough", "Roll roti", "Cook sabzi"].map(s=>s) },
  "khichdi": { id: "khichdi", name: "Khichdi", category: "dinner", time: "30 min", servings: 3, image: "assets/images/khichdi.jpg", ingredients: ["Rice", "Dal", "Ghee", "Spices"], steps: ["Wash rice & dal", "Cook together with spices"].map(s=>s) },
  "Tomato_pasta": { id: "Tomato_pasta", name: "Tomato pasta", category: "dinner", time: "25 min", servings: 2, image: "assets/images/pasta.jpg", ingredients: ["Pasta", "Tomatoes", "Garlic", "Oil"], steps: ["Boil pasta", "Make tomato sauce", "Mix and serve"].map(s=>s) },
  "veg_soup": { id: "veg_soup", name: "Vegetable Soup", category: "dinner", time: "15 min", servings: 2, image: "assets/images/veg_soup.jpg", ingredients: ["Mixed veggies", "Stock"], steps: ["Boil veggies", "Blend and serve"].map(s=>s) },
  "egg_curry": { id: "egg_curry", name: "Egg Curry", category: "dinner", time: "25 min", servings: 3, image: "assets/images/egg_curry.jpg", ingredients: ["Boiled eggs", "Tomato gravy"], steps: ["Prepare gravy", "Add eggs and simmer"].map(s=>s) },
  "sandwich_dinner": { id: "sandwich_dinner", name: "Veg Sandwich", category: "dinner", time: "10 min", servings: 1, image: "assets/images/sandwich.jpg", ingredients: ["Bread", "Veggies", "Butter"], steps: ["Layer veggies", "Toast and serve"].map(s=>s) },
  "maggie": { id: "maggie", name: "Maggi", category: "dinner", time: "5 min", servings: 1, image: "assets/images/maggi.jpg", ingredients: ["Maggi", "Water", "Masala"], steps: ["Boil water", "Add maggi and cook"].map(s=>s) },
  "sprouts_salad": { id: "sprouts_salad", name: "Sprouts Salad", category: "dinner", time: "10 min", servings: 1, image: "assets/images/sprouts.jpg", ingredients: ["Sprouts", "Veggies", "Lemon"], steps: ["Mix all ingredients and season"].map(s=>s) },
  "veg_curry": { id: "veg_curry", name: "Vegetable Curry", category: "dinner", time: "30 min", servings: 3, image: "assets/images/veg_curry.jpg", ingredients: ["Mixed veg", "Onion", "Tomato", "Spices"], steps: ["Make masala", "Add veggies and simmer"].map(s=>s) },
  "curd_rice": { id: "curd_rice", name: "Curd Rice", category: "dinner", time: "10 min", servings: 2, image: "assets/images/curd_rice.jpg", ingredients: ["Cooked rice", "Curd", "Salt"], steps: ["Mix curd and rice", "Temper and serve"].map(s=>s) },

  // SNACKS (10)
  "sandwich": { id: "sandwich", name: "Veg Sandwich", category: "snacks", time: "10 min", servings: 1, image: "assets/images/sandwich.jpg", ingredients: ["Bread", "Butter", "Veggies"], steps: ["Spread butter", "Layer veggies", "Toast"].map(s=>s) },
  "samosa": { id: "samosa", name: "Samosa", category: "snacks", time: "30 min", servings: 4, image: "assets/images/samosa.jpg", ingredients: ["Potato", "Pastry"], steps: ["Make stuffing", "Fill pastry", "Fry"].map(s=>s) },
  "pav_bhaji_snack": { id: "pav_bhaji_snack", name: "Pav Bhaji (snack)", category: "snacks", time: "30 min", servings: 3, image: "assets/images/pav_bhaji.jpg", ingredients: ["Mixed veg", "Pav"], steps: ["Cook veg and mash", "Serve with pav"].map(s=>s) },
  "bhel_puri": { id: "bhel_puri", name: "Bhel Puri", category: "snacks", time: "10 min", servings: 2, image: "assets/images/bhel.jpg", ingredients: ["Puffed rice", "Chutneys", "Veggies"], steps: ["Mix and serve"].map(s=>s) },
  "momos": { id: "momos", name: "Momos", category: "snacks", time: "35 min", servings: 4, image: "assets/images/momos.jpg", ingredients: ["Wrappers", "Filling"], steps: ["Fill and steam momos"].map(s=>s) },
  "fries": { id: "fries", name: "French Fries", category: "snacks", time: "20 min", servings: 2, image: "assets/images/fries.jpg", ingredients: ["Potatoes", "Oil", "Salt"], steps: ["Cut potatoes", "Fry until golden"].map(s=>s) },
  "pakora": { id: "pakora", name: "Vegetable Pakora", category: "snacks", time: "15 min", servings: 3, image: "assets/images/pakora.jpg", ingredients: ["Vegetables", "Besan"], steps: ["Make batter and fry"].map(s=>s) },
  "cheeseballs": { id: "cheeseballs", name: "Cheese Balls", category: "snacks", time: "15 min", servings: 3, image: "assets/images/cheese_balls.jpg", ingredients: ["Cheese", "Potato", "Breadcrumbs"], steps: ["Shape and fry"].map(s=>s) },
  "cornchaat": { id: "cornchaat", name: "Corn Chaat", category: "snacks", time: "8 min", servings: 1, image: "assets/images/corn_chaat.jpg", ingredients: ["Corn", "Spices", "Lemon"], steps: ["Mix and serve"].map(s=>s) },
  "garlic_bread": { id: "garlic_bread", name: "Garlic Bread", category: "snacks", time: "10 min", servings: 2, image: "assets/images/garlic_bread.jpg", ingredients: ["Bread", "Garlic butter"], steps: ["Spread and bake"].map(s=>s) },

  // DRINKS (10)
  "tea": { id: "tea", name: "Masala Tea", category: "drinks", time: "8 min", servings: 2, image: "assets/images/masala_tea.jpg", ingredients: ["Tea leaves", "Milk", "Spices"], steps: ["Boil water with spices", "Add tea and milk, strain"].map(s=>s) },
  "cold_coffee": { id: "cold_coffee", name: "Cold Coffee", category: "drinks", time: "5 min", servings: 1, image: "assets/images/cold_coffee.jpg", ingredients: ["Coffee powder", "Milk", "Ice", "Sugar"], steps: ["Blend all and serve chilled"].map(s=>s) },
  "lemonade": { id: "lemonade", name: "Lemonade", category: "drinks", time: "4 min", servings: 2, image: "assets/images/lemonade.jpg", ingredients: ["Lemon", "Sugar", "Water"], steps: ["Mix and serve with ice"].map(s=>s) },
  "mango_shake": { id: "mango_shake", name: "Mango Shake", category: "drinks", time: "5 min", servings: 1, image: "assets/images/mango_shake.jpg", ingredients: ["Mango pulp", "Milk", "Sugar"], steps: ["Blend and serve chilled"].map(s=>s) },
  "buttermilk": { id: "buttermilk", name: "Buttermilk", category: "drinks", time: "3 min", servings: 2, image: "assets/images/chaas.jpg", ingredients: ["Yogurt", "Water", "Salt"], steps: ["Whisk and serve chilled"].map(s=>s) },
  "ginger_tea": { id: "ginger_tea", name: "Ginger Tea", category: "drinks", time: "7 min", servings: 1, image: "assets/images/ginger_tea.jpg", ingredients: ["Ginger", "Tea", "Milk"], steps: ["Boil ginger and add tea and milk"].map(s=>s) },
  "strawberry_shake": { id: "strawberry_shake", name: "Strawberry Shake", category: "drinks", time: "6 min", servings: 1, image: "assets/images/strawberry_shake.jpg", ingredients: ["Strawberries", "Milk", "Sugar"], steps: ["Blend and serve chilled"].map(s=>s) },
  "coconut_water": { id: "coconut_water", name: "Coconut Water", category: "drinks", time: "1 min", servings: 1, image: "assets/images/coconut_water.jpg", ingredients: ["Coconut water"], steps: ["Serve chilled"].map(s=>s) },
  "mint_mojito": { id: "mint_mojito", name: "Mint Mojito (Mocktail)", category: "drinks", time: "6 min", servings: 1, image: "assets/images/mint_mojito.jpg", ingredients: ["Mint", "Lime", "Sparkling water"], steps: ["Muddle mint and lime, top with sparkling water"].map(s=>s) },
  "carrot_smoothie": { id: "carrot_smoothie", name: "Carrot Smoothie", category: "drinks", time: "5 min", servings: 1, image: "assets/images/carrot_smoothie.jpg", ingredients: ["Carrot", "Milk", "Honey"], steps: ["Blend and serve"].map(s=>s) }
};

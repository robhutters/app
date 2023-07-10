const recipesFavouritesTestObject = [ {
  id: 1,
  user_id: 123,  
  created_at: 'time',
  recipename: ' favourite TestRecipe',
  favourite: true,
  byline: 'Met room en gehaktballetjes',
  labels: ['vegan'],
  description: 'Een onzin gerecht',
  prepTime: 10,
  cookTime: 14,
  totalTime: 24,
  instructions: {
    stepTitle: ["Step 1 Title", "Step 2 Title", "Step 3 Title", "Step 4 Title"],
    intermediateSteps: [  ["Snijd ui fijn", "Pers knoflook", "Zet oven aan"],
     
       ["Bak uitjes in olijfolie 1-2 minuten", "Doe tomatensaus erbij"]
    ]
   

  },
  ingredients: [
    'bananen', 'aardbeien', 'slagroom'
  ],
  comments: [],
  calories: 1000
}, {
  id: 2,
  user_id: 123,  
  created_at: 'time',
  recipename: 'favourite Recipe 2',
  favourite: true,
  byline: 'Met room en gehaktballetjes',
  labels: ['vegan'],
  description: 'Een onzin gerecht',
  prepTime: 10,
  cookTime: 14,
  totalTime: 24,
  instructions: {
    stepTitle: ["Step 1 Title", "Step 2 Title", "Step 3 Title", "Step 4 Title"],
    intermediateSteps: [  ["Snijd ui fijn", "Pers knoflook", "Zet oven aan"],
     
       ["Bak uitjes in olijfolie 1-2 minuten", "Doe tomatensaus erbij"]
    ]
   

  },
  ingredients: [
    'bananen', 'aardbeien', 'slagroom'
  ],
  comments: [],
  calories: 1000
}]

export default recipesFavouritesTestObject
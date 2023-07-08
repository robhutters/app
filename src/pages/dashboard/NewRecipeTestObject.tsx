const NewRecipeTestObject = {
  dummy: true,
  user_id: 123,  
  created_at: 'time',
  recipename: 'TestRecipe4',
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
}

export default NewRecipeTestObject
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
    "stepTitle":
      ["Stap 1: Voorbereiding","Stap 2: Koken of bakken","Stap 3: Koken of bakken","Stap 4: Serveren"],
    "intermediateSteps": [
    
      ["snij de ui in halve ringen","snij de ui in halve ringen","snij de ui in halve ringen","snij de ui in halve ringen"]
    ,
    
      ["schil de aardappelen","schil de aardappelen","schil de aardappelen","schil de aardappelen"]
    ,
    
      ["verpak de mini-tortilla's in aluminiumfolie","verpak de mini-tortilla's in aluminiumfolie","verpak de mini-tortilla's in aluminiumfolie","verpak de mini-tortilla's in aluminiumfolie"],
      
      ["leg op elk bord 3 tortilla's","leg op elk bord 3 tortilla's","leg op elk bord 3 tortilla's"]
    
  ]},
  ingredients: [
    'bananen', 'aardbeien', 'slagroom'
  ],
  comments: [],
  calories: 1000
}

export default NewRecipeTestObject
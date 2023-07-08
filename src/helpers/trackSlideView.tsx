export function trackSlideView(slideNumber:any, dataSetOfChoice:any, direction: string, setSlideNumber: any) {
  const dataSetSize = dataSetOfChoice.length 

  if (slideNumber < dataSetSize && direction === "next") {
     setSlideNumber(slideNumber + 1) 
  } else {
    setSlideNumber(1)
  }

  
}
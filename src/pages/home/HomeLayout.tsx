export default function HomeLayout (
  { 
    children, 
    desktop
  } 
    : 
  {
    children: any, 
    desktop: boolean | null

  }) {
  return (
    <div>
      <h1>CHECKING</h1>
      {children}
      <p>{`Value of desktop: ${desktop}`}</p>
    

    </div>
  )
}
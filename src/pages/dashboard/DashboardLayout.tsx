import { useHistory } from "react-router-dom";
import { useAuth } from "../../context/Auth";

export function DashboardLayout ({children} : {children: any}) {
  const history = useHistory();  

  const { user, signOut, profile } = useAuth();

  async function handleSignOut() {
    // Ends user session
    await signOut();

    // Redirects the user to Login page
    history.push('/login');
  }

  return (
    <section  className='flex flex-col  ' >
  
      <main className='flex md:flex-row md:justify-between flex-col'>
        <section className=" ml-4 mr-10 py-6 mb-8 max-w-sm">
          <div className="py-6">
          <p>Welcome, <strong>{profile?.first_name}</strong>!</p>
          <p>Your user id is {user.id}</p>
          </div>
          <button onClick={handleSignOut} className='w-full'>Sign out</button>
        </section>
        <section className="flex flex-col max-w-3xl">
        {children}
        </section>
        
        </main>
    </section>
  )
}
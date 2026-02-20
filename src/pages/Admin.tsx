import { useAuth } from '../store/useAuth'

export default function Admin() {
  const { user } = useAuth();

  return (
    <>
        <h1 className="text-2xl font-bold mb-4">Admin sida</h1>
        <p>Inloggad som: {user?.username}</p>
        
    </>
  )
}
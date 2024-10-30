import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

const Navbar = () => {
  const { isAuth } = useSelector((state) => state.auth)
  let { user } = useSelector((state) => state.auth)
  const temppuser =JSON.parse(localStorage.getItem('user'))
  user ===null? temppuser : user
  console.log(JSON.parse(localStorage.getItem('user')) )
  console.log(user)
  return (
    <nav className='navbar navbar-light bg-light'>
      <div className='container'>
        <div>
          <NavLink to='/'>
            <span className='navbar-brand mb-0 h1'>Home</span>
          </NavLink>
          </div>
        

        {isAuth ? (
          <div className='text-center'>
            <NavLink to='/dashboard' className='mx-3 '>
              <span >Dashboard</span>
              </NavLink>
            <div className="mr-18 pr-10 mt-4 flex items-start gap-4">
              <Avatar>
                    <AvatarFallback>{user?.username[0]}</AvatarFallback>
                  </Avatar>
                <span className="mb-8 text-center text-l font-bold text-amber-800">{user?.username}</span>
                </div>
          </div>
        ) : (
          <div>
            <NavLink to='/login'>
              <span>Login</span>
            </NavLink>

            <NavLink to='/register' className='mx-3'>
              <span>Register</span>
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar

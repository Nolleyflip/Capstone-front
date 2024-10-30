import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProtectedInfo, onLogout } from '../api/auth'
import Layout from '../components/Layout'
import { unauthenticateUser } from '../redux/slices/authSlice'
import { Star, Utensils,Unlink2, ThumbsUp,AlarmClock, Search, MapPinHouse } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getBusiness, selectBusiness, selectBusinessStatus } from '@/redux/slices/businesSlice'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'



const Dashboard = () => {
  const dispatch = useDispatch()
  const [searchTerm, setSearchTerm] = useState('')

  const [loading, setLoading] = useState(true)
  const [protectedData, setProtectedData] = useState(null)
  const business = useSelector(selectBusiness)
  const status = useSelector(selectBusinessStatus)
  const logout = async () => {
    try {
      await onLogout()

      dispatch(unauthenticateUser())
      localStorage.removeItem('isAuth')
    } catch (error) {
      console.log(error.response)
    }
  }
  const filteredBusinesses = business.filter(business => 
  business.business_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  business.address.toLowerCase().includes(searchTerm.toLowerCase())
)

  const protectedInfo = async () => {
    try {
      const { data } = await fetchProtectedInfo()

      setProtectedData(data.info)

      setLoading(false)
    } catch (error) {
        console.log(error.response)
      logout()
    }
  }

  useEffect(() => {
    protectedInfo()
  }, [])

  useEffect(() => {
    console.log(status)
    if (status === 'idle') {
      console.log('hola')
        dispatch(getBusiness())
      }
    
  }, [dispatch])

  return loading ? (
    <Layout>
      <h1>Loading...</h1>
    </Layout>
  ) : (
    <div>
      <Layout>
        <h1>Dashboard</h1>
                  <h2>{protectedData}</h2>
                  <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-8">
  <h1 className="mb-8 text-center text-4xl font-bold text-amber-800">Discover Local Flavors</h1>
  
  <div className="mb-8 mx-auto max-w-2xl">
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-500 h-5 w-5" />
      <input
        type="text"
        placeholder="Search businesses by name or location..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full pl-12 pr-4 py-3 rounded-lg border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white shadow-sm"
      />
    </div>
  </div>

  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
    {filteredBusinesses.map((restaurant, index) => (
      // Your existing Card component code
      <Card key={index} className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <img src={restaurant.business_image} alt={restaurant.business_name} className="h-48 w-full object-cover" />
            <CardContent className="p-4">
              <h2 className="mb-2 text-xl font-semibold text-amber-900">{restaurant.business_name}</h2>
              <div className="mb-2 flex items-center">
                <Star className="mr-1 h-5 w-5 fill-amber-400 text-amber-400" />
                <span className="font-medium text-amber-900">{restaurant.rating.slice(0,3)}</span>
                {/* <span className="ml-1 text-sm text-amber-700">({restaurant.reviews} reviews)</span> */}
          </div>
           <div className="mb-2 flex items-center text-amber-700">
                <MapPinHouse className="mr-2 h-4 w-4" />
                <span>{restaurant.address}</span>
              </div>
              <div className="mb-2 flex items-center text-amber-700">
                <Unlink2 className="mr-2 h-4 w-4" />
                <span>{restaurant.website}</span>
              </div>
              <div className="mb-2 flex items-center text-amber-700">
                <AlarmClock className="mr-2 h-4 w-4" />
                <span>{restaurant.operating_hours}</span>
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between bg-amber-100 px-4 py-2">
              <Badge variant="secondary" className="bg-amber-200 text-amber-800">
                <ThumbsUp className="mr-1 h-3 w-3" />
                {/* {restaurant.topFeature} */}
              </Badge>
              <Link to={`/dashboard/${restaurant.business_id}`} className="rounded-full bg-amber-500 px-4 py-1 text-sm font-medium text-white transition-colors hover:bg-amber-600">
                View </Link>
              
            </CardFooter>
          </Card>
    ))}
  </div>
</div>
      
    

        <Button onClick={() => logout()} className="mt-2 bg-amber-500 text-white hover:bg-amber-600">
          Logout
        </Button>
      </Layout>
    </div>
  )
}

export default Dashboard





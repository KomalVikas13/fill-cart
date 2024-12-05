import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import RegistrationForm from './components/RegistrationForm'
import { Route, Routes } from 'react-router-dom'
import Loginform from './components/Loginform'
import Home from './pages/Home'
import { AuthProvider, useAuth } from './context/AuthContext'
import AdminPortal from './components/Admin/AdminPortal'
import AddProduct from './components/Admin/AddProduct'
import AddCategory from './components/Admin/AddCategory'
import Unauthorized from './components/401'
import ShoppingCart from './pages/ShoppingCart'
import AllProducts from './components/AllProducts'
import ProductDetailsPage from './components/ProductPage'
import UserProfile from './components/UserProfile'
import Orders from './components/Orders'
import PlaceOrder from './components/PlaceOrder'
import PaymentSuccess from './components/PaymentSuccess'
import PaymentFailed from './components/PaymentFailed'
import ReviewForm from './components/Review'
import AllProductList from './components/Admin/AllProductList'
import AllCategoryList from './components/Admin/AllCategoryList'
import AllUsers from './components/Admin/AllUsers'
import AllOrderList from './components/Admin/AllOrderList'

function AppRoutes() {
  const { isAuthenticated, role } = useAuth();
  return (
    <Routes>
      <Route path='/signup' element={<RegistrationForm></RegistrationForm>}></Route>
      <Route path='/login' element={<Loginform></Loginform>}></Route>
      <Route path='/' element={<Home />}></Route>
      <Route path='/404' element={<Unauthorized />}></Route>
      <Route path='/cart' element={<ShoppingCart />}></Route>
      <Route path='/all_products' element={<AllProducts />}></Route>
      <Route path='/product_detail' element={<ProductDetailsPage />}></Route>
      <Route path='/all_users' element={<AllUsers />}></Route>
      <Route path='/all_orders' element={<AllOrderList />}></Route>
      <Route path='/all_orders' element={<AllOrderList />}></Route>
      <Route path='/all_categories' element={<AllCategoryList />}></Route>
      <Route path='/placeOrder/:productId' element={<PlaceOrder></PlaceOrder>}></Route> {
        isAuthenticated && (
          <>
            <Route path='/userProfile' element={<UserProfile></UserProfile>}></Route>
            <Route path='/orders' element={<Orders></Orders>}></Route>

            <Route path='/placeOrder' element={<PlaceOrder></PlaceOrder>}></Route>
            <Route path='/payments/success' element={<PaymentSuccess></PaymentSuccess>}></Route>
            <Route path='/payments/cancel' element={<PaymentFailed></PaymentFailed>}></Route>
            <Route path='/review' element={<ReviewForm></ReviewForm>}></Route>
            {
              role === "[ROLE_ADMIN]" && (
                <>
                  <Route path='/adminPortal' element={<AdminPortal></AdminPortal>}></Route>
                  <Route path='/addProduct' element={<AddProduct></AddProduct>}></Route>
                  <Route path='/addCategory' element={<AddCategory></AddCategory>}></Route>
                  <Route path='/product_list' element={<AllProductList />}></Route>
                  <Route path='/category_list' element={<AllCategoryList />}></Route>
                </>
              )
            }
          </>
        )
      }
    </Routes>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}

export default App;


// {
//   "error": "Authentication failed: JWT expired at 2024-11-21T07:04:38Z. Current time: 2024-11-23T06:54:30Z, a difference of 172192289 milliseconds.  Allowed clock skew: 0 milliseconds."
// }

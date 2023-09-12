import React , {useState , useEffect} from "react";
import { BrowserRouter, Routes, Route , Navigate} from "react-router-dom";
import { Footer, Navbar } from './components'
import { Mainpage , Shoppage , Productpage , Loginpage , Registerpage , ShopCartpage , Errorpage} from "./pages";

const App = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("profile"));
    setUser(profile);
  }, []);
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={ <> <Navbar/><Mainpage /></>} />
          <Route path='/login' exact element={(!user ? <Loginpage/> : < Navigate to='/' />  )}/>
          <Route path='/register' exact element={(!user ? <Registerpage/> : < Navigate to='/' />  )}/>
          <Route path="/shop/:type" exact element={ <> <Navbar/><Shoppage /> </>} />
          <Route path="/shoppingCart/" exact element={<> <Navbar/><ShopCartpage /> <Footer/></>}/>
          <Route path="/shop/:type/price" exact element={<> <Navbar/><Shoppage /></>} />
          <Route path="/shop/:type/category" exact element={<> <Navbar/><Shoppage /></>} />
          <Route path="/shop/:type/search" exact element={<> <Navbar/><Shoppage /></>} />
          <Route path="/shop/product/:id" exact element={ <> <Navbar/><Productpage /></>} />
          <Route path="*" element={<> <Navbar/> <Errorpage /> </>} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;

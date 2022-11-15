import './App.css'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

import Login from './pages/Login/Login'
import Signup from './pages/Admin/Signup'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Bom from './pages/BOM/Bom'
import Tutorial from './pages/Tutorial/Tutorial'
import Admin from './pages/Admin/Admin'
import Inventories from './pages/Inventories/Inventories'
import OnlineUsers from './components/OnlineUsers'
import Chat from './pages/Chat/Chat'
import CreateBom from './pages/Admin/CreateBom'
import CreateMaterial from './pages/Admin/CreateMaterial'
import CreateMrp from './pages/Admin/CreateMrp'
import OrderedMaterial from './pages/Admin/OrderedMaterial'
import MaterialIn from './pages/Admin/MaterialIn'
import MaterialOut from './pages/Admin/MaterialOut'
import TutorialUpload from './pages/Admin/TutorialUpload'
import MaterialOrder from './pages/Admin/MaterialOrder'
import Logging from './pages/Admin/Logging'
import Collegaue from './pages/Admin/Collegaue'
import CollageueData from './pages/Admin/CollageueData'


function App() {

  const {user, authIsReady} = useAuthContext()

  return (
    <div className="App">

      {authIsReady && ( <BrowserRouter> 
        {user && <Sidebar />}
      
       <div className="container">
        <Navbar/>
            <Switch>
             <Route exact path="/">
                {!user && <Redirect to="/bejelentkezés" />}
                {user && <Chat />}
              </Route>
              <Route  path="/admin">
                {!user && <Redirect to="/bejelentkezés" />}
                {user && <Admin />}
              </Route>
              <Route  path="/bombeállítás">
                {!user && <Redirect to="/bejelentkezés" />}
                {user && <CreateBom />}
              </Route>
              <Route path="/bejelentkezés">
                 {user && <Redirect to="/" /> }
                 {!user && <Login /> }
              </Route>
              <Route path="/anyagfelvitel">
                 {!user && <Redirect to="/bejelentkezés" /> }
                 {user && <CreateMaterial /> }
              </Route>
              <Route path="/mrpbeállítás">
                 {!user && <Redirect to="/bejelentkezés" /> }
                 {user && <CreateMrp /> }
              </Route>
              <Route path="/bejövőanyag">
                 {!user && <Redirect to="/bejelentkezés" /> }
                 {user && <MaterialIn /> }
              </Route>
              <Route path="/kimenőanyag">
                 {!user && <Redirect to="/bejelentkezés" /> }
                 {user && <MaterialOut /> }
              </Route>              

              <Route path="/segédletupload">
                 {!user && <Redirect to="/bejelentkezés" /> }
                 {user && <TutorialUpload /> }
              </Route>
              <Route path="/segédlet">
                 {!user && <Redirect to="/bejelentkezés" /> }
                 {user && <Tutorial/> }
              </Route>
              <Route path="/anyagrendelés">
                 {!user && <Redirect to="bejelentkezés" /> }
                 {user && <MaterialOrder/> }
              </Route>

              <Route path="/napló">
                 {!user && <Redirect to="/bejelentkezés" /> }
                 {user && <Logging/> }
              </Route>
              <Route path="/kollégák">
                 {!user && <Redirect to="/bejelentkezés" /> }
                 {user && <Collegaue/> }
              </Route>
              <Route path="/kolléganyilvántartás">
                 {!user && <Redirect to="/bejelentkezés" /> }
                 {user && <CollageueData/> }
              </Route>
              <Route path="/feladottrendelések">
                 {!user && <Redirect to="/bejelentkezés" /> }
                 {user && <OrderedMaterial/> }
              </Route>
              <Route path="/regisztráció">   
                 {!user && <Redirect to="/bejelentkezés" /> }
                 {user && <Signup /> }          
              
              </Route>
              <Route path="/bom">
                <Bom />
              </Route>

              <Route path="/raktár">
                <Inventories />
              </Route>
              <Route path="/chat">
                {!user && <Redirect to="/bejelentkezés" /> }
                 {user && <Chat /> }
              </Route>
            </Switch>
     
          </div>
         <div className='online'> {user && <OnlineUsers />}</div>
      </BrowserRouter>
      )}
      </div>
  );
}

export default App

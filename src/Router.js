import { createBrowserRouter } from "react-router-dom";

import App from './App'
import Main from "./views/Main";
import Login from "./views/Login";
import Profile from "./views/Profile";
import Redirect from "./component/Redirect";
import Layout from "./views/Layout";

const Router = createBrowserRouter([
    {
        path:'/',
        element:<App/>,
        children:[
            {
                path:'/',
                element:<Main/>,
                children:[
                    {
                        path:'/',
                        element:<Layout/>
                    },{
                        path:'/login',
                        element:<Login/>
                    },{
                        path:'/profile',
                        element:<Profile/>
                    },{
                        path:'/redirect',
                        element:<Redirect/>
                    }
                ]
            }
        ]
    }
])

export default Router;
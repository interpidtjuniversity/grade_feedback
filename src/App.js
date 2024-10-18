import './App.css';
import {RouterProvider} from 'react-router-dom';

import React from 'react';
import router from "./router";

function App() {
  return (
      <div style={{height:"100%"}}>
          {<RouterProvider router={router}/>}
      </div>
  );
}

export default App;

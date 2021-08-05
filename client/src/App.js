import React from 'react'
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Layout from './components/layout/Layout'
import CreateRoom from './routes/CreateRoom'
import RoomWrapper from './routes/RoomWrapper';

function App() {
  return (
    <Layout>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={CreateRoom} />
          <Route path="/room/:roomID" component={RoomWrapper} />
        </Switch>
     </BrowserRouter>
    </Layout>
  );
}

export default App;

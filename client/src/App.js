import React from 'react'
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Layout from './components/layout/Layout'
import CreateRoom from './routes/CreateRoom'
import RoomWrapper from './routes/RoomWrapper';
import WaitingRoom from './routes/WaitingRoom';

function App() {
  return (
    <Layout>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={CreateRoom} />
          <Route path="/room/:roomID" component={RoomWrapper} />
          <Route path="/waitingroom" component={WaitingRoom} />
        </Switch>
     </BrowserRouter>
    </Layout>
  );
}

export default App;

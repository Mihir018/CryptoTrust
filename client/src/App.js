import Stats from "./Pages/Stats";
import Withdraw from "./Pages/WithdrawMoney";
import KYC from "./Pages/KYC";

import YourNFT from "./Pages/YourNFTS";
import Invest from "./Pages/Invest";
import Voting from "./Pages/Voting";

import Navigation from "./Navigation/Navigation";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navigation />
        <Switch>
          <Route path="/" component={Stats} exact />
          <Route path="/withdraw" component={Withdraw} />
          <Route path="/KYC" component={KYC} />

          <Route path="/YourNFTS" component={YourNFT}/>
          <Route path="/Invest" component={Invest} />
          <Route path="/Voting" component={Voting} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}
export default App;

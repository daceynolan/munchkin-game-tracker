import React, { useState, useEffect } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./components/Header";
import SplashScreen from "./components/SplashScreen";
import ConfigureGame from "./components/ConfigureGame";
import Game from "./components/Game";
import Results from "./components/Results";
import "./App.css";
import { GameContext } from "./contexts/gameContext";
import { Player } from "./utils/player";

const App = () => {
  const [players, setPlayers] = useState(
    Array(2)
      .fill(null)
      .map(() => new Player())
  );

  useEffect(() => {
    const savedGame = localStorage.getItem("game");
    if (savedGame) {
      setPlayers(JSON.parse(savedGame));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("game", JSON.stringify(players));
  }, [JSON.stringify(players)]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="game-header">
      <Header />
      <GameContext.Provider
        value={{
          usePlayers: [players, setPlayers]
        }}
      >
        <Router>
          <div className="game-content">
            <Switch>
              <Route exact path="/" component={SplashScreen} />
              <Route path="/configure" component={ConfigureGame} />
              <Route path="/game" component={Game} />
            </Switch>
          </div>
        </Router>
      </GameContext.Provider>
    </div>
  );
};

export default App;

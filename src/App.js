import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  PeaceFill,
  ToggleOn,
  ToggleOff,
  PuzzleFill,
  LightningChargeFill,
  Gem,
  EggFill,
  BrightnessHigh,
} from "react-bootstrap-icons";
import { Nav, Button } from "react-bootstrap";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = {
      gameStarted: false,
      gameMode: "player",
      turn: "unset",
      gameOver: false,
      availableSquares: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      playerArray: [],
      ComArray: [],
      playIcon: <PeaceFill className="PlayerIcon" />,
      CompIcon: <BrightnessHigh className="PlayerIcon" />,
    };
    this.state = { ...this.initialState };
  }

  ChangeGameMode = (event) => {
    event.preventDefault();
    if (this.state.gameStarted === true) {
      return;
    }
    if (this.state.gameMode === "player") {
      this.setState(() => {
        return {
          gameMode: "com",
        };
      });
    } else {
      this.setState(() => {
        return {
          gameMode: "player",
        };
      });
    }
  };

  changeTurnOrder = (event) => {
    let firstturn = this.state.gameMode === "player" ? "Player 1" : "Player";
    if (event.target.name === "Computer") {
      firstturn = this.state.gameMode === "player" ? "Player 2" : "Computer";
    }
    this.setState(() => {
      return {
        turn: firstturn,
      };
    });
  };

  SelectGameOrder = () => {
    return (
      <ul className="frame2">
        <li visibility="Hidden">
          <Button
            className="Button1"
            name="Player"
            onClick={this.changeTurnOrder}
          >
            {this.state.gameMode === "player"
              ? "Player 1 start"
              : "Player Start"}
          </Button>
        </li>
        <li>
          <Button
            className="Button2"
            name="Computer"
            onClick={this.changeTurnOrder}
          >
            {this.state.gameMode === "player"
              ? "Player 2 start"
              : "Computer Start"}
          </Button>
        </li>
      </ul>
    );
  };

  TurnTracker = () => {
    return <div className="IconInstruction">{this.state.turn}'s Turn</div>;
  };

  IsPlayerIcon = (event) => {
    switch (event.target.class) {
      case PeaceFill:
        this.setState(() => {
          return { playIcon: <PeaceFill className="PlayerIcon" /> };
        });
        break;
      case PuzzleFill:
        this.setState(() => {
          return { playIcon: <PuzzleFill className="PlayerIcon" /> };
        });
        break;
      case LightningChargeFill:
        this.setState(() => {
          return { playIcon: <LightningChargeFill className="PlayerIcon" /> };
        });
        break;
      case Gem:
        this.setState(() => {
          return { playIcon: <Gem className="PlayerIcon" /> };
        });
        break;
      case EggFill:
        this.setState(() => {
          return { playIcon: <EggFill className="PlayerIcon" /> };
        });
        break;
      default:
        this.setState(() => {
          return { playIcon: <PeaceFill className="PlayerIcon" /> };
        });
        break;
    }
  };

  ChooseIcon = () => {
    return (
      <div>
        <p className="IconInstruction">Choose your Icon:</p>
        <ul className="frame2">
          <li>
            <PeaceFill className="PlayerIcon" onClick={this.IsPlayerIcon} />
          </li>
          <li>
            <PuzzleFill className="PlayerIcon" onClick={this.IsPlayerIcon} />
          </li>
          <li>
            <LightningChargeFill
              className="PlayerIcon"
              onClick={this.IsPlayerIcon}
            />
          </li>
          <li>
            <Gem className="PlayerIcon" onClick={this.IsPlayerIcon} />
          </li>
          <li>
            <EggFill className="PlayerIcon" onClick={this.IsPlayerIcon} />
          </li>
        </ul>
      </div>
    );
  };

  PlayTurn = (event) => {
    event.preventDefault();
    this.setState((prevState) => {
      return {
        playerArray: [...prevState.playerArray, parseInt(event.target.id)],
      };
    });
  };

  GridDisplayHandler = () => {
    return (
      <div className="grid">
        <div className="GameGrid">
          <div class="GameGrid grid-view">
            <div>
              {this.state.playerArray.includes(0) ? (
                this.state.playIcon
              ) : this.state.ComArray.includes(0) ? (
                this.state.CompIcon
              ) : (
                <div id="0" onClick={this.PlayTurn} />
              )}
            </div>
            <div>
              {this.state.playerArray.includes(1) ? (
                this.state.playIcon
              ) : this.state.ComArray.includes(1) ? (
                this.state.CompIcon
              ) : (
                <div id="1" onClick={this.PlayTurn} />
              )}
            </div>
            <div>
              {this.state.playerArray.includes(2) ? (
                this.state.playIcon
              ) : this.state.ComArray.includes(2) ? (
                this.state.CompIcon
              ) : (
                <div id="2" onClick={this.PlayTurn} />
              )}
            </div>
            <div>
              {this.state.playerArray.includes(3) ? (
                this.state.playIcon
              ) : this.state.ComArray.includes(3) ? (
                this.state.CompIcon
              ) : (
                <div id="3" onClick={this.PlayTurn} />
              )}
            </div>
            <div>
              {this.state.playerArray.includes(4) ? (
                this.state.playIcon
              ) : this.state.ComArray.includes(4) ? (
                this.state.CompIcon
              ) : (
                <div id="4" onClick={this.PlayTurn} />
              )}
            </div>
            <div>
              {this.state.playerArray.includes(5) ? (
                this.state.playIcon
              ) : this.state.ComArray.includes(5) ? (
                this.state.CompIcon
              ) : (
                <div id="5" onClick={this.PlayTurn} />
              )}
            </div>
            <div>
              {this.state.playerArray.includes(6) ? (
                this.state.playIcon
              ) : this.state.ComArray.includes(6) ? (
                this.state.CompIcon
              ) : (
                <div id="6" onClick={this.PlayTurn} />
              )}
            </div>
            <div>
              {this.state.playerArray.includes(7) ? (
                this.state.playIcon
              ) : this.state.ComArray.includes(7) ? (
                this.state.CompIcon
              ) : (
                <div id="7" onClick={this.PlayTurn} />
              )}
            </div>
            <div>
              {this.state.playerArray.includes(8) ? (
                this.state.playIcon
              ) : this.state.ComArray.includes(8) ? (
                this.state.CompIcon
              ) : (
                <div id="8" onClick={this.PlayTurn} />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div className="Tictactoe">
        <Nav className="Header">
          <p className="Title">Tic Tac Toe</p>
        </Nav>
        <ul className="GameOptions">
          <li className="Subheader">vs Computer</li>
          <li>
            {this.state.gameMode === "player" ? (
              <ToggleOn
                className="Toggle"
                name="vPlayer"
                onClick={this.ChangeGameMode}
              />
            ) : (
              <ToggleOff
                className="Toggle"
                name="vCom"
                onClick={this.ChangeGameMode}
              />
            )}
          </li>
          <li className="Subheader">vs Player</li>
        </ul>
        <this.GridDisplayHandler />

        {this.state.turn !== "unset" ? (
          <this.TurnTracker />
        ) : (
          <this.SelectGameOrder />
        )}

        {this.state.gameStarted ? <div /> : <this.ChooseIcon />}
      </div>
    );
  }
}

export default App;

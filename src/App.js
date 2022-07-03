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

function PlayerIcon(playerchoice) {
  switch (playerchoice) {
    case "PeaceFill":
      return <PeaceFill className="GridIcon" />;
    case "PuzzleFill":
      return <PuzzleFill className="GridIcon" />;
    case "LightningChargeFill":
      return <LightningChargeFill className="GridIcon" />;
    case "Gem":
      return <Gem className="GridIcon" />;
    case "EggFill":
      return <EggFill className="GridIcon" />;
    default:
      return <PeaceFill className="GridIcon" />;
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = {
      gameStarted: false,
      gameOver: false,
      winner: "",
      gameMode: "com",
      turnOrder: "unset",
      turn: 1,
      gridvalue: { four: [4], three: [0, 2, 6, 8], two: [1, 3, 5, 7] },
      winningArrays: ["012", "345", "678", "036", "147", "258", "048", "246"],
      playerArray: [],
      ComArray: [],
      GridArray: [
        "null",
        "null",
        "null",
        "null",
        "null",
        "null",
        "null",
        "null",
      ],
      playIcon: "PeaceFill",
    };
    this.state = { ...this.initialState };
  }

  toggleGameMode = (event) => {
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
        gameStarted: true,
        turnOrder: firstturn,
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

  resetgame = (event) => {
    this.state = { ...this.initialState };
  };

  TurnTracker = () => {
    return (
      <div>
        {this.state.gameOver ? (
          <div className="IconInstruction">{this.state.winner}</div>
        ) : (
          this.renderGameGrid()
        )}
        <div className="IconInstruction">
          <div>{this.state.turnOrder}'s Turn</div>
          <Button className="Button3" name="Player" onClick={this.resetgame}>
            Surrender{" "}
          </Button>
        </div>
      </div>
    );
  };

  IsPlayerIcon = (event) => {
    var userchoice = event.currentTarget.id;
    console.log(userchoice);
    this.setState(() => {
      return { playIcon: userchoice };
    });
  };

  ChooseIcon = () => {
    return (
      <div>
        <p className="IconInstruction">Choose your Icon:</p>
        <ul className="frame2">
          <li>
            <button id="PeaceFill" onClick={this.IsPlayerIcon}>
              <title visibility="hidden">Hi</title>
              <PeaceFill className="PlayerIcon" />
            </button>
          </li>
          <li>
            <button>
              <title visibility="hidden">Hi</title>
              <PuzzleFill
                id="PuzzleFill"
                onClick={this.IsPlayerIcon}
                className="PlayerIcon"
              />
            </button>
          </li>
          <li>
            <button>
              <title visibility="hidden">Hi</title>
              <LightningChargeFill
                className="PlayerIcon"
                id="LightningChargeFill"
                onClick={this.IsPlayerIcon}
              />
            </button>
          </li>
          <li>
            <button>
              <title visibility="hidden">Hi</title>
              <Gem
                className="PlayerIcon"
                id="Gem"
                onClick={this.IsPlayerIcon}
              />
            </button>
          </li>
          <li>
            <button>
              <title visibility="hidden">Hi</title>
              <EggFill
                className="PlayerIcon"
                id="EggFill"
                onClick={this.IsPlayerIcon}
              />
            </button>
          </li>
        </ul>
      </div>
    );
  };

  PlayTurn = (event) => {
    event.preventDefault();
    let newGrid = [...this.state.GridArray];
    const newplayerstate = [
      ...this.state.playerArray,
      parseInt(event.target.id),
    ];
    let newGridValue = this.state.gridvalue;
    let checkvalue = this.state.gridvalue.two.indexOf(
      parseInt(event.target.id)
    );
    if (checkvalue === -1) {
      checkvalue = this.state.gridvalue.three.indexOf(
        parseInt(event.target.id)
      );
      if (checkvalue === -1) {
        newGridValue.four = [];
      } else {
        newGridValue.three = [
          ...newGridValue.three.splice(0, checkvalue),
          ...newGridValue.three.splice(checkvalue),
        ];
      }
    }
    console.log(this.state.winningArrays.includes(newplayerstate.join("")));
    if (this.state.winningArrays.includes(newplayerstate.join(""))) {
      this.setState(() => {
        return { ...this.initialState, winner: "player" };
      });
    }
    const comChoice = this.ComTurn(event.currentTarget.id, newplayerstate);
    let checkComvalue = this.state.gridvalue.two.indexOf(comChoice);
    if (checkComvalue === -1) {
      checkComvalue = this.state.gridvalue.three.indexOf(comChoice);
      if (checkComvalue === -1) {
        newGridValue.four = [];
      } else {
        newGridValue.three = [
          ...newGridValue.three.splice(0, checkvalue),
          ...newGridValue.three.splice(checkvalue),
        ];
      }
    }

    newGrid[comChoice] = "x";
    newGrid[event.currentTarget.id] = "O";
    this.setState((prevState) => {
      return {
        gridvalue: newGridValue,
        ComArray: [...prevState.ComArray, comChoice],
        playerArray: newplayerstate,
        GridArray: newGrid,
        turn: prevState.turn + 1,
      };
    });
  };

  ComTurn = (playerchoice, playerArray) => {
    if (this.state.turn === 1 && playerchoice == 4) {
      const bestchoice = this.state.gridvalue.three.pop();
      return bestchoice;
    } else if (this.state.turn === 1) {
      return 8 - playerchoice;
    } else {
      const playerA = playerArray.sort();
      if (this.state.winningArrays.includes(playerA.join(""))) {
        this.setState(() => {
          return { ...this.initialState };
        });
      } else {
        let checkwin = this.state.winningArrays;
        for (let i = 0; i < checkwin.length; i += 1) {
          let winningstring = checkwin[i];
          console.log(playerA);
          for (let v = 0; v < playerA.length; v += 1) {
            winningstring = winningstring.replace(playerA[v], "");
            console.log("this" + winningstring);
            if (winningstring.length === 1) {
              let newArray = [
                ...checkwin.splice(0, i),
                ...checkwin.splice(i + 1),
              ];
              this.setState(() => {
                return {
                  winningArrays: newArray,
                  playerArray: [],
                };
              });
              return parseInt(winningstring);
            }
          }
        }

        if (this.state.gridvalue.three.length > 0) {
          let composition = this.state.gridvalue.three;
          return parseInt(composition.pop());
        } else if (this.state.gridvalue.four.length > 0) {
          return 4;
        } else {
          let composition = this.state.gridvalue.two;
          return parseInt(composition.pop());
        }
      }
    }
  };

  renderGameGrid = () => {
    return (
      <div className="grid">
        <div className="GameGrid">
          <div className="GameGrid grid-view">
            <div>
              {this.state.GridArray[0] === "O" ? (
                PlayerIcon(this.state.playIcon)
              ) : this.state.GridArray[0] === "x" ? (
                <BrightnessHigh className="GridIcon" />
              ) : (
                <div id="0" onClick={this.PlayTurn} />
              )}
            </div>
            <div>
              {this.state.GridArray[1] === "O" ? (
                PlayerIcon(this.state.playIcon)
              ) : this.state.GridArray[1] === "x" ? (
                <BrightnessHigh className="GridIcon" />
              ) : (
                <div id="1" onClick={this.PlayTurn} />
              )}
            </div>
            <div>
              {this.state.GridArray[2] === "O" ? (
                PlayerIcon(this.state.playIcon)
              ) : this.state.GridArray[2] === "x" ? (
                <BrightnessHigh className="GridIcon" />
              ) : (
                <div id="2" onClick={this.PlayTurn} />
              )}
            </div>
            <div>
              {this.state.GridArray[3] === "O" ? (
                PlayerIcon(this.state.playIcon)
              ) : this.state.GridArray[3] === "x" ? (
                <BrightnessHigh className="GridIcon" />
              ) : (
                <div id="3" onClick={this.PlayTurn} />
              )}
            </div>
            <div>
              {this.state.GridArray[4] === "O" ? (
                PlayerIcon(this.state.playIcon)
              ) : this.state.GridArray[4] === "x" ? (
                <BrightnessHigh className="GridIcon" />
              ) : (
                <div id="4" onClick={this.PlayTurn} />
              )}
            </div>
            <div>
              {this.state.GridArray[5] === "O" ? (
                PlayerIcon(this.state.playIcon)
              ) : this.state.GridArray[5] === "x" ? (
                <BrightnessHigh className="GridIcon" />
              ) : (
                <div id="5" onClick={this.PlayTurn} />
              )}
            </div>
            <div>
              {this.state.GridArray[6] === "O" ? (
                PlayerIcon(this.state.playIcon)
              ) : this.state.GridArray[6] === "x" ? (
                <BrightnessHigh className="GridIcon" />
              ) : (
                <div id="6" onClick={this.PlayTurn} />
              )}
            </div>
            <div>
              {this.state.GridArray[7] === "O" ? (
                PlayerIcon(this.state.playIcon)
              ) : this.state.GridArray[7] === "x" ? (
                <BrightnessHigh className="GridIcon" />
              ) : (
                <div id="7" onClick={this.PlayTurn} />
              )}
            </div>
            <div>
              {this.state.GridArray[8] === "O" ? (
                PlayerIcon(this.state.playIcon)
              ) : this.state.GridArray[8] === "x" ? (
                <BrightnessHigh className="GridIcon" />
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
                onClick={this.toggleGameMode}
              />
            ) : (
              <ToggleOff
                className="Toggle"
                name="vCom"
                onClick={this.toggleGameMode}
              />
            )}
          </li>
          <li className="Subheader">vs Player</li>
        </ul>

        {this.state.turnOrder !== "unset"
          ? this.TurnTracker()
          : this.SelectGameOrder()}

        {this.state.gameStarted ? <div /> : this.ChooseIcon()}
      </div>
    );
  }
}

export default App;

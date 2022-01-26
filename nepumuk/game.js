
export class Game {
    
  constructor() {
    this.name = "Reversi"
    this.setupUI()
    this.setupFields()
    
    
    
    this.newGame()
    
    
    this.loadGame() // for development
  }
  
  saveGame() {
    
    var jsonFields = this.getFields().map(ea => {
      return {x: ea.x, y: ea.y, color: this.fieldColor(ea) }
    })

    var gameInfo = {
      id: "gameInfo",
      player: this.player,
      whitemoves: this.whitemoves,
      blackmoves: this.blackmoves,
      endlessGame: this.endlessGame,
      fields: jsonFields
    }
    
    
    localStorage["nepomukReversiGame1"] = JSON.stringify(gameInfo)
    
    
    lively.notify("saved", localStorage["nepomukReversiGame1"]  )
  }
  
  loadGame() {
    try {
      var gameInfo = JSON.parse(localStorage["nepomukReversiGame1"])
    } catch(e) {
      // could not load
    }
    if (!gameInfo || !gameInfo.fields) {
      lively.warn("could not load game")
      return
    }
    
    for(let ea of gameInfo.fields) {
      var field = this.getField(ea.x, ea.y)
      this.setFieldColor(field, ea.color)
    }
    this.player = gameInfo.player
    this.whitemoves= gameInfo.whitemoves
    this.blackmoves= gameInfo.blackmoves
    this.endlessGame= gameInfo.endlessGame
    
    this.updateInfoBox()
  }
  
  newGame() {
    var fields = this.getFields()
    for(let field of fields) {
      this.setFieldColor(field, "gray")
    }
    this.player= "white"  
    this.whitemoves = 32
    this.blackmoves = 32
    this.endlessGame = false
    
    this.updateInfoBox()
  }
  
  
  setupUI() {
   
    this.board = <div class="board"
      style="position: relative; width: 490px; height: 490px; background-color: lightgray">
    </div>  
    this.pane = <div class="pane" >
        <div id="buttons">
          <button click={() => this.loadGame()}>load</button>
          <button click={() => this.saveGame()}>save</button>
          <button click={() => this.newGame()}>new</button>
        </div>
        {this.board}
      </div>
      
    this.pane.game = this
  }
  
  setupFields() {
    for(var i=0; i<8; i++) {
      for(var j=0; j<8; j++) {
        let id = "field_"+j + "_" + i
        let field = <div id={id} class="field" style="position: absolute; top: 10px; left: 10px; width: 50px; height: 50px; background-color: gray"></div>
        lively.setPosition(field, lively.pt(10 + j*60 , 10 + i*60))
        field.x = j;
        field.y = i;
        
        // debug info
        // field.textContent = "" + i + " / " + j
        
        field.addEventListener("click", evt => {
             this.onFieldClick(field) 
        })
        this.board.appendChild(field)
      }
    } 
  }
  
  getFields() {
    return this.board.querySelectorAll(".field")
  }
  
  getField(field_x, field_y) {
    var result =  this.board.querySelector("#field_"+ field_x + "_" + field_y) 
    // if (!result) return undefined
    return result
    // return this.getFields().find(ea => ea.x == field_x && ea.y == field_y)
  }
  
  fieldColor(field) {
    if (!field || !field.style) return undefined
    return field.style.backgroundColor
  }
  
  setFieldColor(field, color) {
    field.style.backgroundColor = color
  }
  
  
  opositeColor(color) {
    if (color === "white") {
      return "black"
    }
    if (color === "black") {
      return "white"
    }
  }
  
  // returns true when finished
  gatherFieldsThatWouldTurnColor(color, a, b, i, j, result, debugColor) {
    var otherField = this.getField(i, j)
    if (otherField == undefined){
      result.removeAll()
      return true
    }
    if (debugColor) {
      var marker = lively.showElement(otherField)
      marker.innerHTML = "" // "i " + i + " j " + j
      marker.style.border = "2px dashed " +  debugColor
    }
    var otherColor = this.fieldColor(otherField)
    if (otherColor == color) {
      return true
    }
    if (otherColor == this.opositeColor(color)) {
      result.push(otherField)
    }
    if (otherColor != "white" && otherColor != "black" ) {
      result.removeAll()
      return true
    }
  }
  
  fieldsThatWouldTurnColorLeft(color, a, b) {
    var result = []
    var j = b
    for(var i = a - 1; i >= -1; i--) {
      if (this.gatherFieldsThatWouldTurnColor(color, a, b, i, j, result)) return result
    }  
    return result
  }
  
  fieldsThatWouldTurnColorRight(color, a, b) {
    var result = []
    var j = b
    for(var i = a + 1; i <= 8; i++) {
      if (this.gatherFieldsThatWouldTurnColor(color, a, b, i, j, result)) return result
    }  
    return result
  }
  
  fieldsThatWouldTurnColorTop(color, a, b) {
    var result = []
    var i = a
    for(var j = b - 1; j >= -1; j--) {
      if (this.gatherFieldsThatWouldTurnColor(color, a, b, i, j, result, /* "blue" */)) return result
    }  
    return result
  }
  
  fieldsThatWouldTurnColorBottom(color, a, b) {
    var result = []
    var i = a
    for(var j = b + 1; j <= 8; j++) {
      if (this.gatherFieldsThatWouldTurnColor(color, a, b, i, j, result)) return result
    }  
    return result
  }
  
   fieldsThatWouldTurnColorTopLeft(color, a, b) {
    var result = []


    var step = 0
    var i = a
    var j = b 
    while(step++ <= 8) {
      i++
      j++
      if (this.gatherFieldsThatWouldTurnColor(color, a, b, i, j, result)) return result
    }      
    return result
  }

  fieldsThatWouldTurnColorTopRight(color, a, b) {
    var result = []
    var step = 0
    var i = a
    var j = b
    while(step++ <8){
      i--
      j--
      if (this.gatherFieldsThatWouldTurnColor(color, a, b, i, j, result)) return result
    }
    return result
  }

  fieldsThatWouldTurnColorBottomLeft(color, a, b) {
    var result = []
    var step = 0
    var i = a
    var j = b
    while(step++ >= 0){
      i--
      j++
      if (this.gatherFieldsThatWouldTurnColor(color, a, b, i, j, result)) return result
    }
    return result
  }
  
  
  fieldsThatWouldTurnColorBottomRight(color, a, b) {
    var result = []
    var step = 0
    var i = a
    var j = b
    while(step++ >= 0){
      i++
      j--
      if (this.gatherFieldsThatWouldTurnColor(color, a, b, i, j, result)) return result
    }
    return result
  }

  
  
  
  
  
  fieldsThatWouldTurnColor(color, a, b) {
    // lively.notify("would turn " + color + " " + a  + " " + b)
    
    var fields = []
    
    var field = this.getField(a, b)
    if (field) {
      fields.push(field)
    }
    
    fields.push(...this.fieldsThatWouldTurnColorLeft(color, a, b))
    fields.push(...this.fieldsThatWouldTurnColorRight(color, a, b))
    fields.push(...this.fieldsThatWouldTurnColorTop(color, a, b))
    fields.push(...this.fieldsThatWouldTurnColorBottom(color, a, b))
    
    fields.push(...this.fieldsThatWouldTurnColorTopLeft(color, a, b))
    fields.push(...this.fieldsThatWouldTurnColorTopRight(color, a, b))
    fields.push(...this.fieldsThatWouldTurnColorBottomLeft(color, a, b))
    fields.push(...this.fieldsThatWouldTurnColorBottomRight(color, a, b))
    
    
    // TODO find all fields that would turn!
    // not correct
    // fields.push(this.getField(0, 0))
    
    // for(var i=0; i<8; i++) {
    //   for(var j=0; j<8; j++) {
    //     var otherField = this.getField(j, i)
    //     if (j % 2 === 0) {
    //       // fields.push(otherField) // also not correct
    //     }
    //   }
    // } 
    
    
    
    return fields
  }
  
  onFieldClick(field) {
    if (!this.endlessGame && this.whitemoves <= 0 && this.blackmoves <= 0) {
      lively.notify("Game over")
      return
    }
    
    
    // Nur in leere Felder legen   
    if (field.style.backgroundColor == "black" || field.style.backgroundColor == "white") {
      return 
    }
    
    var a = field.x
    var b = field.y
    
    var turnedFields = this.fieldsThatWouldTurnColor(this.player, field.x, field.y)
    if (turnedFields.length === 0) return;
    
    if (turnedFields.length == 1) {
      if ((a === 3 || a === 4) && (b === 3 || b === 4)) {
        // mitte ist erlaubt
      } else {
        return
      }
    }
    
    
    for(let eaField of turnedFields) {
      this.setFieldColor(eaField, this.player)
    }
    
    this.changePlayer()
  } 
  
  
  
  setPlayer(color) {
    
    if (color === "white" &&  this.whitemoves <= 0) {
      lively.notify("Black continous!")
      return
    }
    if (color === "black" &&  this.blackmoves <= 0) {
      lively.notify("white continous!")
      return
    }

  // TODO FIX moves left
//     if (color === "black"){
//       this.blackmoves   = this.blackmoves   - 1
//     }
    
//     if (color === "white"){
//       this.whitemoves   = this.whitemoves   - 1
//     }
    
    
    this.player = color
    this.updateInfoBox() 
  }
  
  playerMoves() {
    if (this.player === "black") {
      return this.blackmoves  
    } else {
      return this.whitemoves
    }
  }
  
  
  changePlayer() {
    if (this.player === "black") {
      this.setPlayer("white")
    } else {
      this.setPlayer("black")
    } 
  }

  updateInfoBox() {
    if (!this.infoBox) return 
    
    this.infoBox.innerHTML = ""
    let indicator = <div style="width: 20px; height: 20px; border: 1px solid black"></div>
    indicator.style.backgroundColor = this.player
    var movesLeft = <span>{this.playerMoves()}  moves left</span>
    
    this.infoBox.appendChild(
      <span> Current Player: {indicator} {this.endlessGame ?  "" : movesLeft}<br/></span>)
  }
  
  getInfoBox() {
    this.infoBox = <div></div> 
    this.updateInfoBox() 
    return this.infoBox 
  }
  
}


 // TIP i++ oder j++
      // altermativ
      // for(var j = b + 1; j < 8; j++) {
      // UND i++
      // while(step++ < 8) {








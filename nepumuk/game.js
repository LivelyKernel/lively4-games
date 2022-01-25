
export class Game {
    
  constructor() {
    this.name = "Reversi"
    this.player= "white" 
    
    this.whitemoves_left = 32
    this.blackmoves_left = 32
     
    this.setupUI()
    this.setupFields()
  }
  
  setupUI() {
    this.pane = <div 
      class="pane" 
      style="position: relative; width: 490px; height: 490px; background-color: lightgray">
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
        this.pane.appendChild(field)
      }
    } 
  }
  
  getFields() {
    return this.pane.querySelectorAll(".field")
  }
  
  getField(field_x, field_y) {
    return this.getFields().find(ea => ea.x == field_x && ea.y == field_y)
  }
  
  fieldColor(field) {
    return field.style.backgroundColor
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
  gatherFieldsThatWouldTurnColor(color, a, b, i, j, result) {
    var otherField = this.getField(i, j)
    lively.showElement(otherField)
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
    for(var i = a - 1; i >= 0; i--) {
      if (this.gatherFieldsThatWouldTurnColor(color, a, b, i, j, result)) return result
    }  
    return result
  }
  
  fieldsThatWouldTurnColorRight(color, a, b) {
    var result = []
    var j = b
    for(var i = a + 1; i < 8; i++) {
      if (this.gatherFieldsThatWouldTurnColor(color, a, b, i, j, result)) return result
    }  
    return result
  }
  
  fieldsThatWouldTurnColorTop(color, a, b) {
    var result = []
    var i = a
    for(var j = b - 1; j >= 0; j--) {
      if (this.gatherFieldsThatWouldTurnColor(color, a, b, i, j, result)) return result
    }  
    return result
  }
  
  fieldsThatWouldTurnColorBottom(color, a, b) {
    var result = []
    var i = a
    for(var j = b + 1; j < 8; j++) {
      if (this.gatherFieldsThatWouldTurnColor(color, a, b, i, j, result)) return result
    }  
    return result
  }
  
   fieldsThatWouldTurnColorTopLeft(color, a, b) {
    var result = []

    // HOMEWORK
    
    return result
  }

  fieldsThatWouldTurnColorTopRight(color, a, b) {
    var result = []

    // HOMEWORK
    
    return result
  }

  fieldsThatWouldTurnColorBottomLeft(color, a, b) {
    var result = []

    // HOMEWORK
    
    return result
  }
  
  
  fieldsThatWouldTurnColorBottomRight(color, a, b) {
    var result = []

    // HOMEWORK
    
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
    if (this.whitemoves_left <= 0 && this.blackmoves_left <= 0) {
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
  
  setFieldColor(field, color) {  
    field.style.backgroundColor = color
    
    if (color === "black"){
      this.blackmoves_left   = this.blackmoves_left   - 1
    }
    
    if (color === "white"){
      this.whitemoves_left   = this.whitemoves_left   - 1
    }
  }
  
  setPlayer(color) {
    
    if (color === "white" &&  this.whitemoves_left <= 0) {
      lively.notify("Black continous!")
      return
    }
    if (color === "black" &&  this.blackmoves_left <= 0) {
      lively.notify("white continous!")
      return
    }
    
    
    this.player = color
    this.updateInfoBox() 
  }
  
  playerMoves() {
    if (this.player === "black") {
      return this.blackmoves_left  
    } else {
      return this.whitemoves_left
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
    this.infoBox.innerHTML = ""
    this.infoBox.appendChild(<span>Current Player: {this.player} {this.playerMoves()} <br/></span>)
  }
  
  getInfoBox() {
    this.infoBox = <div></div> 
    this.updateInfoBox() 
    return this.infoBox 
  }
  
}











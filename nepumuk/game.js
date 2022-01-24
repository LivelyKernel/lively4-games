
export class Game {
    
  constructor() {
    this.name = "Reversi"
    this.player= "white" 
    
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
        let id = "field_"+i + "_" + j
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
  
  
  fieldsThatWouldTurnColor(color, x, y) {
    // lively.notify("would turn " + color + " " + x  + " " + y)
    
    var fields = []
    
    var field = this.getField(x, y)
    if (field) {
      fields.push(field)
    }
    
    // TODO find all fields that would turn!
    // not correct
    // fields.push(this.getField(0, 0))
    
    for(var i=0; i<8; i++) {
      for(var j=0; j<8; j++) {
        var otherField = this.getField(j, i)
        if (j % 2 === 0) {
          // fields.push(otherField) // also not correct
        }
      }
    } 
    
    
    
    return fields
  }
  
  
  onFieldClick(field) {
    ///Nur in leere Felder legen   
    if (field.style.backgroundColor == "black" || field.style.backgroundColor == "white"){
      return 
    } 
    
    var turnedFields = this.fieldsThatWouldTurnColor(this.player, field.x, field.y)
    if (turnedFields.length === 0) return;
    
    for(let eaField of turnedFields) {
      eaField.style.backgroundColor = this.player
    }
    
    this.changePlayer()
    
    
   
  } 
  
  setPlayer(color) {
    this.player = color
    this.infoBox.innerHTML = color
  }
  
  changePlayer() {
    if (this.player === "black") {
      this.setPlayer("white")
    } else {
      this.setPlayer("black")
    } 
  }

  getInfoBox() {
    this.infoBox = <div >{this.player}</div> 
      
    return this.infoBox 
  }
  
}


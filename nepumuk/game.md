# Ein Spiel


<script>




  var pane = <div class="pane" style="position: relative; width: 600px; height: 600px; background-color: lightgray">


  </div>


  for(var i=0; i<8; i++) {
    for(var j=0; j<8; j++) {

      let field = <div class="field" style="position: absolute; top: 10px; left: 10px; width: 50px; height: 50px; background-color: gray"></div>
      lively.setPosition(field, lively.pt(10 + j*60 , 10 + i*60))

      // field.style.backgroundColor = `rgb(${i * 13},${j * 13},0)`

      field.addEventListener("click", evt => {
          if (field.style.backgroundColor === "white") {
            field.style.backgroundColor = "black"
          } else {
            field.style.backgroundColor = "white"
          
          } 
      
      })

      
      pane.appendChild(field)
    }
  }



  pane
</script>


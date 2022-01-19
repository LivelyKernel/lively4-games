# Ein Spiel


<script>




  var pane = <div class="pane" style="position: relative; width: 600px; height: 600px; background-color: lightgray">


  </div>


  for(var i=0; i<16; i++) {
    for(var j=0; j<16; j++) {

      let field = <div class="field" style="position: absolute; top: 10px; left: 10px; width: 30px; height: 30px; background-color: gray"></div>
      lively.setPosition(field, lively.pt(10 + j*40 , 10 + i*40))

      field.style.backgroundColor = `rgb(${i * 13},${j * 13},0)`

      
      pane.appendChild(field)
    }
  }



  pane
</script>


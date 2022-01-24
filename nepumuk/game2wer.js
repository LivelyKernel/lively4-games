export default function werIstDran () {
  
    let field2 = <div class="field" style="position: absolute; top: 10px; left: 10px; width: 50px; height: 50px; background-color: gray"></div> 
    lively.setPosition(field2, lively.pt())
  ///Was macht lively.setPosition wie kann ich die Position ändern. Wie kann ich sehen ob es   überhaupt sich ausführen lässt
  ///

    field2.addEventListener("click", evt => {
          if (field2.style.backgroundColor === "gray") {
            field2.style.backgroundColor = "black"
          if (field2.style.backgroundColor === "white") {
            field2.style.backgroundColor = "black"
          }
          } else {
            field2.style.backgroundColor = "white"
          } 
      })
   
}



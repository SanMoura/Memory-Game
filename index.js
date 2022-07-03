//constantes de configuracao
var score = 1000;

const quantityOptions = 12
let valuesOptions = 1

const object = {
  elements: []
}

for (let index = 0; index < quantityOptions; index++) {
  
  object.elements.push({
    value: valuesOptions,
    id: index
  })

  if (index % 2 != 0){
    valuesOptions++
  }
}

function shuffleArray(arr) {
  // Loop em todos os elementos
for (let i = arr.length - 1; i > 0; i--) {
      // Escolhendo elemento aleatório
  const j = Math.floor(Math.random() * (i + 1));
  // Reposicionando elemento
  [arr[i], arr[j]] = [arr[j], arr[i]];
}
// Retornando array com aleatoriedade
return arr;
}

object.elements = shuffleArray(object.elements)

document.getElementById('score').innerHTML = score

// criar os elementos de opcao na tela
object.elements.forEach((e) => {
  addcardCustoms(e.value, e.id)
  document.getElementById(e.id).setAttribute('class', 'cardCustom animate__animated animate__fadeIn animate__delay-2s')
  document.getElementById(e.id).setAttribute('class', 'cardCustom animate__animated animate__flipOutY animate__delay-3s')
})

//esconde os valores depois do tempo de momorizacao
const st1 = setTimeout(() => {
  object.elements.forEach((e) => {
    document.getElementById(e.id).innerHTML = '&nbsp;&nbsp;'
    document.getElementById(e.id).setAttribute('class', 'cardCustom animate__animated animate__fadeIn')
  })
}, 4000)

function addcardCustoms(pValue, pId){
  const div = document.createElement("div");
  div.classList.add("cardCustom");
  
  const id = document.createAttribute('id')
  id.value = pId

  div.setAttributeNode(id)
  div.setAttribute('onclick', 'choosecardCustom(this)')

  const text = document.createTextNode(pValue);
  div.appendChild(text);

  document.getElementById("grid").appendChild(div);
}

function verifyValues(id1, id2){
  const valueId1 = object.elements.find(e => e.id == id1).value
  const valueId2 = object.elements.find(a => a.id == id2).value

  if (valueId1 === valueId2){
    return {
      valueId1, valueId2
    }
  }else{
    score = score - 100
    document.getElementById('score').innerHTML = score
    return false
  }
}

function choosecardCustom(cardCustom){

  document.getElementById('score').innerHTML = score

  if (score == 0){
    document.getElementById('main').setAttribute('hidden', 'hidden')
  }

  document.getElementById('sobreposta').setAttribute('class', 'zIndex')
 
  let inputcardCustom1 = document.getElementById('cardCustom1')
  const cardCustom1 = object.elements.find(a => a.id == cardCustom.id)
  const cardCustom2 = object.elements.find(e => e.id == cardCustom.id)
  

  document.getElementById(cardCustom.id).setAttribute('class', 'cardCustom animate__animated animate__flipInY')
  document.getElementById(cardCustom.id).innerHTML = inputcardCustom1.value ? cardCustom2.value : cardCustom1.value


  if (inputcardCustom1.value && (inputcardCustom1.value != cardCustom.id)){
  
    let verValues = verifyValues(inputcardCustom1.value, cardCustom.id)
    if (verValues){
      document.getElementById(inputcardCustom1.value).innerHTML = verValues.valueId1
      document.getElementById(cardCustom.id).innerHTML = verValues.valueId2
      document.getElementById('cardCustom1').value = null
      document.getElementById('sobreposta').setAttribute('class', '')
    }else{
     
      document.getElementById(inputcardCustom1.value).setAttribute('class', 'cardCustom animate__animated animate__headShake')
      document.getElementById(cardCustom.id).setAttribute('class', 'cardCustom animate__animated animate__headShake')

      const st2 = setTimeout((a = inputcardCustom1.value, b = cardCustom.id) => {
        console.log(`a: ${a}, b: ${b}`)
        document.getElementById(a).innerHTML = '&nbsp;&nbsp;'
        document.getElementById(b).innerHTML = '&nbsp;&nbsp;'
        document.getElementById('cardCustom1').value = null
        document.getElementById('sobreposta').setAttribute('class', '')
      }, 1000)

    }

    //zerando input
   

  }else{
    inputcardCustom1.value = cardCustom.id
    console.log(`else inputcardCustom1.value: ${inputcardCustom1.value}`)
    document.getElementById('sobreposta').setAttribute('class', '')
  }

}


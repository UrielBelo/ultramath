const $display = document.getElementById('display')
const $options = document.getElementById('options')
const $right = document.getElementById('right')
const $wrong = document.getElementById('wrong')

let rights = 0
let wrongs = 0

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function makeCount(){
    const method = getRandomIntInclusive(1,2) == 1 ? 'x' : '÷'
    let p1,p2,r

    p1 = getRandomIntInclusive(1,10)
    p2 = getRandomIntInclusive(1,10)
    r = p1*p2
    if(method == 'x'){
        return {p1: p1, p2: p2, r: r, m: 'x'}
    }
    if(method == '÷'){
        return {p1: r, p2: p1, r:p2, m: '÷'}
    }
}
function renderScore(){
    $right.innerHTML = rights
    $wrong.innerHTML = wrongs
}

function start(){
    renderScore()
    const {p1,p2,r,m} = makeCount()
    const count = `${p1} ${m} ${p2} = ${'_'.repeat(r.toString().length)}`
    $display.innerHTML = count

    appendOptions(r,m)
}

function appendOptions(right,m){
    $options.innerHTML = ''
    const options = []
    options.push(right)
    for(var i=0; i<5; i++){
        if(m == 'x'){
            options.push(getRandomExcept(10,80,options))
        }else{
            options.push(getRandomExcept(1,10,options))
        }
    }

    const shuffleOptions = shuffle(options)

    for(i of shuffleOptions){
        createButton(i,right)
    }
}

function getRandomExcept(min,max,except){
    const gen = getRandomIntInclusive(min,max)
    if(except.indexOf(gen) == -1){
        return gen
    }else{
        return getRandomExcept(min,max,except)
    }
}

function createButton(inner,right){
    const $button = document.createElement('button')
    $button.classList.add('option')
    $button.innerHTML = inner
    $button.setAttribute('value',inner)
    $button.addEventListener('mousedown', (ev) => {
        if(ev.target.value == right){
            rights++
            start()
        }else{
            wrongs++
            start()
        }
    })

    $options.appendChild($button)
}

function shuffle(array) {
    var m = array.length, t, i;

    while (m) {
      i = Math.floor(Math.random() * m--)
      t = array[m]
      array[m] = array[i]
      array[i] = t
    }
  
    return array
}

start()
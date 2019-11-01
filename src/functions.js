function renderAllGames(toyArray) {
    toyArray.map(toy => addGame(toy))
  }
  
  function addGame(toy) {
    const toyContainer = document.querySelector('#toy-collection')
    const div = renderSingleGame(toy);
    toyContainer.append(div);
  }
  
  function renderSingleGame(toy) {
  
    let card_Div = document.createElement('div')
    card_Div.className = "card"
  
    let toy_Div = document.createElement('div')
    toy_Div.className = "toy-frame"
  
    let name_Div = document.createElement('h1')
    name_Div.className = "center-text"
    name_Div.innerText = toy.name

    let liker_Place = document.createElement('h3')
    name_Div.className = "center-text"
    liker_Place.innerText = "number of Likes"

    let liker_Tag = document.createElement('h3')
    name_Div.className = "center-text"
    let liker_Btn = document.createElement('button')
    const likes = toy.likes
    liker_Btn.innerText = "Like" 
    liker_Btn.className = "buttons"
    liker_Btn.addEventListener('click', () => {
    function liker(likes) {
        likes ++
        console.log(likes)
        }
    })
    liker_Tag.innerHTML = likes

    let avatar_Div = document.createElement('div')
    avatar_Div.className = "toy-avatar"
  
    let avatar = document.createElement('img')
    avatar.setAttribute("data-id",toy.id)
    avatar.setAttribute("data-action","flip")
    avatar.className = "game-image"
    avatar.src = toy.image
    


    

  
    let delBtn = document.createElement('button')
    delBtn.innerText = "DELETE" 
  
    //Deleting a pokemon
    delBtn.addEventListener('click', () => {
      // console.log(pokemon)
      // debugger
      // fetch(`http://localhost:3000/pokemon/${pokemon.id}`)
  
      fetch("http://localhost:3000/toys/"+toy.id, {
        method: "DELETE"
      })
      .then(res => res.json())
      .then(()=> {
        card_Div.remove()
      })
    })
  
    let editBtn = document.createElement('button')
    editBtn.innerText = "EDIT" 
    
  
    editBtn.addEventListener('click', () => {
      let editForm = document.getElementById("edit-form")
      // debugger
      editForm[0].value = toy.name
      editForm[1].value = toy.image
  
      editForm.addEventListener('submit', () => {
        event.preventDefault()
        // console.log(editForm)
        // debugger
        fetch("http://localhost:3000/toys/"+toy.id, {
          method: "PATCH",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: event.target[0].value,
            image: event.target[1].value
          })
        })
        .then(res => res.json())
        .then(updateToy => {
            name_Div.innerText = updateToy.name
          avatar.src = updateToy.image
        })
        event.target.reset()
      })
    })
  
    avatar_Div.append(avatar,liker_Btn, delBtn, editBtn)
    toy_Div.append(name_Div,liker_Place, liker_Tag)
    card_Div.append(toy_Div,avatar_Div)
  
    return card_Div
  }
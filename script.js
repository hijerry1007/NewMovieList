(function(){
  // basic setting
  const base_URL = "https://movie-list.alphacamp.io/"
  const index_URL = base_URL + "api/v1/movies/"
  const poster_URL = base_URL + "posters/"
  const data = []
  const displayGenres = document.getElementById('displayGenres')
  const displayMovie = document.getElementById('displayMovie')
  const genres = {
    "1": "Action",
    "2": "Adventure",
    "3": "Animation",
    "4": "Comedy",
    "5": "Crime",
    "6": "Documentary",
    "7": "Drama",
    "8": "Family",
    "9": "Fantasy",
    "10": "History",
    "11": "Horror",
    "12": "Music",
    "13": "Mystery",
    "14": "Romance",
    "15": "Science Fiction",
    "16": "TV Movie",
    "17": "Thriller",
    "18": "War",
    "19": "Western"
  }
  // get api data
  axios.get(index_URL)
    .then(response=>{
      data.push(...response.data.results)
        let htmlContent = ''       
        data.forEach(item=>{
          let genresContent = ''
          genresContent += `<div class="card-footer text-muted">`
          item.genres.forEach(number=>{
            genresContent += `<div class="genres">
          ${genres[number]}</div> `
          })
          genresContent += `</div>`
          htmlContent += `
    <div class="col-sm-2 col-md-2 col-lg-2">
      <div class="card mb-1">
        <img class="card-img-top" src="${poster_URL}${item.image}" alt="Card image cap">
        <div class="card-body movie-item-body">
          <h6 class="card-title">${item.title}</h6>
        </div>`
        htmlContent += genresContent
        htmlContent += `</div></div>`     
        })
        displayMovie.innerHTML = htmlContent 
    })
    .catch(err=>{
      console.log(err)
    })
  //   displaygenresPanel
  function displaygenresPanel(){
    let genresPanelContent = ``
    let genresItems = Object.values(genres)
    for( let i = 0; i < genresItems.length; i++){
      genresPanelContent += `<li class="nav-item">
    <a class="nav-link" id="${i+1}" href="#">${genresItems[i]}</a>
  </li>`
    } 
    displayGenres.innerHTML = genresPanelContent
  } 
  displaygenresPanel()
  
//   add listener 
  displayGenres.addEventListener('click', e=>{
     displaygenresPanel()
     document.getElementById(`${e.target.id}`).classList.add("nav-link", "active")
     let htmlContent = ``
     data.forEach(item=>{
       let genresContent = ''
          genresContent += `<div class="card-footer text-muted">`
          item.genres.forEach(number=>{
            genresContent += `<div class="genres">
          ${genres[number]} </div>`
          })
          genresContent += `</div>`
       if (item.genres.includes(Number(e.target.id))){
          htmlContent += `
    <div class="col-sm-2 col-md-2 col-lg-2">
      <div class="card mb-1">
        <img class="card-img-top" src="${poster_URL}${item.image}" alt="Card image cap">
        <div class="card-body movie-item-body">
          <p class="card-title">${item.title}</p>
        </div>`
          htmlContent += genresContent
          htmlContent += `</div></div>`
          }      
        })   
    displayMovie.innerHTML = htmlContent 
  })
  
 
})()
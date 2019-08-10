(function () {
  /****************************
          變數宣告
  *****************************/
  const allGenres = {
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
  const BASE_URL = 'https://movie-list.alphacamp.io'
  const INDEX_URL = BASE_URL + '/api/v1/movies/'
  const POSTER_URL = BASE_URL + '/posters/'
  const data = []
  const dataPanel = document.getElementById('data-panel')
  const listPanel = document.getElementById('list-panel')

  /****************************
          抓取API資料
  *****************************/
  axios.get(INDEX_URL).then((response) => {
    data.push(...response.data.results)
    displayDataList(data)

  }).catch((err) => console.log(err))

  /****************************
         display版面
  *****************************/
  function displayDataList(data) {
    let htmlContent = ''
    data.forEach(function (item, index) {
      htmlContent += `
        <div class="col-sm-3">
          <div class="card mb-2">
            <img class="card-img-top " src="${POSTER_URL}${item.image}" alt="Card image cap">
            <div class="card-body movie-item-body">
              <h6 class="card-title">${item.title}</h5>
            </div>

            <div class="card-footer">
							<!-- do something -->
              ${showGenre(item.genres)}
            </div>
          </div>
        </div>
      `
    })
    dataPanel.innerHTML = htmlContent

  }
  /****************************
         display all genres list
  *****************************/
  function displayAsideList() {
    let htmlListContent = ''
    for (let item in allGenres) {
      htmlListContent += `
        <li>
          <a class="nav-link" data-toggle="pill" href="#" role="tab" data-genre=${item}>${allGenres[item]}</a>
        </li>
      `
    }
    listPanel.innerHTML = htmlListContent
  }

  /****************************
         display card genre
  *****************************/
  function showGenre(genres) {
    let genresContent = ''
    for (let item in genres) {
      let gen = genres[item]
      genresContent += `
        <h6 href="#" class="genres">${allGenres[gen]}</h6>
      `
    }
    return genresContent
  }

  /****************************
      list panel event
  *****************************/
  listPanel.addEventListener('click', event => {
    const genreData = []
    const clickGenre = event.target.dataset.genre
    data.forEach(function (item) {
      const genreArr = item.genres
      for (let i of genreArr) {
        if (i === Number(clickGenre)) {
          genreData.push(item)
        }
      }
      displayDataList(genreData)
    })
  })


  displayAsideList()
})()
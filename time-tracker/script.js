const card_wrap = document.getElementById('card-wrap')
const daily = document.getElementById('daily')
const weekly = document.getElementById('weekly')
const monthly = document.getElementById('monthly')

// fetch json file
async function getData (time) {
  const res = await fetch('./data.json')
  const data = await res.json()
  updateUI(data, time)
}

// Update card UI
function updateUI(data, time = 'weekly') {
  const element = data.map((item) => {
    const { title, timeframes } = item
    return `
    <div class="card ${changeColor(title)}">
      <div class="content">
        <div class="header">
          <span>${title}</span>
          <img src="./images/icon-ellipsis.svg" alt="ellipsis">
        </div>
        <div class="footer">
          <p class="current">${timeframes[time].current}hrs</p>
          <p class="previous">Last ${time} - ${timeframes[time].previous}hrs</p>
        </div>
      </div>
    </div>
    `
  }).join('')
  card_wrap.innerHTML = element
}

// Change background color
function changeColor(title) {
  switch (title) {
    case 'Work':
      return 'work';
    case 'Play':
      return 'play'
    case 'Study':
      return 'study'
    case 'Exercise':
      return 'exercise'
    case 'Social':
      return 'social'
    case 'Self Care':
      return 'self-care'
  }
}

getData()

// Event Listener 
daily.addEventListener('click', (e) => {
  daily.classList.add('active')
  weekly.classList.remove('active')
  monthly.classList.remove('active')
  getData('daily')
})

weekly.addEventListener('click', (e) => {
  daily.classList.remove('active')
  weekly.classList.add('active')
  monthly.classList.remove('active')
  getData('weekly')
})

monthly.addEventListener('click', (e) => {
  daily.classList.remove('active')
  weekly.classList.remove('active')
  monthly.classList.add('active')
  getData('monthly')
})

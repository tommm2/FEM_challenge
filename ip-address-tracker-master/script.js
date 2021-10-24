// form element
const form = document.getElementById('form')
const text = document.getElementById('text')

// searching info element
const dashboard_el = document.getElementById('tracking-dashboard')
const ip_el = document.getElementById('ip')
const location_el = document.getElementById('location')
const timezone_el = document.getElementById('timezone')
const isp_el = document.getElementById('isp')

// Loading elememt
const loading_el = document.getElementById('loading')

// alert element
const alert_el = document.getElementById('alert')
const close_btn = document.getElementById('close-btn')

// api info
const api_key = 'at_HNXwouw1Whs2bLV7l2vdwsRBdHGwu'
const api_url = 'https://geo.ipify.org/api/v2/country,city?'

// initial map
const map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);



// get fetch data
async function getData() {
  loading_el.classList.add('show')
  const res = await fetch(`${api_url}apiKey=${api_key}&ipAddress=${text.value}`).then(res => {
    loading_el.classList.remove('show')
    return res
  })
  const data = await res.json()
  const { ip, isp, location } = data

  updateUI(ip, isp, location)
  updateMarker(location, ip)
}

// update dashboard DOM
function updateUI(ip, isp, location) {
  ip_el.innerText = ip
  isp_el.innerText = isp
  location_el.innerText = location.region
  timezone_el.innerText = `UTC${location.timezone}`

  dashboard_el.classList.add('show')
}

// add map marker and move to location
function updateMarker(location, ip) {
  removeMarker()
  let marker = L.marker([location.lat, location.lng], {
    riseOnHover: true,
    riseOffset: 500,
  }).addTo(map)

  marker.bindPopup(`
  <h4>Location：${location.country}-${location.region}</h>
  <span>Time：UTC${location.timezone}</span>
  <span>IP Address：${ip}</span>
  `).openPopup()

  map.panTo([location.lat, location.lng])
}

// remove previous Marker
function removeMarker() {
  map.eachLayer(layer => {
    if(layer instanceof L.Marker) {
      map.removeLayer(layer)
    }
  })
}

// Event Listener
form.addEventListener('submit', (e) => {
  const ip_regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
  e.preventDefault()

  if(ip_regex.test(text.value)) {
    getData()
    text.value = ''
  } else {
    alert_el.classList.add('slideIn')
    setTimeout(() => {
      alert_el.classList.remove('slideIn')
    }, 3000)
  }
  
})

close_btn.addEventListener('click', () => {
  alert_el.classList.remove('slideIn')
})

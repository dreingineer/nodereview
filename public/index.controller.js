const today = moment()
let infected, tested, recovered, deceased, activeCases, unique, country, lastUpdate, dateHour


const getCovidData = async () => {
  
  const rawData = await fetch('/api/covid-update-now')
  const latestData = await rawData.json()
  //check response on console 
  console.log('Latest Data', latestData)

  country = latestData.country
  infected = latestData.infected
  tested = latestData.tested
  recovered = latestData.recovered
  deceased = latestData.deceased
  activeCases = latestData.activeCases
  // unique = latestData.unique
  lastUpdate = latestData.lastUpdatedAtApify
  
  document.getElementById('country').textContent = country
  document.getElementById('infected').textContent = infected
  document.getElementById('tested').textContent = tested
  document.getElementById('recovered').textContent = recovered
  document.getElementById('deceased').textContent = deceased
  document.getElementById('activecases').textContent = activeCases
  // document.getElementById('unique').textContent = unique
  document.getElementById('lastupdate').textContent = lastUpdate

}

getCovidData()

const toggleBurger = async () => {
  console.log('clicked');
  let x = document.getElementById('myLinks');
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}




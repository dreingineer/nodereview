let profilePicUrl;
let username
let biography;

getIgData();

async function getIgData() {
  const rawData = await fetch('/igdata')
  console.log(rawData)
  const latestData = await rawData.json();
  console.log('IG DATA', latestData)

  profilePicUrl = latestData.profile_pic_url
  username = latestData.username
  biography = latestData.biography

  document.getElementById('igImage').src = profilePicUrl
  document.getElementById('username').textContent = username
  document.getElementById('biography').textContent = biography
}
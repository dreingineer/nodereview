let profilePicUrl;
let username
let biography;
let igId;

getIgData();

async function getIgData() {
  const rawData = await fetch('/igdata')
  console.log(rawData)
  const latestData = await rawData.json();
  console.log('IG DATA', latestData)

  profilePicUrl = latestData.profile_pic_url_hd
  username = latestData.username
  biography = latestData.biography
  igId = latestData.id

  document.getElementById('igImage').src = `${profilePicUrl}`
  document.getElementById('username').textContent = username
  document.getElementById('biography').textContent = biography
  document.getElementById('igid').textContent = igId
}

function userLogin(){
  var username =document.getElementById('loginUserName').value;
  var password = document.getElementById('loginPassword').value;
  var results = document.querySelector('.results');

  var userInfo = localStorage.getItem(name);
  var data = JSON.parse(userInfo);
  console.log(data);
}
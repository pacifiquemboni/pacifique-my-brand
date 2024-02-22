let userdata=JSON.parse(localStorage.getItem("userInfo")) || [];
function readUserData(){
  localStorage.setItem("userInfo", JSON.stringify(userdata));
   var userdatatable =document.getElementById("userdata-table");

   var userInfo = localStorage.getItem('userInfo');
   var userInfodata = JSON.parse(userInfo);
   var information = "";
   

   userInfodata.map(
    (record)=>(
      information += `<tr>
      
      <td>${record.names}</td>
      <td>${record.email}</td>
      <td>${record.password}</td>
      <td class="action-buttons">
        <img src="images/formicon/Edit.png" alt="" onclick="editUser(${record.id})">
        <img src="images/formicon/Trash.png" alt=""onclick="deleteUser(${record.id})">
        </td>
      </tr>`
    )
   );
   userdatatable.innerHTML = information;
}

function addUser(){
  var name = document.getElementById('signUserName').value;
  var email = document.getElementById('signEmail').value;
  var password = document.getElementById('password2').value;

  let randomNumber = Math.floor(Math.random() * 101);

  var id = randomNumber;
  var newobj = { id: id, names: name, email: email, password:password };
  userdata.push(newobj);

  location.reload();
  readUserData();

}
 function createUser(){
  document.querySelector('.sign-upForm').style.display ='block'
  document.getElementById('adduserbtn').style.display ='none'
 }

function editUser(id){
  document.getElementById('adduserbtn').style.display ='none'
  document.querySelector('.sign-upEditForm').style.display ='block'
  var obj = userdata.find((rec) => rec.id === id);
  document.querySelector(".uname").value = obj.names;
  document.querySelector(".uemail").value = obj.email;
  
  document.querySelector(".upassword2").value = obj.password;
  document.querySelector(".id").value = obj.id;
 }

 function updateUser(){
  var names = document.querySelector(".uname").value;
  var email = document.querySelector(".uemail").value;
  
  var password = document.querySelector(".upassword2").value;
  var id = parseInt(document.querySelector(".id").value);

  var index = userdata.findIndex((rec) => rec.id === id);
  userdata[index] = { id, names, email,password };
  document.querySelector(".sign-upForm").style.display = "none";
  location.reload();
  readUserData();
 }
 function deleteUser(id){
  userdata = userdata.filter(rec => rec.id !== id);
  location.reload();
  readUserData();
}

function userLogin(id){
  var username =document.getElementById('loginUserName').value;
  var password = document.getElementById('loginPassword').value;
  var results = document.querySelector('.results');

  var userInfo = localStorage.getItem('userInfo');
  if (userInfo) {
    var data = JSON.parse(userInfo);

    // Find the user in the array based on the username
    var user = data.find((user) => user.email === username);
    var id = data.find((userid)=> userid.id === id)

    if (user) {
      
      // User found, now you can perform authentication logic
      if (user.password === password) {
        results.innerHTML = "Authentication successful!";
        window.location.href= `/singleuser.html?id=${id}`;
      } else {
        results.innerHTML = "Incorrect password";
      }
    } else {
      results.innerHTML = "Fill the form please";
    }
  } else {
    results.innerHTML = "Enter Valid User Credentials.";
  }
}
function adminLogin(){
  var username =document.getElementById('AdminUserName').value;
  var password = document.getElementById('AdminloginPassword').value;
  var results = document.querySelector('.adminresults');

  var userInfo = localStorage.getItem('userInfo');
  if (userInfo) {
    var data = JSON.parse(userInfo);

    // Find the user in the array based on the username
    var user = data.find((user) => user.email === username);

    if (user && user.email === 'pacifiquemboni@gmail.com') {
      if (user.password === password) {
        // Authentication successful for admin
        results.innerHTML = "Admin authentication successful!";
        // Redirect to admin dashboard or perform other actions
        window.location.href = '/board.html';
      } else {
        results.innerHTML = "Incorrect admin password";
      }
    } else {
      results.innerHTML = "You are not an admin";
    }
  } else {
    results.innerHTML = "Enter valid user credentials.";
  }
}
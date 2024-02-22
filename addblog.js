let data = JSON.parse(localStorage.getItem("object")) || [];

// window.addEventListener("DOMContentLoaded", renderBlog(data))
// this function is for blogs page
function readAll() {
  localStorage.setItem("object", JSON.stringify(data));
  var tabledata = document.getElementById("myblogs");

  var objectdata = JSON.parse(localStorage.getItem("object"));
  var elements = "";

  var loadedImagesCount = 0;
  if (objectdata.length == 0) {
    document.getElementById("myblogs").innerHTML = "There is no blog posts";
    return;
  }

  function onImageLoad() {
    loadedImagesCount++;
    if (loadedImagesCount === objectdata.length) {
      // All images are loaded, update the container content
      //tabledata.innerHTML = elements;
    }
  }

  objectdata.forEach((record) => {
    var img = new Image();
    img.src = record.file;
    img.alt = "Blog Image";
    img.style.maxWidth = "100%";
    img.style.height = "auto";
    img.style.width = "100%";

    // Listen for the load event before appending the image to the container
    img.onload = onImageLoad;

    elements += `
            <div class="blog">
                ${img.outerHTML}
                <h4>${record.title}</h4>
                <h5>${record.author}</h5>
                <p>${record.body.slice(0, 400)}<a href="#"  onclick="moveBlog(${
      record.id
    })">.....readmore</a></p>
                <div class="blog-footer">
                    <div class="like">
                        <i class="fa fa-thumbs-up"></i>
                        <p>Like</p>
                    </div>
                    <div class="like">
                        <i class="fa fa-comment"></i>
                        <p>Comment</p>
                    </div>
                </div>
            </div>
        `;
  });

  tabledata.innerHTML = elements;
}
// this function is for dashboard page
function readAllDash() {
  localStorage.setItem("object", JSON.stringify(data));

  var blogtabledata = document.getElementById("blogdata_table");

  var objectdata = JSON.parse(localStorage.getItem("object"));

  var elements2 = "";

  var loadedImagesCount = 0;
  if (objectdata.length == 0) {
    //document.getElementById("myblogs").innerHTML = "There is no blog posts";
    return;
  }

  function onImageLoad() {
    loadedImagesCount++;
    if (loadedImagesCount === objectdata.length) {
      // All images are loaded, update the container content
      //tabledata.innerHTML = elements;
    }
  }

  objectdata.forEach((record) => {
    var img = new Image();
    img.src = record.file;
    img.alt = "Blog Image";
    img.style.maxWidth = "100%";
    img.style.height = "auto";
    img.style.width = "100%";

    // Listen for the load event before appending the image to the container
    img.onload = onImageLoad;

    elements2 += `
        <tr>
        <td class="blog-image">${img.outerHTML}</td>
    <td><a href="#" onclick="moveBlog(${record.id})">${record.title}</a></td>
    <td>${record.author}</td>
    <td>${record.body}</td>
    <td class="action-buttons">
      <img src="images/formicon/Edit.png" alt="" onclick="edit(${record.id})">
      <img src="images/formicon/Trash.png" alt=""onclick="delet(${record.id})">
                            </td>
    </tr>`;
  });
  blogtabledata.innerHTML = elements2;
}
function moveBlog(id) {
  window.location.href = `/singleblog.html?id=${id}`;
}
function add() {
  var title = document.getElementById("blogTitle").value;
  var blogBody = document.getElementById("dashtextarea").value;
  var fileInput = document.getElementById("fileInput");

  // Check if a file is selected
  if (fileInput.files.length > 0) {
    var reader = new FileReader();

    reader.onload = function (e) {
      var image = e.target.result;

      let randomNumber = Math.floor(Math.random() * 101);
      var author = "Pacifique Mbonimana";
      var id = randomNumber;

      var newobj = {
        id: id,
        file: image,
        title: title,
        author: author,
        body: blogBody,
      };

      data.push(newobj);
      readAll();
      document.getElementById("success").innerHTML = "blog successfully added";
    };

    // Read the image file as a data URL
    reader.readAsDataURL(fileInput.files[0]);
  } else {
    alert("Please select an image.");
  }
}
// function renderBlog(blog){
//   blog.forEach((elements) => {
//     let link = document.createElement('a')
//     link.textContent = elements['title']
//     link.href = `singleblog.html?id= ${elements['id']}`
//     link.target = '_blank'
//     document.body.appendChild(link);
//   })
// }

function create() {
  document.getElementById("blogform").style.display = "block";
  document.querySelector(".dash-right").style.display = "block";
  document.getElementById("blog-table").style.marginTop = "0px";
  document.getElementById("addblogbtn").style.display = "none";
}

function edit(id) {
  document.getElementById("updateblogform").style.display = "block";
  document.querySelector(".updatedash-right").style.display = "block";
  document.getElementById("blog-table").style.marginTop = "0px";
  document.getElementById("addblogbtn").style.display = "none";
  var obj = data.find((rec) => rec.id === id);

  document.getElementById("ublogTitle").value = obj.title;
  document.getElementById("udashtextarea").value = obj.body;
  document.getElementById("id").value = obj.id;
  // document.getElementById("upreviewImage").value = obj.(${img.outerHTML});
}
function update() {
  var utitle = document.getElementById("ublogTitle").value;
  var ublogBody = document.getElementById("udashtextarea").value;

  var id = parseInt(document.getElementById("id").value);

  var index = data.findIndex((rec) => rec.id === id);

  if (index !== -1) {
    // Update only the title and body of the specified blog post
    data[index].title = utitle;
    data[index].body = ublogBody;
    location.reload();
    // Hide the update form
    document.getElementById("updateblogform").style.display = "none";

    // Update the display with the modified data
    readAllDash();
  } else {
    console.error("Blog post not found for update");
  }
}

function delet(id) {
  data = data.filter((rec) => rec.id !== id);
  location.reload();
  readAll();
}

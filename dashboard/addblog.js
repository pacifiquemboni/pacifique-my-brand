let blogsData = [];

// function to fetch blog fro backend

const fetchBlogs = async () => {
  try {
    // Fetch bookmarks with the token included in the request headers
    const response = await fetch("http://localhost:5000/blogs");
    // Check if the response is successful
    if (!response.ok) {
      throw new Error("Failed to fetch blogs");
    }
    // Extract bookmarks data from the response
    const dataObj = await response.json();
    blogsData = dataObj.data;
    console.log(dataObj);
    console.log(blogsData);
    displayBlogs();
    // displayBlogsOnBlogsPage();
  } catch (error) {
    console.log("Error while fetching blogs:", error);
  }
};

// function to create a blog element in dashboard
const createBlogElement = (blog) => {
  let blogElement = document.createElement("tr");
  blogElement.innerHTML = `
  <td><img src="${blog.image}" alt="Blog Image" width="150px"></td>
  <td><h4 onclick="getSingleBlog('${blog._id}')">${blog.title}</h4> </td>
  <td>${blog.author} </td>
  <td>${blog.intro} </td>

  <td class="action-buttons">
      <img src="../images/formicon/Edit.png" alt="" onclick="navigateToBlogEditForm('${blog._id}')">
      <img src="../images/formicon/Trash.png" alt=""onclick="deleteBlog('${blog._id}')">
  </td>
  `;
  return blogElement;
};

// function to display blogs in dashboard
const displayBlogs = () => {
  let blogsList = document.getElementById("blogdata_table");
  blogsList.innerHTML = "";

  if (!Array.isArray(blogsData) || blogsData.length === 0) {
    blogsList.innerHTML = "You do not have Blogs yet";
    return;
  }
  blogsData.forEach((blog) => {
    let blogElement = createBlogElement(blog);
    blogsList.appendChild(blogElement);
  });
};

//function to get single blog

const getSingleBlog = async (id) => {
  try {
    const token = localStorage.getItem("token");

    // Check if the token exists
    if (!token) {
      // throw new Error('Token not found in localStorage');
      showToast("Login First",'error');
      setTimeout(() => {
        window.location.href = `login.html`;
      }, 2000);
    }

    // Send get request to get the blog
    const response = await fetch(`http://localhost:5000/blogs/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    // Check if deletion was successful
    if (!response.ok) {
      throw new Error("Failed to get blog");
    }
    window.location.href = `../singleblog.html?id=${id}`;
  } catch (error) {}
};
// fetching blogs on blog page
const fetchBlogs2 = async () => {
  try {
    // Fetch bookmarks with the token included in the request headers
    const response = await fetch("http://localhost:5000/blogs");
    // Check if the response is successful
    if (!response.ok) {
      throw new Error("Failed to fetch blogs");
    }
    // Extract bookmarks data from the response
    const dataObj = await response.json();
    blogsData = dataObj.data;
    // displayBlogs();
    displayBlogsOnBlogsPage();
  } catch (error) {
    console.log("Error while fetching blogs:", error);
  }
};
// function to create a blog element on blogs page
const createBlogElementOnBlogsPage = (blog) => {
  let blogElement = document.createElement("div");
  blogElement.innerHTML = `
  <div class="blog">
      <img src="${blog.image}">
      <h4>${blog.title}</h4>
      <h5>${blog.author}</h5>
      <p>${blog.intro.slice(0, 190)}<a href="#"  onclick="getSingleBlog('${
    blog._id
  }')">.....readmore</a></p>
      <div class="blog-footer">
          <div class="like">
              <i class="fa fa-thumbs-up" onclick="getSingleBlog('${
                blog._id
              }')"></i>
              <p>Like</p>
          </div>
          <div class="like">
              <i class="fa fa-comment" onclick="getSingleBlog('${
                blog._id
              }')"></i>
              <p>Comment</p>
          </div>
      </div>
  </div>
`;
  return blogElement;
};
// function to display blogs on blogs page
const displayBlogsOnBlogsPage = () => {
  let blogsList = document.getElementById("myblogs");
  blogsList.innerHTML = "";

  if (!Array.isArray(blogsData) || blogsData.length === 0) {
    blogsList.innerHTML = "You do not have blogs yet";
    return;
  }
  blogsData.forEach((blog) => {
    let blogElement = createBlogElementOnBlogsPage(blog);
    blogsList.appendChild(blogElement);
  });
};

// Assuming errorContainer is defined somewhere in your code
const errorContainer = document.getElementById("errorContainer");

// Function to upload image and retrieve image URL

const imageUpload = async () => {
  const imageInput = document.getElementById("imageInput");
  // const uploadMessage = document.getElementById("uploadImage");

  try {
    const formData = new FormData();
    formData.append("image", imageInput.files[0]);
    showToast("Uploading image...Wait for next success message", "success");
    const response = await fetch("http://localhost:5000/api/upload/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      // console.log("image added success fully");
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to Upload Image");
    }

    const responseData = await response.json();
    // uploadMessage.innerHTML = `Image uploaded successfully, now go ahead post your blog`;
    showToast(
      "Image uploaded successfully, now go ahead post your blog",
      "success"
    );
    console.log("Image uploaded successfully:", responseData.data);
    document.getElementById("blogImage").value = responseData.data;
    document.getElementById("postbtn").style.display = "block";
  } catch (error) {
    showToast(error);
  }
};

document
  .getElementById("blogform")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    const title = document.getElementById("blogTitle").value;
    const intro = document.getElementById("blogIntro").value;
    const body = document.getElementById("dashtextarea").value;
    const fileInput = document.getElementById("blogImage").value;

    if (!title || !intro || !body) {
      showToast(
        "Please provide both title, intro, body for the blog.",
        "error"
      );
      return;
    }
    if (!fileInput) {
      showToast("Please select an image for the blog.", "error");
      return;
    }

    const blog = {
      title: title,
      intro: intro,
      body: body,
      image: fileInput,
    };
    await addBlog(blog);
  });

//function to add a blog
const addBlog = async (blog) => {
  try {
    const token = localStorage.getItem("token");

    // Check if the token exists
    if (!token) {
      throw new Error("Token not found in localStorage");
    }
    const response = await fetch("http://localhost:5000/blog", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(blog),
    });
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage.message);
    }
    fetchBlogs(); // Refresh bookmarks after adding
    location.reload();
  } catch (error) {
    console.error("Error fetching blogs", error);
    showToast("blog arleady posted", "error");
  }
};

// Function to delete a blog
const deleteBlog = async (id) => {
  try {
    // Ask for confirmation before deleting
    const confirmation = confirm("Are you sure you want to delete this blog?");

    // If user confirms, proceed with deletion
    if (confirmation) {
      const token = localStorage.getItem("token");

      // Check if the token exists
      if (!token) {
        throw new Error("Token not found in localStorage");
      }

      // Send DELETE request to delete the blog
      const response = await fetch(`http://localhost:5000/blogs/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      // Check if deletion was successful
      if (!response.ok) {
        throw new Error("Failed to delete blog");
      }

      // Refresh the list of blogs after deletion
      fetchBlogs();
    }
  } catch (error) {
    console.error("Error deleting blog:", error.message);
  }
};

// Function to navigate to the edit user form
const navigateToBlogEditForm = (id) => {
  window.location.href = `editBlog.html?id=${id}`;
};

function showToast(message, type = "success", duration = 10000) {
  const toast = document.getElementById("toastNotification");
  toast.textContent = message;
  toast.classList.add("show", type); // Add 'type' class for styling
  setTimeout(() => {
    toast.classList.remove("show", type);
  }, duration);
}

// let data = JSON.parse(localStorage.getItem("object")) || [];

// // window.addEventListener("DOMContentLoaded", renderBlog(data))
// // this function is for blogs page
// function readAll() {
//   localStorage.setItem("object", JSON.stringify(data));
//   var tabledata = document.getElementById("myblogs");

//   var objectdata = JSON.parse(localStorage.getItem("object"));
//   var elements = "";

//   var loadedImagesCount = 0;
//   if (objectdata.length == 0) {
//     document.getElementById("myblogs").innerHTML = "There is no blog posts";
//     return;
//   }

//   function onImageLoad() {
//     loadedImagesCount++;
//     if (loadedImagesCount === objectdata.length) {
//       // All images are loaded, update the container content
//       //tabledata.innerHTML = elements;
//     }
//   }

//   objectdata.forEach((record) => {
//     var img = new Image();
//     img.src = record.file;
//     img.alt = "Blog Image";
//     img.style.maxWidth = "100%";
//     img.style.height = "auto";
//     img.style.width = "100%";

//     // Listen for the load event before appending the image to the container
//     img.onload = onImageLoad;

//     elements += `
//             <div class="blog">
//                 ${img.outerHTML}
//                 <h4>${record.title}</h4>
//                 <h5>${record.author}</h5>
//                 <p>${record.body.slice(0, 400)}<a href="#"  onclick="moveBlog(${
//       record.id
//     })">.....readmore</a></p>
//                 <div class="blog-footer">
//                     <div class="like">
//                         <i class="fa fa-thumbs-up"></i>
//                         <p>Like</p>
//                     </div>
//                     <div class="like">
//                         <i class="fa fa-comment"></i>
//                         <p>Comment</p>
//                     </div>
//                 </div>
//             </div>
//         `;
//   });

//   tabledata.innerHTML = elements;
// }
// // this function is for dashboard page
// function readAllDash() {
//   localStorage.setItem("object", JSON.stringify(data));

//   var blogtabledata = document.getElementById("blogdata_table");

//   var objectdata = JSON.parse(localStorage.getItem("object"));

//   var elements2 = "";

//   var loadedImagesCount = 0;
//   if (objectdata.length == 0) {
//     //document.getElementById("myblogs").innerHTML = "There is no blog posts";
//     return;
//   }

//   function onImageLoad() {
//     loadedImagesCount++;
//     if (loadedImagesCount === objectdata.length) {
//       // All images are loaded, update the container content
//       //tabledata.innerHTML = elements;
//     }
//   }

//   objectdata.forEach((record) => {
//     var img = new Image();
//     img.src = record.file;
//     img.alt = "Blog Image";
//     img.style.maxWidth = "100%";
//     img.style.height = "auto";
//     img.style.width = "100%";

//     // Listen for the load event before appending the image to the container
//     img.onload = onImageLoad;

//     elements2 += `
//         <tr>
//         <td class="blog-image">${img.outerHTML}</td>
//     <td><a href="#" onclick="moveBlog(${record.id})">${record.title}</a></td>
//     <td>${record.author}</td>
//     <td>${record.body.slice(0, 400)}</td>
//     <td class="action-buttons">
//       <img src="images/formicon/Edit.png" alt="" onclick="edit(${record.id})">
//       <img src="images/formicon/Trash.png" alt=""onclick="delet(${record.id})">
//                             </td>
//     </tr>`;
//   });
//   blogtabledata.innerHTML = elements2;
// }

// function moveBlog(id) {
//   window.location.href = `/singleblog.html?id=${id}`;
// }

// function add() {
//   var title = document.getElementById("blogTitle").value;
//   var blogBody = document.getElementById("dashtextarea").value;
//   var fileInput = document.getElementById("fileInput");

//   // Check if a file is selected
//   if (fileInput.files.length > 0) {
//     var reader = new FileReader();

//     reader.onload = function (e) {
//       var image = e.target.result;

//       let randomNumber = Math.floor(Math.random() * 101);
//       var author = "Pacifique Mbonimana";
//       var id = randomNumber;

//       var newobj = {
//         id: id,
//         file: image,
//         title: title,
//         author: author,
//         body: blogBody,
//       };

//       data.push(newobj);
//       location.reload()
//       readAll();
//       document.getElementById("success").innerHTML = "blog successfully added";

//     };

//     // Read the image file as a data URL
//     reader.readAsDataURL(fileInput.files[0]);
//   } else {
//     alert("Please select an image.");
//   }
// }
// // function renderBlog(blog){
// //   blog.forEach((elements) => {
// //     let link = document.createElement('a')
// //     link.textContent = elements['title']
// //     link.href = `singleblog.html?id= ${elements['id']}`
// //     link.target = '_blank'
// //     document.body.appendChild(link);
// //   })
// // }

function create() {
  document.getElementById("blogform").style.display = "block";
  document.querySelector(".dash-right").style.display = "block";
  document.getElementById("blog-table").style.marginTop = "0px";
  document.getElementById("addblogbtn").style.display = "none";
}

// function edit(id) {
//   document.getElementById("updateblogform").style.display = "block";
//   document.querySelector(".updatedash-right").style.display = "block";
//   document.getElementById("blog-table").style.marginTop = "0px";
//   document.getElementById("addblogbtn").style.display = "none";
//   var obj = data.find((rec) => rec.id === id);

//   document.getElementById("ublogTitle").value = obj.title;
//   document.getElementById("udashtextarea").value = obj.body;
//   document.getElementById("id").value = obj.id;
//   // document.getElementById("upreviewImage").value = obj.(${img.outerHTML});
// }
// function update() {
//   var utitle = document.getElementById("ublogTitle").value;
//   var ublogBody = document.getElementById("udashtextarea").value;

//   var id = parseInt(document.getElementById("id").value);

//   var index = data.findIndex((rec) => rec.id === id);

//   if (index !== -1) {
//     // Update only the title and body of the specified blog post
//     data[index].title = utitle;
//     data[index].body = ublogBody;
//     location.reload();
//     // Hide the update form
//     document.getElementById("updateblogform").style.display = "none";

//     // Update the display with the modified data
//     readAllDash();
//   } else {
//     console.error("Blog post not found for update");
//   }
// }

// function delet(id) {
//   data = data.filter((rec) => rec.id !== id);
//   location.reload();
//   readAll();
// }

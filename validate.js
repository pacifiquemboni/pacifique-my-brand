function validateloginform(){  
    var name=document.myloginform.name.value;  
    var password=document.myloginform.password.value;  
      
    if (name==null || name==""){  
      alert("Name can't be blank");  
      return false;  
    }else if(password.length<6){  
      alert("Password must be at least 6 characters long.");  
      return false;  
      }  
} 
 function validatecontactform(){
    var name=document.mycontactform.name.value; 
    var email=document.mycontactform.email.value;
    var message=document.mycontactform.message.value;
    var atposition=email.indexOf("@");  
    var dotposition=email.lastIndexOf("."); 

    if (name==null || name==""){  
        alert("Name can't be blank");  
        return false;  
      }else if (message==null || message==""){  
        alert("Message can't be blank");  
        return false;  
      } else if (atposition<1 || dotposition<atposition+2 || dotposition+2>=x.length){  
        alert("Please enter a valid e-mail address \n atpostion:"+atposition+"\n dotposition:"+dotposition);  
        return false;  
        } 
 }
 function validateblogform(){
    var name=document.myblogform.fname.value; 
    var lname=document.myblogform.lname.value;
    var message=document.myblogform.message.value;

    if (name==null || name==""){  
        alert("Blog Title can't be blank");  
        return false;  
      }
      else if (lname==null || lname==""){  
        alert("Author Name can't be blank");  
        return false;  
      } else if (message==null || message==""){  
        alert("Blog Body can't be blank");  
        return false;  
      } 
 }

//  function validatesignupform(){
//     var name=document.mysignupform.name.value; 
//     var email=document.mysignupform.email.value; 
//     var atposition=email.indexOf("@");  
//     var dotposition=email.lastIndexOf("."); 

//     if (name==null || name==""){  
//         alert("Name can't be blank");  
//         return false;  
//       } else if (atposition<1 || dotposition<atposition+2 || dotposition+2>=x.length){  
//         alert("Please enter a valid e-mail address \n atpostion:"+atposition+"\n dotposition:"+dotposition);  
//         return false;  
//         } 
//         var firstpassword = document.getElementById("password").value;

//       // Regular expression for a strong password
//       var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

//       if (!passwordRegex.test(firstpassword)) {
//         alert("Password must contain at least one uppercase letter, one lowercase letter, one digit, and be at least 8 characters long.");
//         return false;
//       }
//  }
 function matchpass() {
    var password1 = document.getElementById("password").value;
    var password2 = document.getElementById("password2").value;

    if (password1 !== password2) {
      alert("Passwords do not match");
      return false;
    }
    return true;
  }

  function validatesignupform() {
    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    // Regular expression for a strong password
    var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!passwordRegex.test(password)) {
      alert("Password must contain at least one uppercase letter, one lowercase letter, one digit, and be at least 8 characters long.");
      return false;
    }

    // You can add additional validation logic for username and email if needed

    return true; // Return true if the form is valid, otherwise return false
  } 



// How long you want the animation to take, in ms
const animationDuration = 2000;
// Calculate how long each ‘frame’ should last if we want to update the animation 60 times per second
const frameDuration = 1000 / 60;
// Use that to calculate how many frames we need to complete the animation
const totalFrames = Math.round( animationDuration / frameDuration );
// An ease-out function that slows the count as it progresses
const easeOutQuad = t => t * ( 2 - t );

// The animation function, which takes an Element
const animateCountUp = el => {
	let frame = 0;
	const countTo = parseInt( el.innerHTML, 10 );
	// Start the animation running 60 times per second
	const counter = setInterval( () => {
		frame++;
		// Calculate our progress as a value between 0 and 1
		// Pass that value to our easing function to get our
		// progress on a curve
		const progress = easeOutQuad( frame / totalFrames );
		// Use the progress value to calculate the current count
		const currentCount = Math.round( countTo * progress );

		// If the current count has changed, update the element
		if ( parseInt( el.innerHTML, 10 ) !== currentCount ) {
			el.innerHTML = currentCount;
		}

		// If we’ve reached our last frame, stop the animation
		if ( frame === totalFrames ) {
			clearInterval( counter );
		}
	}, frameDuration );
};

// Run the animation on all elements with a class of ‘countup’
const runAnimations = () => {
	const countupEls = document.querySelectorAll( '.countup' );
	countupEls.forEach( animateCountUp );
};
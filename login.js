document.addEventListener('DOMContentLoaded', () =>{
  const loginForm = document.getElementById('loginForm');
  const errorContainer =document.getElementById('errorContainer');

  loginForm.addEventListener('submit', async(event)=>{
    event.preventDefault();
    const email = document.getElementById('loginUserName').value.trim();
    const password= document.getElementById('loginPassword').value.trim();
  // Basic input validation
    if (!email || !password) {
      showError('Please enter both email and password.');
      return;
    }
    // use fetch api
    try{
      const response = await fetch('http://127.0.0.1:5000/login',{
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({email, password})
      })
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to login');
      }
      // Extract the JWT token from the response
      const { token, role } = await response.json();
      

      console.log('token:',token)
      console.log('role:',role)
      // Store the token in localStorage
      localStorage.setItem('token', token);
      
      
      if(role ==='admin'){
        localStorage.setItem('adminRole', role);
        setTimeout(()=>{
          window.location.href='./dashboard/dashaddblog.html'
        })
      }
      else{
        localStorage.setItem('userRole', role);
        window.location.href='./blogs.html'
        
      }
    }catch (error) {
      console.error('Error during login:', error);
      showError(error.message || 'Failed to login. Please try again.');
    }


  })

 
  
  // Function to display error message
  function showError(message) {
    errorContainer.textContent = message;
    errorContainer.style.display = 'block';
  }
})
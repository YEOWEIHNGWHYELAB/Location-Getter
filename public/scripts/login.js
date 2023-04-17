// Handle login form submit
async function handleLogin(event) {
    event.preventDefault();
  
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    const data = { username: username, password: password };
  
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
  
      if (!response.ok) {
        throw new Error('Invalid username or password');
      }
  
      const { token } = await response.json();
      localStorage.setItem('auth-token', token);
  
      alert('Logged in successfully!');
      window.location.href = '/location.html'; // Redirect to location page
    } catch (error) {
      alert(error.message);
    }
}
  
// Attach event listener to login form submit button
const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', handleLogin);
  
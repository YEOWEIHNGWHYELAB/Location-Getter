// Get the user's current location
function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      position => {
        resolve(position.coords);
      },
      error => {
        reject(error.message);
      }
    );
  });
}
  
  // Send the location data to the server
  async function sendLocationData(location) {
    const token = localStorage.getItem('auth-token');
    if (!token) {
      alert('Please log in to update your location.');
      return;
    }
  
    const { latitude, longitude } = location;
    const data = { latitude, longitude };
  
    try {
      const response = await fetch('/location', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token
        },
        body: JSON.stringify(data)
      });
  
      if (!response.ok) {
        throw new Error('Failed to update location.');
      }
  
      alert('Location updated successfully!');
    } catch (error) {
      alert(error.message);
    }
  }
  
  // Update the user's location every minute
  async function updateLocation() {
    try {
      const location = await getCurrentLocation();
      sendLocationData(location);
    } catch (error) {
      console.error(error);
    }
  }
  
  // Start the location update loop
  setInterval(updateLocation, 60000);
  
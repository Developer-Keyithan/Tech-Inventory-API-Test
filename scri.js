const form = document.querySelector('.device-form');
const tbody = document.querySelector('tbody');

// Function to populate the table with data
async function fetchDevices() {
  try {
    const response = await fetch('http://localhost:3000/api/devices');
    const devices = await response.json();

    // Clear existing rows
    tbody.innerHTML = '';

    // Populate table with device data
    devices.forEach((device) => {
      const row = `
        <tr>
          <td>${device.device_name}</td>
          <td>${device.device_type}</td>
          <td>${device.brand}</td>
          <td>${device.model}</td>
          <td>${device.price}</td>
          <td>${device.color}</td>
          <td>${device.storage}</td>
          <td>${device.battery}</td>
          <td>${device.screen_size}</td>
          <td>${device.camera}</td>
          <td>${device.processor}</td>
          <td>${device.release_date}</td>
          <td>
            <button class="delete-btn" data-id="${device._id}">Delete</button>
          </td>
        </tr>
      `;
      tbody.innerHTML += row;
    });

    // Attach event listeners to delete buttons
    document.querySelectorAll('.delete-btn').forEach((button) => {
      button.addEventListener('click', async (e) => {
        const id = e.target.getAttribute('data-id');
        await deleteDevice(id);
        fetchDevices();
      });
    });
  } catch (error) {
    console.error('Error fetching devices:', error);
  }
}

// Function to add a new device
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const inputs = form.querySelectorAll('input');
  const deviceData = {
    device_name: inputs[0].value,
    device_type: inputs[1].value,
    brand: inputs[2].value,
    model: inputs[3].value,
    price: inputs[4].value,
    color: inputs[5].value,
    storage: inputs[6].value,
    battery: inputs[7].value,
    screen_size: inputs[8].value,
    camera: inputs[9].value,
    processor: inputs[10].value,
    release_date: inputs[11].value,
  };

  try {
    const response = await fetch('http://localhost:3000/api/devices', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(deviceData),
    });

    if (response.ok) {
      alert('Device added successfully!');
      form.reset();
      fetchDevices();
    } else {
      const errorData = await response.json();
      alert(`Error: ${errorData.error}`);
    }
  } catch (error) {
    console.error('Error adding device:', error);
  }
});

// Function to delete a device
async function deleteDevice(id) {
  try {
    const response = await fetch(`http://localhost:3000/api/devices/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      alert('Device deleted successfully!');
    } else {
      alert('Error deleting device.');
    }
  } catch (error) {
    console.error('Error deleting device:', error);
  }
}

// Initial fetch to populate table
fetchDevices();

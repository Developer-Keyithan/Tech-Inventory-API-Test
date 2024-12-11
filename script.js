const form = document.querySelector('.device-form');
const deviceTable = document.querySelector('.deviceTable tbody');
const userTable = document.querySelector('.userTable tbody');
const orderTable = document.querySelector('.orderTable tbody');

const API_URL = 'http://localhost:3000/api/admin';

const fetchDevices = async () => {
  try {
    const deviceData = await fetch(`${API_URL}/device`);
    const devices = await deviceData.json();

    deviceTable.innerHTML = '';
    devices.forEach((device, deviceIndex) => {
      const deviceTableRow = document.createElement('tr');
      deviceTableRow.innerHTML = `
        <td>${deviceIndex+1}</td>
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
        <td class="btn"><button data-id="${device._id}" class="edit-btn">Edit</button><button data-id="${device._id}" class="delete-btn">Delete</button></td>
      `;
      deviceTable.appendChild(deviceTableRow);
    });

    const userData = await fetch(`${API_URL}/user`);
    const users = await userData.json();

    userTable.innerHTML = '';
    users.forEach((user, userIndex) => {
      const userTableRow = document.createElement('tr');
      userTableRow.innerHTML = `
        <td>${userIndex+1}</td>
        <td>${user.user_name}</td>
        <td>${user.email}</td>
        <td>${user.device_name}</td>
        <td class="btn"><button data-id="${user._id}" class="edit-btn">Edit</button><button data-id="${user._id}" class="delete-btn">Delete</button></td>
      `;
      userTable.appendChild(userTableRow);
    });

    const orderData = await fetch(`${API_URL}/user`);
    const orders = await orderData.json();

    orderTable.innerHTML = '';
    orders.forEach((order, orderIndex) => {
      const orderTableRow = document.createElement('tr');
      orderTableRow.innerHTML = `
        <td>${orderIndex+1}</td>
        <td>${order.user}</td>
        <td>${order.device}</td>
        <td>${order.device_name}</td>
        <td class="btn"><button data-id="${user._id}" class="edit-btn">Edit</button><button data-id="${user._id}" class="delete-btn">Delete</button></td>
      `;
      orderTable.appendChild(orderTableRow);
    });
  } catch (error) {
    console.error('Error fetching devices:', error);
  }
};

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
    const deviceData = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(deviceData),
    });

    if (deviceData.ok) {
      alert('Device added successfully!');
      form.reset();
      fetchDevices();
    } else {
      const errorData = await deviceData.json();
      alert(`Error: ${errorData.error}`);
    }
  } catch (error) {
    console.error('Error adding device:', error);
  }
});



deviceTable.addEventListener('click', async (event) => {
  const deviceId = event.target.getAttribute('data-id');

  if (event.target.classList.contains('delete-btn')) {
    const confirmDelete = confirm('Are you sure you want to delete this device?');

    if (confirmDelete) {
      try {
        const deviceData = await fetch(`${API_URL}/${deviceId}`, {
          method: 'DELETE',
        });

        if (deviceData.ok) {
          alert('Device deleted successfully!');
          fetchDevices();
        } else {
          const errorData = await deviceData.json();
          alert(`Error: ${errorData.error}`);
        }
      } catch (error) {
        console.error('Error deleting device:', error);
      }
    }
  }

  if (event.target.classList.contains('edit-btn')) {
    try {
      const deviceData = await fetch(`${API_URL}/${deviceId}`);
      const device = await deviceData.json();

      const inputs = form.querySelectorAll('input');
      inputs[0].value = device.device_name;
      inputs[1].value = device.device_type;
      inputs[2].value = device.brand;
      inputs[3].value = device.model;
      inputs[4].value = device.price;
      inputs[5].value = device.color;
      inputs[6].value = device.storage;
      inputs[7].value = device.battery;
      inputs[8].value = device.screen_size;
      inputs[9].value = device.camera;
      inputs[10].value = device.processor;
      inputs[11].value = device.release_date;

      form.onsubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const updatedDeviceData = {};
        formData.forEach((value, key) => {
          updatedDeviceData[key] = value;
        });

        try {
          const updateResponse = await fetch(`${API_URL}/${deviceId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedDeviceData),
          });

          if (updateResponse.ok) {
            alert('Device updated successfully!');
            form.reset();
            fetchDevices();
            form.onsubmit = null;
          } else {
            const errorData = await updateResponse.json();
            alert(`Error: ${errorData.error}`);
          }
        } catch (error) {
          console.error('Error updating device:', error);
        }
      };
    } catch (error) {
      console.error('Error fetching device for editing:', error);
    }
  }
});

fetchDevices();

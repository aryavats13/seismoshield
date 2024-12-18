// Login Modal Functionality
function showLoginModal() {
  const modal = document.getElementById('login-modal');
  if (modal) {
    modal.style.display = 'flex';
  }
}

function closeLoginModal() {
  const modal = document.getElementById('login-modal');
  if (modal) {
    modal.style.display = 'none';
    resetLoginForm();
  }
}

function resetLoginForm() {
  const loginTypeButtons = document.querySelectorAll('.login-type-btn');
  const loginForm = document.getElementById('login-form');
  const loginFormContainer = document.querySelector('.login-form-container');
  
  if (loginTypeButtons) {
    loginTypeButtons.forEach(btn => btn.classList.remove('active'));
  }
  
  if (loginForm) {
    loginForm.reset();
    loginForm.style.display = 'none';
  }
  
  if (loginFormContainer) {
    loginFormContainer.dataset.loginType = '';
  }
}

function selectLoginType(type, event) {
  const loginTypeButtons = document.querySelectorAll('.login-type-btn');
  const loginForm = document.getElementById('login-form');
  const loginFormContainer = document.querySelector('.login-form-container');

  if (loginTypeButtons) {
    loginTypeButtons.forEach(btn => btn.classList.remove('active'));
  }

  if (event && event.target) {
    event.target.classList.add('active');
  }

  if (loginForm) {
    loginForm.style.display = 'block';
  }
  
  if (loginFormContainer) {
    loginFormContainer.dataset.loginType = type;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  
  if (loginForm) {
    loginForm.addEventListener('submit', handleLoginSubmit);
  }

  const loginTypeButtons = document.querySelectorAll('.login-type-btn');
  if (loginTypeButtons) {
    loginTypeButtons.forEach(btn => {
      btn.addEventListener('click', (event) => {
        const type = event.target.dataset.loginType;
        selectLoginType(type, event);
      });
    });
  }
});

function handleLoginSubmit(event) {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const loginFormContainer = document.querySelector('.login-form-container');
  const loginType = loginFormContainer ? loginFormContainer.dataset.loginType : null;

  if (username && password && loginType) {
    closeLoginModal();
    showDashboard(loginType);
  } else {
    alert('Please select login type and enter username and password');
  }
}

function showDashboard(type) {
  const customerDashboard = document.getElementById('customer-dashboard');
  const engineerDashboard = document.getElementById('engineer-dashboard');

  if (customerDashboard) {
    customerDashboard.style.display = 'none';
  }
  
  if (engineerDashboard) {
    engineerDashboard.style.display = 'none';
  }

  if (type === 'customer' && customerDashboard) {
    customerDashboard.style.display = 'block';
    initCustomerDashboard(sensorData);
  } else if (type === 'engineer' && engineerDashboard) {
    engineerDashboard.style.display = 'block';
    initEngineerDashboard(sensorData);
  }
}

// User credentials 
const users = {
  customers: [
      { username: 'customer1', password: 'pass123', name: 'John Doe' },
      { username: 'customer2', password: 'pass456', name: 'Jane Smith' }
  ],
  engineers: [
      { username: 'engineer1', password: 'tech123', name: 'Alex Engineer' },
      { username: 'engineer2', password: 'tech456', name: 'Sarah Technician' }
  ]
};

// DOM Elements
document.addEventListener('DOMContentLoaded', () => {
  const loginModal = document.getElementById('login-modal');
  const loginForm = document.getElementById('login-form');
  const loginTypeButtons = document.querySelectorAll('.login-type-btn');
  const loginFormContainer = document.querySelector('.login-form-container');
  const customerDashboard = document.getElementById('customer-dashboard');
  const engineerDashboard = document.getElementById('engineer-dashboard');

  // Ensure initial state
  if (customerDashboard) customerDashboard.style.display = 'none';
  if (engineerDashboard) engineerDashboard.style.display = 'none';

  // Login Type Selection
  loginTypeButtons.forEach(button => {
      button.addEventListener('click', () => {
          // Remove active class from all buttons
          loginTypeButtons.forEach(btn => btn.classList.remove('active'));
          
          // Add active class to clicked button
          button.classList.add('active');
          
          // Show login form
          if (loginForm) loginForm.style.display = 'block';
          
          // Set login type
          if (loginFormContainer) {
              loginFormContainer.setAttribute('data-login-type', 
                  button.getAttribute('data-login-type'));
          }
      });
  });

  // Login Form Submission
  if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
          e.preventDefault();
          
          // Get form values
          const username = document.getElementById('username').value;
          const password = document.getElementById('password').value;
          
          // Get login type
          const loginType = loginFormContainer 
              ? loginFormContainer.getAttribute('data-login-type') 
              : null;

          // Validate inputs
          if (!loginType) {
              alert('Please select a login type (Customer or Engineer)');
              return;
          }

          // Validate credentials
          const userList = loginType === 'customer' ? users.customers : users.engineers;
          const user = userList.find(u => u.username === username && u.password === password);
          
          if (user) {
              // Hide login modal
              if (loginModal) loginModal.style.display = 'none';
              
              // Show corresponding dashboard
              if (loginType === 'customer') {
                  if (customerDashboard) customerDashboard.style.display = 'block';
                  if (engineerDashboard) engineerDashboard.style.display = 'none';
              } else {
                  if (engineerDashboard) engineerDashboard.style.display = 'block';
                  if (customerDashboard) customerDashboard.style.display = 'none';
              }
          } else {
              // Clear password field
              document.getElementById('password').value = '';
              
              // Show error message
              alert('Invalid username or password. Please try again.');
          }
      });
  }

  // Login Modal Functions
  window.showLoginModal = function() {
      if (loginModal) loginModal.style.display = 'flex';
      
      // Reset login form
      if (loginForm) loginForm.style.display = 'none';
      if (loginTypeButtons) {
          loginTypeButtons.forEach(btn => btn.classList.remove('active'));
      }
      if (loginFormContainer) {
          loginFormContainer.setAttribute('data-login-type', '');
      }
  }

  window.closeLoginModal = function() {
      if (loginModal) loginModal.style.display = 'none';
  }
});

// Optional: Add console logging for debugging
console.log('Login script loaded successfully');
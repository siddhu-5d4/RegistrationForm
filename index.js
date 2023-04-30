window.onload = function() {
    var savedUsers = JSON.parse(localStorage.getItem('users'));
    if (savedUsers) {
      var table = document.getElementById('users');
      savedUsers.forEach(function(user) {
        var row = table.insertRow(-1);
        var p = row.insertCell(0);
        var r= row.insertCell(1);
        var a = row.insertCell(2);
        var v = row.insertCell(3);
        var s = row.insertCell(4);
        p.innerHTML = user.name;
        r.innerHTML = user.email;
        a.innerHTML = user.password;
        v.innerHTML = user.dob;
        s.innerHTML = user.accepted ? 'true' : 'false';
      });
    }
  };

  function validateDOB() {
    var dob = document.getElementById('dob').value;
    var today = new Date();
    var birthdate = new Date(dob);
    var age = today.getFullYear() - birthdate.getFullYear();
    if (
      birthdate.getMonth() > today.getMonth() ||
      (birthdate.getMonth() == today.getMonth() &&
        birthdate.getDate() > today.getDate())
    ) {
      age--;
    }

    if (age >= 18 && age <= 55) {
      return true;
    } else {
      alert('You must be between 18 and 55 years old to register.');
      return false;
    }
  }

  function registerUser() {
    if (!validateDOB()) {
      return;
    }
    var table = document.getElementById('users');
    table.style.display = 'table';
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var dob = document.getElementById('dob').value;
    var accepted = document.getElementById('acceptTerms').checked;

    // Save user data to local storage
    var users = JSON.parse(localStorage.getItem('users')) || [];
    users.push({
      name: name,
      email: email,
      password: password,
      dob: dob,
      accepted: accepted
    });
    localStorage.setItem('users', JSON.stringify(users));

    // Add user data to the HTML table
    var row = table.insertRow(-1);
    var p = row.insertCell(0);
    var r = row.insertCell(1);
    var a = row.insertCell(2);
    var v = row.insertCell(3);
    var s = row.insertCell(4);
    p.innerHTML = name;
    r.innerHTML = email;
    a.innerHTML = password;
    v.innerHTML = dob;
    s.innerHTML = accepted ? 'true' : 'false';

    // Clear form fields
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
    document.getElementById('dob').value = '';
    document.getElementById('acceptTerms').checked = false;
  }

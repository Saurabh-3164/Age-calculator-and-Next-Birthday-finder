const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/calculate', (req, res) => {
  const name = req.body.uname;
  const Bdate = req.body.BDate;
  
  const date = new Date(Bdate);
  const currentDate = new Date();

  const yearsDifference = currentDate.getFullYear() - date.getFullYear();
  const monthsDifference = currentDate.getMonth() - date.getMonth();
  const daysDifference = currentDate.getDate() - date.getDate();

  let reYear = currentDate.getFullYear();
  let congrats = "";

  if (monthsDifference > 0 || (monthsDifference === 0 && daysDifference > 0)) {
    reYear += 1;
  }

  if (monthsDifference === 0 && daysDifference === 0) {
    congrats = `Ohh Wow it's your birthday today ....Happy Birthday ${name} I wish all your dreams come true`;
  }

  res.send(`
    <html>
    <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; text-align: center; padding: 50px;">
      <div style="background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); display: inline-block;">
        <p>Welcome ${name}</p>
        <p>Your Birthday date is ${Bdate}</p>
        <p>You are ${yearsDifference} years, ${Math.abs(monthsDifference)} months, and ${Math.abs(daysDifference)} days old now...</p>
        <p>Your next Birthday is on ${date.getDate()}-${date.getMonth() + 1}-${reYear}</p>
        <p>${congrats}</p>
        <p>If you are not satisfied ... Then, you can go to Google here is the link:</p>
        <a href="https://www.google.com" style="color: #4CAF50; text-decoration: none;">Google</a>
      </div>
    </body>
    </html>
  `);
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

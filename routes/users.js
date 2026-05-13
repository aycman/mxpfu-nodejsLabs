const express = require('express');
const router = express.Router();


let users = [
    {
        firstName: "John",
        lastName: "wick",
        email:"johnwick@gamil.com",
        DOB:"22-01-1990",
    },
    {
        firstName: "John",
        lastName: "smith",
        email:"johnsmith@gamil.com",
        DOB:"21-07-1983",
    },
    {
        firstName: "Joyal",
        lastName: "white",
        email:"joyalwhite@gamil.com",
        DOB:"21-03-1989",
    },
];

// GET request: Retrieve all users
//Define a route handler for GET requests to the root path "/"
router.get("/",(req,res)=>{
  //send a JSON response containing the user array, formatted as indentation of 4 spaces for eadability
  res.send(JSON.stringify({users}, null, 4));

});

// GET by specific ID request: Retrieve a single user with email ID
router.get("/:email",(req,res)=>{
    // Extract the email parameter from the request URL
    const email = req.params.email;
    // Filter the users array to find users whose email matches the extracted email parameter
    let filtered_users = users.filter((user) => user.email === email);
    //send the filtered_users array as the response to the client 
    res.send(filtered_users);

});



// POST request: Create a new user
router.post("/",(req,res)=>{
      // Push a new user object into the users array based on query parameters from the request
  users.push({
    "firstName" : req.query.firstName,
    "lastName" : req.query.lastName,
    "email" : req.query.email,
    "DOB" : req.query.DOB
  })  
      // Send a success message as the response, indicating the user has been added
  res.send("The user " + req.query.firstName + " has been added!");
});


// PUT request: Update the details of a user by email ID
router.put("/:email", (req, res) => {
    // Extract the email parameter from the request URL
    const email = req.params.email;
    // Filter the users array to find users whose email matches the extracted email parameter
    let filtered_users = users.filter((user) => user.email === email);

    if (filtered_users.length > 0) {
      // Select the first matching user and update attributes if provided
      let filtered_user = filtered_users[0];
      
      //Extract and update DOB if provided
      let DOB = req.query.DOB;
      if(DOB){
        filtered_user.DOB = DOB;
      };

      /*
      Include similar old user entry with updated user
      let email
      */

      //Extract and update firstName if provided
      let firstName = req.query.firstName;
      if(firstName){
        filtered_user.firstName = firstName;
      };

      //Extract and update lastName if provided
      let lastName = req.query.lastName;
      if(lastName){
        filtered_user.lastName = lastName;
      };

      //Replace old user entry with updated user
      //remove old user entry
      users = users.filter((user) => user.email != email);
      //add updated user entry
      users.push(filtered_user);

      //send success message indicating the user has been updated
      res.send(`The user with email ${email} has been updated!`);
    }
    else{
      //send error messge if no user found
      res.send(`No user found`);
    }

});


// DELETE request: Delete a user by email ID
router.delete("/:email", (req, res) => {
  //Extract the email parameter from request URL
  const email = req.params.email;
  //Filter ther users array to exclude the user with the specified email  
  users = users.filter((user) => user.email != email);
  //send a success message as the response, indicating the user has been deleted
  res.send(`the user with email ${email} deleted`);
});

module.exports=router;

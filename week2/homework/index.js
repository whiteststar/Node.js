// We want to build a web server which stores posts. Posts are objects with the following structure: { id: '3', title: 'Title of the post', text: 'Content of the post.' }. Those posts will be stored in a 'posts' array on the server.
//
// We want to be able to handle several operations based on the following routes
// - "GET /posts" returns all the posts stored in the server as an array.
// - "GET /posts/:postId" returns a specific post (as an object) identified by the id given by the parameter `postId`
// - "GET /posts/:postId/delete" deletes a specific post identified by the id given by the parameter `postId`. Once deleted, this post should not appear in the list returned by the "GET /posts" route.
//
// This folder has already been initialized with a package.json. The package.json also lists the module `express` as a dependency. Before starting the homework, you should run the command `npm install` once in this folder to install express (it should create a node_modules folder).
// Once installed, you can run the application using `node index.js`. When you run the server, you can access the base route by going to your browser on http://localhost:3000/.
//  - If you want to execute the "GET /posts" route, you should navigate to "http://localhost:3000/posts"
//  - If you want to execute the "GET /posts/:postId" route, you should navigate to something like "http://localhost:3000/posts/3" if the post has an id of "3"
//  - If you want to execute the "GET /posts/:postId/delete" route, you should navigate to "http://localhost:3000/posts/3/delete" if the post has an id of "3"
//
// Note: whenever you make a change to this file, you should restart your web server. You can hit CTRL+C in your terminal to kill the web server.
//
// Bonus: if you want to go further, you can store the posts in a file instead of using a JavaScript array using the fs module. You can use the JSON.parse() and JSON.stringify() functions to parse a string to a JavaScript object and vice-versa.

// The express module is used to make the web server
const express = require('express');

// Configuration of the web server
const app = express();
const port = 3000;

// The variable `posts` is an array which stores all the posts.
// Right now, it only adds
const posts = [
  { id: '1', title: 'Title of the post', text: 'Content of the post.' },
  { id: '2', title: 'Title of the post', text: 'Content of the post.' },
  { id: '3', title: 'Title of the post', text: 'Content of the post.' }
];

// If you navigate to http://localhost:3000/, it will respond with the string 'Hello World!'
app.get('/', (req, res) => {
  console.log('Responding with `Hello World!`');

  res.send('Hello World! how are you?');
});

// If you navigate to http://localhost:3000/hello-2, it will respond with the string 'Hello World 2!'
app.get('/hello-2', (req, res) => {
  console.log('Responding with `Hello World 2!`');

  res.send('Hello World 2!');
});

// If you navigate to http://localhost:3000/hello/:name, it will respond with the string 'Hello <the value of the name parameter>!'.
// For example, try it with
// - http://localhost:3000/hello/john
// - http://localhost:3000/hello/mary
// - http://localhost:3000/hello/tom
app.get('/hello/:name', (req, res) => {
  // The parameter ":name" in the route is stored in the `req.params` object in express.
  // Parameters can be identified because they have a prefix of ":" in front of the parameter.
  const name = req.params.name;

  console.log(`Responding with "Hello ${name}!"`);

  res.send(`Hello ${name}!`);
});

// This is the GET /posts route
app.get('/posts', (req, res) => {
  console.log('sending posts...');

  // Right now, we just returning the "sending posts..." string. We should this so that we return the `posts` array that we defined above.
  res.send('sending posts...');
});

//
// You can add the other two routes here
// 1. "GET /posts/:postId"

app.get('/posts/:postId', (req, res) => {
  console.log(req.params.postId);
  var paramId = req.params.postId;
  if (paramId > 0 && paramId <= posts.length) { //chech if entered postid value exist in posts array.
    var wantedPost = posts.find(post => {
      return post.id === paramId;
      });
    const foundHTML = `<h1>${wantedPost.title}</h1><p>${wantedPost.text}</p>`
    return res.send(foundHTML);
  } else {
    res.status(400).json({ mssg: 'Post Number: ' + req.params.postId + ' does not exist!' });
  } 
});
// 2. "GET /posts/:postId/delete"
app.get('/posts/:postId/delete', (req,res) => {
  console.log('post number ' + req.params.postId + ' will be deleted');
  var toDelete = req.params.postId - 1; //to be used in splice
  posts.splice(toDelete, 1);
  return res.send('post number ' + req.params.postId + ' is deleted');
  console.log('post number ' + req.params.postId + ' is deleted');
})


// This starts the web server
app.listen(port, () =>
  console.log(
    `Example app listening on port ${port}!\nYou can access the base route by going to http://localhost:${port}/ in your browser.`
  )
);
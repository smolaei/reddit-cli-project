var request = require('request');
const imageToAscii = require("image-to-ascii")

function requestAsJson(url, callback) {
  request(url, function(err, res) {
    if (err) {
      callback(err);
    }
    else {
      try {
        var data = JSON.parse(res.body);
        callback(null, data);
      }
      catch(err) {
        callback(err);
      }
    }
  })
}

/*
This function should "return" the default homepage posts as an array of objects
*/
function getHomepage(callback) {
  // Load reddit.com/.json and call back with the array of posts
  // TODO: REPLACE request with requestAsJson!
  requestAsJson('https://reddit.com/.json', function(err, res) {
    if (err) {
      callback(err);
    }
    else {
      callback(null, res.data.children);
    }
  });
}

/*
This function should "return" the default homepage posts as an array of objects.
In contrast to the `getHomepage` function, this one accepts a `sortingMethod` parameter.
*/
function getSortedHomepage(sortingMethod, callback) {
  // Load reddit.com/{sortingMethod}.json and call back with the array of posts
  // Check if the sorting method is valid based on the various Reddit sorting methods
}

/*
This function should "return" the posts on the front page of a subreddit as an array of objects.
*/
function getSubreddit(input, callback) {
  // Load reddit.com/r/{subreddit}.json and call back with the array of posts
  console.log(input);
  requestAsJson('https://www.reddit.com/r/' + input + ".json", function(err, res) {
    if (err) {
      callback(err);
    }
    else {
      callback(null, res.data.children);
    }
  });
}

function getHomePagePost(input, callback) {
  // Load reddit.com/r/{subreddit}.json and call back with the array of posts
  console.log(input);
  requestAsJson('https://www.reddit.com' + input + ".json", function(err, res) {
    if (err) {
      callback(err);
    }
    else {
      callback(null, res[0].data.children);
    }
  });
}
function getSubPagePost(input, callback) {
  // Load reddit.com/r/{subreddit}.json and call back with the array of posts
  console.log(input);
  requestAsJson('https://www.reddit.com' + input + ".json", function(err, res) {
    if (err) {
      callback(err);
    }
    else {
      callback(null, res[0].data.children);
    }
  });
}

  



/*
This function should "return" the posts on the front page of a subreddit as an array of objects.
In contrast to the `getSubreddit` function, this one accepts a `sortingMethod` parameter.
*/
function getSortedSubreddit(subreddit, sortingMethod, callback) {
  // Load reddit.com/r/{subreddit}/{sortingMethod}.json and call back with the array of posts
  // Check if the sorting method is valid based on the various Reddit sorting methods
  requestAsJson('https://www.reddit.com/r/' + subreddit + "/" + sortingMethod +".json", function(err, res) {
    if (err) {
      callback(err);
    }
    else {
      callback(null,res.data.children);
    }
  });
}



/*
This function should "return" all the popular subreddits
*/
function getSubreddits(callback) {
  // Load reddit.com/subreddits.json and call back with an array of subreddits
    requestAsJson('https://www.reddit.com/subreddits.json', function(err, res) {
    if (err) {
      callback(err);
    }
    else {
      callback(null, res.data.children);
    }
  });
}
function getSubredditPost(input, callback) {
  requestAsJson('https://www.reddit.com' + input + ".json", function(err, res) {
    if (err) {
      callback(err);
    }
    else {
      callback(null, res[0].data.children);
    }
  });
}


// Export the API
module.exports = {
  getHomepage: getHomepage,
  getSubreddits: getSubreddits,
  getSortedSubreddit: getSortedSubreddit,
  getSubreddit: getSubreddit,
  getHomePagePost: getHomePagePost,
  getSubPagePost: getSubPagePost,
  getSubredditPost: getSubredditPost
};

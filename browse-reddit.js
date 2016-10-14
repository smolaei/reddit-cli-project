var inquirer = require('inquirer');
var redditFunctions = require('./reddit');
require('colors');
require("longjohn");
var imageToAscii = require("image-to-ascii")



function displayPost(post) {
    console.log("The title of the post is: ", post.data.title.bold);
    console.log(('https://reddit.com' + post.data.permalink).blue.underline);
    console.log('\n');
    console.log(("Number of ups :" + post.data.ups).red);
}

function displayPostSelected(selection) {
    console.log(("The author of the post is: ").red, selection[0].data.author);
    console.log('\n');
    console.log(("The link to the post is:").red, selection[0].data.url);
    console.log('\n');
    console.log(("The title of the post is: ").red, selection[0].data.title);
}


function displayListSubreddit(name) {
    console.log(name.data.display_name.bold);
    console.log(('https:reddit.com/r/' + name.data.display_name).blue.underline);
    console.log('\n');
}

function displaySubRedditPost(name) {
    console.log(name.data.title.bold);
    console.log(('https://reddit.com' + name.data.permalink).blue.underline);
    console.log('\n');
}

function checkPostImage(post) {
    if (post[0].data.post_hint === "image") {
        return true;
    }
    return false;
}


var menuChoices = [{
    name: 'Show homepage',
    value: 'HOMEPAGE'
}, {
    name: 'Show subreddit',
    value: 'SUBREDDIT'
}, {
    name: 'List subreddits',
    value: 'SUBREDDITS'
}];

function mainMenu() {
    inquirer.prompt({
        type: 'list',
        name: 'menu',
        message: 'What do you want to do?',
        choices: menuChoices
    }).then(
        function(answers) {
            if (answers.menu === 'HOMEPAGE') {
                redditFunctions.getHomepage(function(err, homepagePosts) {
                    if (err) {
                        console.log('There was a problem, try again later');
                    }
                    else {
                        var mapedArrayHomePost = homepagePosts.map(function(element) {
                            return {
                                name: element.data.title,
                                value: element.data.permalink
                            }

                        })

                        inquirer.prompt({
                            type: 'list',
                            name: 'menu',
                            message: 'Choose a post you want to see!',
                            choices: mapedArrayHomePost
                        }).then(
                            function(input) {
                                var userSubInput = input['menu'];
                                redditFunctions.getHomePagePost(userSubInput, function(err, displayHomePagePost) {
                                    if (err) {
                                        console.log("There was a problem loading post");
                                    }
                                    else {
                                        displayPostSelected(displayHomePagePost)
                                        if (checkPostImage(displayHomePagePost)) {
                                            imageToAscii(displayHomePagePost[0].data.url, function(err, converted) {
                                                console.log(err || converted);
                                            });
                                        }
                                        else {
                                            console.log("No image to Ascii");
                                        }
                                        mainMenu();
                                    }
                                })
                            }
                        )
                    }
                });
            }
            else if (answers.menu === 'SUBREDDIT') {

                inquirer.prompt({
                    type: 'input',
                    name: 'Subreddit Name',
                    message: 'Write the name of the subreddit you wish to visit'

                }).then(
                    function(input) {
                        redditFunctions.getSubreddit(input['Subreddit Name'], function(err, subredditTitles) {
                            if (err) {
                                console.log("There was a problem loading subreddits");
                            }
                            else {
                                var mapedArraySubrPost = subredditTitles.map(function(element) {
                                    return {
                                        name: element.data.title,
                                        value: element.data.permalink
                                    }
                                })

                                inquirer.prompt({
                                    type: 'list',
                                    name: 'menu',
                                    message: 'Choose a post you want to see!',
                                    choices: mapedArraySubrPost
                                }).then(
                                    function(input) {
                                        var userSubInput = input['menu'];
                                        redditFunctions.getSubPagePost(userSubInput, function(err, displaySubPagePost) {
                                            if (err) {
                                                console.log("There was a problem loading post");
                                            }
                                            else {
                                                displayPostSelected(displaySubPagePost)
                                                if (checkPostImage(displaySubPagePost)) {
                                                    imageToAscii(displaySubPagePost[0].data.url, function(err, converted) {
                                                        console.log(err || converted);
                                                    });
                                                }
                                                else {
                                                    console.log("No image to Ascii")
                                                }
                                                mainMenu();
                                            }
                                        })
                                    }
                                )

                            }

                        });
                    }
                );
            }
            else if (answers.menu === 'SUBREDDITS') {
                redditFunctions.getSubreddits(function(err, listofSubr) {
                    if (err) {
                        console.log("There was a problem loading subreddits");
                    }
                    else {
                        var mapedArraySub = listofSubr.map(function(element) {
                            return {
                                name: element.data.title.bold,
                                value: element.data.display_name
                            }

                        })
                        inquirer.prompt({

                                type: 'list',
                                name: 'menu',
                                message: 'Select the subreddit you wish to visit',
                                choices: mapedArraySub


                            }).then(

                                function(input) {
                                    var userInput = input['menu'];
                                    redditFunctions.getSubreddit(userInput, function(err, res) {
                                        if (err) {
                                            console.log("There was a problem loading subreddit");
                                        }
                                        else {
                                            var mapedArraySubPost = res.map(function(element) {
                                                return {
                                                    name: element.data.title,
                                                    value: element.data.permalink
                                                }
                                            })
                                            inquirer.prompt({
                                                type: 'list',
                                                name: 'menu',
                                                message: 'Choose a post you want to see!',
                                                choices: mapedArraySubPost
                                            }).then(
                                                function(input) {
                                                    var userSubInput = input['menu'];
                                                    redditFunctions.getSubredditPost(userSubInput, function(err, displaySubRedPost) {
                                                        if (err) {
                                                            console.log("There was a problem loading post");
                                                        }
                                                        else {
                                                            displayPostSelected(displaySubRedPost)
                                                            if (checkPostImage(displaySubRedPost)) {
                                                                imageToAscii(displaySubRedPost[0].data.url, function(err, converted) {
                                                                    console.log(err || converted);
                                                                });
                                                            }
                                                            else {
                                                                console.log("No image to Ascii")
                                                            }
                                                            mainMenu();
                                                        }

                                                    })

                                                }

                                            )
                                        }
                                    })
                                }
                            )
                            .catch(function(err) {
                                console.log(err.stack);
                            })
                    }
                });
            }

        }
    );
}

mainMenu();
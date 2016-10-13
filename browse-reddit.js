var inquirer = require('inquirer');
var redditFunctions = require('./reddit');
require('colors');
require("longjohn");

function displayPost(post) {
    console.log(post.data.title.bold);
    console.log(('https://reddit.com' + post.data.permalink).blue.underline);
    console.log('\n');
    console.log(("Number of ups :" + post.data.ups).red);
}


function displayListSubreddit(name) {
    console.log(name.data.display_name.bold);
    console.log(('https:reddit.com/r/' + name.data.display_name).blue.underline);
    console.log('\n');
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
                        homepagePosts.forEach(displayPost);
                        mainMenu();
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
                                subredditTitles.forEach(displayPost);
                                mainMenu();
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
                                        console.log(err.stack);
                                        console.log("There was a problem loading subreddit");
                                    }
                                    else {
                                        res.forEach(displayPost);
                                        mainMenu();
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
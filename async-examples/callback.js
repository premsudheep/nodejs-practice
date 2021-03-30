console.log('Before');
getUser(1, (user) => {
    console.log(user);
    getRepositories(user.username, (repos)=> {
        console.log(repos);
    });
});
console.log('After');


function getUser(id, callback) {
    setTimeout(()=>{
        console.log('Connecting to the Database...');
        callback({id: id, username: 'Prem'});
    }, 2000);
}

function getRepositories(username, callback) {
    setTimeout(()=>{
        console.log('Calling Git Hub...');
        callback(['repo1', 'repo2', 'repo3']);
    }, 2000);
}
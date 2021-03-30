// Async and Await are built on top of promises

function getUser(id) {
    return new Promise((resolve => resolve({id: id, username: 'Prem'})));
}

function getRepositories(username) {
    return new Promise((resolve => resolve(['repo1', 'repo2', 'repo3'])));
}

function getCommits(repo) {
    return new Promise((resolve => resolve(['commit1', 'commit2', 'commit3'])));
}

async function displayCommits() {
    try{
        const user = await getUser(1);
        const repo = await getRepositories(user.username);
        const commits = await getCommits(repo);
        console.log(commits);
    } catch (err) {
        console.log(err.message);
    }
}

displayCommits().then();

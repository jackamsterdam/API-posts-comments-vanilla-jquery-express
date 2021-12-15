let startBtn
let mainContainer

document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
        onInit()
    }
}

function onInit() {
    startBtn = document.querySelector('#showPosts')
    startBtn.addEventListener('click', showPosts)
    mainContainer = document.querySelector('#mainContainer')
        // mainContainer.classList.add('hide-main-container')

}

function showPosts() {
    mainContainer.innerHTML = ''
    mainContainer.classList.add('hide-main-container') //is this good? without for one second you see blue line until everything is fetched
    fetch('http://localhost:5000/posts')
        .then(response => response.json())
        .then(data => {
            onPostsReceived(data)
            console.log('i am in the .then of fetch', data)
        })
}

function onPostsReceived(data) {
    mainContainer.classList.remove('hide-main-container')
        //We want the title and the body
    console.log(data[0])
    data.map(post => {

        console.log(post.title)
        console.log(post.body)
        let postContent = `
        <div class="post-comment-container">
           <div class="post">
           <!-- Cant have id  -->
             <div class="title">${post.title}</div>
             <div class="body-post">${post.body}</div>
            <div class="btn-post-flex">
              <button type="submit" class="btn-show-comments" onclick="fetchComments(${post.id})">Show Comments</button>
            </div>
           </div>
        <div class="comment-container hide-comments" id="${post.id}">
        </div>
        </div>
    `
        mainContainer.innerHTML += postContent
    })
}




function fetchComments(id) {
    console.log('id', id)
    let commentContainer = document.getElementById(id) //you can't have this globally cause doent exist in beginning
    commentContainer.classList.remove('hide-comments')

    fetch(`http://localhost:5000/posts/${id}/comments`)
        .then(response => response.json())
        .then(data => {
            onCommentsReceived(data, id)
        })

}

function onCommentsReceived(data, id) {
    console.log('data', data)
    let commentContainer = document.getElementById(id)
    commentContainer.innerHTML = ''
    console.log('commentContainer', commentContainer)

    data.map(comment => {
        console.log("comment", comment);
        console.log("comment.name", comment.name);
        console.log("comment.email", comment.email);
        console.log("comment.body", comment.body);

        let commentContent = `
       <div class="comment-box">
         <div class="name">${comment.name}</div>
         <div class="email">${comment.email}</div>
         <div class="body-comment">${comment.body}</div>
       </div>
       `
        commentContainer.innerHTML += commentContent
    })

    let hideBtnComment = `
        <div class="btn-comment-flex">
          <button type="submit" class="btn-hide-comments" onclick="hideComments(${id})">Hide Comments</button>
        </div>
    `
    commentContainer.innerHTML += hideBtnComment
}

function hideComments(id) {
    console.log('id', id)
    let commentContainer = document.getElementById(id)
    commentContainer.classList.add('hide-comments')
}
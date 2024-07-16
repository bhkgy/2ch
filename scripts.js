document.addEventListener('DOMContentLoaded', function() {
    const threadList = document.getElementById('thread-list');
    const newThreadForm = document.getElementById('new-thread-form');
    const responseForm = document.getElementById('response-form');
    const responseList = document.getElementById('response-list');
    
    let threads = JSON.parse(localStorage.getItem('threads')) || [];

    if (threadList) {
        threads.forEach(thread => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = `thread.html?id=${thread.id}`;
            a.textContent = thread.title;
            li.appendChild(a);
            threadList.appendChild(li);
        });
    }

    if (newThreadForm) {
        newThreadForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const title = document.getElementById('title').value;
            const content = document.getElementById('content').value;
            const id = Date.now();
            threads.push({ id, title, content, responses: [] });
            localStorage.setItem('threads', JSON.stringify(threads));
            window.location.href = 'index.html';
        });
    }

    if (responseForm) {
        const urlParams = new URLSearchParams(window.location.search);
        const threadId = urlParams.get('id');
        const thread = threads.find(t => t.id == threadId);

        if (thread) {
            document.getElementById('thread-title').textContent = thread.title;
            document.getElementById('thread-content').textContent = thread.content;

            thread.responses.forEach(response => {
                const li = document.createElement('li');
                li.textContent = response;
                responseList.appendChild(li);
            });

            responseForm.addEventListener('submit', function(event) {
                event.preventDefault();
                const responseContent = document.getElementById('response-content').value;
                thread.responses.push(responseContent);
                localStorage.setItem('threads', JSON.stringify(threads));
                window.location.reload();
            });
        }
    }
});

async function formHandlerComment(event) {
    const title = document.querySelector('input[name="post-title"]').value;
    const post_text = document.querySelector('textarea[name="post-text"]').value;

    try {
        const response = await fetch('/api/posts', {
            method: Post,
            body: JSON.stringify({
                title,
                post_text,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    } catch (err) {
        console.log(err);
        alert('Post creation failed');
    }
}

document.querySelector('.new-post-form').addEventListener('submit', formHandlerComment);
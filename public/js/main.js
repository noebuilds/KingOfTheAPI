const update = document.querySelector('#delete-button');

update.addEventListener('click', () => {
    fetch('/quotes', {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            names: ['Hank Hill', 'Bill Dauterive,', 'Dale Gribble', 'Kahn Souphanousinphone', 'Peggy Hill', 'Bobby Hill']
        })
    })
    .then(res => {
        if (res.ok) return res.json();
        throw new Error('Network response was not ok');
    })
    .then(response => {
        console.log(response);
        window.location.reload(true);
    })
    .catch(error => {
        console.error('Error during fetch operation:', error);
    });
});

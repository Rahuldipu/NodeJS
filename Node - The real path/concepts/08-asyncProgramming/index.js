// function fetchData(url, callback) {
//     setTimeout(() => {
//         const data = { id: 1, name: "Mike" };
//         callback(data);
//     }, )
// }

// fetchData("https://www.google.com", (data) => {
//     console.log(data)
// })

// Promise
// function fetchData(url) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             const data = { id: 1, name: "mike" };
//             resolve(data);
//         }, 2000);
//     });
// }

// fetchData("http://wwwe.google.com")
//     .then((data) => {
//         console.log(data);
//     })
//     .catch((error) => {
//         console.log(error);
//     });

// async/await
function fetchData(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = { id: 1, name: "mike" };
            resolve(data);
        }, 2000);
    });
}

async function getData() {
    try {
        const data = await fetchData("http://www.google.com");
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

getData()

/*
  STEP 1: using axios, send a GET request to the following URL
    (replacing the placeholder with your Github name):
    https://api.github.com/users/<your name>
*/


axios
  .get(`https://api.github.com/users/AWhitt14`)
  .then((res) => {
    console.log(res);
    cardCreator(res);

  })
  .catch((er) => {
    console.log(`${er}, You done messed up!`);
  });
/*
  STEP 2: Inspect and study the data coming back, this is YOUR
    github info! You will need to understand the structure of this
    data in order to use it to build your component function

    Skip to STEP 3.
*/

/*
  STEP 4: Pass the data received from Github into your function,
    and append the returned markup to the DOM as a child of .cards
*/

/*
  STEP 5: Now that you have your own card getting added to the DOM, either
    follow this link in your browser https://api.github.com/users/<Your github name>/followers,
    manually find some other users' github handles, or use the list found at the
    bottom of the page. Get at least 5 different Github usernames and add them as
    Individual strings to the friendsArray below.

    Using that array, iterate over it, requesting data for each user, creating a new card for each
    user, and adding that card to the DOM.
*/

const followersArray = [];

axios.get('https://api.github.com/users/AWhitt14/followers')
  .then(res => {
   // console.log(res);
   // console.log(res.data.length);
    res.data.forEach( () => {
      axios
      .get(`https://api.github.com/users/${res.data.login}`)
      .then(res => {
        followersArray.push(res);
      //console.log(`overly complicated coding worked`);
      })
      .catch((er) => {
        console.log(`error on for loop url ${er}`);
      });
    });
  })
  .catch(er => {
    console.log(`error on my followers url ${er}`);
  });

  axios.get('https://api.github.com/users/AWhitt14/following')
  .then(res => {
    //console.log(res);
    // console.log(res.data.length);
    res.data.forEach( () => {
      axios
      .get(`https://api.github.com/users/${res.data.login}`)
      .then(res => {
        followersArray.push(res);
      //console.log(`overly complicated coding worked but this time for following`);
      })
      .catch((er) => {
        console.log(`error on for loop url ${er}`);
      });
    });
  })
  .catch(er => {
    console.log(`error on my followers url ${er}`);
});


// console.log(followersArray.length);
followersArray.forEach((i) => {
    cardCreator(i);

});

  

/*
  STEP 3: Create a function that accepts a single object as its only argument.
    Using DOM methods and properties, create and return the following markup:

    <div class="card">
      <img src={image url of user} />
      <div class="card-info">
        <h3 class="name">{users name}</h3>
        <p class="username">{users user name}</p>
        <p>Location: {users location}</p>
        <p>Profile:
          <a href={address to users github page}>{address to users github page}</a>
        </p>
        <p>Followers: {users followers count}</p>
        <p>Following: {users following count}</p>
        <p>Bio: {users bio}</p>
      </div>
    </div>
*/
function cardCreator(obj) {
  const par = document.querySelector('.cards');
  const cont = document.createElement('div');
  const imgUser = document.createElement('img');
  const ci = document.createElement('div');
  const name = document.createElement('h3');
  const uName = document.createElement('p');
  const loc = document.createElement('p');
  const pro = document.createElement('p');
  const address = document.createElement('a');
  const followers = document.createElement('p');
  const following = document.createElement('p');
  const bio = document.createElement('p');

  cont.classList.add('card');
  ci.classList.add('card-info');
  name.classList.add('name');
  uName.classList.add('username')

  par.appendChild(cont);
  cont.appendChild(imgUser);
  cont.appendChild(ci);
  ci.appendChild(name);
  ci.appendChild(uName);
  ci.appendChild(loc);
  ci.appendChild(pro);
  pro.appendChild(address);
  ci.appendChild(followers);
  ci.appendChild(following);
  ci.appendChild(bio);

  imgUser.src = obj.data.avatar_url;
  name.textContent = obj.data.name;
  uName.textContent = obj.data.login;
  loc.textContent = obj.data.location;
  address.href = obj.data.html_url;
  address.textContent = obj.data.html_url;
  followers.textContent = `Followers: ${obj.data.followers}`;
  following.textContent = `Following: ${obj.data.following}`;
  //bio.textContent = obj.data.bio;

  if (obj.data.bio = 'null'){
    bio.textContent = 'This user does not have a bio';
  } else {
    bio.textContent = obj.data.bio;
  }

  return cont;
  
}
/*
  List of LS Instructors Github username's:
    tetondan
    dustinmyers
    justsml
    luishrd
    bigknell
*/

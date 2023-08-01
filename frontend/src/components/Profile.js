import React from 'react'

const Profile = () => {
    const auth = localStorage.getItem('user');
    let name = '';
    let email = '';
    let image = '';

    if (auth) {
        try {
            const userData = JSON.parse(auth);
            name = userData.name || '';
            email = userData.email || '';
            image = userData.image || '';
        } catch (error) {
            console.error('Error parsing user data:', error);
        }
    }
    console.log(image)

    return (
        <div>
            <h1>Profile Page</h1>
            {name && <h2>Name - {name}</h2>}
            {email && <h2>Email - {email}</h2>}
            {image && <img src={`${image}`} className='profileImage' alt='userPhoto' />}
        </div>
    )
}

export default Profile;

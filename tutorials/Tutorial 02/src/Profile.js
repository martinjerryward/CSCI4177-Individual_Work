import React from 'react';

const Profile = ({ user }) => {
  return (
    // placeholder style
    <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <h2>Profile Page</h2>
      <p><strong>First Name:</strong> {user.firstName}</p>
      <p><strong>Last Name:</strong> {user.lastName}</p>
      <p><strong>Email:</strong> {user.email}</p>
    </div>
  );
};

export default Profile;
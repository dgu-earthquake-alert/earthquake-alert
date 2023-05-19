const Profile = ({ userInfo }) => {
  return (
    <>
      <div/>
      <h3>이름: {userInfo.name}</h3>
      <h3>이메일: {userInfo.email}</h3>
    </>
  );
};

export default Profile;
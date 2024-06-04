import React, { useContext, useEffect } from 'react'
import { UserContext } from "../pages/UserContext"
const ProfilePage = () => {
    const { userinfo } = useContext(UserContext);
  return (
    <div className="profile-container" style={{paddingTop: "5.5rem"}}>
        {userinfo.username}<br/>
        {userinfo.useremail}
    </div>
  )
}

export default ProfilePage
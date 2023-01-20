import React from 'react'

const UserImage = ({ image }) => {
    return (
        <div width="60px" height="60px">
            <img
                style={{ objectFit: "cover", borderRadius: "50%" }}
                width="60px"
                height="60px"
                // alt="user"
                src={`http://localhost:3001/assets/${image}`}
            />
        </div>
    )
}

export default UserImage
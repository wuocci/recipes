import { Typography } from '@material-ui/core';
import Avatar from '@mui/material/Avatar';
import { deepOrange, green } from '@mui/material/colors';

const ProfileInfo = ({userData}) => {
    if(userData != null)
        return (
            <div className="profile-info">
                <Avatar alt="Username's first letter in a circle icon" sx={{ bgcolor: [deepOrange[500]], width: 100, height: 100 }} >
                    {userData.username[0]}
                </Avatar>
                <Typography variant="h3" component="caption">
                    {userData.username}
                </Typography>
            </div>
        );
    else{
        return(
            <div>loading</div>
        )
    }
}

export default ProfileInfo;
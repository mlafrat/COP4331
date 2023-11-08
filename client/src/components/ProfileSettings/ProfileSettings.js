import './ProfileSettings.css';
import Button from '@material-ui/core/Button';


function ProfileSettings() {
    return(
        // Need this to be pre-filled so that we can easily change email & usernames (like contact manager)
        <div className="settings-wrapper">
            <h1>Edit Profile</h1>
            <form>
                <label>
                    <p>Email</p>
                    <input
                        type="text"
                        name="email"
                    />
                </label>
                <label>
                    <p>Username</p>
                    <input
                        type="text"
                        name="username"
                    />
                </label>
                <div>
                    <Button type="submit" variant="contained">Update Credentials</Button>
                </div>
                <div>
                    <Button component="label" variant="contained">
                        Change Profile Picture
                        <input type="file" accept="image/*" style={{ display: 'none' }}/>
                    </Button>
                </div>
                <a href="http://localhost:3000/change-password">Change Password</a> 
            </form>
        </div>
      );
}

export default ProfileSettings;
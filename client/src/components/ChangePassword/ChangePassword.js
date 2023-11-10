import './ChangePassword.css'
import Button from '@material-ui/core/Button'

function ChangePassword() {
    return(
        // Need to make sure current password is right, then change password/confirm change.
        <div className="change-password-wrapper">
            <h1>Change Password</h1>
            <form>
                <label>
                    <p>Current Password</p>
                    <input
                        type="password"
                        name="password"
                    />
                </label>
                <label>
                    <p>New Password</p>
                    <input
                        type="password"
                        name="newPassword"
                    />
                </label>
                <label>
                    <p>Confirm New Password</p>
                    <input
                        type="password"
                        name="confirmNewPassword"
                    />
                </label>
                <div>
                    <Button type="submit" variant="contained">
                        Change Password
                    </Button>
                </div>
            </form>
        </div>

    );
}

export default ChangePassword;
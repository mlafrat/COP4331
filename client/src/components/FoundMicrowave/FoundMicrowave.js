import './FoundMicrowave.css';
import Button from '@material-ui/core/Button';
import TextField from '@mui/material/TextField';


function FoundMicrowave() {
    return(
        <div className="microwave-form-wrapper">
            <h1>New Microwave</h1>
            <form>
                <div>
                    <TextField
                        id="location-building"
                        label="Building Location"
                    />
                </div>
                <div>
                    <TextField
                        id="location-description"
                        label="Location Description"
                        multiline
                        rows={6}
                        placeholder="Please provide a detailed description of where this microwave is located."
                    />
                </div>
                <div>
                    <Button component="label" variant="contained">
                            Upload a Photo of the Microwave Here!
                            <input type="file" accept="image/*" style={{ display: 'none' }}/>
                        </Button>
                    </div>
                <div>
                    <Button type="submit" variant="contained">Submit For Review</Button>
                </div>
            </form>
        </div>
      );

}

export default FoundMicrowave;
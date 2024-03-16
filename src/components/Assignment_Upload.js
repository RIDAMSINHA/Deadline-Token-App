const AssignmentUpload = () => {
    return (
        <html>
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <script src="https://cdn.tailwindcss.com"></script>
            </head>
            <body>
                <form>
                <select>
                    <option>Select Subject</option>
                    <option>English</option>
                    <option>Hindi</option>
                    <option>Maths</option>
                    <option>Science</option>
                </select>
                    <br/><br/>
                <input type="file" placeholder="upload document" />
                <br/><br/>
                <label>Choose a deadline</label>
                <input type="date" />
                <input type="time" />
                <br/><br/>
                <button>Submit</button>
                </form>
                
            </body>
        </html>
    );
};

export default AssignmentUpload;
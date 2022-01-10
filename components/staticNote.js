const StaticNote = () => {

    return (
        <div className='static-note-container'>
            <div className='static-note-header'>
                <ul className='note-button-list'>
                    <li><button className='note-button-static button-minimise'>_</button></li>
                    <li><button className='note-button-static button-expand' >▢</button></li>
                    <li><button className='note-button-static button-close'>X</button></li>
                </ul>
            </div>
            <div className='note'>
                <p> Make notes.<br />Collect ideas.<br /> Share your thoughts.</p>
            </div>
        </div>
    );
}

export default StaticNote;
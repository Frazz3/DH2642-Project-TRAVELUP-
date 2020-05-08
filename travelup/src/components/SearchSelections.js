import React from "react";

const SearchSelections = ({
    location,
    locationError,
    errorMessage,
    returnToPlanner,
    history
}) => (
        <React.Fragment>
            {
                (!location && !locationError) ?
                    (<div className="container">
                        <img src="http://www.csc.kth.se/~cristi/loading.gif"></img>
                    </div>)
                    :
                    ((locationError) ?
                        (<div>
                            <div className="error_text">We could not find a location that matches {errorMessage}, try again please.</div>
                            <button className="arrow_btn" onClick={() => returnToPlanner()} >&#8592;</button>
                        </div>)
                        :
                        (<div className="container">
                            <div>
                                <h1 className="title_text" >Let's plan your trip to {location}</h1>
                            </div>
                            <div>
                                {createButton(images[0], "/food", history)}
                                <br /><br />
                                {createButton(images[1], "/accommodations", history)}
                                <br /><br />
                                {createButton(images[2], "/activities", history)}
                            </div>
                        </div>
                        ))
            }
        </React.Fragment>
    )


const createButton = (image, link, history) => {
    console.log("HEJSAN");
    return (
        <button className="select_btn" disabled={image.disable} onClick={() => history.push(link)}>
            {image.title}
            <br />
            <img className="select_img" src={image.url} />
        </button>
    )
}


// Images taken from  Unsplash
// Restaurants: https://unsplash.com/@jaywennington
// Accommodation: https://unsplash.com/@niklanus
// Activities: https://unsplash.com/@septdoigt
const images = [
    {
        url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
        title: 'Restaurants',
        disable: false,
    },
    {
        url: 'https://images.unsplash.com/photo-1445991842772-097fea258e7b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
        title: 'Accommodation',
        disable: false,
    },
    {
        url: 'https://images.unsplash.com/photo-1506426235353-205ad887bb38?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
        title: 'Activities',
        disable: false,
    }
]

export default SearchSelections;
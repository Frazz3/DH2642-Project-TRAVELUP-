import React from "react";

const SearchSelections = ({
    location,
    locationError,
    errorMessage,
    goToLink
}) => (
        <React.Fragment>
            {
                (!location && !locationError) ?
                    (<div className="container">
                        <img src="http://www.csc.kth.se/~cristi/loading.gif" alt=""></img>
                    </div>)
                    :
                    ((locationError) ?
                        (<div>
                            <div className="error_text">We could not find a location that matches {errorMessage}, please try again.</div>
                            <button className="arrow_btn" onClick={() => goToLink("/planner")} >&#8592;</button>
                        </div>)
                        :
                        (<div className="container">
                            <div>
                                <h1 className="title_text" >Let's plan your trip to {location}</h1>
                            </div>
                            <div>
                                {createButton(images[0], "/food", goToLink)}
                                <br /><br />
                                {createButton(images[1], "/accommodations", goToLink)}
                                <br /><br />
                                {createButton(images[2], "/activities", goToLink)}
                            </div>
                        </div>
                        ))
            }
        </React.Fragment>
    )

const createButton = (image, link, goToLink) => {
    return (
        <button className="select_btn" disabled={image.disable} onClick={() => goToLink(link)}>
            {image.title}
            <br />
            <img className="select_img" src={image.url} alt=""/>
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
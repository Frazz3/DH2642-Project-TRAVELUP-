import { light } from "@material-ui/core/styles/createPalette";

// A file with all styling.

//Colors
const PRIMARY_TEXT_COLOR = "#239160";
const PRIMARY_BACKGROUND_COLOR = "#239160";
const SECONDARY_BACKGROUND_COLOR = "#52BE80";
const BUTTON_BORDER_COLOR = "#239160";

//Fonts
const FONT_FAMILY = "Arial"
const BUTTON_FONT_COLOR = "white"

// Buttons
export const select_btn = {
    top: "30%",
    backgroundColor: PRIMARY_BACKGROUND_COLOR,
    color: "white",
    fontSize: "16px",
    padding: "10px 20px",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
}

export const result_btn = {
    width: "350px",
    minHeight: "300px",
    maxHeight: "400px",
    backgroundColor: "white",
    border: "none",
    textAlign: "center",
    cursor: "pointer",
    display: "inlineBlock",
    margin: "10px 10px",
    position: "relative",
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",  // gör att resultaten ser ut som "kort", sjuuuukt fult nu haha
  }

export const small_btn = {
    width: "100px",
    height: "50px",
    backgroundColor: SECONDARY_BACKGROUND_COLOR,
    border: "solid",
    textAlign: "center",
    cursor: "pointer",
    borderRadius: "25px",
    borderColor: BUTTON_BORDER_COLOR,
    boxShadow: "5px 5px 5px grey",
    fontSize: "12px",
    textAlign: "center",
    fontFamily: FONT_FAMILY,
    color: BUTTON_FONT_COLOR,
}

// Texts
export const title_text = {
    color: PRIMARY_TEXT_COLOR,
    padding: "10px",
    fontFamily: "Arial",
    textAlign: "center",
    fontSize: "40px"
}

// Images
export const select_img = {
    width: "225px",
    height: "150px"
}

// Div
export const filter_div = {
    width:"150px",
    float:"left",
    border: "" + 2 + "px solid " + PRIMARY_TEXT_COLOR,
    boxShadow: "1px 1px 5px #888888",
    display: "flex",
    flexDirection: "column",
    display: "flex",
    borderRadius: 8,
}

export const restaurantDiv = {
    width:"100%",
}

// Link
export const lnk_style = {
    color: 'white',
    textDecoration: 'none',
    position:'left'
  }

// Containers
export const myTrip_container = {
    width: 300,
    display: "flex",
    flexDirection: "column",
    borderRadius: 8,
    border: "" + 2 + "px solid " + "#239160",
    boxShadow: "1px 1px 5px #888888",
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
  }

export const containerSection = {
    width:"100%"
}
  
  
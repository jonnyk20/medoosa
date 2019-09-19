import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Input from "@material-ui/core/TextField";
import { createMuiTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import Body from "../Body";
import medoosaService from "../../medoosaService";
import { isMobile } from "../../utils";
import "./Share.scss";

const order = ["color", "eyes", "mouth", "arms", "head"];

const formatMods = medoosas => {
  console.log("MEDOOSAS", medoosas);
  return medoosas.map(medoosa => ({
    name: medoosa.name,
    mods: order.map(name => ({ name, value: medoosa[name] }))
  }));
};

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  button: {
    margin: theme.spacing(1)
  },
  input: {
    margin: theme.spacing(1)
  }
}));

// device detection
const theme = createMuiTheme({
  palette: {
    type: "dark"
  }
});

const settings = {
  centerMode: true,
  arrows: false,
  slidesToScroll: 1,
  autoplay: true,
  speed: 2000,
  autoplaySpeed: 0,
  cssEase: "linear",
  draggable: false,
  touchMove: false,
  swipe: false,
  // rows: 2,
  pauseOnHover: false,
  adaptiveHeight: true
};

const getItems = medoosas =>
  medoosas.map((medoosa, i) => (
    <div
      key={`item-${i}`}
      style={{
        pointerEvents: "none"
      }}
      className="community-avatar"
    >
      <div style={{ height: "150px" }}>
        <Body stage={5} modSelections={medoosa.mods} />
        <div className="community-avatar__name">{medoosa.name}</div>
      </div>
    </div>
  ));

const Share = ({ stage, modSelections, reset }) => {
  const [name, setName] = useState("");
  const [medoosas, setMedoosas] = useState(null);

  const getMedoosas = async () => {
    const fetchedMedoodas = await medoosaService.getMedoosas();
    const fotmattedSelections = formatMods(fetchedMedoodas);
    setMedoosas(fotmattedSelections);
  };

  useEffect(() => {
    getMedoosas();
  }, []);

  const classes = useStyles();

  const onChange = e => setName(e.target.value);
  const onSubmit = async e => {
    e.preventDefault();
    await medoosaService.submitMedoosa(name, modSelections);
    reset();
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="share">
        <div className="share__community">
          {!!medoosas && (
            <Slider {...settings} slidesToShow={isMobile() ? 1 : 3}>
              {getItems(medoosas)}
            </Slider>
          )}
        </div>
        <div className="share__avatar">
          <Body stage={stage} modSelections={modSelections} />
        </div>
        <div className="share__input">
          <form onSubmit={onSubmit}>
            <Input
              className={classes.input}
              defaultValue={name}
              placeholder="Your Name"
              inputProps={{
                "aria-label": "description",
                color: "white",
                maxLength: 15
              }}
              onChange={onChange}
            />
            <div style={{ marginTop: "25px" }}>
              <Button
                color="primary"
                variant="contained"
                className={classes.button}
                type="submit"
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Share;

/* eslint-disable  no-useless-escape */ 
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Input from "@material-ui/core/TextField";
import { createMuiTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import Body from "../Body";
import medoosaService from "../../medoosaService";
import "./Share.scss";

// process.env.NODE_ENV

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

const isMobile = () => {
  let result = false; //initiate as false
  if (
    typeof window !== "undefined" &&
    typeof window.navigator !== "undefined"
  ) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
        navigator.userAgent
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        navigator.userAgent.substr(0, 4)
      )
    ) {
      result = true;
    }
    return result;
  }
};

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

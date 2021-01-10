import React, {useEffect, useState, useRef} from "react";
import { API, Storage } from "aws-amplify";
import image from "assets/img/faces/avatar.jpg";
import Footer from "components/Footer/Footer.js";

// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import SectionExamples from "./SectionExamples";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";


import styles from "assets/jss/material-kit-react/views/landingPage.js";

// Sections for this page

import constants from 'utils/constants';

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function DashboardPage(props) {
  const classes = useStyles();
  const file = useRef(null);
  const [notes, setNotes] = useState(null);
  const [attachment, setAttachment] = useState(null);
  const { ...rest } = props;

  function loadNote() {
    return API.get("notes", `/notes`);
  }

  useEffect(() => {
    

    async function onLoad() {
      try {
        const resp = await loadNote();
        const attach = '';
        setNotes(resp);
        console.log(resp[0].attachment);
        if (resp[0].attachment) {
           attach = await Storage.vault.get(resp[0].attachment);
           console.log('attach', attach);
          setAttachment(attach);
        }
        

      } catch (e) {
        console.log('dynamoDB Error', e);
      }
    }

    onLoad();
  }, [attachment]);
  return (
    <div>
        <div id="navbar" className={classes.navbar}>
          <div className={classes.navigation}>
            <Header
                color="dark"
                brand={constants.full_company_name}
                rightLinks={<HeaderLinks {...rest}/>}
                fixed
                changeColorOnScroll={{
                height: 400,
                color: "white"
                }}
                {...rest}
            />
          </div>
      </div>
      <div className={classNames(classes.main, classes.mainRaised)}>
          <div>
              <SectionExamples />
          </div>
          
          <div className={classes.section2}>
            <div className={classes.container2}>
              <GridContainer>
                <GridItem xs={12} sm={2}>
                  <h4>Rounded Image</h4>
                  <img
                    src={image}
                    alt="..."
                    className={classes.imgRounded + " " + classes.imgFluid}
                  />
                </GridItem>
              </GridContainer>
            </div>
          </div>
    </div>
    <Footer />
  </div>
  );
}

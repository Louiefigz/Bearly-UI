import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";

// @material-ui/icons

// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";

import styles from "assets/jss/material-kit-react/views/landingPage.js";

// Sections for this page
import WorkSection from "./Sections/WorkSection.js";

import constants from 'utils/constants';

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function HomePage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div>
      <Header
        color="transparent"
        routes={dashboardRoutes}
        brand={constants.full_company_name}
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "white"
        }}
        {...rest}
      />
      <Hidden smDown>
        <Parallax filter image={require("assets/img/BJ_logo.png")}>
          <div className={classes.container}>
          </div>
        </Parallax>
      </Hidden>
      <Hidden smUp>
        <Parallax image={require("assets/img/BJ_logo_1.png")}>
          <div className={classes.container}>
          </div>
        </Parallax>
      </Hidden>
      <Hidden smDown>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
            {/* <ProductSection /> */}
            {/* <TeamSection /> */}
            <WorkSection />
          </div>
        </div>
      </Hidden>
      <Hidden smUp>
        <div className={classNames(classes.main)}>
          <div className={classes.container}>
            <WorkSection />
          </div>
        </div>
      </Hidden>
      
      {/* <Footer /> */}
    </div>
  );
}

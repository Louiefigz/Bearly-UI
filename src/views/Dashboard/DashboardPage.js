import React from "react";
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

import styles from "assets/jss/material-kit-react/views/landingPage.js";

// Sections for this page

import constants from 'utils/constants';

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function DashboardPage(props) {
  const classes = useStyles();
  const { ...rest } = props;
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
       
      </div>
    </div>
  );
}

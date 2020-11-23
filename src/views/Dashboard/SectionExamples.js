import React, {useRef, useState} from "react";
// react components for routing our app without refresh
import { Link } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import {DropzoneArea} from 'material-ui-dropzone';
import CustomInput from "components/CustomInput/CustomInput.js";


// @material-ui/icons
// AWS
import { API, Auth } from "aws-amplify";
import { s3Upload } from "libs/awsLib.js";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";

import landing from "assets/img/landing.jpg";
import profile from "assets/img/profile.jpg";

import styles from "assets/jss/material-kit-react/views/componentsSections/exampleStyle.js";

const useStyles = makeStyles(styles);

export default function SectionExamples() {
  const classes = useStyles();
  const file = useRef(null);
  const [content, setContent] = useState('');

  function createNote(note) {
    return API.post("notes", "/notes", {
      body: note
    });
  }
  
  function handleFileChange(event) {
    console.log(event);
    file.current = event[0];
  };

  async function handleSubmit(event) {
    event.preventDefault();
    if (file.current && file.current.size > 5000000) {
      // alert(
      //   `Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE /
      //     1000000} MB.`
      // );
      return;
    }
    
    try {
      console.log("Auth", Auth.currentUserCredentials());
      const attachment = file.current ? await s3Upload(file.current) : null;
      await createNote({ content, attachment });
    } catch (e) {
      console.log(e);
    }

  }





  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={6}>
          <DropzoneArea
            onChange={e => handleFileChange(e)}
          />
          <CustomInput
            id="regular"
            onChange={(e)=> setContent(e.target.value)}
            inputProps={{
              placeholder: "Description"
            }}
            formControlProps={{
              fullWidth: true
            }}
          />
          <Button color="primary" size="lg" onClick={(e) => handleSubmit(e)} simple>
            submit
          </Button>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Link to="profile-page" className={classes.link}>
              <img
                src={profile}
                alt="..."
                className={
                  classes.imgRaised +
                  " " +
                  classes.imgRounded +
                  " " +
                  classes.imgFluid
                }
              />
              <Button color="primary" size="lg" simple>
                View profile page
              </Button>
            </Link>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}

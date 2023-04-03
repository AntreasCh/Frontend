import React from "react";
import ic3Image from './ic3partners.png';
import {
  Box,
  Container,
  Row,
  Column,
  FooterLink,
  Heading,
} from "./FooterStyles";
  
const Footer = () => {
  return (
    
    <Box >
      
      <h1 style={{ color: "white", 
                   textAlign: "center", 
                   marginTop: "-50px" }}>
        IC3
      </h1>
      
      <Container>
      
        <Row>
          
          <Column>
            <Heading>About Us</Heading>
            <FooterLink  href="/tppfront/about">About</FooterLink>
            <FooterLink href="/tppfront/education">Education</FooterLink>
            <FooterLink href="/tppfront/activities">Activities</FooterLink>
          </Column>
          <Column>
            <Heading>Services</Heading>
            <FooterLink href="/tppfront/activities">Activities</FooterLink>
            <FooterLink href="/tppfront/resources">Resources</FooterLink>
            <FooterLink href="/tppfront/community-and-network">Community</FooterLink>
            <FooterLink href="/tppfront/events">Events</FooterLink>
          </Column>
          <Column>
            <Heading>Contact Us</Heading>
            <FooterLink href="/tppfront/contactus">Contact</FooterLink>
            <FooterLink href="/tppfront/admin">Log in</FooterLink>
            <FooterLink href="/tppfront/register">Register</FooterLink>
            <FooterLink href="/tppfront/projects">Projects</FooterLink>
          </Column>
          <Column>
            <Heading>Social Media</Heading>
            <FooterLink href="https://www.linkedin.com/company/ic3-international-centre-for-connected-construction">
              <i className="fab fa-facebook-f">
                <span style={{ marginLeft: "10px" }}>
                  Linkedin
                </span>
              </i>
            </FooterLink>
           
            <FooterLink href="https://twitter.com/CentreConnected">
              <i className="fab fa-twitter">
                <span style={{ marginLeft: "10px" }}>
                  Twitter
                </span>
              </i>
            </FooterLink>
           
          </Column>
        </Row>
      </Container>
    </Box>
  );
};
export default Footer;
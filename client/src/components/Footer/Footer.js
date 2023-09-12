import React from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import { IconButton } from '@mui/material';

const Footer = () => {
  return (
    <div className='align-items-center text-center'>
      <hr />
      <h1 className='p-4'>
        SALE UP TO <span className='hovering'>30%</span> OFF FOR ALL CLOTHES & FASHION ITEMS, ON ALL BRANDS.
      </h1>
      <hr />
      <div className='container justify-content-center align-items-center mt-5'>
        <div className='row'>
          <div className='col-sm-6 col-md-6 col-lg-6'>
            <img className="img-fluid" src="/Footer-logo.png" alt="" width={200} height={80} />
          </div>
          <div className='col-sm-6 col-md-6 col-lg-6 text-center align-self-center'>
            <h2 className='mb-1'>
              Best look anytime, anywhere.
            </h2>
            <div>
              <IconButton onClick={() => window.open("https://www.facebook.com/abdelrhmanreda17")}>
                <FacebookIcon fontSize='large' />
              </IconButton>
              <IconButton onClick={() => window.open("https://twitter.com/Abdelrhman80670")}>
                <TwitterIcon fontSize='large' />
              </IconButton>
              <IconButton onClick={() => window.open("https://github.com/AbdelrhmanReda17")}>
                <GitHubIcon fontSize='large' />
              </IconButton>
              <IconButton onClick={() => window.open('https://www.instagram.com/abdelrhman.reda17')}>
                <InstagramIcon fontSize='large' />
              </IconButton>
            </div>
            <h6 className='text-muted mt-1'>
              Copyright © 2023 RODO. Powered by RODO.
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;

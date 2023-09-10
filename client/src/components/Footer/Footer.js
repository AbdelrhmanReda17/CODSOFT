import { IconButton, Paper } from '@mui/material'
import React from 'react'
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
const Footer = () => {
  return (
    <div className='align-items-center text-center'>
         <hr />
            <h1 className='p-4'>SALE UP TO <p className='hovering'>  70%   </p> OFF FOR ALL CLOTHES & FASHION ITEMS, ON ALL BRANDS.</h1>
         <hr />
         <div className='container justify-content-center align-items-center mt-5'>
            <div className='row' >
                <div className='col-sm-6 col-md-6 col-lg-6'>
                    <img className="img-fluid" src="/Footer-logo.png" alt="" width={200} height={80} /> 
                </div>
                <div className='col-sm-6 col-md-6 col-lg-6 text-center align-self-center'>
                    <h2 className='mb-1'>
                        Best look anytime, anywhere.
                    </h2>
                        <div >
                        <IconButton>
                            <FacebookIcon fontSize='large'/>
                        </IconButton>   
                        <IconButton>
                            <TwitterIcon fontSize='large'/>
                        </IconButton>
                        <IconButton>
                            <GitHubIcon fontSize='large'/>
                        </IconButton>
                        <IconButton>
                            <InstagramIcon fontSize='large'/>
                        </IconButton>
                        </div>
                    <h6 className='text-muted mt-1'>
                            Copyright © 2023 RODO. Powered by RODO.
                    </h6>

                </div>
            </div>
            
         </div>
    </div>
  )
}

export default Footer
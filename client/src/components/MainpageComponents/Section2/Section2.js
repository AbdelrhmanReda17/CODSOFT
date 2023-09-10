import React from 'react'
import { ButtonBase } from '@mui/material'

const Section2 = () => {
  return (
    <div className="our-work text-center pt-5 pb-4">
        <div className="row">
            <div className="col-sm-6 col-md-4 col-lg-4">
                <ButtonBase>
                    <div className="box mb-3 bg-white" data-work="Men's Fashion">
                        <img className="img-fluid" src="images/men-fashion.webp" alt="" />
                    </div>
                </ButtonBase>
            </div>
            <div className="col-sm-6 col-md-4 col-lg-4">                               
                <ButtonBase>
                    <div className="box mb-3 bg-white" data-work="Women's Fashion">
                        <img className="img-fluid" src="images/women-fashion.webp" alt="" />
                    </div>
                </ ButtonBase>
            </div>
            <div className="col-sm-6 col-md-4 col-lg-4">
                <ButtonBase>
                    <div className="box mb-3 bg-white" data-work="Baby Fashion">
                        <img className="img-fluid" src="images/baby-fashion.webp" alt="" />
                    </div> 
                </ButtonBase>

            </div>
        </div>
    </div>

  )
}

export default Section2
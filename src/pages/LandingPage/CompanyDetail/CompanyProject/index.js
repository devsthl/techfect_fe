import React from 'react';
import './CompanyProject.scss';

const CompanyProject = () => {
    return (
        <div className="company-project-item">
            <div className="image-group">
                <img src="https://www.elprocus.com/wp-content/uploads/2014/02/113.jpg" alt="" />
            </div>
            <div className="project-detail">
                <div className="proj-title">
                    LEVOIT Humidifiers for Bedroom Large Room Home, 6L Warm and Cool Mist Top Fill Ultrasonic Air
                    Vaporizer, Smart App & Voice Control, Quickly Humidify Whole House up to 753 sq.ft, Sleep Mode,
                    Timer
                </div>
                <div className="proj-des">
                    Products with electrical plugs are designed for use in the US. Outlets and voltage differ
                    internationally and this product may require an adapter or converter for use in your destination.
                    Please check compatibility before purchasing.
                </div>
            </div>
        </div>
    );
};

export default CompanyProject;

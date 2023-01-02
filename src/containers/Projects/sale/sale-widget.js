import React, { Component } from 'react';
import { SaleWidgetWrapper } from './style';
import TopbarMessage from "./topbarMessage";
import TopbarUser from "./topbarUser";
import userpic from '../../../image/user1.png';
export default class extends Component {
  render() {
    const { fontColor, label, price, details, date,locale  } = this.props;
  
    const textColor = {
      color: fontColor
    };

    return (
      <SaleWidgetWrapper className="isoSaleWidget">
        <h3 className="isoSaleLabel">{label}</h3>
        <p className="isoSaleDetails">{details}</p>
        <span className="isoSalePrice" style={textColor}>
          {price}
        </span>
        <span className="isoSaleUser" style={textColor}>
        <img alt="user" src={userpic} />
        </span>
        <span className="isoSaleMessage" style={textColor}>
        <TopbarMessage locale={locale} />
        </span>
        <p className="isoSaleDate">{date}</p>
        
        
      </SaleWidgetWrapper>
    );
  }
}

import React from "react";
const width = '90%';
const height = '400px';

const ButtonGroup = () => {
  return (
    <>
      <button>Daily</button>
      <button>Monthly</button>
      <button>Annual</button>
    </>
  );
};


// export default ButtonGroup;

/* * * * * * * * * * * * * * * * * * * *
              Combo Charts
* * * * * * * * * * * * * * * * * * * */
const ComboChart = {
  title: 'Combo Chart',
  key: 'ComboChart',
  chartType: 'ComboChart',
  width,
  height,
  data: [
    [
      'Month',
      'Bolivia',
      'Ecuador',
      'Madagascar',
      'Papua New Guinea',
      'Rwanda',
      'Average',
    ],
    ['2004/05', 165, 938, 522, 998, 450, 614.6],
    ['2005/06', 135, 1120, 599, 1268, 288, 682],
    ['2006/07', 157, 1167, 587, 807, 397, 623],
    ['2007/08', 139, 1110, 615, 968, 215, 609.4],
    ['2008/09', 136, 691, 629, 1026, 366, 569.6],
  ],
  options: {
    title: 'Report ',
    titleTextStyle: {
      color: '#788195',
    },
    legend: {
      textStyle: {
        color: '#788195',
      },
    },
    hAxis: {
      textStyle: {
        color: '#788195',
      },
      title: 'Cups',
      titleTextStyle: {
        color: '#788195',
      },
    },
    vAxis: {
      textStyle: {
        color: '#788195',
      },
      title: 'Month',
      titleTextStyle: {
        color: '#788195',
      },
    },
    seriesType: 'bars',
    series: {
      5: {
        type: 'line',
      },
    },
    animation: {
      duration: 1000,
      easing: 'in',
      startup: true,
    },
    colors: ['#00b16a', '#ff6384', '#511E78', '#01C0C8', '#ffbf00', '#48A6F2'],
    dataOpacity: 0.6,
    tooltip: {
      textStyle: {
        color: '#788195',
      },
    },
  },
};
export {

  ComboChart,
  ButtonGroup,
};


import './chart.scss'
import LineChartComponent from './LineChart'
import Nav from './Nav'

const Chartistics = () => {
  return (

    <div className='chart'>
        <Nav />
        <LineChartComponent/>
    </div>
  )
}

export default Chartistics
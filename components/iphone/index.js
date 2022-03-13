// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
// import style from './style';
import style from '../button/style_iphone';
import styleI from './style'
// import jquery for API calls
import $ from 'jquery';
// import the Button component
import regeneratorRuntime from "regenerator-runtime";

export default class Iphone extends Component {

	render()
	{
		return(
			<div class={ styleI.container }>
			<MainWeather/>
			<SportData/>
			</div>
			)
	}
}

class MainWeather extends Component
{

	state = {
		loading: true,
		Location: null,
		Temp: null,
		tHigh: null,
		tLow: null,
		day: new Date(),
		Days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
	}

	async componentWillMount()
	{
		const url ="http://api.openweathermap.org/data/2.5/weather?q=London&units=metric&APPID=0da1480eba025d430229e68cef88a466"
		const response = await fetch(url)
		const data = await response.json();
		this.setState({
			Location: data.name,
			Temp: Math.round(data.main.temp),
			tHigh: Math.round(data.main.temp_max), 
			tLow: Math.round(data.main.temp_min),
			loading : false})
	}

	async fetchSelected(city)
	{
		const url ="http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&APPID=0da1480eba025d430229e68cef88a466"
		const response = await fetch(url)
		const data = await response.json();
		this.setState({
			Location: data.name,
			Temp: Math.round(data.main.temp),
			tHigh: Math.round(data.main.temp_max), 
			tLow: Math.round(data.main.temp_min),
			loading : false})
	}

	render(){	
		return(
		<div class = "style.all">
			<div> {this.state.loading ? <div>loading</div>: 
				<div class ={style.box}>
					<p class={style.appName}>Weathering With You</p>
					<p class = {style.today} >TODAY</p>
					<p class = {style.locText}>{this.state.Location.toUpperCase()}</p>	
					<p class = {style.tempText}>{this.state.Temp}<sup>o</sup>C</p>
					<p class = {style.HiLoText}>Low {this.state.tLow}<sup>o</sup></p>
					<p class = {style.HiLoText}>High {this.state.tHigh}<sup>o</sup></p>
					<p class = {style.dayText}>{this.state.Days[this.state.day.getDay()]}</p>
				</div>
				}
			<SevenDay/>
			<div class ={style.boxR}>
				<p class={style.loc}>Change Location</p>
				<select class = {style.select} onChange={(e) => this.fetchSelected(e.target.value)}>
					<option value="" disabled selected >Select A City</option>
					<option value="London">London</option>
					<option value="Moscow">Moscow</option>
					<option value="Paris">Paris</option>
					<option value="Sydney">Sydney</option>
					<option value="Washington">Washington</option>
				</select>
			</div>
			<ChangeSport/>
			</div>
		</div>
		);
	}
}

class SevenDay extends Component
{
	constructor(props)
	{
		super(props);

	}

	render()
	{
		return(
			<div> 
				<div class ={style.box1}>
					<p class={style.sevenday}>See 7 Day Forecast</p>
				</div> 
			</div>
		)
	}
}

class ChangeSport extends Component
{
	constructor(props)
	{
		super(props);

	}

	render(){	
		return(
			<div> 
				<div class ={style.boxL}>
					<p class={style.change}>Change Sport</p>
				</div>
			</div>
		);
	}
}


class SportData extends Component
{
	constructor(props)
	{
		super(props);
	}

	render(){	
		return(
			<div> 
				<div class ={style.boxBottom}></div>
			</div>
		);
	}
}


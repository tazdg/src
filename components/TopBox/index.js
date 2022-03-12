// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from '../button/style_iphone';
import regeneratorRuntime from "regenerator-runtime";
import {Box1} from '../Box1';
import {BoxLeft} from '../BoxLeft';
import {BoxBottom} from '../BottomBox';

export class TopBox extends Component
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

	async fetchSelected(city)
	{
		const first ="http://api.openweathermap.org/data/2.5/weather?q="
		const second = "&units=metric&APPID=0da1480eba025d430229e68cef88a466"
		const url = first.concat(city).concat(second)
		const response = await fetch(url)
		const data = await response.json();
		this.setState({
			Location: data.name,
			Temp: Math.round(data.main.temp),
			tHigh: Math.round(data.main.temp_max), 
			tLow: Math.round(data.main.temp_min),
			loading : false})
	}

	async componentDidMount()
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

	render(){	
		return(
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
			<Box1/>
			<BoxLeft/>
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
			<BoxBottom/>		
			</div>
		);
	}
}


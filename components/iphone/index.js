// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
// import style from './style';
import style from '../button/style_iphone';
import styleI from './style'
import regeneratorRuntime from "regenerator-runtime";


export default class Iphone extends Component {

	render()
	{
		return(
			<div class={ styleI.container }>
				<MainWeather/>
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
		Days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
		seeSeven: false,
		icon: null,
		lon:null,
		lat:null,
		cond: null	
	}

	setSeven()
	{
		this.setState({
			seeSeven:true
		})
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
			loading : false,
			icon: "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png",
			lon : data.coord.lon,
			lat : data.coord.lat,
			cond: data.weather[0].description	
		})
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
			loading : false,
			icon: "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png",
			lon : data.coord.lon,
			lat : data.coord.lat,
			cond: data.weather[0].description	
		})
	}

	render(){	
		return( 
			<div>
				{
				this.state.seeSeven ? <SevenDay Days = {this.state.Days} lon = {this.state.lon} lat = {this.state.lat} city = {this.state.Location}/> :
					<div> {this.state.loading ? <div>loading</div>: 
						<div class ={style.box}>
							<p class={style.appName}>Weathering With You</p>
							<p class = {style.today} >TODAY</p>
							<p class = {style.locText}>{this.state.Location.toUpperCase()}</p>
							<img class = {style.icon} src = {this.state.icon}></img>	
							<p class = {style.tempText}>{this.state.Temp}<sup>o</sup>C</p>
							<p class = {style.HiLoText}>Low {this.state.tLow}<sup>o</sup></p>
							<p class = {style.HiLoText}>High {this.state.tHigh}<sup>o</sup></p>
							<p class = {style.dayText}>{this.state.Days[this.state.day.getDay()]}</p>
							<img class = {style.locIcon} src='../assets/icons/Untitled_Artwork_73.png'></img>
							<p class = {style.cond}>{this.state.cond}</p>
							
						</div>
						}
					<div class ={style.box1}>
						<a href = "#" onClick={() =>this.setSeven()}>
							<img class = {style.sevenIcon} src='../assets/icons/Untitled_Artwork_70.png'></img>
							<p class={style.sevenday}>See 7 Day Forecast</p>
						</a>
					</div> 
					<div class ={style.boxR}>
						<p class={style.loc}>Change Location</p>
						<select class = {style.select} onChange={(e) => this.fetchSelected(e.target.value)}>
							<option value="" disabled selected >Select A City</option>
							<option value="London">London</option>
							<option value="Moscow">Moscow</option>
							<option value="Paris">Paris</option>
							<option value="Sydney">Sydney</option>
							<option value="Kyiv">Kyiv</option>
						</select>
					</div>
					<ChangeSport/>
					<SportData/>
				</div>
				}
			</div>
		);
	}
}

class SevenDay extends Component
{
	// http://api.openweathermap.org/data/2.5/weather?q=London&units=metric&APPID=0da1480eba025d430229e68cef88a466
	// https://api.openweathermap.org/data/2.5/onecall?lat=-0.1257&lon=51.5085&exclude=hourly&appid=0da1480eba025d430229e68cef88a466&units=metric
	constructor(props)
	{
		super(props);
		this.setState({
			lon: this.props.lon,
			lat: this.props.lat,
			city: this.props.city,
			Days: this.props.Days,
			xDates: new Array(7),
			xLogos: new Array(7),
			xTemp: new Array(7),
			xCond: new Array(7)
		})

	}

	async componentWillMount()
	{		
		let Dates= new Array(7)
		let Logos = new Array(7)
		let Temp=new Array(7)
		let Cond=new Array(7)

		const url ="https://api.openweathermap.org/data/2.5/onecall?lat=" + this.state.lat + "&lon=" + this.state.lon + "&exclude=hourly&appid=0da1480eba025d430229e68cef88a466&units=metric"
		const response = await fetch(url)
		const data = await response.json();

		for(let i = 0; i<=6; i++)
		{
			Dates[i]= this.state.Days[new Date(data.daily[i].dt*1000-(data.timezone_offset*1000)).getDay()]
			Logos[i]= "http://openweathermap.org/img/w/" + data.daily[i].weather[0].icon + ".png"
			Temp[i]= data.daily[i].temp.day
			Cond[i]= data.daily[i].weather[0].description
		}

		console.log(Dates)
		console.log(Logos)
		console.log(Temp)
		console.log(Cond)
		this.setState({
			xDates: Dates,
			xLogos: Logos,
			xTemp: Temp,
			xCond: Cond,
		})
	}


	render()
	{
		return(
			<div class ={style.test}>
			<p class = {style.forecastCity}>{this.state.city.toUpperCase()}</p>
				<table class = {style.forecast}>
					<tr>
						<td>{this.state.xDates[0]}</td>
						<td><img src = {this.state.xLogos[0]}></img></td>
						<td>{Math.round(this.state.xTemp[0])}<sup>o</sup>C</td>
						<td>{this.state.xCond[0]}</td>
					</tr>
					<tr>
						<td>{this.state.xDates[1]}</td>
						<td><img src = {this.state.xLogos[1]}></img></td>
						<td>{Math.round(this.state.xTemp[1])}<sup>o</sup>C</td>
						<td>{this.state.xCond[1]}</td>
					</tr>
					<tr>
						<td>{this.state.xDates[2]}</td>
						<td><img src = {this.state.xLogos[2]}></img></td>
						<td>{Math.round(this.state.xTemp[2])}<sup>o</sup>C</td>
						<td>{this.state.xCond[2]}</td>
					</tr>
					<tr>
						<td>{this.state.xDates[3]}</td>
						<td><img src = {this.state.xLogos[3]}></img></td>
						<td>{Math.round(this.state.xTemp[3])}<sup>o</sup>C</td>
						<td>{this.state.xCond[3]}</td>
					</tr>
					<tr>
						<td>{this.state.xDates[4]}</td>
						<td><img src = {this.state.xLogos[4]}></img></td>
						<td>{Math.round(this.state.xTemp[4])}<sup>o</sup>C</td>
						<td>{this.state.xCond[4]}</td>
					</tr>
					<tr>
						<td>{this.state.xDates[5]}</td>
						<td><img src = {this.state.xLogos[5]}></img></td>
						<td>{Math.round(this.state.xTemp[5])}<sup>o</sup>C</td>
						<td>{this.state.xCond[5]}</td>
					</tr>
					<tr>
						<td>{this.state.xDates[6]}</td>
						<td><img src = {this.state.xLogos[6]}></img></td>
						<td>{Math.round(this.state.xTemp[6])}<sup>o</sup>C</td>
						<td>{this.state.xCond[6]}</td>
					</tr>
				</table>
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
					<img class = {style.sevenIcon} src='../assets/icons/Untitled_Artwork_74.png'></img>
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
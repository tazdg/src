// import preact
import { h, render, Component } from "preact";
// import stylesheets for ipad & button
// import style from './style';
import style from "../button/style_iphone";
import styleI from "./style";

//needed for async functions
import regeneratorRuntime from "regenerator-runtime";

// imports for autocomplete
import { Autocomplete } from "preact-autocomplete"; // From https://github.com/jimmy1217/React-AutoComplete
// Line below is importing list of locations from locations.js
import { Sports } from "./sports";
import PreactCompat from "preact-compat";

export default class Iphone extends Component {
	render() {
		return (
			<div class={styleI.container}>
				<MainWeather />
			</div>
		);
	}
}

//Mainweather component renders all components within it.

class MainWeather extends Component {
	//constructor which initialises variables needed for displaying information in the top most box at the top of the home page
	//constructor checks if a prop has been passed in (to retain information about city when 7 day forecase page is being viewed)
	constructor(props) {
		super(props);
		if (this.props.Location === undefined) {
			this.setState({
				loading: true,
				Location: null,
				Temp: null,
				tHigh: null,
				tLow: null,
				day: new Date(),
				Days: [
					"Sunday",
					"Monday",
					"Tuesday",
					"Wednesday",
					"Thursday",
					"Friday",
					"Saturday",
				],
				seeSeven: false,
				icon: null,
				lon: null,
				lat: null,
				cond: null,
				test: style.modalc,
				units: "metric",
				lastUpdated: new Date().toLocaleTimeString(),
			});
			this.setState({
				url:
					"http://api.openweathermap.org/data/2.5/weather?q=London&units=" +
					this.state.units +
					"&APPID=bf70994fbd262220efa80210e99b4208",
			});
		} else {
			this.setState({
				loading: true,
				Location: this.props.Location,
				Temp: null,
				tHigh: null,
				tLow: null,
				day: new Date(),
				Days: [
					"Sunday",
					"Monday",
					"Tuesday",
					"Wednesday",
					"Thursday",
					"Friday",
					"Saturday",
				],
				seeSeven: false,
				icon: null,
				lon: null,
				lat: null,
				cond: null,
				test: style.modalc,
				url:
					"http://api.openweathermap.org/data/2.5/weather?q=" +
					this.props.Location +
					"&units=" +
					this.props.units +
					"&APPID=bf70994fbd262220efa80210e99b4208",
				lastUpdated: this.props.lastUpdated,
				units: this.props.units,
			});
		}
	}

	// used to change the CSS class of the modal to show it (for the change location button)
	addClass() {
		this.setState({
			test: style.modalc.show,
		});
	}

	// used to change the CSS class of the modal to hide it (for the change location button)
	removeClass() {
		this.setState({
			test: style.modalc,
		});
	}

	// sets the visibility of the seven day forecast page to true when the 7 day forecast button is clicked
	setSeven() {
		this.setState({
			seeSeven: true,
		});
	}

	changeUnit() {
		if (this.state.units == "metric") {
			this.setState({
				units: "imperial",
			});
			this.fetchSelected(this.state.Location);
		} else {
			this.setState({
				units: "metric",
			});
			this.fetchSelected(this.state.Location);
		}
	}

	// function which pulls initial data for top box before page loads default -> London via API url stored in the "url" state variable
	async componentWillMount() {
		const response = await fetch(this.state.url);
		const data = await response.json();
		this.setState({
			Location: data.name,
			Temp: data.main.temp,
			tHigh: Math.round(data.main.temp_max),
			tLow: Math.round(data.main.temp_min),
			loading: false,
			icon:
				"http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png",
			lon: data.coord.lon,
			lat: data.coord.lat,
			cond: data.weather[0].description,
			lastUpdated: new Date().toLocaleTimeString(),
		});
	}

	// function which pulls  data for top box when a new city has been searched for
	async fetchSelected(city) {
		const url =
			"http://api.openweathermap.org/data/2.5/weather?q=" +
			city +
			"&units=" +
			this.state.units +
			"&APPID=bf70994fbd262220efa80210e99b4208";
		const response = await fetch(url);
		const data = await response.json();
		this.setState({
			Location: data.name,
			Temp: data.main.temp,
			tHigh: Math.round(data.main.temp_max),
			tLow: Math.round(data.main.temp_min),
			loading: false,
			icon:
				"http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png",
			lon: data.coord.lon,
			lat: data.coord.lat,
			cond: data.weather[0].description,
			lastUpdated: new Date().toLocaleTimeString(),
		});
	}

	render() {
		return (
			// checks if 7 day forecast page has been chosen for viewing. If not, display the whole home screen
			<div>
				{this.state.seeSeven ? (
					<SevenDay
						Days={this.state.Days}
						lon={this.state.lon}
						lat={this.state.lat}
						city={this.state.Location}
						lastUpdated={this.state.lastUpdated}
						units={this.state.units}
					/>
				) : (
					<div>
						{" "}
						{this.state.loading ? (
							<div class={style.box}>
								<div>loading...</div>
							</div>
						) : (
							// Displaying of information for the top most box

							<div class={style.box}>
								<label class={style.switch}>
									<input onChange={() => this.changeUnit()} type="checkbox" />
									<span class={style.slider}></span>
								</label>
								<p class={style.unit}>
									{" "}
									{this.state.units === "metric" ? (
										<PreactCompat.Fragment>MET</PreactCompat.Fragment>
									) : (
										<PreactCompat.Fragment>IMP</PreactCompat.Fragment>
									)}
								</p>

								<p class={style.appName}>Weathering With You</p>
								<p class={style.lastUpdated}>
									Last Updated: {this.state.lastUpdated}
								</p>
								<p class={style.today}>TODAY</p>
								<p class={style.locText}>{this.state.Location.toUpperCase()}</p>
								<img class={style.icon} src={this.state.icon}></img>
								<p class={style.tempText}>
									{this.state.Temp}
									{/* Check the units and display cprrect symbol */}
									{this.state.units === "metric" ? (
										<PreactCompat.Fragment>
											<sup>o</sup>C
										</PreactCompat.Fragment>
									) : (
										<PreactCompat.Fragment>
											<sup>o</sup>F
										</PreactCompat.Fragment>
									)}
								</p>
								<p class={style.HiLoText}>
									Low {this.state.tLow}
									<sup>o</sup>
								</p>
								<p class={style.HiLoText}>
									High {this.state.tHigh}
									<sup>o</sup>
								</p>
								<p class={style.dayText}>
									{this.state.Days[this.state.day.getDay()]}
								</p>
								<img
									class={style.locIcon}
									src="../assets/icons/Untitled_Artwork_73.png"
								></img>
								<p class={style.cond}>{this.state.cond}</p>
								<a href="#">
									<img
										onClick={() => this.fetchSelected(this.state.Location)}
										class={style.refresh}
										src="../assets/icons/Untitled_Artwork_75.png"
									></img>
								</a>
							</div>
						)}
						{/* Displaying the 7 day forecast box */}
						<div class={style.box1}>
							<a href="#" onClick={() => this.setSeven()}>
								<img
									class={style.sevenIcon}
									src="../assets/icons/Untitled_Artwork_70.png"
								></img>
								<p class={style.sevenday}>See 7 Day Forecast</p>
							</a>
						</div>
						{/* Displaying change location box on RHS below 7 day forecast box */}
						<button class={style.boxR} onClick={() => this.addClass()}>
							<p class={style.lbut}>Change Location</p>
							<img
								class={style.lbutI}
								src="../assets/icons/Untitled_Artwork_73.png"
							></img>
						</button>
						<div class={this.state.test}>
							<div class={style.modal}>
								<input
									onChange={(e) => this.fetchSelected(e.target.value)}
									type="text"
									placeholder="Search.."
								/>
								<br></br>
								<a href="#">
									<img
										class={style.exit}
										onClick={() => this.removeClass()}
										src="../assets/icons/x icon.png"
									></img>
								</a>
							</div>
						</div>
						{/*  Displaying change sport component which shows the change sport
            button and bottom box that holds specific sport information */}
						<ChangeSport
							location={this.state.Location}
							units={this.state.units}
						/>
					</div>
				)}
			</div>
		);
	}
}

//component responsible for rendering contents of the 7 day forecast page
class SevenDay extends Component {
	constructor(props) {
		super(props);
		this.setState({
			lon: this.props.lon,
			lat: this.props.lat,
			city: this.props.city,
			Days: this.props.Days,
			units: this.props.units,
			//initialising arrays to hold information about the upcoming days
			xDates: new Array(7),
			xLogos: new Array(7),
			xTemp: new Array(7),
			xCond: new Array(7),
			back: false,
		});
	}

	// sets back button to true to return to home page
	setBack() {
		this.setState({
			back: true,
		});
	}

	// function that pulls data before page is rendered.
	async componentWillMount() {
		let Dates = new Array(7);
		let Logos = new Array(7);
		let Temp = new Array(7);
		let Cond = new Array(7);
		const url =
			"https://api.openweathermap.org/data/2.5/onecall?lat=" +
			this.state.lat +
			"&lon=" +
			this.state.lon +
			"&exclude=hourly&appid=bf70994fbd262220efa80210e99b4208&units=" +
			this.state.units +
			"";
		const response = await fetch(url);
		const data = await response.json();

		//populating the arrays with information about upcoming days from API JSON response
		for (let i = 1; i <= 7; i++) {
			Dates[i - 1] =
				this.state.Days[
					new Date(
						data.daily[i].dt * 1000 - data.timezone_offset * 1000
					).getDay()
				];
			Logos[i - 1] =
				"http://openweathermap.org/img/wn/" +
				data.daily[i - 1].weather[0].icon +
				"@2x.png";
			Temp[i - 1] = data.daily[i - 1].temp.day;
			Cond[i - 1] = data.daily[i - 1].weather[0].description;
		}

		this.setState({
			xDates: Dates,
			xLogos: Logos,
			xTemp: Temp,
			xCond: Cond,
		});
	}

	render() {
		return (
			<div>
				{/* //checking if back button has been clicked, If not then display information about upcoming days In a tabulated format */}
				{this.state.back ? (
					<MainWeather
						Location={this.state.city}
						lastUpdated={this.props.lastUpdated}
						units={this.state.units}
					/>
				) : (
					<div class={style.test}>
						<p class={style.forecastCity}>
							<a href="#">
								<img
									onClick={() => this.setBack()}
									class={style.ex}
									src="../assets/icons/back.png"
								></img>
							</a>
							{this.state.city.toUpperCase()}
						</p>
						{/* //table holding the | Day | Icon | Temperature | Description of the forcasted days */}
						<table class={style.forecast}>
							<tr>
								<td>{this.state.xDates[0]}</td>
								<td>
									<img class={style.sevenicon} src={this.state.xLogos[0]}></img>
								</td>
								<td>
									{Math.round(this.state.xTemp[0])}
									{this.state.units === "metric" ? (
										<PreactCompat.Fragment>
											<sup>o</sup>C
										</PreactCompat.Fragment>
									) : (
										<PreactCompat.Fragment>
											<sup>o</sup>F
										</PreactCompat.Fragment>
									)}
								</td>
								<td>{this.state.xCond[0]}</td>
							</tr>
							<tr>
								<td>{this.state.xDates[1]}</td>
								<td>
									<img class={style.sevenicon} src={this.state.xLogos[1]}></img>
								</td>
								<td>
									{Math.round(this.state.xTemp[1])}
									{this.state.units === "metric" ? (
										<PreactCompat.Fragment>
											<sup>o</sup>C
										</PreactCompat.Fragment>
									) : (
										<PreactCompat.Fragment>
											<sup>o</sup>F
										</PreactCompat.Fragment>
									)}
								</td>
								<td>{this.state.xCond[1]}</td>
							</tr>
							<tr>
								<td>{this.state.xDates[2]}</td>
								<td>
									<img class={style.sevenicon} src={this.state.xLogos[2]}></img>
								</td>
								<td>
									{Math.round(this.state.xTemp[2])}
									{this.state.units === "metric" ? (
										<PreactCompat.Fragment>
											<sup>o</sup>C
										</PreactCompat.Fragment>
									) : (
										<PreactCompat.Fragment>
											<sup>o</sup>F
										</PreactCompat.Fragment>
									)}
								</td>
								<td>{this.state.xCond[2]}</td>
							</tr>
							<tr>
								<td>{this.state.xDates[3]}</td>
								<td>
									<img class={style.sevenicon} src={this.state.xLogos[3]}></img>
								</td>
								<td>
									{Math.round(this.state.xTemp[3])}
									{this.state.units === "metric" ? (
										<PreactCompat.Fragment>
											<sup>o</sup>C
										</PreactCompat.Fragment>
									) : (
										<PreactCompat.Fragment>
											<sup>o</sup>F
										</PreactCompat.Fragment>
									)}
								</td>
								<td>{this.state.xCond[3]}</td>
							</tr>
							<tr>
								<td>{this.state.xDates[4]}</td>
								<td>
									<img class={style.sevenicon} src={this.state.xLogos[4]}></img>
								</td>
								<td>
									{Math.round(this.state.xTemp[4])}
									{this.state.units === "metric" ? (
										<PreactCompat.Fragment>
											<sup>o</sup>C
										</PreactCompat.Fragment>
									) : (
										<PreactCompat.Fragment>
											<sup>o</sup>F
										</PreactCompat.Fragment>
									)}
								</td>
								<td>{this.state.xCond[4]}</td>
							</tr>
							<tr>
								<td>{this.state.xDates[5]}</td>
								<td>
									<img class={style.sevenicon} src={this.state.xLogos[5]}></img>
								</td>
								<td>
									{Math.round(this.state.xTemp[5])}
									{this.state.units === "metric" ? (
										<PreactCompat.Fragment>
											<sup>o</sup>C
										</PreactCompat.Fragment>
									) : (
										<PreactCompat.Fragment>
											<sup>o</sup>F
										</PreactCompat.Fragment>
									)}
								</td>
								<td>{this.state.xCond[5]}</td>
							</tr>
							<tr>
								<td>{this.state.xDates[6]}</td>
								<td>
									<img class={style.sevenicon} src={this.state.xLogos[6]}></img>
								</td>
								<td>
									{Math.round(this.state.xTemp[6])}
									{this.state.units === "metric" ? (
										<PreactCompat.Fragment>
											<sup>o</sup>C
										</PreactCompat.Fragment>
									) : (
										<PreactCompat.Fragment>
											<sup>o</sup>F
										</PreactCompat.Fragment>
									)}
								</td>
								<td>{this.state.xCond[6]}</td>
							</tr>
						</table>
					</div>
				)}
			</div>
		);
	}
}

// Component responsible for displaying the change sport button and the bottom box which displays information about a given sport
class ChangeSport extends Component {
	constructor(props) {
		super(props);

		// sport intitialised to an empty string
		this.setState({
			sport: "",
			test: style.modalc,
		});
	}

	addClass() {
		this.setState({
			test: style.modalc.show,
		});
	}

	removeClass() {
		this.setState({
			test: style.modalc,
		});
	}

	// set sport to the one selected from the list
	changeSport(selected) {
		this.setState({
			sport: selected,
		});
		this.setState({
			test: style.modalc,
		});
	}

	render() {
		return (
			// Change sport button with an onClick event listener to show/hide modal (selection overlay)
			<div>
				<div>
					<button class={style.boxL} onClick={() => this.addClass()}>
						<img
							class={style.sevenIcon}
							src="../assets/icons/Untitled_Artwork_74.png"
						></img>
						<p class={style.change}>Change Sport</p>
					</button>
				</div>
				{/* //modal contents for selecting a sport */}
				{/* <div class={this.state.test}>
          <div class={style.modal2}>
            <ul class={style.SL}>

				<li onClick={(e) => this.changeSport(e.target.id)} id="Cycling">
					Cycling
				</li>
              <li onClick={(e) => this.changeSport(e.target.id)} id="Golf">
                Golf
              </li>
              <li
                onClick={(e) => this.changeSport(e.target.id)} id={"Football"}>
                Football
              </li>

            </ul>
            <br></br>
            <a href="#">
              <img
                class={style.exit}
                onClick={() => this.removeClass()}
                src="../assets/icons/x icon.png"
              ></img>
            </a>
          </div>
        </div> */}

				{/* CHANGED TODAY BY TAZ */}
				<div class={this.state.test}>
					<div class={style.modal2}>
						<Autocomplete
							class={style.test1}
							data={Sports}
							placeholder="Search..."
							emptyText="Sport Not Found"
							onChange={(e) => this.changeSport(e)}
						/>
						<br></br>
						<a href="#">
							<img
								class={style.exit}
								onClick={() => this.removeClass()}
								src="../assets/icons/x icon.png"
							></img>
						</a>
					</div>
				</div>

				{/* // Display of sport data box at the bottom of the page */}
				<SportData
					sport={this.state.sport}
					location={this.props.location}
					units={this.props.units}
				/>
			</div>
		);
	}
}

// Component responsible for displaying information for a given sport
class SportData extends Component {
	constructor(props) {
		super(props);
		this.setState({
			test: style.modalc,
			sport: "",
			location: "",
		});
	}

	// function that pulls relevant information for a sport when a different sport from the current one is chosen
	async componentDidUpdate(prevProps) {
		if (
			prevProps.sport !== this.props.sport ||
			prevProps.units !== this.props.units ||
			prevProps.location !== this.props.location
		) {
			if (this.state.location !== "") {
				this.setState({
					url:
						"http://api.openweathermap.org/data/2.5/weather?q=" +
						this.state.location +
						"&units=" +
						this.state.units +
						"&APPID=bf70994fbd262220efa80210e99b4208",
				});
				console.log("I'm in here:", this.state.url);
				const response = await fetch(this.state.url);
				const data = await response.json();
				// pull relevant golf data "windspeed" and "visibility"
				if (this.state.sport === "golf") {
					this.setState({
						wind: data.wind.speed,
						windDirection: data.wind.deg,
						vis: data.visibility / 1000,
					});
				}
				// pull relevant football data "feels like" and "humidity"
				else if (this.state.sport === "football") {
					this.setState({
						feels: data.main.feels_like,
						humidity: data.main.humidity,
					});
				} else if (this.state.sport === "cycling") {
					this.setState({
						feels: data.main.feels_like,
						humidity: data.main.humidity,
					});
				} else if (this.state.sport === "cricket") {
					this.setState({
						clouds: data.clouds.all,
						humidity: data.main.humidity,
					});
				} else if (this.state.sport === "baseball") {
					this.setState({
						clouds: data.clouds.all,
						humidity: data.main.humidity,
					});
				} else if (this.state.sport === "rowing") {
					this.setState({
						feels: data.main.feels_like,
						wind: data.wind.speed,
					});
				}
			}
		}
	}

	// function that updates the sport and location state variables to new props passed from the change sport component
	componentWillReceiveProps(nextProps) {
		this.setState({
			sport: nextProps.sport,
			location: nextProps.location,
			units: nextProps.units,
			url:
				"http://api.openweathermap.org/data/2.5/weather?q=" +
				this.state.location +
				"&units=" +
				nextProps.units +
				"&APPID=bf70994fbd262220efa80210e99b4208",
		});
	}
	render() {
		// conditional rendering of information depending on what sport has been selected
		if (this.state.sport === "") {
			return (
				<div>
					<div class={style.boxBottom}>
						<h4>NO SPORT SELECTED</h4>
					</div>
				</div>
			);
		} else if (this.state.sport === "football") {
			return (
				<div>
					<div class={style.boxBottom}>
						<p class={style.sporthead}>
							Displaying Weather Info For: {this.state.sport}
						</p>

						<div class={style.weatherDisplayLeft}>
							<p class={style.metricHeader}>Feels</p>
							<p class={style.metricValue}>
								{this.state.feels}
								{/* Checks if units is metric, if so display Celcius else Farenheight. Same logic here
								can be used for displaying the units for another sport. */}
								{this.state.units === "metric" ? (
									<PreactCompat.Fragment>
										<sup>o</sup>C
									</PreactCompat.Fragment>
								) : (
									<PreactCompat.Fragment>
										<sup>o</sup>F
									</PreactCompat.Fragment>
								)}
							</p>
						</div>

						<div class={style.weatherDisplayRight}>
							<p class={style.metricHeader}>Humidity </p>
							<p class={style.metricValue}>{this.state.humidity}%</p>
						</div>
					</div>
				</div>
			);
		} else if (this.state.sport === "golf") {
			return (
				<div>
					<div class={style.boxBottom}>
						<p class={style.sporthead}>
							Displaying Weather Info For: {this.state.sport}
						</p>

						<div class={style.weatherDisplayLeft}>
							<p class={style.metricHeader}> Wind</p>
							<p class={style.metricValue}>
								{this.state.wind}
								{this.state.units === "metric" ? (
									<PreactCompat.Fragment>m/s</PreactCompat.Fragment>
								) : (
									<PreactCompat.Fragment>mph</PreactCompat.Fragment>
								)}
							</p>
							<p class={style.metricValue}>
								{this.state.windDirection}
								<sup>o</sup>
							</p>
						</div>

						<div class={style.weatherDisplayRight}>
							<p class={style.metricHeader}> Visibility</p>
							<br></br>
							<p class={style.metricValue}>{this.state.vis}km</p>
						</div>
					</div>
				</div>
			);
		} else if (this.state.sport === "cycling") {
			return (
				<div>
					<div class={style.boxBottom}>
						<p class={style.sporthead}>
							Displaying Weather Info For: {this.state.sport}
						</p>
						<div class={style.weatherDisplayLeft}>
							<p class={style.metricHeader}> Wind</p>
							<p class={style.metricValue}>
								{this.state.wind}
								{this.state.units === "metric" ? (
									<PreactCompat.Fragment>m/s</PreactCompat.Fragment>
								) : (
									<PreactCompat.Fragment>mph</PreactCompat.Fragment>
								)}
							</p>
						</div>

						<div class={style.weatherDisplayRight}>
							<p class={style.metricHeader}>Visibility</p>
							<p class={style.metricValue}>{this.state.vis}km</p>
						</div>
					</div>
				</div>
			);
		} else if (this.state.sport === "cricket") {
			return (
				<div>
					<div class={style.boxBottom}>
						<p class={style.sporthead}>
							Displaying Weather Info For: {this.state.sport}
						</p>
						<div class={style.weatherDisplayLeft}>
							<p class={style.metricHeader}> Clouds</p>
							<br></br>
							<p class={style.metricValue}>{this.state.clouds}%</p>
						</div>

						<div class={style.weatherDisplayRight}>
							<p class={style.metricHeader}> Humidity</p>
							<br></br>
							<p class={style.metricValue}>{this.state.humidity}%</p>
						</div>
					</div>
				</div>
			);
		} else if (this.state.sport === "baseball") {
			return (
				<div>
					<div class={style.boxBottom}>
						<p class={style.sporthead}>
							Displaying Weather Info For: {this.state.sport}
						</p>
						<div class={style.weatherDisplayLeft}>
							<p class={style.metricHeader}> Clouds</p>
							<br></br>
							<p class={style.metricValue}>{this.state.clouds}%</p>
						</div>

						<div class={style.weatherDisplayRight}>
							<p class={style.metricHeader}> Humidity</p>
							<br></br>
							<p class={style.metricValue}>{this.state.humidity}%</p>
						</div>
					</div>
				</div>
			);
		} else if (this.state.sport === "rowing") {
			return (
				<div>
					<div class={style.boxBottom}>
						<p class={style.sporthead}>
							Displaying Weather Info For: {this.state.sport}
						</p>
						<div class={style.weatherDisplayLeft}>
							<p class={style.metricHeader}> Feels Like</p>
							<br></br>
							<p class={style.metricValue}>
								{this.state.feels}
								{/* Checks if units is metric, if so display Celcius else Farenheight. Same logic here
								can be used for displaying the units for another sport. */}
								{this.state.units === "metric" ? (
									<PreactCompat.Fragment>
										<sup>o</sup>C
									</PreactCompat.Fragment>
								) : (
									<PreactCompat.Fragment>
										<sup>o</sup>F
									</PreactCompat.Fragment>
								)}
							</p>
						</div>
						<div class={style.weatherDisplayRight}>
							<p class={style.metricHeader}> Wind</p>
							<br></br>
							<p class={style.metricValue}>
								{this.state.wind}
								{this.state.units === "metric" ? (
									<PreactCompat.Fragment>m/s</PreactCompat.Fragment>
								) : (
									<PreactCompat.Fragment>mph</PreactCompat.Fragment>
								)}
							</p>
						</div>
					</div>
				</div>
			);
		}
	}
}

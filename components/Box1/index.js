// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from '../button/style_iphone';
// import jquery for API calls
import $ from 'jquery';
import Button from '../button';
import regeneratorRuntime from "regenerator-runtime";


export default class box1 extends Component
{
	render(){	
		return(
			<div> 
				<div class ={style.box1}>
					<p class={style.sevenday}>See 7 Day Forecast</p></div> 
				<div class ={style.boxL}><p class={style.change}>Change Sport</p></div>
				<div class ={style.boxBottom}></div>
			</div>
		);
	}
}


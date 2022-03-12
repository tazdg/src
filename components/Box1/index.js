// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from '../button/style_iphone';
import regeneratorRuntime from "regenerator-runtime";

export class Box1 extends Component
{
	render(){	
		return(
			<div> 
				<div class ={style.box1}>
					<p class={style.sevenday}>See 7 Day Forecast</p></div> 
			</div>
		);
	}
}


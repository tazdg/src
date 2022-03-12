// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from '../button/style_iphone';
import regeneratorRuntime from "regenerator-runtime";

export class BoxBottom extends Component
{
	render(){	
		return(
			<div> 
				<div class ={style.boxBottom}></div>
			</div>
		);
	}
}


// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from '../button/style_iphone';
import regeneratorRuntime from "regenerator-runtime";


export class BoxLeft extends Component
{
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


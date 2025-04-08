import {createCustomElement,actionTypes} from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import '@servicenow/now-button';
import '@servicenow/now-dropdown';
import styles from './styles.scss';
import { createHttpEffect } from '@servicenow/ui-effect-http';
const DATA_FETCH = "DATA_FETCH";
const view = (state, {updateState,dispatch}) => {
const {title,description,imgurl} = state;
//const {description} = state;
	return (
		<div>  
			<div className="card">
				<img className="productimage" src={imgurl} alt="Product" />
				<div className="cointainer">
					<h4>{title}</h4>
					<p>{description}</p>
				</div>
			</div>
		</div>
	);
}

createCustomElement('x-26525-custom-product-api', {
	renderer: {type: snabbdom},
	view,actionHandlers:{
		[actionTypes.COMPONENT_DOM_READY]:createHttpEffect('api/26525/fakestore',{
			method:'GET',
			successActionType:DATA_FETCH
		}),
		[DATA_FETCH]:(effect)=>{
			console.log('Hello '+JSON.stringify(effect.action.payload));
			effect.updateState({
				'title':effect.action.payload.result.title,
				'description':effect.action.payload.result.description,
				'imgurl':effect.action.payload.result.image
			})
		}
		
	},
	styles,initialState:{
		'title':'Demo 123',
		'description':'Demo Description',
		'imgurl':'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg'
	}
});

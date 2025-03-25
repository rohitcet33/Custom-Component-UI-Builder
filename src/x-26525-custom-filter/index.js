import {createCustomElement} from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import '@servicenow/now-button';
import '@servicenow/now-dropdown';
import styles from './styles.scss';

const view = (state, {updateState,dispatch}) => {
	//var title = state.properties.title;
	const {properties:{title}} = state;
	const {properties:{incidentstate}} = state;
	const serachincident = (e)=>{
		dispatch('INCIDENT_NUMBER_FILTER',{data:e.target.value});
	}
	return (
	<div className="container">  
		<div className="box">
			<h2>{title}</h2>
		</div>
		<div className="box" styles={"margin-top:30px"}>
			<now-dropdown placeholder="Select" items={incidentstate} />
		</div>
		<div className="box">
			<input type="text" on-change={(e)=>serachincident(e)} id="numbersearch" placeholder="Put Number to search"/>
		</div>
	</div>
);
}

createCustomElement('x-26525-custom-filter', {
	renderer: {type: snabbdom},
	view,actionHandlers:{
		"NOW_DROPDOWN#ITEM_CLICKED":(coeffects)=>{
			//console.log(JSON.stringify(coeffects.action.payload));
			coeffects.dispatch("INCIDENT_FILTER",{data:coeffects.action.payload});
		}
	},
	styles, properties:{"title":{default:'demo 123'},"incidentstate":{default:[{id: 'item1', label: 'Option 1'}, {id: 'item2', label: 'Option 2'}]}}
});

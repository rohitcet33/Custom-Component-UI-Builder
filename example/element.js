import '../src/x-26525-custom-table';
import '../src/x-26525-custom-filter';

const el = document.createElement('DIV');
document.body.appendChild(el);

el.innerHTML = `		
	<x-26525-custom-filter></x-26525-custom-filter>
	<x-26525-custom-table></x-26525-custom-table>
`;

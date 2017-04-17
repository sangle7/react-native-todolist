import {
	observable
} from 'mobx';


export const AppState = observable({
	cats: 'music;ding;study',
	category: 'All',
	poptip: false,
	inputCat: 'music',
	header: false,
	raiseButton: true
});

AppState.changeCategory = function(cat) {
	this.category = cat;
}

AppState.showPoptip = function() {
	this.poptip = true;
}
AppState.changeInputCat = function(cat) {
	this.inputCat = cat;
	this.poptip = false;
}
AppState.hideHeader = function() {
	this.header = false;
	this.raiseButton = true;
}
AppState.showHeader = function() {
	this.header = true;
	this.raiseButton = false;
}
AppState.closePoptip = function() {
	this.poptip = false;
}
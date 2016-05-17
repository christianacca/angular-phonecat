"use strict";

export default class AngularScreen {
	constructor(private url: string) { }
    /**
     * Open the screen in the browser
     */
	open() {
		browser.get(this.url);
	}
}
"use strict";

import AngularScreen from "./angularScreen";
import ScreenRepeater from "../testInfrastructure/screenRepeater";
import ScreenSelectList from "../testInfrastructure/screenSelectList";
import _ = require("lodash");
import str = require("underscore.string")

export class PhoneListScreen extends AngularScreen {
    constructor() { super("app/index.html"); }

    phoneList = new PhoneListRepeater("phones", "phone");

    phonesListSorterLookup = new ScreenSelectList(element(by.model('orderProp')));
    
    /**
     * An input box whose value is used to filter the phones returned by phoneList
     */
    query = element(by.model('query'));
}

export class PhoneListItem {
    constructor(public element: protractor.ElementFinder) { }
    public static by  = by;
}

interface IPhoneListItemLocatorStrategy extends protractor.IProtractorLocatorStrategy {
    phoneName(value: string): webdriver.Locator
}



class PhoneListRepeater extends ScreenRepeater {
    private openPhoneLocator = by.binding("phone.name");
    private openDetailSceenElement(phoneRow: protractor.ElementFinder | number) {
        if (typeof phoneRow === "number") {
            return this.rows.get(phoneRow).element(this.openPhoneLocator);
        } else {
            return phoneRow.element(this.openPhoneLocator);
        }
    }
    
    /**
     * Returns the url of the detail screen that will display the specified phone
     */
    getDetailScreenUrl(phoneRow: protractor.ElementFinder | number) {
        return this.openDetailSceenElement(phoneRow).getAttribute("href").then(function(url) {
            return str.strRight(url, "#");
        })
    }
    /**
     * Opens the detail screen for a phone
     */
    openDetailScreen(phoneRow: protractor.ElementFinder | number) {
        this.openDetailSceenElement(phoneRow).click();
    }

    phoneItem(filterFn: (element: protractor.ElementFinder, index: number) => any): protractor.ElementFinder {
        return this.rows.filter(filterFn).first();
    }
}
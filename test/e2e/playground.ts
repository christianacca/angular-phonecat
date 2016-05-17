"use strict";

import * as phoneList from "./screens/phoneListScreen";

describe("Phone List screen", () => {

    let screen: phoneList.PhoneListScreen;
    beforeEach(() => {
        screen = new phoneList.PhoneListScreen();
        screen.open();
    });

    it("should filter the phone list as a user types into the search box", () => {
        expect(screen.phoneList.rows.count()).toEqual(20);

        screen.query.sendKeys("nexus");
        expect(screen.phoneList.rows.count()).toEqual(1);

        screen.query.clear();
        screen.query.sendKeys("motorola");
        expect(screen.phoneList.rows.count()).toEqual(8);
    });
    
    it('should be possible to control phone order via the drop down select box', function() {

      screen.query.sendKeys('tablet'); //let's narrow the dataset to make the test assertions shorter
      
      // expect phone list by default to be sorted by phone age
      expect(screen.phoneList.columnValues("name")).toEqual([
        "Motorola XOOM\u2122 with Wi-Fi",
        "MOTOROLA XOOM\u2122"
      ]);

      screen.phonesListSorterLookup.option("name").click()
      expect(screen.phoneList.columnValues("name")).toEqual([
        "MOTOROLA XOOM\u2122",
        "Motorola XOOM\u2122 with Wi-Fi"
      ]);
    });
    
    
    it("asking for binding from single row should return multiple elements", () => {
      var elements = screen.phoneList.cell("name", 0);
      expect(elements.count()).toBe(1);
      expect(elements.get(0).getTagName()).toEqual("a");
    });
    
    it('should open a detail screen for phone selected from the list', function() {
      screen.query.sendKeys("nexus");
      var phoneItem = screen.phoneList.rows.first();
      var expectedUrl = screen.phoneList.getDetailScreenUrl(phoneItem);
      screen.phoneList.openDetailScreen(phoneItem);
      expect(browser.getLocationAbsUrl()).toEqual(expectedUrl);
    });
    
    it('should open a detail screen for phone selected from the list (2)', function() {
      screen.query.sendKeys("nexus");
      var phoneItem = screen.phoneList.phoneItem((elem) => {
          return elem.element(by.binding("phone.name")).getText().then((txt) => txt === "Nexus S");
      });
      var expectedUrl = screen.phoneList.getDetailScreenUrl(phoneItem);
      screen.phoneList.openDetailScreen(phoneItem);
      expect(browser.getLocationAbsUrl()).toEqual(expectedUrl);
    });
});
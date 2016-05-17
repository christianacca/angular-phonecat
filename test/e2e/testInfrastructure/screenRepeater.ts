"use strict";

export default class ScreenRepeater {
    constructor(private datasourceName: string, private rangeVariableName: string) { 
        var expression = `${rangeVariableName} in ${datasourceName}`;
        this.locator = by.repeater(expression);
        this.rows = element.all(this.locator);
        this.rows.all(by.binding("")).first()
    }
    locator: protractor.RepeaterLocator;
    /**
     * Returns the screen elements used to render all the rows within the angular repeater
     */
    rows: protractor.ElementArrayFinder;
    private getColumnName(fieldName: string){
        return `${this.rangeVariableName}.${fieldName}`;
    }
    /**
     * Returns the single screen element used to render a field within a specified row
     */
    cell(fieldName: string, rowIndex: number){
        return element.all(this.locator.row(rowIndex).column(this.getColumnName(fieldName)));
    }
    /**
     * Returns the screen element used to render the specified row
     */
    row(index: number) {
        return element(this.locator.row(index));
    }
    /**
     * Returns the screen elements used to render the field specified for all rows in the angular repeater
     */
    column(fieldName: string) {
        return element.all(this.locator.column(this.getColumnName(fieldName)));
    }
    /**
     * Returns the value of the specified field for all rows in the angular repeater
     */
    columnValues(fieldName: string){
        return this.column(fieldName).map((elem) => elem.getText());
    }
}
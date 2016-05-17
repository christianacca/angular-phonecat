export default class ScreenSelectList {
    constructor(public element: protractor.ElementFinder){
        
    }
    option(optionName: string){
        return this.element.element(by.css(`option[value="${optionName}"]`))
    }
}
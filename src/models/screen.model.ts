export interface IScreen {
    id: number;
    screenType: string;
    screenName: string;
    mqttId: number;
    ewsCalendar: number;
    m365Calendar: number;
    googleCalendar: number;
    toolbar_status: boolean;
}

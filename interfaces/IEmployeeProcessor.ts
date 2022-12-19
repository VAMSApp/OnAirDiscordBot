import { TranslatedEmployee, Employee, } from "../types";
import { IProcessor } from ".";
import { People as OnAirEmployee } from "onair-api";

export interface IEmployeeProcessor extends IProcessor {
    Input: OnAirEmployee|undefined;
    Translated: TranslatedEmployee|undefined;
    Employee: Employee|undefined;
}

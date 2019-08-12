import { Controller } from '.';


export default interface Route{
    controller: Controller;
    getRoutes: () => any;
}
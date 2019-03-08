import Odoo, { cls, clsStatic, rpcIns } from './odoo'
declare var clss: cls
declare var odoo: Odoo
interface createOptions {
    model: string,
    fields: Array<string>,
    rpc: rpcIns,
    env:Array<clsStatic>
}
export { cls, clsStatic, rpcIns }
export default function modelCreator(options:createOptions):clsStatic

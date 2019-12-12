import { async, longStackSupport, timeout } from "q";
import Login from "@/components/Login";
import { userInfo, type } from "os";
import { callbackify } from "util";
import { lookup } from "dns";
import Search from "antd/lib/transfer/search";



interface modules {

}
interface obj<T> {
    [index: string]: T
}
interface models extends obj<Array<string>> { }
interface Options {
    /**
     * ip地址+端口
     */
    host: string,
    /**
     * 数据库名称
     */
    db: string,
    /**
     * 扩展模块
     */
    modules?: modules,
    /**
     * 所需模型组合
     */
    models?: models,
}
interface errCallback {

}
interface loginParams {
    /**
    * 数据库名称
    */
    db?: string,
    /**
    * 登陆名称
    */
    login: string,
    /**
    * 角色设置
    */
    role: "administrator" | "sponsor" | "referee" | "player",
    /**
    * 登陆密码
    */
    password: string
}
type dataSource = Array<any>
interface error {
    message?: string
}
interface callParams {
    model: string,
    methods: string,
    args: Array<any>,
    kwargs?: {}
}
interface data {
    code: number,
    result?: dataSource
    error?: error
}
type fieldsData = string | object
interface fields extends obj<fieldsData> { }
type domain = Array<Array<any>>
type kwargs = {}
type ids = Array<number>
type id = number
export default class Odoo {
    constructor(options: Options);
    /**
     * 发送请求类实例
     */
    _rpc: rpc
    /**
     * 所有模型
     */
    _models: models
    /**
     * 验证函数
     */
    me(fields: fields): cls
    /**
     * 所有模型的cls类
     */
    _env: Array<cls>
    /**
     * 扩展模块
     */
    _modules: modules
    /**
     * 循环modules
     * @param module_name 
     * @param module 
     */
    _fn_one_module(module_name: string, module: modules): void
    /**
     * 循环models
     * @param model_name 
     * @param model 
     */
    _fn_one_model(model_name: string, model: models): void
    /**
     * 测试方法
     */
    mock(): void
    /**
     * 错误捕获
     */
    setErrorCallback(callback: errCallback): void
    /**
     * 初始化所有model的cls类
     */
    init(): void
    /**
     * 登陆函数接口
     * @param params 账户和密码，可选参数：数据库
     */
    login(params: loginParams): number | null
    /**
     * 登出
     */
    logout(): data
    /**
     * 验证sid是否过期
     */
    verify(): boolean;
    /**
     * 加载指定模型，返回的将是该模型对应的cls类
     * @param model 模型名
     */
    env(model: string): clsStatic
    /**
     * 获取用户的数据
     * @param fields 所需数据对应的字段
     */
    user(fields: fields): cls

}
interface OdooStatic {
    _session: {}
    /**
   * 返回某个用户模型
   * @param session_id 
   */
    load(session_id: string): Odoo
}
export class cls {
    constructor(ids: Array<number> | number)
    /**
     * 实例属性，数据源id组成的数组
     */
    ids: Array<number>
    /**
     * 实例属性，单个id
     */
    id?: number
    /**
     * 底层请求call方法
     * @param params 
     */
    call(params: callParams): data
    /**
     * 切换比赛状态
     */
    toggle_active(): data
    /**
     * 获取自身cls实例
     */
    list(): Array<cls>
    /**
     * 取数据
     * @param fields 想要的字段
     */
    look(fields: fields): dataSource
    /**
     * 对多数据，返回单个id实例
     * @param id 
     */
    byid(id: id): cls
    /**
     * 返回单个id实例
     * @param id 
     */
    view(id: id): cls
    /**
     * 暂时无用处
     * @param attr 
     * @param value 
     */
    setAttr(attr: string, value: any): void
    /**
     * 不是对多字段，就返回该值，是则返回对应cls的实例
     * @param attr 
     */
    attr(attr: string): any | cls

}
export interface clsIns extends cls { }


export interface clsStatic {
    /**
     * 模型名
     */
    _name: string
    /**
     * 底层请求类实例
     */
    _rpc: rpc
    /**
     * 所有模型的cls类，同Odoo._env
     */
    _env: Array<clsStatic>
    /**
     * 数据存放
     */
    _records: dataSource
    /**
     * 该模型的所有字段的对应关系
     */
    _fields: fields
    /**
     * 所有字段
     */
    _fields_raw: Array<string>
    /**
     * 初始化cls类，用以获取各个字段的type和relation，并存放在
     * cls._fields中，是异步方法
     */
    init(): clsStatic
    /**
     * 加载指定模型的cls类
     * @param relation 
     */
    env(relation: string): clsStatic
    /**
     * 底层请求call方法
     * @param method 
     * @param args 
     * @param kwargs 
     */
    call(method: string, args: Array<any>, kwargs?: {}): data | null
    /**
     * 将用户传过来的fields，转换成符合后端的格式
     * @param fields 字段集合
     */
    get_fields2(fields: fields): Array<string | Array<any>>
    /**
     * 将后端返回的数据，有规律的存在cls._records，内部方法。
     * @param data 
     * @param fields 
     */
    set_multi(data: dataSource, fields?: fields): ids
    /**
     * 将后端返回的数据，有规律的存在cls._records，内部方法。
     * @param data 
     * @param fields 
     */
    _set_one(data: dataSource, fields?: fields): id
    /**
     * 获取后端数据，内部方法。
     * @param ids 
     * @param fields 
     */
    _get_one(ids: ids, fields: fields): dataSource
    /**
     * 获取后端数据，内部方法。
     * @param id 
     * @param fields 
     */
    _get_multi(id: id, fields: fields): dataSource
    /**
     * 获取字段的type和relation，被cls.init调用
     * @param allfields 
     * @param attributes 
     */
    fields_get(allfields: Array<string | Array<any>>, attributes: Array<string>): Array<any>
    /**
     * 查询数据
     * @param domain 查询条件
     * @param fields 字段
     * @param kwargs 其他参数
     */
    search(domain: domain, fields?: fields, kwargs?: {}): cls
    /**
     * 发请求，拿数据
     * @param ids 
     * @param fields 
     * @param lazy 
     */
    browse(ids?: ids, fields?: fields, lazy?: number): cls
    /**
     * 先查询后读取数据
     * @param domain 
     * @param fields 
     * @param kwargs 
     */
    search_read(domain: domain, fields: fields, kwargs?: kwargs): dataSource,
    /**
     * 查询数量
     * @param domain 
     */
    search_count(domain: domain): number
    /**
     * 读数据
     * @param ids 
     * @param fields 
     */
    read(ids: ids, fields: fields): dataSource
    /**
     * 新建数据
     * @param vals 
     */
    creat(vals: {}): cls | data
    /**
     * 改数据
     * @param id 
     * @param vals 
     */
    write(id: id, vals: {}): data | cls
    /**
     * 删数据
     * @param id 
     */
    unlink(id: id): data | cls
    /**
     * 获取cls类的实例
     * @param id 
     */
    view(id: id): cls
}


interface rpcOptions extends Options {
    sid?: string,
    uid?: number,
    timeout?: number,
    callbackerror?: () => void

}
export class rpc {
    constructor(options: rpcOptions)
    host: string
    db: string
    sid: string
    uid: number
    timeout: number
    callbackerror: () => void
    _callbackerror(url: string, params: callParams, error: error): void
    josn(url: string, params: callParams, timeout: number): data
    login(params: loginParams): data
    logout(): data
    call(params: callParams): data
}
export interface rpcIns extends rpc { }


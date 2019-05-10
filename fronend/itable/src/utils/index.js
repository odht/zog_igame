import { Breadcrumb } from 'antd'
import Link from 'umi/link'
/**
 * 将id放在dataSource 最前面，已废弃
 * @param {*} dataSource 
 * @param {*} id 
 */
export function PopData(dataSource = [], id = []) {
    console.log(id)
    const newdata = [...dataSource]
    const flag = newdata.filter((item) => id.indexOf(item.id) >= 0).map((item) => (item.user = true) && item);
    const noflag = newdata.filter((item) => id.indexOf(item.id) < 0);
    return [...flag, ...noflag]
}
/**
 * 将data中的某些对象转换为数组
 * @param {*} data 
 */
export function turnData(data) {
    if (Array.isArray(data)) {
        data.forEach((item, index) => {
            data[index] = turnData(item);
        })
    }
    if (isPureObj(data)) {
        if (!isOnlyObj(data)) {//只能根据对象键的多少(目前是以两个字段来判断)来判断是否需要转换为数组。
            for (let attr in data) {
                if (Array.isArray(data[attr])) {
                    data[attr].forEach((item, index) => {
                        data[attr][index] = turnData(item);
                    })
                } else if (isPureObj(data[attr])) {
                    if (Object.keys(data[attr]).length <= 2) {
                        data[attr] = Object.values(data[attr]);
                    } else {
                        data[attr] = turnData(data[attr]);
                    }
                }
            }
        } else if (Object.keys(data).length <= 2 && Object.keys(data).length !== 1) {
            data = Object.values(data);
        } else if (Object.keys(data).length === 1) {
            data = Object.values(data)[0]
        }
    }
    return data
}
function isOnlyObj(object) {//判断是不是最简单的对象(没有嵌套)
    for (let key in object) {
        if (typeof object[key] === "object" && object[key] !== null) {
            return false
        }
    }
    return true
}
function isPureObj(object) {//判断是不是纯对象，而不是数组。
    return Object.prototype.toString.call(object) === '[object Object]'
}
function typeOf(obj) {
    return Object.prototype.toString.call(obj)
}
//复制类实例化的对象不会产生预期的效果（类内部定义的方法都是不可枚举的）
export function deepCopy(obj) {
    let copy;
    let contain = arguments[1] || new WeakMap();
    if (typeOf(obj) === '[object Object]') {
        copy = {}
        if (contain.has(obj)) {
            copy = obj
        } else {
            contain.set(obj, 'MARK')
            for (let key in obj) {
                copy[key] = deepCopy(obj[key], contain);
            }
        }
    } else if (typeOf(obj) === '[object Function]') {
        copy = obj.bind();
    } else if (typeOf(obj) === '[object Array]') {
        copy = obj.map((item) => {
            return deepCopy(item, contain);
        })
    } else {
        copy = obj;
    }
    return copy
}
/**
 * 将数组中的某些元素提前
 * @param {*} array 
 * @param {*} element 
 * @param {*} instead 
 */
export function ChangeIndexArrayInArry(array = [], element, instead) {
    if (!Array.isArray(element)) {
        const index = array.indexOf(element);
        if (index > -1) {
            array.splice(index, 1)
            array.unshift(element)
        }
    } else {
        element.forEach((value, index) => {
            const indexs = array.indexOf(value);
            if (indexs > -1) {
                array.splice(indexs, 1)
                array.unshift(value)
            }
        })
    }
    return array
}
export function makeBreadcrumb(routes) {
    const breadcrumbNameMapArray = routes.filter((item) => item.path && item.path != '')
    const breadcrumbNameMap = breadcrumbNameMapArray.reduce((pre, now) => {
        pre[now.path] = now.title;
        return pre
    }, {})
    const pathSnippets = this.props.location.pathname.split('/').filter(i => i && i != 'itable');
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
        console.log(breadcrumbNameMap);
        return (
            <Breadcrumb.Item key={url}>
                <Link to={url}>
                    {breadcrumbNameMap[url].split(' ')[0]}
                </Link>
            </Breadcrumb.Item>
        );
    });
    const BreadcrumbItem = [].concat(extraBreadcrumbItems);
    return BreadcrumbItem
}
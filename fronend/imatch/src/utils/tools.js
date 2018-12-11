export function lookup(ids = [], data = {}) {
	/* get recordset by id or ids  */
	return (Array.isArray(ids) ? ids : [ids]).map(id => data[id]).filter(item => item)


}

export function toArray(field, operator, value) {
	/*
	   domain = [['field_name','operator', value], [..., ..., ... ], ... ]
	   domain = [toArray('field_name','operator', value), toArray(..., ..., ... ), ... ]
	   domain = [['name','like', 'simth'], ['age', '>', 20] ]
	   domain = [toArray('name','like', 'simth'), toArray('age', '>', 20) ]
	*/
	return [field, operator, value];
}

//用于将从odoo-rpc获取的数据中一些对象数据转换为数组，以符合原代码的设计。
//1. 不稳定且无法深层的嵌套(如若出现数据bug，可能是此函数引起)
//2. 对数据的操作是破坏性的
//3. 可优化和精简
export function turnData(data) {
	if (Array.isArray(data)) {
		data.forEach((item) => {
			turnData(item);
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
function isPureObj(object) {//判断是不是纯对象，而不是数组或者存在其他原型的对象。
	return Object.prototype.toString.call(object) === '[object Object]'
}
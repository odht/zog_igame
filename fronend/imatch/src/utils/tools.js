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
export function turnData(data) {
	if (Array.isArray(data)) {
		data.forEach((item) => {
			turnData(item);
		})
	}
	if (isPureObj(data)) {
		if (!isOnlyObj(data)) {//只能根据键的多少来判断是否需要转换为数组。
			for (let attr in data) {
				if (Array.isArray(data[attr])) {
					data[attr].forEach((item) => {
						turnData(item);
					})
				} else if (isPureObj(data[attr])) {
					if (Object.keys(data[attr]).length <= 2) {
						data[attr] = Object.values(data[attr]);
					} else {
						data[attr] = turnData(data[attr]);
					}
				}
			}
		} else if (Object.keys(data).length <= 2) {
			data = Object.values(data);
		}
	}
	return data
}
function isOnlyObj(object) {
	for (let key in object) {
		if (typeof object[key] === "object" && object[key] !== null) {
			return false
		}
	}
	return true
}
function isPureObj(object) {
	return Object.prototype.toString.call(object) === '[object Object]'
}
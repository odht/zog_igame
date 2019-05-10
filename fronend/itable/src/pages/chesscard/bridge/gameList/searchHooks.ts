import React, { useEffect, useState ,useCallback} from 'react';
import Odoo from '@/odoo'


export function useSeachData(modelName: string, domain: Array<any>): Array<{ id: number, name: string }>
export function useSeachData(modelName, domain) {
    const [data, setData] = useState([]);
    const test=useCallback(getRound,[modelName,domain])
    useEffect(() => {
        test(modelName, domain).then((value) => {
            setData(value)
        })
    }, [])
    return data
}


async function getRound(modelName, domain) {
    const cls = Odoo.env(modelName);
    const roundArray = await cls.search_read(domain, { name: null });
    return roundArray
}
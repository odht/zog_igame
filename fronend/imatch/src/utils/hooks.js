import React, { useState, useEffect } from 'react';
import odoo from '../odoo-rpc/odoo';
async function getGameData(model, domain, fields) {
    const cls = odoo.env(model);
    const dataSource = await cls.search_read(domain, fields)
    return dataSource
}
export function useData(model, domain, fields) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    useEffect(() => {
        getGameData(model, domain, fields).then((val) => {
            setData(val)
            setLoading(false)
        })
    }, [])
    return [loading, data]
}
// export function useMutex(init) {
//     const [key, setKeys] = useState(init);
//     const setKey=(val)=>[
//         setKeys
//     ]
//     return [key,]
// }
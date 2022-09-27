import { Empty, Pagination } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../api';

function HomeList() {
    const navigate = useNavigate()
    const [category, setCategory] = useState('bike')
    const [ list, setList] = useState([])

    const categoryData = [
        { label: 'Bike', key: 'bike' },
        { label: 'Boat', key: 'boat' },
        { label: 'Fishing', key: 'fishing' },
        { label: 'Tent', key: 'tent' },
        { label: 'Truch', key: 'truch' },
        { label: 'RV', key: 'rv' }
    ]

    const onCategoryClicked = (event) =>  {
        setCategory(event.key)
    }

    const onItemClicked = (event) => {
        navigate(event.id)
    }

    useEffect(() => {
        API.getAllSpares(category).then( data => {
            setList(data)
        })
    }, [category])

    return (
        <div className='app-home-wrapper'>
            <div className='app-home-side'>
                {
                    categoryData.map(item => <div className={(item.key === category? 'on ' : '').concat('app-home-side-item')}  key={item.key} onClick={onCategoryClicked.bind(this, item)}>{item.label}</div>)
                }
            </div>
            <div className='app-home-content'>
                <div className='app-home-content-list'>
                    {
                        (list && list.length) ?
                        list.map(item =>
                            <div className='app-home-item' key={item.id} onClick={onItemClicked.bind(this, item)}>
                                <div className='app-home-item-image' style={{backgroundImage: 'url('+item.image+')'}}></div>
                                <div className='app-home-item-title'>{item.name}</div>
                                <div className='app-home-item-price'>${item.rentprice}/{item.unit} </div>
                            </div>
                        ) : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} style={{width: '100%'}}/>

                    }
                </div>
                {/* <Pagination></Pagination> */}
            </div>
        </div>
    );
    
}
 
export default HomeList;
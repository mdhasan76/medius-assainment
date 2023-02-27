import React, {useState} from 'react';

const Problem1 = () => {

    const [show, setShow] = useState('all');

    // All data Store in it
    const [allData, setAllData] = useState([]);
    const [showUiData, setShowUiData] = useState([]);
    

    // make a sort array for show in all tab
    const sortByStatus = (array) => {
        const activeData = array.filter(statusData => statusData.status.toLowerCase() == 'active');
        const complated = array.filter(statusData => statusData.status.toLowerCase() == 'completed');
        const othersData = array.filter(statusData => statusData.status.toLowerCase() !== 'active' && statusData.status.toLowerCase() !== "completed");

        //Create new array sorting status
        const finalArray = [...activeData, ...complated, ...othersData];
        return finalArray;
    }

    // Handle Form data 
    const handleForm = (event) =>{
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const status = form.status.value;
        const newStatusObj = {name, status};

        // show data on all tab 
        setAllData([...allData, newStatusObj]);
        const sortData = sortByStatus([...allData, newStatusObj]);
        setShowUiData([...sortData])
        // console.log(newStatusObj)
        form.reset()
    }

    const handleClick = (val) =>{
        setShow(val);

        // Show only all data
        if(val == 'all'){
            const sortData = sortByStatus([...allData]);
            setShowUiData([...sortData]);
            return 
        }

        // it will Active and Completed data depend of the value/tab with filter
        const filterForShowUi = allData.filter(data => data.status.toLowerCase() == val );
        setShowUiData([...filterForShowUi])
    }


    return (

        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className='text-center text-uppercase mb-5'>Problem-1</h4>
                <div className="col-6 ">
                    <form onSubmit={handleForm} className="row gy-2 gx-3 align-items-center mb-4">
                        <div className="col-auto">
                            <input type="text" className="form-control" name="name" placeholder="Name"/>
                        </div>
                        <div className="col-auto">
                            <input type="text" className="form-control" name="status" placeholder="Status"/>
                        </div>
                        <div className="col-auto">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
                <div className="col-8">
                    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                        <li className="nav-item">
                            <button  className={`nav-link ${show==='all' && 'active'}`} type="button" onClick={()=>handleClick('all')}>All</button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link ${show==='active' && 'active'}`} type="button" onClick={()=>handleClick('active')}>Active</button>
                        </li>
                        <li className="nav-item">
                            <button  className={`nav-link ${show==='completed' && 'active'}`} type="button" onClick={()=>handleClick('completed')}>Completed</button>
                        </li>
                    </ul>
                    <div className="tab-content"></div>
                    <table className="table table-striped ">
                        <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Status</th>
                        </tr>
                        </thead>
                        <tbody>
                            {
                                showUiData.length > 0 && showUiData.map((data, index) =>
                                <tr key={index}>
                                    <td>{data.name}</td>
                                    <td>{data.status}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Problem1;
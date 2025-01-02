import { useEffect, useState } from "react";

const useMenu = () =>{
    const [menu, setMenu] = useState([]);
    const [loading, setLoading] = useState(true)
    const itemsPerPage = 10;
    const [totalCount, setTotalCount] = useState(0);

   
    const numberOfPages = Math.ceil(totalCount / itemsPerPage);


    const pages = [...Array(numberOfPages).keys()];
   

    useEffect(()=>{
        fetch("http://localhost:5000/count")
        .then(res => res.json())
        .then(data => {
            setTotalCount(data.count);
            setLoading(false)
            
        })
    },[]);
    

        useEffect(() => {
            fetch('http://localhost:5000/menu')
                .then(res => res.json())
                .then(data => {
                    
                    setMenu(data);
                    setLoading(false)
                })
        }, []);

       

        return [menu, loading, totalCount, pages]
}

export default useMenu;
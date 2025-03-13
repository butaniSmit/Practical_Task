import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import { ADD, DLT, REMOVE } from '@/redux/actions/action';
import { useRouter } from 'next/router';
import Layout from '@/components/common/layout/user';

const CardsDetails = () => {

  const [data,setData] = useState([]);
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();

  const getdata = useSelector((state)=> state.cartreducer.carts);
  console.log(id)
  const compare = ()=>{
    let comparedata = getdata.filter((e)=>{
      console.log(e.id);
      return e.id == id
    });
    setData(comparedata);
    console.log(data)
  }

  // add data
  const send = (e)=>{
    dispatch(ADD(e));
    toast.success("Iteam Add In Your Cart",{
      position: toast.POSITION.TOP_CENTER
    });
  }
  
  const dlt = (id)=>{
    dispatch(DLT(id));
    router.push("/product");
    toast.error("Iteam Remove In Your Cart",{
      position: toast.POSITION.TOP_CENTER
    });
}
// remove one
const remove = (item)=>{
  dispatch(REMOVE(item))
  toast.error("Iteam Remove In Your Cart",{
    position: toast.POSITION.TOP_CENTER
  });
}

  useEffect(()=>{
    compare();
  },[])

  return (
    <>
    <Layout>
      <div className="container mt-2">
        <h2 className='text-center'>Iteams Details Page
        </h2>

        <section className='container mt-3'>
          <div className="iteamsdetails">
          {data?
            data.map((ele)=>{
              return (
                <>
                <div className="items_img" key={ele.id}>
              <img src={ele.imgdata} alt="" />
            </div>
            <div className="details">
               <Table>
                <tr>
                  <td>
                    <p> <strong>Restaurant</strong>  : {ele.rname}</p>
                    <p> <strong>Price</strong>  : ₹{ele.price}</p>
                    <p> <strong>Dishes</strong>  : {ele.address}</p>
                    <p> <strong>Total</strong>  :₹  {ele.price * ele.qnty}</p>
                    <div className='mt-5 d-flex justify-content-between align-items-center' style={{width:100,cursor:"pointer",background:"#ddd",color:"#111"}}>
                    <span style={{fontSize:24}} onClick={ele.qnty <=1 ? ()=>dlt(ele.id) : ()=>remove(ele)}>-</span>
                    <span style={{fontSize:22}}>{ele.qnty}</span>
                    <span style={{fontSize:24}} onClick={()=>send(ele)}>+</span>
                    </div>
                  </td>
                  <td>
                    <p><strong>Rating :</strong> <span style={{background:"green",color:"#fff",padding:"2px 5px",borderRadius:"5px"}}>{ele.rating} ★	</span></p>
                    <p><strong>Order Review :</strong> <span >{ele.somedata}	</span></p>
                    <p><strong>Remove :</strong> <span ><i className='fas fa-trash' onClick={()=>dlt(ele.id)} style={{color:"red",fontSize:20,cursor:"pointer"}}></i>	</span></p>
                  </td>
                </tr>
              </Table>
            </div>
                </>
              )
            })
          :null}
          </div>
        </section>
      </div>
      </Layout>
    </>
  )
}

export default CardsDetails
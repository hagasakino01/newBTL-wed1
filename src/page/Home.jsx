import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AgGridReact, AgGridReactProps, AgReactUiProps } from 'ag-grid-react';
import notification from './../img/notification.png'
import thangBang from './../img/thang.jpg'
import logout from './../img/logout.png'
import 'ag-grid-community/styles/ag-grid.css'; 
import 'ag-grid-community/styles/ag-theme-alpine.css'; 
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getListBook, getLogin } from '../features/featuresHome/HomeSlice';
import axios from 'axios';
function Home() {
 
  const dispatch= useDispatch()
  const navigate = useNavigate();
  const gridRef = useRef(); 
  const rowData = useSelector((state) => state.home.listBook)

 const defaultCellStyle = {
  fontSize: '14px',
  lineHeight: '18px',
  padding: '16px 0',
  fontWeight: '500',
  color: '#282828',
};
const columnDefs = [
  {
    field: 'stt',
    headerClass: 'header-ag header-text-center',
    cellStyle: { ...defaultCellStyle, textAlign: 'left' },
    headerName: '',
    width: 80,
    suppressMenu: true,
    
  },
  {
    field: 'title',
    headerClass: 'header-ag header-text-center',
    cellStyle: { ...defaultCellStyle, textAlign: 'left', paddingLeft:'18px' },
    headerName: 'Tiêu đề',
    width: 200,
    suppressMenu: true,
  },
  {
    field: 'author',
    headerClass: 'header-ag text-center',
    cellStyle: { ...defaultCellStyle, textAlign: 'left', paddingLeft:'18px'},
    headerName: 'tác giả',
    width: 200,
    suppressMenu: true,
    
  },
  {
    field: 'type',
    headerClass: 'header-ag header-text-center',
    cellStyle: { ...defaultCellStyle, textAlign: 'left', paddingLeft:'18px'},
    headerName: 'thể loại',
    width: 200,
    suppressMenu: true,
  },
  {
    field: 'date',
    headerClass: 'header-ag header-text-center',
    cellStyle: { ...defaultCellStyle, textAlign: 'left', paddingLeft:'18px'},
    headerName: 'ngày phát hành',
    width: 200,
    suppressMenu: true,
  },
  {
    field: 'numOfPage',
    headerClass: 'header-ag text-center',
    cellStyle: { ...defaultCellStyle, textAlign: 'left', paddingLeft:'18px'},
    headerName: 'số trang',
    width: 200,
    suppressMenu: true,
    
  },
  {
    field: '123',
    headerClass: 'header-ag header-text-center',
    cellStyle: { ...defaultCellStyle, textAlign: 'left', paddingLeft:'18px'},
    headerName: '',
    width: 200,
    suppressMenu: true,
    cellRenderer: 'actionRerender',
  },

];

 // DefaultColDef sets props common to all Columns
 const defaultColDef = useMemo( ()=> ({
     sortable: true
   }));

 // Example of consuming Grid Event
 
 // Example load data from sever
const handleGetListBook= async ()=>{
  axios.get('https://app-bookss.herokuapp.com/api/get-books')
  .then(function (response) {
    // handle success
    console.log(response)
    dispatch(getListBook(response.data))
  .catch(function (error) {
      // handle error
      console.log(error);
      
  })
})
}
useEffect(() => {
  handleGetListBook()
}, [])
const token= localStorage.getItem('token')

const handleLogout=()=>{
  
  localStorage.clear();
  console.log(token)
  // window.location.reload();
}
const handleLogin=()=>{
  navigate('/login')
}

const handleDelete= async (params)=>{
  
  const del={bookId: params.data.bookId}
  console.log(del)
  try {
    const { data: res } = await axios.delete('https://app-bookss.herokuapp.com/api/delete-book', del);
    console.log(res)

  
  
} catch (error) {
    
    console.error(error);
}
}

  return (
    <div className='flex flex-col w-full items-center justify-center pb-[24px] '>
    <div className='flex flex-col mb-[24px] w-full '>
      <div className='flex justify-end mt-[8px] mx-[8px]'>
        {token && <div className='flex flex-row items-end w-[180px] h-[45px]'>
          <div className='flex flex-row items-center justify-center mx-[4px] mb-[10px]'>
            <img className='w-[24px]  ' src={notification} alt="" />
          </div>
          <div className='flex flex-row items-center'>
            <div className='w-[42px] h-[42px] rounded-[50px] mx-[4px]'>
              <img className='w-[42px] h-[42px] rounded-[50px]' src={thangBang} alt="" />
            </div>
            <div className=' mx-[4px]'>
              <p className='text-[14px] text-[#7D7D7D]'>Xin chào</p>
              <p className='text-[14px] text-[#EA6200]'>Admin001</p>
            </div>
            <div onClick={()=>handleLogout()}>
              <img className='w-[24px] cursor-pointer' src={logout}  alt="" />
            </div>
          </div>
        </div>}
       {!token && <div>
          <button className='px-[16px] py-[4px]  mx-[8px] border-[2px] border-yellow-500 text-yellow-500 rounded-[8px] text-[18px] font-semibold' onClick={()=>handleLogin()}>Đăng nhập</button>
        </div>}
      </div>

      <div className='flex flex-col items-center justify-center'>
        <div className='max-w-[500px]'>
          <p className='text-[60px] font-semibold text-indigo-500 h-[60px]'>Welcome</p>
          <p className='text-[48px] text-amber-300 '>to your library</p>
        </div>
      </div>
    </div>

    <div className=' flex w-[350px] md:w-[720px] xl:w-[1280px] justify-end my-[16px]'>
      <button className='border-[1px] border-cyan-900 px-[16px] py-[4px] rounded-[4px] bg-green-500 text-[16px] text-white font-semibold '>Thêm sách</button>
    </div>
    <div className="ag-theme-alpine w-[350px] md:w-[720px] xl:w-[1280px] h-[600px] mx-[20px]" >
      <AgGridReact
          ref={gridRef} 

          rowData={rowData} 

          gridOptions={{
            columnDefs: columnDefs,
            frameworkComponents: {
              actionRerender: (params) => {
                return (
                  <div>
                    {token&&<div>
                      <button className='border-neutral-400 border-[1px] mx-[8px] px-[8px] pb-[2px] bg-yellow-200' >Xem</button>
                      <button className='border-neutral-400 border-[1px] mx-[8px] px-[8px] pb-[2px] bg-red-400' onClick={()=>handleDelete(params)}>Xóa</button>
                    </div>}
                  </div>
                )
                
              },
            },
          }}
          defaultColDef={defaultColDef} 

          animateRows={true} 
          rowSelection='multiple' 

         
          suppressAggFuncInHeader={true}
      suppressMovableColumns={true}
      suppressColumnMoveAnimation={true}

      rowHeight={50}

      suppressContextMenu={true}
      suppressCellSelection={true}
      suppressMenuHide={true}
      suppressRowClickSelection={true}
      scrollbarWidth={0}
      containerStyle={{
        height: 600,
      }}
      pagination={true}
      paginationPageSize={20}
      cacheBlockSize={20}
      
          />
    </div>
    
  </div>
  );
 };
export default Home
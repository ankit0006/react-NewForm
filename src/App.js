import './App.css';
import React from 'react'
import {useForm} from 'react-hook-form';
import {useTable} from 'react-table';
import {useRef} from 'react';
function App() {
  
  const{register,handleSubmit,formState:{errors,isSubmitting},reset}=useForm();

  // useRef is used to store form data without re-rendring
  const formDataRef=useRef([]);

  // store submited form data
  const onsubmit=async (data)=>{
    await new Promise((resolve)=>setTimeout(resolve,3000));
    formDataRef.current=[...formDataRef.current,data];
    reset();
  };

  // create table columns
  const columns=React.useMemo(()=>[
    {Header:'First Name', accessor:'firstname'},
    {Header:'Last Name', accessor:'lastname'},
    {Header:'Email', accessor:'email'},
    {Header:'Phone number', accessor:'phonenumb'},
  ],[]
  );

  // create table instance
  const data=React.useMemo(()=> formDataRef.current,[formDataRef.current]);
  const{getTableProps,getTableBodyProps,headerGroups,rows,prepareRow}=useTable({columns,data});

  return (
    <div className='container'>
      <div classname='div-container'>
        <h2>React Hook Form Validation</h2>
        <form onSubmit={handleSubmit(onsubmit)} className='form-container'>
        <div>
          <label id='first-label'>
            First Name
          </label>
          <input type='text' placeholder='First Name' {...register('firstname',
          {
            required:true,
            maxLength:{value:10,message:"First name is not more than 10 words"}
          })} className={errors.firstname ? 'error-first':''}/>
          {errors.firstname && <p className='error-msg'>{errors.firstname.message}</p>}
        </div>
        <br/>
          
          
        <div>
          <label>
            Last Name
          </label>
          <input type='text' placeholder='Last Name' {...register('lastname',
          {
            required:true,
            maxLength:{value:10,message:"max length is not more than 10 words"}
          })} className={errors.lastname ? 'error-last':''}/>
          {errors.lastname && <p className='error-msg'>{errors.lastname.message}</p>}
        </div>
        <br/>
        
        
        <div>
          <label>
            Email
          </label>
          <input type='email' placeholder='abc@example.com' {...register('email',{
            required:true,
            pattern:{value:/^\S+@\S+$/i,message:"enter valid email"}
          })} className={errors.email ? 'error-email':''} />
          {errors.email && <p className='error-msg'>{errors.email.message}</p>}
        </div>
        <br/>
        
        
        <div>
          <label>
            Phone number
          </label>
          <input type='number' placeholder='0123456789' {...register('phonenumb',{
            required:true,
            minLength:{value:10,message:"Phone number should be atlest 10 numbers"}
          })} className={errors.phonenumb ? 'error-phone':''} />
          {errors.phonenumb && <p className='error-msg'>{errors.phonenumb.message}</p>}
        </div>
        <br/>
        
        <button type='submit' id='btn' disabled={isSubmitting} value={isSubmitting ? 'Submitting':'Submit'} >
          Submit
        </button>
        </form>
      </div>
      
      <div className='table-container'>
      <h2>Submitted User's Data</h2>
        <table {...getTableProps()} className='tableContent'>


            <thead>
              {headerGroups.map(headerGroups=>(
                <tr {...headerGroups.getHeaderGroupProps()}>
                  {headerGroups.headers.map(column=>(
                    <th {...column.getHeaderProps()} className='tableHead'>
                      {column.render('Header')}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody {...getTableBodyProps()}>
              {rows.map(row=>{
                prepareRow(row);
                return(
                  <tr {...row.getRowProps()}>
                    {row.cells.map(cell=>(
                      <td {...cell.getCellProps()} className='tableData'>
                        {cell.render('Cell')}

                      </td>
                    ))}

                  </tr>
                )
              })}

            </tbody>

        </table>

      </div>
    
    </div>
  );
};

export default App;

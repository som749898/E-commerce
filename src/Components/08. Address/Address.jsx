import { useContext, useState } from "react";
import Modal from 'react-modal';

import "./Address.css";
import { AddressContext } from "../../Context/AddressContext";

export const Address = () => {
  const {addressState, addressDispatch} = useContext(AddressContext);
  const [addressModal, setAddressModal] = useState(false);
  console.log("address", addressState);
  return <div>
    <div className="profile-header">Address Information</div>
    <div className="checkout-address">
        <button className="add-address" onClick={() => setAddressModal(true)}>Add New Address</button>
        <Modal className="address-modal" isOpen={addressModal}>
          <h3 className="modal-header">Add New Address</h3>
          <div className="modal-input">
            <input value={addressState.name} onChange={(e) => addressDispatch({type: "NAME", payload: e.target.value})} placeholder="Enter Name" />
            <input value={addressState.houseNo} onChange={(e) => addressDispatch({type: "HOUSE", payload: e.target.value})} placeholder="Enter House no. , Road , Colony" />
            <input value={addressState.city} onChange={(e) => addressDispatch({type: "CITY", payload: e.target.value})} placeholder="Enter City" />
            <input value={addressState.state} onChange={(e) => addressDispatch({type: "STATE", payload: e.target.value})} placeholder="Enter State" />
            <input value={addressState.country} onChange={(e) => addressDispatch({type: "COUNTRY", payload: e.target.value})} placeholder="Enter Country" />
            <input value={addressState.postalCode} onChange={(e) => addressDispatch({type: "POSTAL", payload: e.target.value})} placeholder="Enter Postal Code" />
            <input value={addressState.mobileNo} onChange={(e) => addressDispatch({type: "MOBILE", payload: e.target.value})} placeholder="Enter Mobile Number" />
          </div>
          <div className="modal-btn">
            {
              addressState.isEdit ? 
              <button className="btn-add" onClick={() => {setAddressModal(false); addressDispatch({type: "CORRECT", payload: {
                name : addressState.name,
                houseNo: addressState.houseNo,
                city: addressState.city,
                state: addressState.state,
                country: addressState.country,
                postalCode : addressState.postalCode,
                mobileNo: addressState.mobileNo
              }})}}>Edit</button> 
              :
              <button className="btn-add" onClick={() => {setAddressModal(false); addressDispatch({type: "ADD", payload: {
                name : addressState.name,
                houseNo: addressState.houseNo,
                city: addressState.city,
                state: addressState.state,
                country: addressState.country,
                postalCode : addressState.postalCode,
                mobileNo: addressState.mobileNo
              }})}}>Add</button>
            }
            <button className="btn-cancel" onClick={() => {setAddressModal(false); addressDispatch({type: "RESET"})}}>Cancel</button>
            <button className="btn-data" onClick={() => {addressDispatch({type: "DUMMY_DATA"})}}>Add Dummy Data</button>
          </div>
        </Modal>
        <div className="address-container profile-address">
          {
            addressState.address.length !==0 && addressState.address.map(item => <div className="each-address" key={item._id}>
              <div className="address-top">
                <div>{item.name}</div>
              </div>
              <div className="address-bottom">
                <div>{item.houseNo}</div>
                <div>{item.city}, {item.state}, {item.postalCode}</div>
                <div>{item.country}</div>
                <div>Phone Number - {item.mobileNo}</div>
              </div>
              <div className="address-btn">
                <button onClick={() => { setAddressModal(true); addressDispatch({type: "EDIT", payload: item})}}>Edit</button>
                <button onClick={() => addressDispatch({type: "DELETE", payload: item})}>Delete</button>
              </div>
            </div>)
          }
        </div>
      </div>
  </div>
}
import React, { useState } from "react";
import { useEffect } from "react";
import NhapHangService from "../../../services/NhapHangService";
import SanPhamService from "../../../services/SanPhamService";
import formatNum from "../../../Format/Format";
function Modal({ open, close }) {
  const [date, setDate] = useState("");
  const [search, setSearch] = useState();
  const [searchSp, setSearchSp] = useState([]);
  const [items, setItems] = useState([]);
  const [currentId, setCurrentId] = useState();

  const addItem = () => {
    let name = document.querySelector("#SanPham").value;
    let quantity = Number(document.querySelector("#SoLuong").value);
    let price = Number(document.querySelector("#GiaNhap").value);
    if (name === "" || quantity === 0 || price === 0) return;
    let item = { name: name, id: currentId, quantity: quantity, price: price };
    console.log("value",currentId, quantity, price,search);
    setItems([...items, item]);

  };
  const minusQuantity = (e, i) => {
    let num = Number(e.target.nextElementSibling.innerText);
    if (num === 1) return;
    e.target.nextElementSibling.innerHTML = num - 1;
    items[i].quantity = num - 1;
  };
  const bonusQuantity = (e, i) => {
    let num = Number(e.target.previousElementSibling.innerText);
    e.target.previousElementSibling.innerHTML = num + 1;
    items[i].quantity = num + 1;
  };
  const removeItem = (e, i) => {
    e.target.parentNode.parentNode.remove();
    items.splice(i, 1);
  };

  const handleSubMit = async () => {
    let getData = [{}];

    for (let i of items) {
      let newdata = {
        IDNguyenLieu: i.id,
        SoLuong: i.quantity,
        GiaNhap: i.price,
      };
      getData = [...getData, newdata];
    }

    const data = {
      NgayNhap: date,
      getData: getData.slice(1),
    };

    console.log("data", data);
    try {
      const res = await NhapHangService.createPhieuNhap(data)
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchSearchSp = async () => {
    try {
      const res = await SanPhamService.searchSp(search);
      // console.log(res);
      setSearchSp(res.data);
    } catch (error) {}
  };
  // useEffect(() => {
  //   const id = setTimeout(() => {
  //     if (search&&!currentId) fetchSearchSp();
  //     else setCurrentId(null)
  //   }, 1000);

  //   return () => {
  //     clearTimeout(id);
  //   };
  // }, [search]);

  if (!open) return null;
  return (
    <div className="overplay">
      <div className="form">
        <div className="form-infor" style={{ width: "100%" }}>
          <button onClick={close} className="closeBtn">
            X
          </button>
          <h2>T???o Phi???u Nh???p</h2>
          <form className="form-input" style={{ width: "70%" }}>
            <div className="form-input-div">
              <label>Ng??y nh???p:</label>
              <input
                name="NgayNhap"
                value={date}
                type="date"
                onChange={(e) => setDate(e.target.value)}
              ></input>
            </div>
            <div className="form-input-div">
              <label>S???n ph???m: </label>
              <div style={{ display: "inline-block", position: "relative" }}>
                <input
                  id="SanPham"
                  name="SanPham"
                  value={search}
                  type="text"
                  placeholder="T??n s???n ph???m"
                  onChange={(e) => {setSearch(e.target.value);fetchSearchSp()}}
                ></input>
                {searchSp.length !== 0 && (
                  <div
                    style={{
                      position: "absolute",
                      top: "100%",
                      left: "0",
                      right: "0",
                      zIndex: "50",
                      backgroundColor: "white",
                      border: "2px solid black",
                    }}
                  >
                    <ul
                      style={{
                        listStyle: "none",
                        padding: 0,
                        maxHeight: "150px",
                        overflow: "auto",
                      }}
                    >
                      {searchSp.map((item) => (
                        <li
                          key={item.IdSanPham}
                          onClick={() => {setCurrentId(item.IdSanPham);setSearch(item.Ten);setSearchSp([])}}
                        >
                          {item.Ten}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <label style={{ marginLeft: "80px" }}>S??? l?????ng: </label>
              <input
                id="SoLuong"
                name="SoLuong"
                type="number"
                placeholder="S??? l?????ng"
              ></input>
            </div>
            <div className="form-input-div">
              <label>Gi?? nh???p: </label>
              <input
                id="GiaNhap"
                name="Gi?? nh???p"
                type="number"
                placeholder="Gi?? nh???p"
                style={{ width: "80%" }}
              ></input>
            </div>
            <button onClick={addItem} type="button" className="form-input-btn">
              Th??m v??o phi???u
            </button>
            <table className="form-input-table">
              <thead>
                <tr>
                  <th>T??n s???n ph???m</th>
                  <th>Gi?? nh???p</th>
                  <th>S??? l?????ng</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, i) => {
                  return (
                    <tr className="table-result" key={i}>
                      <td>{item.name}</td>
                      <td>{formatNum(item.price)}</td>
                      <td>
                        <i
                          onClick={(e) => minusQuantity(e, i)}
                          className="fa-solid fa-minus minus-btn"
                        ></i>
                        <span>{item.quantity}</span>
                        <i
                          onClick={(e) => bonusQuantity(e, i)}
                          className="fa-solid fa-plus plus-btn"
                        ></i>
                      </td>
                      <td>
                        <i
                          onClick={(e) => removeItem(e, i)}
                          className="fas fa-solid fa-trash"
                        ></i>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <button className="form-input-btn" onClick={handleSubMit}>
              X??c nh???n
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Modal;

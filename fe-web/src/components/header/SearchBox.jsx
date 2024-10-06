import React from 'react'
import { FaMagnifyingGlass } from "react-icons/fa6";

export default function SearchBox() {
  return (
    <div className="w-full md:w-[400px] bg-gray-50 rounded-full h-[45px] flex items-center relative border">
        <input
            placeholder="Tìm kiếm khóa học, giảng viên"
            className="w-full bg-transparent outline-none px-4 md:px-6 py-3"
        ></input>
        <div className="w-[50px] md:w-[60px] flex items-center justify-center h-full text-gray-400 hover:text-gray-600 rounded-r-full rounded-br-full cursor-pointer transition-all hover:bg-gray-200">
            <FaMagnifyingGlass />
        </div>
    </div>
  )
}
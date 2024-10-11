import { Button } from '@/components/ui/button'
import { Circle, CirclePlay, Minus, Play, Plus } from 'lucide-react';
import React,  { useState }  from 'react'

function CourseContent() {
    const [isExpanded, setIsExpanded] = useState(true);
    const [expandedSection, setExpandedSection] = useState(null);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };
    const toggleSection = (section) => {
        setExpandedSection(expandedSection === section ? null : section);
      };


  return (
    <div className="bg-white rounded-md  ">
        <div className="title w-1/3">
            <header className=" bg-error-100 text-error-700 text-center leading-[48px] text-text/lg/semibold w-[240px] h-[48px] rounded-br-[4px] inline-block
            hover:shadow-md hover:cursor-pointer"
            onClick={toggleExpand}
            >Nội dung khóa học</header>
        </div>
        {isExpanded && (
            <>
            <div className="content p-5 gap-5 flex flex-col">
                <p className="text-text/md/regular">4 phần - 41 bài giảng - 05 giờ 30 phút</p>

                <div className="flex flex-col gap-[8px] ">
                    <div className="flex items-center justify-between gap-[10px] py-3 px-5 rounded-[4px] bg-gray-300 hover:shadow-md hover:cursor-pointer"
                    onClick={() => toggleSection(1)}>
                        <div className="content-name flex gap-[10px] w-2/3">
                            {expandedSection === 1 ? (
                                <Minus className="text-error-300" />
                            ) : (
                                <Plus className="text-error-300" />
                            )}
                            <h3 className="text-text/md/medium  ">
                               Phần 1: Giới thiệu và hướng dẫn tạo các hình khối
                            </h3>
                        </div>
                        <span className="text-text/md/regular w-1/3 text-right">12 bài giảng - 0 giờ 48 phút</span>
                    </div>
                    {expandedSection === 1 && (
                        <div className="inside-content rounded-[4px]  flex flex-col gap-3 ">
                        {/* Item 1 */}
                        <div className="flex items-center px-5 py-3 justify-between gap-[10px] border-b border-black-50
                        hover:shadow-md hover:cursor-pointer">
                          <div className="content-name flex gap-[10px]">
                            <div className="icon w-[24px] h-[24px]">
                              <CirclePlay className="fill-error-500 text-white" />
                            </div>
                            <h3 className="text-text/md/medium">Bài 1 : Work Area</h3>
                          </div>
                          <div className="left-info flex gap-[10px]">
                            <span className="text-primary-500 text-text/md/medium">Học thử</span>
                            <span className="text-text/md/regular">00:00:00</span>
                          </div>
                        </div>
                        {/* Item 2 */}
                        <div className="flex items-center px-5 py-3 justify-between gap-[10px] border-b border-black-50
                        hover:shadow-md hover:cursor-pointer">
                          <div className="content-name flex gap-[10px]">
                            <div className="icon w-[24px] h-[24px]">
                              <CirclePlay className="fill-error-500 text-white" />
                            </div>
                            <h3 className="text-text/md/medium">Bài 2 : Cách tạo một thư mục mới</h3>
                          </div>
                          <div className="left-info flex gap-[10px]">
                            <span className="text-primary-500 text-text/md/medium">Học thử</span>
                            <span className="text-text/md/regular">00:00:00</span>
                          </div>
                        </div>
          
                        {/* Item 3 */}
                        <div className="flex items-center px-5 py-3 justify-between gap-[10px] border-b border-black-50
                        hover:shadow-md hover:cursor-pointer">
                          <div className="content-name flex gap-[10px]">
                            <div className="icon w-[24px] h-[24px]">
                              <CirclePlay className="fill-error-500 text-white" />
                            </div>
                            <h3 className="text-text/md/medium">Bài 3 : Work spaces</h3>
                          </div>
                          <div className="left-info flex gap-[10px]">
                            <span className="text-primary-500 text-text/md/medium">Học thử</span>
                            <span className="text-text/md/regular">00:00:00</span>
                          </div>
                        </div>
                      </div>
                        
                    )}
                    <div className="flex items-center justify-between gap-[10px] py-3 px-5 rounded-[4px] bg-gray-300 hover:shadow-md hover:cursor-pointer"
                    onClick={() => toggleSection(2)}>
                        <div className="content-name flex gap-[10px] w-2/3">
                            {expandedSection === 2 ? (
                                <Minus className="text-error-300" />
                            ) : (
                                <Plus className="text-error-300" />
                            )}
                            <h3 className="text-text/md/medium whitespace-nowrap overflow-hidden text-ellipsis">
                               Phần 2: Các tính năng của Shapes và bài tập thực hành
                            </h3>
                        </div>
                        <span className="text-text/md/regular w-1/3 text-right">12 bài giảng - 0 giờ 48 phút</span>
                    </div>
                    <div className="flex items-center justify-between gap-[10px] py-3 px-5 rounded-[4px] bg-gray-300 hover:shadow-md hover:cursor-pointer"
                    onClick={() => toggleSection(3)}>
                        <div className="content-name flex gap-[10px] w-2/3">
                            {expandedSection === 3 ? (
                                <Minus className="text-error-300" />
                            ) : (
                                <Plus className="text-error-300" />
                            )}
                            <h3 className="text-text/md/medium whitespace-nowrap overflow-hidden text-ellipsis">
                                Phần 3: Hướng dẫn các công cụ Drawing Tools, Pen Tool và Brushes
                            </h3>
                        </div>
                        <span className="text-text/md/regular w-1/3 text-right">13 bài giảng - 2 giờ 11 phút</span>
                    </div>
                    <div className="flex items-center justify-between gap-[10px] py-3 px-5 rounded-[4px] bg-gray-300 hover:shadow-md hover:cursor-pointer"
                    onClick={() => toggleSection(4)}>
                        <div className="content-name flex gap-[10px] w-2/3">
                            {expandedSection === 4 ? (
                                <Minus className="text-error-300" />
                            ) : (
                                <Plus className="text-error-300" />
                            )}
                            <h3 className="text-text/md/medium whitespace-nowrap overflow-hidden text-ellipsis">
                                Phần 4: Hướng dẫn các công cụ nâng cao trong thiết kế đồ họa
                            </h3>
                        </div>
                        <span className="text-text/md/regular w-1/3 text-right">10 bài giảng - 1 giờ 41 phút</span>
                    </div>
                </div>
            </div>
            
            </>
        )}
       
    </div>
  )
}

export default CourseContent
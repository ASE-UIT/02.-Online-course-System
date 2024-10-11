import React from 'react'
import CourseRatingCard from './CourseRatingCard'
import { Star } from 'lucide-react'
import { Button } from '@/components/ui/button'

const CourseRatingData = [
    {
      img: "https://s3-alpha-sig.figma.com/img/bd66/44b6/b2a44218a37e0f4a110e8345dba0a38a?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=mh7ODiu0WfgV6zBme0VteZ1ZHL9u7Imk~tJfb2nawrOSkejebhvK8ISR4Y1GaKpL9Y7EETB9I2qwrt15pOdvHciPgsJYQg14QZU4y-uDmPXW62m1P-DuN~8zdfMbfiSL46MOdrg0ySidN-GOs9GGkaMteJQFDccGtg4uUkpMvimPFAsjy84L4JGNFxx9bsunwB0PgbJV0k7mwMkfRl67~tXjK-1LEKSj8MFHjtu9SiGTG~DdOhx58B726fS8aK8EQAeHkZLHopzKWMwjF5TNpQUoPBmoyAEYAV7acXQ5muCIWWeDh4k8h0HYxlzsTeWI04bJah8NhkYU4sUkLhTYAg__",
      name: 'Nguyen Van B',
      rating: 4,
      since: '1 ngày trước',
      desc: 'Khóa học bổ ích. Cảm ơn!'
    },
]
const CourseRating = () => {
  return (
    <div className='flex flex-col gap-[10px]'>
        <div className="summary flex w-1/2 gap-[10px]">
            <Star className='text-yellow-400 fill-yellow-400 w-[24px] h-[24px]'/>
            <p className='text-text/lg/semibold'>
                4.0 xếp hạng khoá học  • 8 đánh giá
            </p>

        </div>
        <div className="content flex flex-col gap-[10px]">
            {Array.from({ length: 6 }, (_, index) =>
            // {CourseRatingData.map((item, index) 
            (
                <CourseRatingCard key={index} {...CourseRatingData[0]} />
            ))}
        </div>
        <div className="more-btn flex justify-center">
        <Button
            variant="outline"
            className=" text-text/md/semibold text-black-500 border-black-500 border-[1px] md:text-base "
          >Xem thêm đánh giá</Button>
        </div>
    </div>
  )
}

export default CourseRating
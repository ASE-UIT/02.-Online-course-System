import CategoryCard from "@/components/Category/CategoryCard";
import { CourseCard } from "@/components/Courses/CourseCard";
import { FaArrowRight } from "react-icons/fa6";

const Home = () => {
  return (
    <div>
      <div className="w-full mt-[65px] flex h-[400px] bg-primary-color px-24">
        <div className="basis-[40%]">
          <div
            className="w-[223px] h-[307px] bg-contain mx-auto mt-8"
            style={{
              backgroundImage: `url(https://s3-alpha-sig.figma.com/img/6c9b/3735/e27d4216d0bc4c2fb59b453382b29e99?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=NtXlr9dP0-dkByvnwnkyDWllxUquKz4QZj04S2Sl1zw~4OY4dzbEZa3vk9BYEz-8CyQFHMR0o8ZGGQpxE9Kb13-1AQ7YSeazd13N6MIugGuyj71AGJaz74n9Xz6qpNwMYN~PNrT-eHv6V82~oZeQ7U5-aatyGZks-0R3wDqSvZAwx4AhDvd4z59pN4bjOgu96dxQtAGge70b~Y-jBkxvTeZYBU7fGp1OIb9gNnIb8tlXba65sD45fWjKzhDIHJkKq~0GUbcyEV3hWoGU3Gg1WEcnJY1dXXm4Gl9N3W9ZoZtc3xYy5kuP-VcuozueQRvXD1bkpMhVST-bblUnUyxPsA__)`,
            }}
          ></div>
        </div>
        <div className="basis-[60%] justify-center gap-8 flex flex-col">
          <header className="text-3xl font-bold text-white">
            Khám Phá Thế Giới Kiến Thức EduHub – Học Tập Mọi Lúc, Mọi Nơi
          </header>
          <p className=" text-white">
            Với EduHub, tri thức nằm trong tầm tay bạn dù bạn ở bất kỳ đâu. Bạn
            có thể học tập mọi lúc, trên mọi thiết bị, tiếp cận khoá học từ các
            chuyên gia đầu ngành. Không còn giới hạn về thời gian hay không
            gian, EduHub mang lại một phương pháp học tập linh hoạt và hiện đại,
            giúp bạn chủ động xây dựng hành trình học tập của riêng mình.
          </p>
          <div className="text-primary-color items-center gap-2 flex cursor-pointer transition-all hover:bg-gray-200 text-sm bg-white px-4 py-2 w-fit font-bold rounded-md ">
            <p>Tham gia ngay</p>
            <FaArrowRight />
          </div>
        </div>
      </div>
      <div className="px-24">
        <div className="flex justify-between mt-6">
          <p className="text-2xl font-extrabold">Lịch học trực tiếp</p>
          <p className="text-sm font-bold text-primary-color cursor-pointer">
            Xem tất cả
          </p>
        </div>
        <div className="grid grid-cols-4 mt-4  gap-[1rem]">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((course, idx) => {
            return (
              <CourseCard
                key={idx}
                rating={0}
                ratingNum={2}
                title={"Tiêu đề"}
                author={"Tác giả"}
                price={500000}
                img={
                  "https://s3-alpha-sig.figma.com/img/7f12/ea13/00756f144a0fb5daaf68dbfc01103a46?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=CSSJdDE1TgT~XEce7zEFxHaiBYkErU7VYaC1AjxyFVGnIpNrGn8Q0oTUlD--uzUlYYJ9Ap7t~fqn-m4yfmF8b-j25anq0~THK4h~13BR1jGfel~WCFJHRwa0HqPlKzSocAlqbRxDvNh9Z8bCzFIF~~ifU95VFrp72fCAy7ekalCXk1FkWb2VSe0q5xENvT7dTY4VojE17qpRfJKihjquHmPlC3pJKmHXhUwkWD-2ZxnF3L8Vd-8IGUC1f61t1kGlOouGGiBlK8snPvgL7xmFzL-VLg69gJbCnw0uHPssIPSZYf99thi1EJ1N87ySGOvQIiw6ajiOQ9TM7TKunixi8w__"
                }
              ></CourseCard>
            );
          })}
        </div>
        <div className="flex justify-between mt-6">
          <p className="text-2xl font-extrabold">Top bán chạy</p>
          <p className="text-sm font-bold text-primary-color cursor-pointer">
            Xem tất cả
          </p>
        </div>
        <div className="grid grid-cols-4 mt-4  gap-[1rem]">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((course, idx) => {
            return (
              <CourseCard
                key={idx}
                rating={0}
                ratingNum={2}
                title={"Tiêu đề"}
                author={"Tác giả"}
                price={500000}
                img={
                  "https://s3-alpha-sig.figma.com/img/7f12/ea13/00756f144a0fb5daaf68dbfc01103a46?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=CSSJdDE1TgT~XEce7zEFxHaiBYkErU7VYaC1AjxyFVGnIpNrGn8Q0oTUlD--uzUlYYJ9Ap7t~fqn-m4yfmF8b-j25anq0~THK4h~13BR1jGfel~WCFJHRwa0HqPlKzSocAlqbRxDvNh9Z8bCzFIF~~ifU95VFrp72fCAy7ekalCXk1FkWb2VSe0q5xENvT7dTY4VojE17qpRfJKihjquHmPlC3pJKmHXhUwkWD-2ZxnF3L8Vd-8IGUC1f61t1kGlOouGGiBlK8snPvgL7xmFzL-VLg69gJbCnw0uHPssIPSZYf99thi1EJ1N87ySGOvQIiw6ajiOQ9TM7TKunixi8w__"
                }
              ></CourseCard>
            );
          })}
        </div>
        <div className="flex justify-between mt-6">
          <p className="text-2xl font-extrabold">Khóa học mới ra mắt</p>
          <p className="text-sm font-bold text-primary-color cursor-pointer">
            Xem tất cả
          </p>
        </div>
        <div className="grid grid-cols-4 mt-4  gap-[1rem]">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((course, idx) => {
            return (
              <CourseCard
                key={idx}
                rating={0}
                ratingNum={2}
                title={"Tiêu đề"}
                author={"Tác giả"}
                price={500000}
                img={
                  "https://s3-alpha-sig.figma.com/img/7f12/ea13/00756f144a0fb5daaf68dbfc01103a46?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=CSSJdDE1TgT~XEce7zEFxHaiBYkErU7VYaC1AjxyFVGnIpNrGn8Q0oTUlD--uzUlYYJ9Ap7t~fqn-m4yfmF8b-j25anq0~THK4h~13BR1jGfel~WCFJHRwa0HqPlKzSocAlqbRxDvNh9Z8bCzFIF~~ifU95VFrp72fCAy7ekalCXk1FkWb2VSe0q5xENvT7dTY4VojE17qpRfJKihjquHmPlC3pJKmHXhUwkWD-2ZxnF3L8Vd-8IGUC1f61t1kGlOouGGiBlK8snPvgL7xmFzL-VLg69gJbCnw0uHPssIPSZYf99thi1EJ1N87ySGOvQIiw6ajiOQ9TM7TKunixi8w__"
                }
              ></CourseCard>
            );
          })}
        </div>
        <div className="flex justify-between mt-6">
          <p className="text-2xl font-extrabold">
            Khám phá <span className="text-primary-color">EduHub</span>
          </p>
        </div>
        <div className="grid grid-cols-3 mt-4  gap-[1rem]">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((course, idx) => {
            return (
              <CategoryCard
                category={"Tiếng Anh"}
                subcategory={[
                  "Grammar cho người mới",
                  "Speaking",
                  "Writing",
                  "Listening",
                ]}
                img={
                  "https://s3-alpha-sig.figma.com/img/7f12/ea13/00756f144a0fb5daaf68dbfc01103a46?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=CSSJdDE1TgT~XEce7zEFxHaiBYkErU7VYaC1AjxyFVGnIpNrGn8Q0oTUlD--uzUlYYJ9Ap7t~fqn-m4yfmF8b-j25anq0~THK4h~13BR1jGfel~WCFJHRwa0HqPlKzSocAlqbRxDvNh9Z8bCzFIF~~ifU95VFrp72fCAy7ekalCXk1FkWb2VSe0q5xENvT7dTY4VojE17qpRfJKihjquHmPlC3pJKmHXhUwkWD-2ZxnF3L8Vd-8IGUC1f61t1kGlOouGGiBlK8snPvgL7xmFzL-VLg69gJbCnw0uHPssIPSZYf99thi1EJ1N87ySGOvQIiw6ajiOQ9TM7TKunixi8w__"
                }
                key={idx}
              ></CategoryCard>
            );
          })}
        </div>
      </div>
      <div className="w-full mt-8 px-[15%] h-[355px] bg-[#EEFEE7] flex">
        <div className="basis-[60%] flex flex-col gap-6 justify-center">
          <p className="text-3xl font-extrabold text-[#1C5413]">
            Trở thành giảng viên của EduHub
          </p>
          <p>
            Giảng viên trên toàn thế giới đã và đang dạy cho hàng triệu học viên
            trên EduHub. EduHub cung cấp công cụ và kỹ năng để giúp bạn hoàn
            thiện quá trình giảng dạy tốt hơn.
          </p>
          <div className="bg-[#1F7E0D] px-4 w-fit text-white text-sm font-bold rounded-md cursor-pointer hover:opacity-90 transition-all py-2">
            Bắt đầu giảng dạy
          </div>
        </div>
        <div className="basis-[40%] flex justify-center items-center">
          <div
            className="w-[223px] h-[250px] bg-no-repeat bg-contain"
            style={{
              backgroundImage: `url(https://s3-alpha-sig.figma.com/img/d385/222b/c1f9e16924d9d7758f198407ff983e51?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=mL5iBB3Co3foGxeH1nOPDOWtIeUW9o6~ksC~vii9pUceqOHxHlP9KXhHPdjso2XaUhv1XBRz48~YmA7Bt8QvWfUOQKnCbF9ZVbajRTtBgBP8yXnUSGALCgVHs7baUOVdKMnq2pIhyAFL15hwzj7PydaUP2OH9GCZxwA8wAYE1o~eIiATY4LN7N3EGippJoLUtGonIWodNUDy2lO9UG-X4sYD~t31kVscxNmXGAF0ItWqowKM~z-yKCVMQduqPrDtRJffHnfwc-DD9lTHs2xX8cQzkQPJ5AYfqKtCCSnQY8RxjvnqL0UiytVSjI4DlXU200DJZX~WMU~qqbeuvVgt3w__)`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Home;

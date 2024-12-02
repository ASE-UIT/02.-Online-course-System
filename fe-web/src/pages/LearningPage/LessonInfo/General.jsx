const txt = `<p data-pm-slice="0 0 []"><strong>Bạn c&oacute; biết:</strong><br />Kh&oacute;a học "Cẩm nang A-Z Illustrator cho Designer" ch&iacute;nh l&agrave; d&agrave;nh cho bạn, người...<br />Đam m&ecirc; y&ecirc;u th&iacute;ch đồ họa, nhiếp ảnh, thiết kế sản phẩm.<br />Đang đi l&agrave;m cần bổ sung, chuẩn h&oacute;a kiến thức, tăng khả năng ho&agrave;n thiện v&agrave; thăng tiến trong nghề nghiệp<br />Sinh vi&ecirc;n chuy&ecirc;n ng&agrave;nh marketing, truyền th&ocirc;ng, mỹ thuật, thiết đồ họa, thời trang, họa vi&ecirc;n&hellip; cần kỹ năng sử dụng th&agrave;nh thạo phần mềm illustrator để&nbsp; phục vụ cho c&ocirc;ng việc v&agrave;&nbsp;học thiết kế...<br />Đang&nbsp;l&agrave;m việc trong lĩnh vực marketing, truyền th&ocirc;ng, kinh doanh,&hellip;<br />V&agrave; bất cứ ai y&ecirc;u th&iacute;ch c&ocirc;ng việc s&aacute;ng tạo v&agrave; thiết kế với phần mềm Adobe Illustrator!<br />H&atilde;y tham gia ngay kh&oacute;a học&nbsp;"Cẩm nang A-Z Illustrator cho Designer"&nbsp;tại Unica!<br />&nbsp; &nbsp;✔️ Kh&oacute;a học do giảng vi&ecirc;n Phạm Đức Huy trực tiếp hướng dẫn. Kh&oacute;a học sẽ gi&uacute;p bạn c&oacute; được những kiến thức v&agrave; kỹ năng nền tảng nhất để c&aacute;c bạn tiến gần hơn v&agrave;&nbsp;trở th&agrave;nh một Graphic Designer, Web Designer, Game UI UX Designer hoặc Motion Graphic Designer ngay tại nh&agrave;!<br />&nbsp; &nbsp;✔️ Kh&oacute;a học l&agrave; nền tảng để c&aacute;c bạn hiểu s&acirc;u hơn về bản chất c&ocirc;ng cụ của phần mềm Adobe Illustrator, từ đ&oacute; c&aacute;c bạn dễ d&agrave;ng xin được việc tại c&aacute;c c&ocirc;ng ty thiết kế lớn ở Việt Nam.<br />&nbsp; &nbsp;✔️ Kh&oacute;a học được soạn từ những dự &aacute;n thực tế với nhiều kh&aacute;ch h&agrave;ng, v&igrave; vậy t&iacute;nh ứng dụng của kh&oacute;a học lu&ocirc;n gắn liền với thị trường hiện tại. Học vi&ecirc;n c&oacute; thể ứng dụng ngay những kiến thức v&agrave; kỹ năng m&igrave;nh học được v&agrave;o trong c&ocirc;ng việc hiện tại của bản th&acirc;n.<br />Nội dung kh&oacute;a học cụ thể:<br />Phần 1: Giới thiệu v&agrave; hướng dẫn tạo c&aacute;c h&igrave;nh khối<br />Phần 2: C&aacute;c t&iacute;nh năng của Shapes v&agrave; b&agrave;i tập thực h&agrave;nh<br />Phần 3: Hướng dẫn c&aacute;c c&ocirc;ng cụ Drawing Tools, Pen Tool v&agrave; Brushes<br />Phần 4: Hướng dẫn c&aacute;c c&ocirc;ng cụ n&acirc;ng cao trong thiết kế đồ họa<br />Trở th&agrave;nh nh&agrave; thiết kế chuy&ecirc;n nghiệp với phần mềm Ai ngay h&ocirc;m nay với&nbsp;kh&oacute;a học&nbsp;"Cẩm nang A-Z Illustrator cho Designer"&nbsp;tại EduHub th&ocirc;i n&agrave;o!</p>`;
export default function General() {
  return (
    <div className="mt-[20px] flex gap-4">
      <div className="basis-[15%]">
        <p>Giới thiệu khoá học</p>
      </div>
      <div className="basis-[85%]">
        <div dangerouslySetInnerHTML={{ __html: txt }}></div>
      </div>
    </div>
  );
}
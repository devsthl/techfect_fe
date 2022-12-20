import React from 'react';
import parse from 'html-react-parser';

const Privacy = () => {
    const html = `<p>Việc truy cập Website connectup.smiletech.vn, sau đây gọi là Web của quý khách, đồng nghĩa với việc quý khách đồng ý với các Điều khoản và bảo mật của chúng tôi. Chúng tôi, có quyền thay đổi, chỉnh sửa, thêm hoặc lược bỏ bất kỳ điều khoản nào không trái với pháp luật Việt Nam. Các thay đổi có hiệu lực ngay khi được đăng trên trang web mà không cần thông báo trước. Và khi quý khách tiếp tục sử dụng trang web, sau khi các thay đổi về quy định và điều kiện được đăng tải, có nghĩa là quý khách chấp nhận với những thay đổi đó.</p>
    <div class="page-title category-title">
    <h2><span id="1_Huong_dan_su_dung_website" class="ez-toc-section"></span><strong>1 Hướng dẫn sử dụng website</strong></h2>
    </div>
    <div class="content-page rte">
    <div class="content-page rte">
    <p><strong>◊ </strong>Khi vào web của chúng tôi, người dùng tối thiểu phải 18 tuổi hoặc truy cập dưới sự giám sát của cha mẹ hay người giám hộ hợp pháp.</p>
    <p><strong>◊ </strong>Trang web này chỉ dùng để cung cấp thông tin sản phẩm, chúng tôi không phải nhà sản xuất nên những nhận xét hiển thị trên web là ý kiến cá nhân của khách hàng, không phải của chúng tôi.</p>
    <p><strong>◊ </strong>Nghiêm cấm sử dụng bất kỳ phần nào của trang web này với mục đích thương mại hoặc nhân danh bất kỳ đối tác thứ ba nào nếu không được chúng tôi cho phép bằng văn bản. Nếu vi phạm bất cứ điều nào trong đây, quý khách hàng sẽ chịu mọi phạt theo pháp luật hiện hành của nước Việt Nam</p>
    <p><strong>◊ </strong>Quý khách phải đăng ký tài khoản với thông tin xác thực về bản thân và phải cập nhật nếu có bất kỳ thay đổi nào. Mỗi người truy cập phải có trách nhiệm với mật khẩu, tài khoản và hoạt động của mình trên web.</p>
    <p><strong>◊ </strong>Quý khách phải thông báo ngay cho chúng tôi biết khi tài khoản bị truy cập trái phép. Chúng tôi không chịu bất kỳ trách nhiệm nào, dù trực tiếp hay gián tiếp, đối với những thiệt hại hoặc mất mát gây ra do quý khách không tuân thủ quy định.</p>
    <h2><span id="2_Chap_nhan_don_hang_va_gia_ca" class="ez-toc-section"></span><strong>2 Chấp nhận đơn hàng và giá cả</strong></h2>
    </div>
    </div>
    <p>Để việc giao dịch được diễn ra thuận tiện và tiết kiêm chi phí và thời gian cho quý khách hàng, quý khách vui lòng xem kỹ ” <strong>Hướng dẫn mua hàng</strong> ” của Công ty Anh Phú</p>
    <p><strong>◊ </strong>Chúng tôi sẽ thực hiện mua bán với quý khách hàng thông qua các phương tiện trao đổi như điện thoại, email và các mạng xã hội khác. Tuy nhiên, để tránh sự nhầm lẫn, chúng tôi khuyến nghị khách hàng nhận báo giá chi tiết trước khi đặt hàng.</p>
    <p><strong>◊ </strong>Chúng tôi sẽ giao hàng tại Công ty cổ phần Anh Phú, hoặc giao tới địa chỉ nhận của khách hàng trên <strong>Biên bản giao hàng</strong>, hoặc trên <strong>Báo giá chi tiết</strong>, hoặc theo thông báo khác đã được 2 bên thống nhất. Thông tin nhận hàng bắt buộc phải có địa chỉ và liên lạc của người nhận</p>
    </div>
    <div class="content-page rte">
    <p><strong>◊ </strong>Thông tin về sản phẩm và giá được thể hiện chính xác trên Báo giá chi tiết gửi tới quý khách hàng.</p>
    <p><strong>◊ </strong>Quý khách hàng thanh toán đầy đủ tiền hàng và Thuế giá trị gia tăng ( VAT ) – Đối với tất cả các mặt hàng chịu thuế theo quy định của nhà nước Việt Nam</p>
    <h2><span id="3_Thuong_hieu_va_ban_quyen" class="ez-toc-section"></span><strong>3 Thương hiệu và bản quyền</strong></h2>
    <p>Mọi quyền sở hữu trí tuệ (đã đăng ký hoặc chưa đăng ký), nội dung thông tin và tất cả các thiết kế, văn bản, đồ họa, phần mềm, hình ảnh, video, âm nhạc, âm thanh, biên dịch phần mềm, mã nguồn và phần mềm liên quan đến website connectup.smiletech.vn cơ bản đều là tài sản của chúng tôi.</p>
    <p>Toàn bộ nội dung của trang website connectup.smiletech.vn được bảo vệ bởi luật bản quyền của Việt Nam và các công ước quốc tế. Bản quyền đã được bảo lưu.</p>
    <h2><span id="4_Quyen_phap_ly" class="ez-toc-section"></span><strong>4 Quyền pháp lý</strong></h2>
    <p>Mọi điều kiện, điều khoản và nội dung của trang website này được điều chỉnh bởi luật pháp Việt Nam. Tòa án có thẩm quyền tại Việt Nam sẽ giải quyết bất kỳ tranh chấp nào phát sinh từ việc sử dụng trái phép trang website này.</p>
    <h2><span id="5_Bao_mat_thong_tin" class="ez-toc-section"></span><strong>5 Bảo mật thông tin</strong></h2>
    <p>Chúng tôi cam kết với khách hàng về việc bảo mật thông tin khách hàng theo đúng <strong>Điều khoản và bảo mật</strong> của công ty</p>
    <p><strong>»» </strong>Chỉ sử dụng thông tin của quý khách hàng cho việc thực hiện giao dịch với Công ty cổ phần thiết bị Anh Phú</p>
    <p><strong>»» </strong>Không bán, chuyển giao dữu liệu thông tin cá nhân cho bên thứ ba, khi chưa được sự cho phép của quý khách, trừ trường hợp phải cung cấp thông tin cá nhân thành viên cho cơ quan Nhà nước có thẩm quyền khi được yêu cầu.</p>
    <p><strong>»» </strong>Quý khách không được sử dụng bất kỳ chương trình, công cụ hay hình thức nào khác để can thiệp vào hệ thống hay làm thay đổi cấu trúc dữ liệu. Website này  cũng nghiêm cấm việc phát tán, truyền bá hay cổ vũ cho bất kỳ hoạt động nào nhằm can thiệp, phá hoại hay xâm nhập vào dữ liệu của hệ thống.</p>
    <p><strong>»» </strong>Mọi cá nhân hay tổ chức, lợi dụng Website này để chống phá, hoặc cố tình vi phạm hiến pháp và pháp luật Việt Nam, sẽ bị chúng tôi xóa tài khoản và cung cấp cho pháp luật nếu cần thiết, mà không cần thông báo.</p>
    <h2><span id="6_Thay_doi_huy_bo_giao_dich" class="ez-toc-section"></span><strong>6 Thay đổi, hủy bỏ giao dịch</strong></h2>
    <p>Trong mọi trường hợp, trước thời điểm thực hiện giao dịch ( được tính là thời điểm khách hàng thực hiện chuyển khoản, hoặc trước thời điểm giao nhận hàng ). Quý khách hàng có thể thay đổi hoặc hủy bỏ giao dịch bằng cách sau</p>
    <p><strong>»» </strong>Thông báo việc hủy giao dịch qua hotline <strong><a href="tel:0982069704">0982.069.704</a></strong> của chúng tôi</p>
    <p><strong>»» </strong>Thực hiện việc đổi trả hàng hóa theo đúng <strong>Chính sách bảo hành và đổi trả của Công ty Anh Phú</strong></p>`;
    return (
        <div style={{ padding: '40px 70px' }}>
            <div>{parse(html)}</div>
        </div>
    );
};

export default Privacy;

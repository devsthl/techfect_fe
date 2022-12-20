import React from 'react';
import parse from 'html-react-parser';

const Terms = () => {
    const html = `

<p><strong>1. TÓM TẮT VÀ TỔNG QUAN</strong></p>

<p><strong>1.1 Ứng dụng từ ConnectUp</strong></p>

<p>Các ứng dụng từ ConnectUp có thể là máy chủ ConnectUp hoặc ứng dụng Android hoặc iOS, được thiết kế và đảm bảo chính sách quyền riêng tư. Các thông tin được thu thập công khai (nếu có) chỉ để phục vụ cho quá trình tối ưu trải nghiệm người dùng. Bạn có thể xem xét và phê duyệt dữ liệu trước khi nó được gửi đi. Chúng tôi lưu trữ dữ liệu được tổng hợp và không lưu trữ trên mỗi người dùng, do đó, việc đánh cắp dữ liệu của chúng tôi không thể lấy bất kỳ thông tin nào về bất kỳ cài đặt cụ thể nào. Ứng dụng cập nhật, thời gian cài đặt và kênh mà nó muốn đến máy chủ cập nhật ConnectUp để nhận thông tin cập nhật. Chúng tôi lưu trữ thời gian cài đặt và phiên bản để theo dõi thống kê, tất cả dữ liệu khác sẽ bị loại bỏ ngay lập tức.</p>

<p><strong>1.2 Liên quan đến ứng dụng của bên thứ ba</strong>:</p>

<p>Chúng tôi không chịu bất kỳ trách nhiệm nào đối với các ứng dụng của bên thứ ba và dữ liệu họ lưu trữ hoặc gửi về người dùng. Chúng tôi có chính sách trong cửa hàng ứng dụng của mình về việc lạm dụng dữ liệu riêng tư và bất kỳ ứng dụng nào bị phát hiện vi phạm sẽ bị xóa và tác giả của ứng dụng đó bị cấm. Tuy nhiên, chúng tôi không có khả năng kiểm tra tất cả mã của tất cả các ứng dụng của bên thứ ba và do đó chúng tôi khuyên bạn nên cẩn thận khi cài đặt các ứng dụng của bên thứ ba.</p>

<p>Nếu bạn thấy bất kỳ vấn đề nào, vui lòng báo cáo về digitalization@ConnectUp.com</p>

<p>Bạn có thể xem chi tiết trong chính sách bảo mật hoàn chỉnh của chúng tôi bên dưới.</p>

<p>&nbsp;</p>

<p><strong>2. CHÍNH SÁCH QUYỀN RIÊNG TƯ CỦA ConnectUp</strong></p>

<p>Chính sách bảo mật của chúng tôi được viết để giúp bạn tìm hiểu cách ConnectUp xử lý "Thông tin nhận dạng cá nhân (" PII). PII là thông tin có thể được sử dụng riêng hoặc với thông tin khác để xác định, liên hệ hoặc định vị một người hoặc để xác định một cá nhân trong bối cảnh. Vui lòng đọc kỹ chính sách bảo mật của chúng tôi để hiểu rõ về cách chúng tôi thu thập, sử dụng, bảo vệ hoặc xử lý Thông tin Nhận dạng Cá nhân của bạn theo website của chúng tôi.</p>

<p>&nbsp;</p>

<p>&nbsp;</p>

<p><strong><em>Chúng tôi thu thập thông tin cá nhân nào từ những người truy cập blog, trang web hoặc ứng dụng của chúng tôi?</em></strong></p>

<p>Giống như hầu hết các trang web, ConnectUp Web/Mobile App thu thập thông tin không nhận dạng cá nhân thuộc loại mà các trình duyệt web và máy chủ thường cung cấp, chẳng hạn như loại trình duyệt, tùy chọn ngôn ngữ, trang web giới thiệu và ngày giờ của mỗi yêu cầu của khách truy cập. Mục đích của ConnectUp Web/Mobile App trong việc thu thập thông tin không nhận dạng cá nhân là để hiểu rõ hơn cách khách truy cập của ConnectUp Web/Mobile App sử dụng trang web của nó. Đôi khi, ConnectUp Web/Mobile App có thể phát hành thông tin tổng hợp không nhận dạng cá nhân, ví dụ: bằng cách xuất bản báo cáo về xu hướng sử dụng ứng dụng của mình.</p>

<p>ConnectUp Web/Mobile App cũng thu thập thông tin có khả năng nhận dạng cá nhân như địa chỉ Giao thức Internet (IP), tuy nhiên, ConnectUp Web/Mobile App không sử dụng thông tin đó để xác định khách truy cập và không tiết lộ thông tin đó cho các bên thứ ba trừ khi có nghĩa vụ pháp lý làm như vậy.</p>

<p>Chúng tôi tôn trọng chính sách không theo dõi.&nbsp; ConnectUp Web/Mobile App sẽ không theo dõi bất cứ điều gì nếu điều này được bật.</p>

<p>Khi đăng ký hoặc gửi biểu mẫu trên trang web của chúng tôi, nếu thích hợp, bạn có thể được yêu cầu nhập tên, địa chỉ email, số điện thoại hoặc các chi tiết khác của mình. Xem điều gì xảy ra với dữ liệu đó dưới đây.</p>

<p>&nbsp;</p>

<p><strong><em>Chúng tôi có tính phí sử dụng khi cung cấp tài khoản hay không ? Có bất kỳ phần nội dung nào trên các ứng dụng sẽ bị tính phí hay không?</em></strong></p>

<p>Chúng tôi chỉ cung cấp các tài khoản cho nội bộ công ty để sử dụng hệ thống, tất cả các tài khoản khi được tạo sẽ dựa trên email của mỗi cá nhân, và không tính phí đối với việc tạo tài khoản.</p>

<p>Không có bất kỳ nội dung nào trên ứng dụng bị tính phí, người dùng có thể tự do sử dụng mọi chức năng và nội dung trên ứng dụng khi được cấp quyền bởi admin.</p>

<p>&nbsp;</p>

<p><strong><em>Khi nào chúng tôi thu thập thông tin?</em></strong></p>

<p><em>Trên các trang web của chúng tôi:</em></p>

<p>Chúng tôi thu thập thông tin từ bạn khi bạn đăng ký nhận bản tin, điền vào biểu mẫu hoặc nhập thông tin trên trang web của chúng tôi.</p>

<p><em>Dữ liệu ConnectUp Cloud</em></p>

<p>Chúng tôi chỉ cung cấp các bài báo, khảo sát và thông tin khác. Chúng tôi không bao giờ hỏi số thẻ tín dụng hoặc dữ liệu tài chính khác.</p>

<p>Chúng tôi sử dụng phần mềm quét độc hại thường xuyên.</p>

<p>Thông tin cá nhân của bạn được chứa trong các mạng bảo mật và chỉ một số hạn chế người có quyền truy cập đặc biệt vào các hệ thống đó mới có thể truy cập được và được yêu cầu giữ bí mật thông tin. Ngoài ra, tất cả thông tin nhạy cảm mà bạn cung cấp đều được mã hóa thông qua công nghệ Lớp cổng bảo mật (SSL).</p>

<p>&nbsp;</p>

<p><strong><em>Chúng tôi có sử dụng "cookie" không?</em></strong></p>

<p>Có. Cookie là các tệp nhỏ mà một trang web hoặc nhà cung cấp dịch vụ của trang web đó chuyển đến ổ cứng máy tính của bạn thông qua trình duyệt Web của bạn (nếu bạn cho phép) cho phép trang web hoặc hệ thống của nhà cung cấp dịch vụ nhận ra trình duyệt của bạn và nắm bắt và ghi nhớ một số thông tin nhất định. Cookie được sử dụng để giúp chúng tôi hiểu các tùy chọn của bạn dựa trên hoạt động trang web trước đây hoặc hiện tại, điều này cho phép chúng tôi cung cấp cho bạn các dịch vụ được cải thiện. Chúng tôi cũng sử dụng cookie để giúp chúng tôi biên soạn dữ liệu tổng hợp về lưu lượng truy cập trang web và tương tác trang web để chúng tôi có thể cung cấp các công cụ và trải nghiệm trang web tốt hơn trong tương lai.</p>

<p>&nbsp;</p>

<p><strong><em>Chúng tôi sử dụng cookie để:</em></strong></p>

<p>Hiểu và lưu các tùy chọn của người dùng cho những lần sau.</p>

<p>Biên soạn dữ liệu tổng hợp về lưu lượng truy cập trang web và các tương tác với trang web để cung cấp các công cụ và trải nghiệm trang web tốt hơn trong tương lai. Chúng tôi không sử dụng các dịch vụ của bên thứ ba (như Google Analytics) để thay mặt chúng tôi theo dõi thông tin này.</p>

<p>Bạn có thể chọn để máy tính cảnh báo mỗi khi cookie muốn gửi đi hoặc bạn có thể chọn tắt tất cả cookie. Bạn thực hiện việc này thông qua cài đặt trình duyệt của mình (như Internet Explorer hoặc firefox). Mỗi trình duyệt có một chút khác biệt, vì vậy hãy xem mục Trợ giúp của trình duyệt để tìm hiểu cách sửa đổi cài đặt cookie chính xác.</p>

<p>Nếu bạn tắt cookie, một số tính năng nhỏ có thể bị tắt.</p>

<p>&nbsp;</p>

<p><strong><em>Chúng tôi sử dụng location để:</em></strong></p>

<p>Các ứng dụng của ConnectUp có sử dụng quyền truy cập vào vị trí người dùng để phục vụ một số tính năng của ứng dụng. Việc thu thập vị trí địa lý của bạn có thể diễn ra ở nền ngay cả khi bạn không sử dụng dịch vụ.</p>

<p>Các thông tin và chức năng sử dụng vị trí người dùng sẽ được thông báo chi tiết đến người dùng trong từng ứng dụng. Việc truy cập và thu thập dữ liệu thông tin người dùng chỉ diễn ra khi người dùng cho phép. Nếu người dùng từ chối cho phép chúng tôi thu thập vị trí thì ứng dụng sẽ không thu thập thông tin này, tuy nhiên một vài tính năng sẽ gặp hạn chế hoặc không thể sử dụng được.</p>

<p>Chúng tôi chỉ sử dụng quyền truy cập vị trí người dùng trong ứng dụng và không chia sẻ bất kỳ thông tin người dùng qua phần mềm thứ 3.</p>

<p>&nbsp;</p>

<p><strong><em>Công bố của bên thứ ba</em></strong></p>

<p>Chúng tôi không bán, trao đổi hoặc chuyển giao cho các bên ngoài thông tin nhận dạng cá nhân của bạn trừ khi chúng tôi thông báp cho người dùng trước. Điều này không bao gồm các đối tác lưu trữ trang web và các bên khác hỗ trợ chúng tôi điều hành trang web của chúng tôi, kinh doanh hoặc phục vụ người dùng của chúng tôi, miễn là các bên đó đồng ý giữ bí mật thông tin này. Chúng tôi cũng có thể tiết lộ thông tin khi việc phát hành phù hợp để tuân thủ luật pháp, thực thi các chính sách trang web của chúng tôi hoặc bảo vệ quyền, tài sản hoặc sự an toàn của chúng tôi hoặc những người khác.</p>

<p>Tuy nhiên, thông tin khách truy cập không nhận dạng cá nhân có thể được cung cấp cho các bên khác để tiếp thị, quảng cáo hoặc các mục đích sử dụng khác. Hãy nghĩ đến số liệu thống kê tổng hợp (số lượng khách truy cập trang web trong một tháng cụ thể) hoặc xu hướng ("chúng tôi nhận thấy sự gia tăng số lượng khách truy cập từ châu Á".</p>

<p>&nbsp;</p>

<p><strong><em>Liên kết từ bên thứ ba</em></strong></p>

<p>Chúng tôi không bao gồm hoặc cung cấp các sản phẩm hoặc dịch vụ của bên thứ ba trên trang web của chúng tôi.</p>

<p><strong><em>Theo Điều 26, Luật An ninh mạng Việt Nam 2018 và Đạo luật Bảo vệ Quyền riêng tư Trực tuyến của California (CalOPPA) từ nhà cung cấp dịch vụ Cloud, chúng tôi đồng ý với những điều sau:</em></strong></p>

<p>Người dùng có thể truy cập trang web của chúng tôi một cách ẩn danh.</p>

<p>Khi chính sách bảo mật này được tạo, chúng tôi sẽ thêm một liên kết đến nó trên trang chủ của chúng tôi hoặc tối thiểu là trên trang quan trọng đầu tiên sau khi vào trang web của chúng tôi.</p>

<p>Liên kết Chính sách Bảo mật của chúng tôi bao gồm từ "Quyền riêng tư" và có thể dễ dàng tìm thấy trên trang được chỉ định ở trên.</p>

<p>Người dùng sẽ được thông báo về bất kỳ thay đổi chính sách bảo mật nào trên Trang Chính sách Bảo mật của chúng tôi.</p>

<p>Người dùng có thể thay đổi thông tin cá nhân của họ:</p>

<ul>
	<li>Bằng cách gửi email cho chúng tôi</li>
	<li>Bằng cách gọi cho chúng tôi</li>
</ul>

<p>&nbsp;</p>

<p><strong><em>Làm thế nào để trang web của chúng tôi xử lý không theo dõi tín hiệu?</em></strong></p>

<p>Chúng tôi tôn trọng không theo dõi các tín hiệu và không theo dõi, cài đặt cookie hoặc sử dụng quảng cáo khi có cơ chế Không theo dõi (DNT) trình duyệt.</p>

<p>Trang web của chúng tôi có cho phép theo dõi hành vi của bên thứ ba không?</p>

<p>Chúng tôi không cho phép hoặc sử dụng theo dõi hành vi của bên thứ ba. Các tính năng trang web của chúng tôi không có quảng cáo hoặc công cụ theo dõi của bên thứ ba.</p>

<p>&nbsp;</p>

<p><strong><em>Thực hiện Công bằng Thông tin </em></strong></p>

<p>Các Nguyên tắc thực hiện Công bằng Thông tin tạo thành xương sống của luật quyền riêng tư ở Hoa Kỳ và các khái niệm mà chúng bao gồm đã đóng một vai trò quan trọng trong việc phát triển các luật bảo vệ dữ liệu trên toàn cầu. Việc hiểu các Nguyên tắc Thực hành Công bằng Thông tin và cách thức thực hiện các Nguyên tắc này là rất quan trọng để tuân thủ các luật bảo mật khác nhau nhằm bảo vệ thông tin cá nhân.</p>

<p>Để phù hợp với Thực tiễn Công bằng Thông tin, nếu xảy ra vi phạm dữ liệu, chúng tôi sẽ thông báo cho người dùng qua email trong vòng 7 ngày làm việc.</p>

<p>Chúng tôi cũng đồng ý với Nguyên tắc khắc phục cá nhân, yêu cầu các cá nhân có quyền làm theo các quyền có hiệu lực pháp luật đối với những người thu thập và xử lý dữ liệu không tuân thủ luật pháp. Nguyên tắc này không chỉ yêu cầu các cá nhân có quyền thực thi đối với người dùng dữ liệu mà còn yêu cầu các cá nhân phải nhờ đến tòa án hoặc cơ quan chính phủ để điều tra và / hoặc truy tố hành vi không tuân thủ của người xử lý dữ liệu.</p>

<p>&nbsp;</p>

<p><strong>3. LIÊN HỆ</strong></p>

<p>Nếu có bất kỳ câu hỏi nào liên quan đến chính sách bảo mật này, bạn có thể liên hệ với chúng tôi qua email: digitalization@ConnectUp.com</p>

<p>&nbsp;</p>

<p><strong>4. CÁC THAY ĐỔI KHÁC VỀ CHÍNH SÁCH QUYỀN RIÊNG TƯ</strong></p>

<p>Mặc dù hầu hết các thay đổi có thể là nhỏ, ConnectUp có thể thay đổi Chính sách quyền riêng tư của mình theo thời gian và theo quyết định riêng của chúng tôi. Chúng tôi khuyến khích khách truy cập thường xuyên kiểm tra trang này để biết bất kỳ thay đổi nào đối với Chính sách Bảo mật của chúng tôi. Việc bạn tiếp tục sử dụng trang web này sau bất kỳ thay đổi nào trong Chính sách Bảo mật này sẽ cấu thành việc bạn chấp nhận thay đổi đó.</p>`;

    return (
        <div
            style={{
                padding: '40px 70px',
            }}
        >
            <div>{parse(html)}</div>
        </div>
    );
};

export default Terms;

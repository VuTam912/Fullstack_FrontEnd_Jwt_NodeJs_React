# JSON WEB TOKEN : for backend

JWT là viết tắt của JSON Web Token, là một tiêu chuẩn mở (RFC 7519) để xác minh thông tin an toàn giữa các bên Client-Server dưới dạng JSON object. Thông tin này có thể được xác minh và tin cậy vì nó được ký điện tử - digitally signed.

JWT được sử dụng rộng rãi trong các ứng dụng web để xác thực người dùng, trao đổi thông tin giữa các microservices và các ứng dụng khác.

## Cấu trúc của JWT

JWT là một chuỗi gồm ba phần, được ngăn cách bởi dấu chấm (.):

- Header: Phần này chứa thông tin về loại token và thuật toán được sử dụng để ký token.
- Payload: Phần này chứa thông tin về người dùng hoặc dữ liệu cần được xác minh.
- Signature: Phần này được sử dụng để xác minh tính xác thực của token.

## Cách thức hoạt động của JWT

Khi người dùng đăng nhập thành công, server sẽ tạo một token JWT và gửi cho người dùng. Token này sẽ được lưu trữ trong trình duyệt của người dùng và được gửi kèm theo mỗi yêu cầu đến server.

Khi server nhận được yêu cầu, nó sẽ xác minh tính xác thực của token bằng cách giải mã signature và so sánh với khóa bí mật. Nếu token hợp lệ, server sẽ cho phép yêu cầu tiếp tục.

## Ưu điểm của JWT

- Nhỏ gọn: JWT là một chuỗi nhỏ gọn, dễ dàng truyền tải qua các request HTTP.
- Dễ sử dụng: JWT có thể được sử dụng trong nhiều ngôn ngữ lập trình và framework khác nhau.
- An toàn: JWT được ký điện tử để đảm bảo tính xác thực và tính toàn vẹn của dữ liệu.

## Nhược điểm của JWT

Không thể ghi nhớ trạng thái: JWT không lưu trữ trạng thái của người dùng, vì vậy server cần phải lưu trữ trạng thái này ở phía mình.
Có thể bị tấn công replay: Nếu kẻ tấn công có thể lấy được token của người dùng, họ có thể sử dụng token đó để thực hiện các yêu cầu trái phép.

## Ứng dụng của JWT

JWT được sử dụng rộng rãi trong các ứng dụng web để xác thực người dùng, trao đổi thông tin giữa các microservices và các ứng dụng khác.

- Xác thực người dùng: JWT thường được sử dụng để xác thực người dùng trong các ứng dụng web. Khi người dùng đăng nhập thành công, server sẽ tạo một token JWT và gửi cho người dùng. Token này sẽ được lưu trữ trong trình duyệt của người dùng và được gửi kèm theo mỗi yêu cầu đến server.
- Trao đổi thông tin giữa các microservices: JWT có thể được sử dụng để trao đổi thông tin giữa các microservices. Ví dụ, một microservice có thể sử dụng token JWT để truy cập dữ liệu từ một microservice khác.
- Các ứng dụng khác: JWT cũng có thể được sử dụng trong các ứng dụng khác, chẳng hạn như:
  - Xác thực API
  - Theo dõi trạng thái người dùng
  - Truy cập trang web không cần đăng nhập

## Kết luận

JWT là một tiêu chuẩn mở được sử dụng rộng rãi trong các ứng dụng web để xác minh thông tin an toàn giữa các bên Client-Server. JWT có nhiều ưu điểm, bao gồm nhỏ gọn, dễ sử dụng và an toàn.

## library: install on backend

npm install --save-exact jsonwebtoken@8.5.1 cookie-parser@1.4.6

## lưu ý: nên dùng cả cookie và localStorage = để bảo mật

## Khác:

- fix scollbars
  npm install --save-exact react-custom-scrollbars@4.2.1

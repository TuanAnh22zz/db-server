// api/server.js
const jsonServer = require('json-server');
const path = require('path');
const fs = require('fs');

// Đường dẫn tới file db.json trong thư mục gốc
const dbFilePath = path.join(process.cwd(), 'db.json');

let dbData;
try {
    const fileContents = fs.readFileSync(dbFilePath, 'utf-8');
    dbData = JSON.parse(fileContents);
} catch (err) {
    console.error('LỖI: Không thể đọc hoặc parse db.json:', err);
    // Dữ liệu mặc định nếu db.json bị thiếu hoặc lỗi
    dbData = { _error_loading_db: true, posts: [], comments: [] };
}

const server = jsonServer.create();
// Quan trọng: Sử dụng một bản sao sâu (deep copy) của dbData
const router = jsonServer.router(JSON.parse(JSON.stringify(dbData)));
const middlewares = jsonServer.defaults();

server.use(middlewares);

// Khi request đến /api/server/posts, Vercel sẽ gọi function này.
// req.url bên trong function này sẽ là /posts (phần còn lại sau /api/server).
// Điều này hoàn toàn phù hợp với cách json-server mong đợi.
server.use(router);

// Xuất handler cho Vercel
module.exports = (req, res) => {
    server(req, res);
};
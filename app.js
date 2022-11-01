require('dotenv').config();
/* đọc biến môi trường */
const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const userRouter = require('./user/userRouter/userRouter');
const wordRouter = require('./word/wordRouter/wordRoute');
const adminRouter = require('./admin/adminRouter/adminRouter');

app.use(cors());
/*  hỗ trợ xác thực nguồn gốc */ 
app.use(express.urlencoded({extended: false}));
/* là một phương thức được tích hợp sẵn để nhận ra Đối tượng Yêu cầu đến dưới dạng chuỗi hoặc mảng */ 
app.use(express.json());
/* phân tích yêu cầu gửi đến dưới dạng json */ 
app.use('/user', userRouter);

app.use('/word', wordRouter);

app.use('/admin', adminRouter);
app.listen(4500);
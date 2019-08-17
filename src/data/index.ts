// import posts from './posts.json';
// import review from './review.json';


let posts = [{
  "userId": 1,
  "id": "1",
  "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
  "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
  "price": 190,
  "currency": "RMB",
  "img": ["1.jpg", "2.jpg"]
},
{
  "userId": 1,
  "id": "2",
  "title": "qui est esse",
  "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
  "price": 290,
  "currency": "dollar",
  "img": ["3.jpg"]
}
]
let review = [{
  "postId": 1,
  "reviewTitle": "review title 1",
  "reviewText": "hello world reivew text1",
  "star": 5
},
{
  "postId": 1,
  "reviewTitle": "review title 1",
  "reviewText": "hello world reivew text2",
  "star": 5
},
{
  "postId": 1,
  "reviewTitle": "review title 1",
  "reviewText": "hello world reivew text3",
  "star": 5
},
{
  "postId": 2,
  "reviewTitle": "review title 1",
  "reviewText": "hello world reivew text1",
  "star": 5
},
{
  "postId": 2,
  "reviewTitle": "review title 1",
  "reviewText": "hello world reivew text2",
  "star": 5
},
{
  "postId": 2,
  "reviewTitle": "review title 1",
  "reviewText": "hello world reivew text3",
  "star": 5
},
{
  "postId": 2,
  "reviewTitle": "review title 1",
  "reviewText": "hello world reivew text4",
  "star": 5
}
]

// 目前是模拟的数据
export class DataStore {
  static posts = posts;
  static review = review;
}


// // 在线数据
// import axios from 'axios'
// let posts: any, review: any
// axios('https://www.easy-mock.com/mock/5d576a460108fe096e555893/posts').then(res => {
//   posts = res.data
// })
// axios('https://www.easy-mock.com/mock/5d576a460108fe096e555893/comments').then(res => {
//   review = res.data
// })
// export class DataStore {
//   static posts = posts;
//   static review = review;
// }

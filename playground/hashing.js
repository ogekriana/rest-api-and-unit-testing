const {SHA256} = require('crypto-js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

// playground using crypto-js
// let message = "hello there lalala"
// let hash = SHA256(message).toString()

// console.log(message)
// console.log(hash)

// let data = {
// 	id: 4
// }
// let token = {
// 	data,
// 	hash: SHA256(JSON.stringify(data) + 'kegoanair123').toString()
// }

// token.data.id = 189
// let resultHash = SHA256(JSON.stringify(token.data) + 'kegoanair123').toString()

// if(resultHash === token.hash){
// 	console.log("data not change")
// }else{
// 	console.log("data change")
// }

// let data = {
// 	id: 5
// }
// let token = jwt.sign(data, 'kegoanair123')
// console.log(token)
// let decode = jwt.verify(token, 'kegoanair123')
// console.log(decode)

// bcrypt
let password = 'kegoanair123'

bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(password, salt, (err, hash) => {
  	console.log("hash")
    console.log(hash);
  });
});

let hashedPassword = '$2a$10$3lZoE1sr6AazRU0JQbyYc.1ous2glatOCLXJHmGXdAX9PuglYh5mu'
bcrypt.compare('kegoanair123', hashedPassword, (err, res) => {
	console.log("res")
	console.log("result: ",res) // return true or false
})
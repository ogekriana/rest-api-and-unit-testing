const {SHA256} = require('crypto-js')
const jwt = require('jsonwebtoken')

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

let data = {
	id: 5
}
let token = jwt.sign(data, 'kegoanair123')
console.log(token)
let decode = jwt.verify(token, 'kegoanair123')
console.log(decode)
# LocalArtCo - server
Developed of our final proyect at IronHack. It's a MERN Stack application, check the frontend repository [here](https://github.com/eoGimenez/localartCo-client).

## About
We are Lucas, Lucia and Eugenio we met each other at the web development Bootcamp of IronHack. 

 Local Art Co. connects artisans with physical stores.  Artisans leave their products in consignment, set the price, and stores sell the products and earn a percentage. We guarantee a fair deal for all parties involved.

![Project Image](https://res.cloudinary.com/dxk04cijr/image/upload/v1678989961/localartco/navbarlogo_bjkqoq.png "Project Image")

## Deployment
You can check the app fully deployed [here](#localartco.netlify.app). If you wish to view the API deployment instead, check [here](#fairtrade.fly.dev).

## Work structure
We decide to use [Trello](https://trello.com/b/pWR9rkVU/app) to organize the workflow.

## Installation guide
- Fork this repo
- Clone this repo 

```shell
$ cd fair-trade-server
$ npm install
$ npm start
```

## Models
#### User.model.js
```js
const userSchema = new Schema({
  email: { type: String, unique: true, required: true, trim: true, },
  password: { type: String, required: true },
  commercename: { type: String, required: true },
  name: { type: String, required: true },
  surname: { type: String, required: true },
  role: { type: String, enum:["Artisan", "Commerce", "Admin"], required: true},
  cif: {type: String, required: true, unique: true},
  avatar: {type:String, default:"https://res.cloudinary.com/dlkwvyopo/image/upload/v1678864779/emptyavatar_wnfas4.png"},
  aboutme: String,
  location: String,
  posts:[ {type: Schema.Types.ObjectId, ref:"post" }]
};
timestamps: true,});
```
#### Post.model.js
```js
const postSchema = new Schema({
   title: { type: String, required: true},
   contract:{ type: String,  enum:[" Total batch in concession", "Percentages to arrenge", "Would like to sale by unit" ], required: true },
   image:{ type: String, required: true },
   description:{ type: String, required: true },
   bach:{ type: Number, required: true },
   price:{ type: Number, required: true },
   category:{ enum: ["Natural Cosmetics", "Home Deco", "Miscellaneous", "Fabric & Fashion" ],    require: true },
   available:{ type: Boolean, require: true },
   author:{type: Schema.Types.ObjectId, ref:"User"},
   },{timestamps: true,});
```



## User roles
| Role  | Capabilities                                                                                                                               | Property       |
| :---: | ------------------------------------------------------------------------------------------------------------------------------------------ | -------------- |
| Artisan  | Can login/logout, read all the projectsm, create and edit a new post, and delete a post.                                                | role: Artisan|
| Commerce | Can login/logout. Can read. Can read all user's post and contact them.                                                                  | role: Commerce|

## API Reference
| Method | Endpoint                    | Require                                             | Response (200)                                                        | Action                                                                    |
| :----: | --------------------------- | --------------------------------------------------- |---------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| POST| /signup | const {name, surname, commercename, email, password, passwordRe,  role, cif } = req.body | json({user: user}) | Registers the user in the database.|
| POST| /login | const {email, password  } = req.body | json({authToken: authToken}) | Log in an user already registered.|
| GET| /verify | json (req.payload) |
| GET| / | User.Find() | json ({ json.response })|
| GET| /:userId| const { userId } = req.params | User.FindById() | json ({ json.result})|
| PUT| /:id/| const { id } = req.params|{email,password,passwordRe,name,surname ,cif,avatar,} = req.body | User.FindByIdAndUpdate() | json ({ updatedProfile }) | Edits the User's profile|
| GET| /| Post.find() | json ({ posts })| Return a post's list|
| POST| /| const {contract, description, image, bach, price, category, available} = req=body | json ({ post:post }) | Adds a new Post|
| GET| /:postId| const { postId } = req.params | Navigate to the selected post|
| PUT| /:postId| const { postId, {post} } =req.params/req.body | Edits the selected post|
| DELETE| /:postId| const { postId } = req.params | Delete a post|

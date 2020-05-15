import { db, Firemodel } from '../firebase/index'

export class Post extends Firemodel {
  constructor(id) {
    super(id)
  }

  get collection() {
    return db().collection('posts')
  }
}

export default Post

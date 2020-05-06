import { db, Firemodel } from '../firebase/index'

/*
|---------------------------------------------------------------------
| Model example create by `firelayer make:model Post`
|---------------------------------------------------------------------
*/
export class Post extends Firemodel {
  constructor(id) {
    super(id)
  }

  get path() {
    // REPLACE _ with correct path to collection
    return db().collection('_')
  }
}

export default Post

# data-adapter


[![travis](https://travis-ci.org/alexandre-garrec/data-adapter.svg)](https://travis-ci.org/alexandre-garrec/data-adapter)

Run
---

    $ npm start
    $ npm test
    $ npm run build


API
---

**ArrayOf**
*Parameters:*

 1. Model
 2. array of data

**Model**
*Parameters:*

 1. pluralize name
 2. adapter function ( current, parrent )



Demo
---



	import data from './data'
	import Adapter, { ArrayOf, Model } from 'adapter'
	
	const User = new Model('users' , (user) => ({
	  id: user.id,
	  username: user.name,
	  comments : new ArrayOf(Comment, user.comments)
	}))
	
	
	const Comment = new Model('comments', (comment, user) => ({
	  id: comment.id,
	  userId: user.id,
	  text: comment.content
	}))
	
	Adapter(data, User)

Data 
---

before

	[
	  {
	    id: 1,
	    name: 'toto',
	    comments : [
	      {
	        id: 31,
	        postId: 1,
	        content : 'lorem ipsum elms'
	      },
	      {
	        id: 39,
	        postId: 1,
	        content : 'dare ipsum remu'
	      },
	    ]
	  },
	  {
	    id: 2,
	    name: 'tata',
	    comments : [ 
	      {
	        id: 34,
	        postId: 4,
	        content : 'lorem ipsum elms'
	      },
	      {
	        id: 32,
	        postId: 15,
	        content : 'dare ipsum remu'
	      },
	    ]
	  }
	]

After 

	{ 
	  users: {
	    1: {
	      id: 1,
	      username: 'toto',
	      comments : [31, 39] 
	    },
	    2: {
	      id: 2,
	      username: 'tata',
	      comments : [34, 32] 
	    } 
	  },
	  comments: {
	    31: { 
	      id: 31,
	      userId: 1,
	      text: 'lorem ipsum elms' 
	    },
	    39: { 
	      id: 39,
	      userId: 1,
	      text: 'dare ipsum remu' 
	    },
	    34: { 
	      id: 34,
	      serId: 2,
	      text: 'lorem ipsum elms' 
	    },
	    32: { 
	      id: 32,
	      userId: 2,
	      text: 'dare ipsum remu' 
	    }
	  }
	}
# data-adapter


[![travis](https://travis-ci.org/alexandre-garrec/data-adapter.svg)](https://travis-ci.org/alexandre-garrec/data-adapter)

Run
---

    $ npm start
    $ npm test
    $ npm run build


API
---

		import Adapter, { register } from '../src/adapter'

		register((user) => ({
			id: user.id,
			username: user.name,
		}), 'user')
		
		Adapter([{ id: 1, name: 'toto'}], 'user')
		
retun 

		{
			user : [
				{
					id: 1,
					username: 'toto'
				}
			]
		}
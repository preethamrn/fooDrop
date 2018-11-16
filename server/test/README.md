\section{Backend Testing}
There are a few test cases to test the user endpoint on the backend of our web application. Notably, we tested the endpoints ``/user/create", ``/user/get\_user", ``/user/get\_users" and ``/user/update". We used Mocha as the testing framework for Node.js programs. In addition, we used the modules chai and chai-http. The tests can be found at \newline http://github.com/preethamrn/fooDrop/server/test.

\subsection{/user/create}
We first created a temporary user with some random values. We then used chai to make an http post request to that endpoint. After that, we use the send function to send the temporary user in the request body so that express can connect to the database and create a user using the information in the request body. The expected return value from the backend is a status code of 200 and the response body should be an object. 

\subsection{/user/get\_user}
We created a tmp\_user with some values. We then call tmp\_user.save() to save that user on MongoDB. And now, we formulated a get request with the tmp\_user.id as an argument in the query string. Our backend should be able to catch that endpoint and on success our response should have a 200 status code. In addition, the body should be an object and the body should have properties `user', `status', `priceLow', `priceHigh', `\_id', `name' and `transactions'. 

\subsection{/user/get\_users}
We simply made a get quest to that endpoint and we didn't need to pass in any arguments in the request body or the query string. Mocha then tests the response and the response body should have a status code of 200 and we checked that the posts array in the response body was actually an array.

\subsection{/user/update}
We first made a tmp\_user with some values. We then made a put request to that endpoint and we had arguments in the request body that we want updated for that tmp\_user. We then checked the response body sent by express and node had the properties that we added in the put request. 
\newline\newline
To be more precise, we created a tmp\_user with a name of andrew, a priceLow of 3, a priceHigh of 10, a radius of 5 and peanut and seafood as his dietary restrictions. We then saved andrew to MongoDB by calling tmp\_user.save(). We used chai to now make an http post request. We passed arguments to the request body. We passed in andrew's user\_id so that the backend can look him up. The other argument is a value object that looks like this values: {``facebookID": ``FACEBOOK SECURE ID", ``paypalID": ``PAYPAL secure id", ``restrictions": [``chocolate", ``dairy"]}. The point of this is for the backend to either add new properties or update new properties based on the values object that we passed in. Mocha now checks the response sent by express and node.js. On success, response should have a status code of 200, the response body should be an object, the response body's user property should have a restrictions array, the response body's user's property should have an \_id field, priceLow field, priceHigh field, radius field, transactions field, facebookID field and paypalID field.\\\\

\subsection{/dish/new\_dish}
The following endpoint takes dish related parameters such as the name, restrictions, price, seller id etc. and creates a new post of this dish in the post schema. The endpoint returns a status code and a JSON object that contains the status(pass/fail) of the request and the newly created post object. A successful request returns with a status code of 200, while an unsuccessful request returns with a status code of 400.

\subsection{/dish/get\_dishes\_by\_radius}
The following endpoint requires latitude, longitude, radius and optionally dietary restrictions and ingredients. It returns all the listings that match the ingredients and the dietary restrictions criteria that are available within the user supplied radius and location. The endpoint returns a status code and a JSON object which contains the pass/fail status of the operation as well as the a list of the dish listings available in the user's location. 

\subsection{/dish/transaction}
The following endpoint is used to facilitate the "buy" functionality in the frontend. It represents a transaction taking place between a buyer and a seller of a dish. It takes as parameter the userId of the buyer, the userId of the seller and the postId of the dish over which the transaction is taking place. The transaction is added to the transaction list of both the buyer and the seller. The quantity purchased is subtracted from the associated post. If the quantity field of the post object becomes 0, the post object is deleted. If the the request to the endpoint is successful it returns a return code of 200. If the request fails for some reason, it returns with a status code of 40x. 

\subsection{/auth/facebook}
To test this endpoint we first used Facebook to generate fake users and give their access token. A post request was sent to the endpoint with the generated access token and assertions were made to check if a valid Facebook id and a json web token was returned. An invalid access token was also sent to test for failure case. An assertion was made to check for a status of 500. Facebook does not allow for permanent access tokens, so an access token cannot be hard coded and sometimes the test fails. However, we realize that this would pose a serious security risk, so we set it so that tokens last for 7 days. 

\subsection{/auth/validateUser}
To test this endpoint we send a get request with a valid facebookID and a valid json web token in the query string. We then make an assertion to check if the web token is valid and if the user's information is returned. Two more tests are made to check for failure case. One to test checks if the endpoint returns an auth value of false if an invalid Facebook ID is received and the other test checks if an auth value of false is received if an invalide json web token is sent.
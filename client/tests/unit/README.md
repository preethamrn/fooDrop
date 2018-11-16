\section{Frontend Testing}
The frontend Listings and Search pages are tested in various scenarios using Jest and Vue-test-utils. These frameworks allow us to create mock objects and mock function calls so we can run unit tests without running an actual server for the backend. The tests can be found at http://github.com/preethamrn/fooDrop/client/tests/unit
\subsection{Setup}
The setup can be found at http://github.com/preethamrn/fooDrop/client/\_\_mocks\_\_. The setup creates mock objects for Axios to act like the backend, and navigator.geolocation, localStorage, console, and alert to act like a browser.

\subsection{ListingsBase.vue}
\paragraph{Regular request}\\
A new ListingsBase component is shallowMounted (meaning none of the subcomponents are rendered). After mounting, by default, we expect to call navigator.geolocation.getCurrentPosition one time and the value of the searched prop to be false.

\paragraph{Request when routed from SearchDishesBase}\\
A new ListingsBase component is shallowMounted with some propsData. This is expected when we get routed from SearchDishesBase which send props to the server. In this case, we expect the call navigator.geolocation.\\getCurrentPosition one time and the value of the searched prop to be true. Also, when the DOM updates on nextTick, we expect the component to contain a listingsdishitem-stub element. We expect a stub because we are using a shallowMount.

\subsection{SearchDishBase.vue}
\paragraph{Clear search parameters}\\
A new SearchDishBase component is mounted with a Vuex store containing default search settings. We change the value of the search radius to 10. When we press the clear button, we expect the search radius to be reset to it's original value based on the Vuex store (in this case, 7).

\paragraph{Invalid search parameters}\\
A new SearchDishBase component is mounted with a Vuex store containing default search settings. We change the value of the search price range to [0, 1000]. Since the form validater expects the maximum range to be [0, 100], it will automatically reset the value of the price range. We expect the search price range to therefore be set to [0, 100].

\paragraph{GET search results}\\
We will use this test case to describe how Jest and Vue-test-utils work. mockAxios is an object that will be used to mock any calls to the actual axios node\_module. We have described this mock object in setup. We then update the implementation of mockAxios.create to return our expected result from the GET request.\\
We also create a mock object for the localVue instance which we add vue-router to so we can redirect to the appropriate route after getting search results. We add the /search and / routes since those are the only ones that this test relies on.\\
Finally, we create a mock object for localStorage which is required to by the header to get an authToken to validate our login.\\
This concludes the setup for our component. We now mount a new SearchDishBase component with the Vuex store, router, and localVue instances and store this object in wrapper. When we press the search button (which is found using the query selector button.search and triggered with `click'), we expect the mockAxios.create method to be called one time and the current route to be / which designates that we've been redirected to the Listings page with the search results.

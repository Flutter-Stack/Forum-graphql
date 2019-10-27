# Write your query or mutation here
mutation createUser( $name: String!,
  $username: String!, $password: String!,
  $avatarUrl: String!, $email: String! ) {
  createUser(
    name: $name,
    username: $username,
    password: $password,
    avatarUrl: $avatarUrl,
  	email: $email
   ) {
   	id
    name
  }
}

query authenticate($email: String, $password: String!) {
  authenticate(email: $email, password: $password) {
    token
  }
}

mutation createCategory( $title: String!) {
  createCategory(
    title: $title
   ) {
   	id
    title
    slug
  }
}

query getCategory($id: ID!) {
  category(id: $id) {
  id
  title
  threads {
      id
    }
  }
}

mutation createThread(
    $title: String!,
    $category: ID!,
    $body: String!) {
  createThread(
    title: $title,
    category: $category,
    body: $body) {
     id
     title
  }
}

query getThreads($id : ID! ) {
  category(id: $id ) {
     threads {
      id
      title
    }
  }

}

mutation createPost($body: String!, $threadId: ID! ) {
  createPost(body: $body, threadId: $threadId){
    body
  }
}

query getPosts($id: ID!) {
  thread(id: $id) {
  id
  posts {
    id
    body
    createdAt
    author {
      id
      name
    }
   }
	}
}


query categories($page: Int!, $perPage: Int!) {
  categories(pagination: { page: $page, perPage: $perPage }) {
  entries {
    id
    title
    slug
    createdAt
  }
  perPage
  page
  totalEntries
  totalPages
  }
}




##################################################################################################
{
  "authorization" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkYjQ2YjE1ZjhhMzIzMDRmMDI2NGM5MSIsImlhdCI6MTU3MjE5MzU4MSwiZXhwIjoxNTcyMjA1NTgxfQ.MI3oRJW5AROswzNjdzKW9hxp7G9WotTQyJdfuP0BWcE"
}


##########################################################################################


// {
//   "name": "suresh",
//   "username": "suresh-1",
//   "password": "pass",
//   "email": "kumara.suresh25@gmail.com",
//   "avatarUrl": "adfasfdafdadfasdfsafd"
// }
//
//
// {
//   "email": "kumara.suresh25@gmail.com",
//   "password": "pass"
// }


{
  "page": 1,
  "perPage": 2
}

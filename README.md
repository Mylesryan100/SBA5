# SBA5

1. Project Description

This web application allows users to create, edit, update, and delete posts dynamically while each post is saved automatically and has the ability to retrive posts using LocalStorage

2. How to run the app

To run this app all you would simply need to do is either download or copy the project folder for the personal blog, open the actual folder, then right on the index.html and open the live server. This will launch the app through your browser.

3. Reflection on Development

Some challenges I faced during this development process was trying to keep the data persistent across page reloads. To solve this problem I implemented and used JSON.stringify()` and JSON.parse() on localStorage to store and retrieve the posts array. Another challenged I faced in this development process was trying to manage both the create and edit states on the same form. I resolved this issue by using an "editingId" variable which dynamically changes the button text and behavior and also tracks whether a user edits an existing post or makes a new post.

4. Known Issues or Features not implemented

Some known issues would be that their is no confirmation dialogue for editing which would improve coding efficiency.  Some features that I believe future versions of this app can include would be a dark and light mode toggle option for more accessibility.
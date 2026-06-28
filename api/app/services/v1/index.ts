/** @format */


import * as authService from "./auth.service";
import * as userService from "./user.service";
import * as postService from "./post.service";
// import * as commentService from "./comment.service";
// import * as notificationService from "./notification.service";


export const v1Services = {
    ...authService,
    ...userService,
    ...postService,
    // ...commentService,
    // ...notificationService
}
